// src/components/LearnMore/VisionPhilosophySection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

// Animation variants for sections
const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Animation variants for individual items within sections
const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const VisionPhilosophySection = () => {
    return (
        <motion.section
            className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-center relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-background to-card-background rounded-full opacity-50 filter blur-2xl top-1/4 left-1/4 w-1/2 h-1/2"></div>
            <motion.div className="mb-12 relative z-10" variants={itemVariants}>
                <Lightbulb size={64} className="text-accent mx-auto mb-4 drop-shadow-lg" />
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Vision & Core Philosophy</h2>
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <motion.div variants={itemVariants} className="bg-card-background p-8 rounded-xl shadow-lg border border-border-color/50 text-left">
                    <h3 className="text-2xl font-semibold mb-3 text-primary">Empowering Innovation</h3>
                    <p className="text-text-secondary leading-relaxed">
                        We envision a world where technology serves as a catalyst for human potential, not a barrier. Our philosophy centers on building tools that are not just powerful, but also intuitive, accessible, and designed to unlock creativity and efficiency for every user, from individual creators to large enterprises.
                    </p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-card-background p-8 rounded-xl shadow-lg border border-border-color/50 text-left">
                    <h3 className="text-2xl font-semibold mb-3 text-secondary">Sustainable Growth</h3>
                    <p className="text-text-secondary leading-relaxed">
                        Beyond immediate solutions, we are committed to sustainable development and long-term partnerships. Our architecture is built for scalability and resilience, ensuring that our platform grows seamlessly with your needs, providing reliable performance and security for years to come.
                    </p>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default VisionPhilosophySection;
