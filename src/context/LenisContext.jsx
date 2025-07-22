// src/context/LenisContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Lenis from 'lenis'; // Assuming Lenis is installed

const LenisContext = createContext(null); // Initialize with null

export const LenisProvider = ({ children }) => {
    // Use useState to hold the Lenis instance, allowing re-renders when it's ready
    const [lenisInstance, setLenisInstance] = useState(null);
    const animationFrameIdRef = useRef(null); // Ref to store the requestAnimationFrame ID for cleanup

    useEffect(() => {
        // Only create a new Lenis instance if one doesn't already exist
        // and ensure it's attached to the document.documentElement (html element)
        if (!lenisInstance) {
            const lenis = new Lenis({
                wrapper: document.documentElement, // Explicitly set wrapper to html element
                content: document.documentElement, // Explicitly set content to html element
                lerp: 0.1, // Adjust for desired smoothness
                duration: 1.2, // Default scroll duration
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Example easing
            });
            setLenisInstance(lenis); // Update state with the new instance

            // IMPORTANT FIX: Call resize after initialization to ensure Lenis calculates scroll height
            lenis.resize();

            const raf = (time) => {
                lenis.raf(time);
                // Continue the animation loop only if the Lenis instance exists.
                if (lenis) { // Use the local 'lenis' variable here
                    animationFrameIdRef.current = requestAnimationFrame(raf);
                }
            };

            // Start the initial animation loop and store its ID
            animationFrameIdRef.current = requestAnimationFrame(raf);
        }

        // Cleanup function: runs when the component unmounts
        return () => {
            // Cancel the animation frame if its ID exists in the ref
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null; // Clear the ref
            }
            // Destroy the Lenis instance if it exists
            if (lenisInstance) { // Use the state variable here for cleanup
                lenisInstance.destroy();
                setLenisInstance(null); // Clear the state
            }
        };
    }, []); // Empty dependency array: ensures this effect runs ONLY ONCE on mount

    return (
        <LenisContext.Provider value={lenisInstance}> {/* Provide the state value */}
            {children}
        </LenisContext.Provider>
    );
};

export const useLenis = () => {
    const context = useContext(LenisContext);
    // Optional: Add a check if useLenis is used outside a LenisProvider
    // if (context === null) {
    //   throw new Error('useLenis must be used within a LenisProvider');
    // }
    return context;
};
