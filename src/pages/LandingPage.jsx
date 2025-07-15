// ./src/pages/LandingPage.jsx

import React from 'react';
import Navbar from '../components/navbar/navbar';
import useLenis from '../hooks/useLenis'; // Optional: if you're using Lenis

const LandingPage = () => {
    useLenis(); // Optional: smooth scroll on this page

    return (
        <div className="w-full min-h-screen overflow-hidden bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
            <Navbar />
            <main>
            </main>
        </div>
    );
};

export default LandingPage;