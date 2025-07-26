// src/App.jsx
import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load your page components (This is good for performance and should remain lazy)
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const Login = lazy(() => import('./components/Login/Login.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage.jsx'));
const LearnMorePage = lazy(() => import('./pages/LearnMorePage.jsx'));

// CRITICAL FIX: Import Context Providers DIRECTLY. DO NOT lazy load them.
// They must be available synchronously at the root of your application's component tree.
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LenisProvider } from './context/LenisContext.jsx';
import {Maps} from './pages/Maps.jsx';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      {/* ThemeProvider and LenisProvider are now directly rendered and available immediately */}
      <ThemeProvider>
        <LenisProvider>
          {/* Suspense still wraps the Routes because page components are lazy loaded */}
          <Suspense fallback={<div className="flex justify-center items-center min-h-screen text-text-primary">Loading application...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage setShowLogin={setShowLogin} />} />
              <Route path="/features" element={<FeaturesPage setShowLogin={setShowLogin} />} />
              <Route path="/contact" element={<ContactPage setShowLogin={setShowLogin} />} />
              <Route path="/login" element={<Login setShowLogin={setShowLogin} isStandalonePage={true} />} />
              <Route path="/signup" element={<SignUpPage setShowLogin={setShowLogin} />} />
              <Route path="/learn-more" element={<LearnMorePage setShowLogin={setShowLogin} />} />
              <Route path="/Maps" element={<Maps setShowLogin={setShowLogin} />} />
            </Routes>
            {/* Render Login as an overlay ONLY if showLogin is true AND it's not a standalone page route */}
            {!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup') && showLogin && (
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
