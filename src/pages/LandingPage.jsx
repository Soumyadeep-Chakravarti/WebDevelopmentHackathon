// ./src/pages/LandingPage.jsx

import React from 'react';
import Navbar from '../components/navbar/navbar';
import Hero from '../components/Hero/hero';

const LandingPage = () => {
    // The main background and text color are now controlled by the <body> styles in index.css
    // The div here will inherit those, or you can explicitly set its background/text if it's a sub-container.
    return (
        <div className="w-full min-h-screen overflow-hidden">
            <Navbar />
            <main>
                <Hero/>
            </main>
        </div>
    );
};

export default LandingPage;
