// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LenisProvider } from './context/LenisContext.jsx'; // Correct import

import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import FeaturesPage from './pages/FeaturesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

import './index.css'; // Ensure global styles are applied

export default function App() {
  // The useLenis hook logic is now encapsulated within LenisProvider
  // No need to call useLenis() directly here anymore unless you need the instance in App.jsx itself.

  return (
    <BrowserRouter>
      <ThemeProvider>
        {/* Wrap your app with the LenisProvider */}
        <LenisProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </LenisProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}