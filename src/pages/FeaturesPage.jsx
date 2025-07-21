// src/pages/FeaturesPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer'; // Correct import path for Footer
import DetailedFeatureCard from '../components/DetailedFeatureCard/DetailedFeatureCard';
import { featuresData } from '../data/featuresData'; // Import centralized data

const FeaturesPage = ({ setShowLogin }) => { // Accept setShowLogin prop for Navbar/CTA
    const headerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    // Log featuresData to inspect its content
    console.log("FeaturesPage: featuresData:", featuresData);

    return (
        <div className="w-full min-h-screen bg-background text-text-primary">
            <Navbar setShowLogin={setShowLogin} /> {/* Pass setShowLogin to Navbar */}

            {/* Main content area - Ensure no horizontal overflow here */}
            <main className="relative w-full py-20 overflow-x-hidden">
                {/* Features Page Header */}
                <section className="text-center py-20 px-4 sm:px-6 md:px-8">
                    <motion.h1
                        className="w-full text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text
                                   bg-gradient-to-r from-primary to-secondary mb-6 leading-tight drop-shadow-lg"
                        initial="hidden"
                        animate="visible"
                        variants={headerVariants}
                    >
                        Explore Our Powerful Features
                    </motion.h1>
                    <motion.p
                        className="w-full text-xl text-text-secondary max-w-3xl mx-auto mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={headerVariants}
                        transition={{ delay: 0.2 }}
                    >
                        Dive deep into the capabilities that make our platform an indispensable tool for your success.
                    </motion.p>
                </section>

                {/* Detailed Features List */}
                <section className="px-4 sm:px-6 md:px-8 pb-20 flex flex-col gap-45">
                    {/* Ensure featuresData is an array before mapping */}
                    {featuresData && featuresData.map((feature, index) => (
                        // Add a check for 'feature' being defined before rendering DetailedFeatureCard
                        feature ? <DetailedFeatureCard key={index} feature={feature} index={index} /> : null
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FeaturesPage;
