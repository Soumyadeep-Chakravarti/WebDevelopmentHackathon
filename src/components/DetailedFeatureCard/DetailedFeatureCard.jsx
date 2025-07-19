// src/components/DetailedFeatureCard/DetailedFeatureCard.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DetailedFeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effect for vertical movement
    const y = useTransform(scrollYProgress, [0, 1], [-150, 150]);

    // Slide in from left/right based on index - FURTHER REDUCED X TRANSFORM RANGE
    const x = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        index % 2 === 0 ? [-100, 0, 0, 100] : [100, 0, 0, -100] // Reduced from +/-200 to +/-100
    );

    // Fade in/out
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    // Subtle scale effect
    const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.9, 1, 1, 0.9]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            style={{ y, x, opacity, scale }}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 rounded-2xl shadow-xl
                        bg-card-background border border-border-color/50 max-w-5xl mx-auto
                        ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`} // Alternating layout
        >
            <div className="md:w-1/2 flex justify-center items-center">
                <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto rounded-lg shadow-md object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/000000?text=Image+Error"; }}
                />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                <div className="mb-4 p-3 rounded-full bg-primary/10 inline-block">
                    {feature.icon}
                </div>
                <h3 className="text-3xl font-bold text-text-primary mb-4">
                    {feature.title}
                </h3>
                {feature.description} {/* Renders the description component */}
            </div>
        </motion.div>
    );
};

export default DetailedFeatureCard;
