// src/components/LearnMore/LearnMoreHero.jsx
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react'; // Example icon
import useDarkMode from '../../hooks/useDarkMode'; // Import the useDarkMode hook

// Animation variants for a subtle fade-up and scale-in effect
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: 'easeOut',
        },
    },
};

const LearnMoreHero = () => {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);
    const [isDarkMode] = useDarkMode(); // Get the current theme mode

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        const particles = [];
        const numParticles = 30; // Optimized number of particles for performance

        // Function to set canvas dimensions based on parent
        const setCanvasSize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };

        // Particle class for the fluid effect
        class Particle {
            constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.vx = (Math.random() - 0.5) * 0.3; // Slower movement
                this.vy = (Math.random() - 0.5) * 0.3; // Slower movement
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x + this.radius > width || this.x - this.radius < 0) {
                    this.vx *= -1;
                }
                if (this.y + this.radius > height || this.y - this.radius < 0) {
                    this.vy *= -1;
                }

                // Add a slight random nudge for more fluid motion
                this.vx += (Math.random() - 0.5) * 0.005; // Even smaller nudge
                this.vy += (Math.random() - 0.5) * 0.005;

                // Clamp velocity to prevent particles from going too fast
                const maxSpeed = 0.5; // Reduced max speed
                this.vx = Math.max(-maxSpeed, Math.min(maxSpeed, this.vx));
                this.vy = Math.max(-maxSpeed, Math.min(maxSpeed, this.vy));
            }
        }

        // Initialize particles based on theme
        const initParticles = () => {
            particles.length = 0; // Clear existing particles

            // Define RGBA colors for light and dark modes (approximated from your Oklch theme colors)
            const lightModeColors = [
                'rgba(96, 119, 234, 0.3)',   // Approximate Primary (light mode)
                'rgba(255, 179, 102, 0.3)',  // Approximate Secondary (light mode)
                'rgba(255, 193, 7, 0.3)'     // Approximate Accent (light mode)
            ];
            const darkModeColors = [
                'rgba(128, 149, 255, 0.3)',  // Approximate Primary (dark mode)
                'rgba(255, 204, 153, 0.3)',  // Approximate Secondary (dark mode)
                'rgba(255, 215, 0, 0.3)'     // Approximate Accent (dark mode)
            ];

            const currentColors = isDarkMode ? darkModeColors : lightModeColors;

            for (let i = 0; i < numParticles; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const radius = Math.random() * 20 + 15; // Random radius between 15 and 35
                const color = currentColors[Math.floor(Math.random() * currentColors.length)];
                particles.push(new Particle(x, y, radius, color));
            }
        };

        // Animation loop
        const animate = () => {
            // Draw a semi-transparent rectangle for the "trailing" effect,
            // color depends on the current theme
            ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, 0, width, height);

            // No ctx.filter here, blur is applied via CSS on the canvas element

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        // Set initial size and start animation
        setCanvasSize();
        initParticles();
        animate();

        // Handle resize events
        const resizeObserver = new ResizeObserver(() => {
            setCanvasSize();
            initParticles(); // Re-initialize particles on resize to distribute them correctly
        });
        resizeObserver.observe(canvas);

        // Cleanup function
        return () => {
            cancelAnimationFrame(animationFrameId.current);
            resizeObserver.disconnect();
        };
    }, [isDarkMode]); // Re-run effect when isDarkMode changes to update colors

    return (
        <section
            className="relative flex flex-col items-center justify-center w-full min-h-[70vh]
                       text-text-primary transition-colors duration-700 ease-in-out
                       px-4 py-20 sm:px-6 md:px-8 overflow-hidden text-center
                       bg-background" // Base background color
        >
            {/* Canvas for fluid animation - OPTIMIZATION: Added CSS blur directly */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0 filter blur-2xl opacity-70" // Added filter blur and opacity
            ></canvas>

            <motion.div
                className="relative z-10 max-w-4xl mx-auto p-8 bg-card-background/60
                           rounded-2xl shadow-2xl backdrop-blur-sm border border-border-color/50"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="mb-6">
                    <Sparkles size={64} className="text-primary mx-auto drop-shadow-lg" />
                </motion.div>
                <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text
                               bg-gradient-to-r from-primary to-secondary
                               mb-6 leading-tight tracking-tight drop-shadow-lg"
                    variants={itemVariants}
                >
                    Deep Dive into Our Story
                </motion.h1>

                <motion.p
                    className="text-lg sm:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
                    variants={itemVariants}
                >
                    Learn about our journey, the principles that guide us, and the technology that powers our vision for the future.
                </motion.p>
            </motion.div>
        </section>
    );
};

export default LearnMoreHero;
