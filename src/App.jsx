// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
// Import the new LenisProvider
import { LenisProvider } from './context/LenisContext.jsx'; // Correct import

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
          </Routes>
        </LenisProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}