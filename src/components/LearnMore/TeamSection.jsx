// src/components/LearnMore/TeamSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { teamMembersData } from '../../data/teamMembersData'; // Import the team members data
import TeamMemberCard from './TeamMemberCard'; // Import the new TeamMemberCard component

// Animation variants for sections
const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Animation variants for individual items within sections (used by TeamMemberCard)
const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const TeamSection = () => {
    return (
        <motion.section
            className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
            <motion.div className="mb-12" variants={itemVariants}>
                <Users size={64} className="text-primary mx-auto mb-4 drop-shadow-lg" />
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Meet the Minds Behind Team ByteOps</h2>
                <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                    Our diverse team of innovators, engineers, and designers are passionate about solving complex problems and building exceptional products.
                </p>
            </motion.div>
            {/* New flex container to center the grid */}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"> {/* Removed justify-content-center from here */}
                    {teamMembersData.map((member, index) => (
                        <TeamMemberCard key={index} member={member} variants={itemVariants} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default TeamSection;
