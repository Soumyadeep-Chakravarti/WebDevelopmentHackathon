// src/data/featuresData.js
import React from 'react';
import { Zap, Shield, Cloud, Settings, Layout, LifeBuoy } from 'lucide-react';

// Import individual feature description components
import PerformanceDescription from '../components/LandingFeatures/descriptions/PerformanceDescription';
import SecurityDescription from '../components/LandingFeatures/descriptions/SecurityDescription';
import CloudIntegrationDescription from '../components/LandingFeatures/descriptions/CloudIntegrationDescription';
import ScalableArchitectureDescription from '../components/LandingFeatures/descriptions/ScalableArchitectureDescription';
import UserInterfaceDescription from '../components/LandingFeatures/descriptions/UserInterfaceDescription';
import SupportDescription from '../components/LandingFeatures/descriptions/SupportDescription';

export const featuresData = [
    {
        icon: <Zap size={36} className="text-primary" />,
        title: "Blazing Fast Performance",
        description: <PerformanceDescription />,
        image: "https://placehold.co/600x400/87CEEB/FFFFFF/png?text=Performance+Image", // Placeholder image
    },
    {
        icon: <Shield size={36} className="text-secondary" />,
        title: "Robust Security",
        description: <SecurityDescription />,
        image: "https://placehold.co/600x400/90EE90/000000/png?text=Security+Image", // Placeholder image
    },
    {
        icon: <Cloud size={36} className="text-accent" />,
        title: "Seamless Cloud Integration",
        description: <CloudIntegrationDescription />,
        image: "https://placehold.co/600x400/ADD8E6/000000/png?text=Cloud+Image", // Placeholder image
    },
    {
        icon: <Settings size={36} className="text-primary" />,
        title: "Scalable Architecture",
        description: <ScalableArchitectureDescription />,
        image: "https://placehold.co/600x400/FFB6C1/000000/png?text=Scalability+Image", // Placeholder image
    },
    {
        icon: <Layout size={36} className="text-secondary" />,
        title: "Intuitive User Interface",
        description: <UserInterfaceDescription />,
        image: "https://placehold.co/600x400/FFD700/000000/png?text=UI+Image", // Placeholder image
    },
    {
        icon: <LifeBuoy size={36} className="text-accent" />,
        title: "24/7 Dedicated Support",
        description: <SupportDescription />,
        image: "https://placehold.co/600x400/DDA0DD/000000/png?text=Support+Image", // Placeholder image
    },
];
