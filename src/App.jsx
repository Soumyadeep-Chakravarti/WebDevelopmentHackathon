// src/App.jsx
import React, { useState } from 'react'; // Make sure useState is imported here
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import FeaturesPage from './pages/FeaturesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LenisProvider } from './context/LenisContext.jsx';
import Login from './components/login/login.jsx'; // Import the Login component

export default function App() {
  // This is where setShowLogin is "made" - it's the setter function for the showLogin state
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <LenisProvider>
          <Routes>
            <Route path="/" element={<LandingPage setShowLogin={setShowLogin} />} />
            <Route path="/features" element={<FeaturesPage setShowLogin={setShowLogin} />} />
            <Route path="/contact" element={<ContactPage setShowLogin={setShowLogin} />} />
          </Routes>
          {/* Here, setShowLogin is passed as a prop to the Login component */}
          {showLogin && <Login setShowLogin={setShowLogin} />}
        </LenisProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
