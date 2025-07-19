import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
};

const transition = { duration: 0.8, ease: 'easeOut' };

const Hero = () => {
    const navigate = useNavigate();
    return (
        // If you want to animate the section: <motion.section {...yourMotionProps}>
        <section className="flex flex-col items-center justify-center w-screen min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-500 px-4 sm:px-6 md:px-8">
            <motion.div
                className="text-center"
                initial="initial"
                animate="animate"
                variants={fadeUp}
                transition={transition}
            >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Our Website</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Explore our features and services.</p>
                <button
                    onClick={() => navigate('/about')}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                    Learn More
                </button>
            </motion.div>
        </section>
    );
};

export default Hero;