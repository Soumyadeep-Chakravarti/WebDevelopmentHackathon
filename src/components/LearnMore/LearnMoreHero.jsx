// src/components/LearnMore/LearnMoreHero.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for individual items within sections
const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const LearnMoreHero = () => {
    return (
        <section className="relative text-center py-32 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-primary to-secondary text-white"> {/* REMOVED overflow-hidden */}
            {/* Subtle background pattern/texture */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/cubes.png)' }}></div>
            {/* Animated blobs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            <motion.h1
                className="relative z-10 text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg"
                initial="hidden"
                animate="visible"
                variants={itemVariants}
            >
                Unveiling the Future with Team ByteOps
            </motion.h1>
            <motion.p
                className="relative z-10 text-xl sm:text-2xl opacity-90 max-w-4xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: 0.2 }}
            >
                Dive deep into our core principles, innovative technology, and the passionate team
                driving the next generation of digital solutions.
            </motion.p>
        </section>
    );
};

export default LearnMoreHero;
