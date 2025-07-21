// src/pages/LandingPage.jsx

import React from 'react';
import Navbar from '../components/Navbar/Navbar'; // Corrected import path
import Hero from '../components/Hero/Hero'; // Corrected import path
import Features from '../components/LandingFeatures/Features'; // Corrected import path
import CTA from '../components/CTA/CTA'; // Corrected import path
import Testimonials from '../components/Testimonials/Testimonials'; // Corrected import path
import Footer from '../components/Footer/Footer'; // Corrected import path

// LandingPage now accepts setShowLogin as a prop from App.jsx
const LandingPage = ({ setShowLogin }) => {
    return (
        // The background color is now handled by the body in index.css
        <div
            className="relative w-full min-h-screen text-text-primary"
            // Removed style={{ backgroundImage: ... }} to rely on global background
        >
            {/* Navbar is fixed, so it floats above content */}
            <Navbar setShowLogin={setShowLogin} />

            {/* Main content area - Added 'relative' for Framer Motion children */}
            <main className="relative w-full">
                <Hero/>
                <Features/>
                <Testimonials/>
                <CTA setShowLogin={setShowLogin} />
            </main>

            <Footer/>
        </div>
    );
};

export default LandingPage;
