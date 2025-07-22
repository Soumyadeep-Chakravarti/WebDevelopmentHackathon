// src/components/LearnMore/TeamMemberCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TeamMemberCard = ({ member, variants }) => {
    return (
        <motion.div variants={variants} className="bg-card-background p-8 rounded-xl shadow-lg border border-border-color/50 flex flex-col items-center text-center"> {/* Changed p-6 to p-8 for more padding */}
            <img
                src={member.image}
                alt={member.name}
                className={`w-32 h-32 rounded-full object-cover mb-4 border-4 ${member.borderColor}`}
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x120/CCCCCC/000000?text=Error"; }}
            />
            <h3 className="text-xl font-semibold text-text-primary">{member.name}</h3>
            <p className="text-sm text-text-secondary mb-2">{member.role}</p>
            <p className="text-text-secondary text-sm">{member.description}</p>
        </motion.div>
    );
};

export default TeamMemberCard;
