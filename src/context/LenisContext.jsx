import React, { createContext, useContext, useRef, useEffect } from 'react';
import Lenis from 'lenis'; // Assuming Lenis is installed

const LenisContext = createContext(null); // Initialize with null

export const LenisProvider = ({ children }) => {
    // Ref to store the Lenis instance
    const lenisInstanceRef = useRef(null);
    // Ref to store the requestAnimationFrame ID for cleanup
    const animationFrameIdRef = useRef(null); // <-- NEW: Ref for animation frame ID

    useEffect(() => {
        // Ensure only one Lenis instance is created
        if (!lenisInstanceRef.current) {
            const lenis = new Lenis();
            lenisInstanceRef.current = lenis;

            const raf = (time) => {
                lenis.raf(time);
                // Continue the animation loop only if the component is still mounted
                // and the Lenis instance still exists.
                if (lenisInstanceRef.current) {
                    // Store the new animation frame ID in the ref
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
            if (lenisInstanceRef.current) {
                lenisInstanceRef.current.destroy();
                lenisInstanceRef.current = null; // Clear the ref
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <LenisContext.Provider value={lenisInstanceRef.current}>
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
