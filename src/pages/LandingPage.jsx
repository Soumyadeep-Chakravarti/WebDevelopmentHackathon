// ./src/pages/LandingPage.jsx

import React from 'react';
import Navbar from '../components/navbar/navbar';
import Hero from '../components/Hero/hero';
import Features from '../components/LandingFeatures/Features';
import CTA from '../components/CTA/CTA';
import Testimonials from '../components/Testimonials/Testimonials';
import Footer from '../components/Footer/Footer';

const LandingPage = ({ setShowLogin }) => { // Accept setShowLogin prop
    return (
        <div className="w-full min-h-screen overflow-hidden text-text-primary">
            <Navbar setShowLogin={setShowLogin} /> {/* Pass setShowLogin */}
            {/* Added 'relative' to main for Framer Motion context */}
            <main className="relative">
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
