// src/pages/LandingPage.jsx

import React from 'react';
import Navbar from '../components/navbar/navbar';
import Hero from '../components/Hero/hero'; 
import CTA from '../components/CTA/CTA'; // Import CTA component
import Features from '../components/Features/Features';
import Footer from '../components/Footer/Footer';
import Testimonials from '../components/Testimonials/Testimonials'; // Import Testimonials component

// LandingPage now accepts setShowLogin as a prop from App.jsx
const LandingPage = ({ setShowLogin }) => {
    return (
        <div className="w-full min-h-screen overflow-hidden">
            {/* Pass setShowLogin to Navbar so the "Try Now" button can open the Login overlay */}
            <Navbar setShowLogin={setShowLogin} />
            <main>
                <Hero/>
                <CTA setShowLogin={setShowLogin} /> {/* Pass setShowLogin to CTA */}
                <Features />
                <Testimonials /> {/* Add Testimonials component */}
                <Footer />
            </main>
        </div>
    );
};

export default LandingPage;
