// src/pages/LearnMorePage.jsx
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import LearnMoreHero from '../components/LearnMore/LearnMoreHero'; // New import
import VisionPhilosophySection from '../components/LearnMore/VisionPhilosophySection'; // New import
import TechnologySection from '../components/LearnMore/TechnologySection'; // New import
import TeamSection from '../components/LearnMore/TeamSection'; // New import

const LearnMorePage = ({ setShowLogin }) => {
    return (
        <div className="w-full min-h-screen bg-background text-text-primary flex flex-col">
            <Navbar setShowLogin={setShowLogin} />

            <main className="flex-grow relative w-full"> {/* Removed overflow-x-hidden from main */}
                <LearnMoreHero />
                <VisionPhilosophySection />
                <TechnologySection />
                <TeamSection /> {/* Calling the modularized TeamSection component */}
            </main>

            <Footer />
        </div>
    );
};

export default LearnMorePage;
