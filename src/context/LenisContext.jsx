// src/context/LenisContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Lenis from 'lenis'; // Assuming Lenis is installed

const LenisContext = createContext(null); // Initialize with null

export const LenisProvider = ({ children }) => {
    const [lenisInstance, setLenisInstance] = useState(null);
    const animationFrameIdRef = useRef(null);

    useEffect(() => {
        // Ensure Lenis is initialized only once and targets the document element
        if (!lenisInstance) {
            const lenis = new Lenis({
                wrapper: document.documentElement, // Explicitly set wrapper to html element
                content: document.documentElement, // Explicitly set content to html element
                lerp: 0.1, // Adjust for desired smoothness
                duration: 1.2, // Default scroll duration
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Example easing
            });
            setLenisInstance(lenis);

            const raf = (time) => {
                lenis.raf(time);
                animationFrameIdRef.current = requestAnimationFrame(raf);
            };

            animationFrameIdRef.current = requestAnimationFrame(raf);
        }

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
            if (lenisInstance) {
                lenisInstance.destroy();
                setLenisInstance(null);
            }
        };
    }, []); // Empty dependency array: ensures this effect runs ONLY ONCE on mount

    return (
        <LenisContext.Provider value={lenisInstance}>
            {children}
        </LenisContext.Provider>
    );
};

export const useLenis = () => {
    const context = useContext(LenisContext);
    return context;
};
