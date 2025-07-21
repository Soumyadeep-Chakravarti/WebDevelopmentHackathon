// src/App.jsx
import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const Login = lazy(() => import('./components/Login/Login.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage.jsx')); // <--- Ensure this import is here

import { ThemeProvider } from './context/ThemeContext.jsx';
import { LenisProvider } from './context/LenisContext.jsx';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <LenisProvider>
          <Suspense fallback={<div className="flex justify-center items-center min-h-screen text-text-primary">Loading application...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage setShowLogin={setShowLogin} />} />
              <Route path="/features" element={<FeaturesPage setShowLogin={setShowLogin} />} />
              <Route path="/contact" element={<ContactPage setShowLogin={setShowLogin} />} />
              <Route path="/login" element={<Login setShowLogin={setShowLogin} isStandalonePage={true} />} />
              <Route path="/signup" element={<SignUpPage />} /> {/* <--- Ensure this route is here */}
            </Routes>
            {!window.location.pathname.includes('/login') && showLogin && (
              <Suspense fallback={<div>Loading login...</div>}>
                <Login setShowLogin={setShowLogin} isStandalonePage={false} />
              </Suspense>
            )}
          </Suspense>
        </LenisProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}