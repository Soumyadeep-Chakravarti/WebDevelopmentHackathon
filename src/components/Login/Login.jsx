import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, X, LogIn } from 'lucide-react';
// Import the Firebase authentication functions
import { firebaseSignIn } from '../../firebase/authFunctions'; // Only need signIn here now

// The Login component now accepts setShowLogin and a new isStandalonePage prop
export const Login = ({ setShowLogin, isStandalonePage = false }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Clear messages after a few seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    setIsLoading(true);

    if (!email || !password) {
      setMessage('Email and password are required.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    let result = await firebaseSignIn(email, password);

    if (result.success) {
      setMessage('Successfully logged in!');
      setMessageType('success');
      setTimeout(() => {
        if (isStandalonePage) {
            navigate('/'); // Navigate to home if it's a standalone login page
        } else {
            setShowLogin(false); // Close the modal if it's an overlay
        }
      }, 1500);
    } else {
      setMessage(result.error || 'An unexpected error occurred.');
      setMessageType('error');
    }
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    if (isStandalonePage) {
        navigate('/'); // Navigate to home if it's a standalone login page
    } else {
        setShowLogin(false); // Close the modal if it's an overlay
    }
  };

  // Conditional wrapper for the modal/page layout
  const Wrapper = isStandalonePage ? 'div' : 'div'; // Use div for standalone page, or a custom wrapper if needed

  return (
    <Wrapper className={isStandalonePage ? 'w-full min-h-screen bg-background text-text-primary flex justify-center items-center p-4' : 'fixed inset-0 z-[100] backdrop-blur-sm bg-black/30 flex justify-center items-center p-4'}>
      <form
        onSubmit={handleAuthSubmit}
        className='relative bg-card-background p-10 rounded-2xl text-text-primary w-full max-w-md shadow-2xl transition-all duration-300 border border-border-color/50'
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleCloseModal}
          className='absolute top-5 right-5 cursor-pointer text-text-secondary hover:text-red-500 transition'
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <h1 className='text-center text-3xl font-bold text-text-primary mb-1'>
          Login
        </h1>
        <p className='text-sm text-center mb-6 text-text-secondary'>
          Welcome back! Please sign in to continue
        </p>

        {/* Message Display */}
        {message && (
          <div
            className={`p-3 rounded-lg text-sm mb-4 ${
              messageType === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
              'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
            }`}
          >
            {message}
          </div>
        )}

        {/* Email */}
        <div className='border border-border-color px-4 py-2 flex items-center gap-3 rounded-full mt-4 focus-within:ring-2 focus-within:ring-accent'>
          <Mail size={20} className="text-text-secondary" />
          <input
            type='email'
            className='outline-none text-sm h-8 w-full bg-transparent'
            placeholder='Email ID'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password with toggle */}
        <div className='border border-border-color px-4 py-2 flex items-center gap-3 rounded-full mt-4 focus-within:ring-2 focus-within:ring-accent'>
          <Lock size={20} className="text-text-secondary" />
          <input
            type={showPassword ? 'text' : 'password'}
            className='outline-none text-sm h-8 w-full bg-transparent'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-text-secondary hover:text-text-primary"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Forgot password */}
        <p className='text-right mt-3 text-xs text-primary cursor-pointer hover:underline'>
            Forgot Password?
        </p>

        {/* Google Auth Button (Placeholder for now) */}
        <button
          type="button"
          className='bg-accent w-full text-white py-2 rounded-full mt-5 hover:bg-accent-dark transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'
          disabled={isLoading}
        >
          Login with Google
        </button>

        {/* Main Auth Button */}
        <button
          type="submit"
          className='bg-primary w-full text-white py-2 rounded-full mt-3 hover:bg-primary-hover transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <><LogIn size={20} className="inline-block mr-2" /> Login</>
          )}
        </button>

        {/* Link to Sign Up Page */}
        <p className='mt-5 text-center text-sm text-text-secondary'>
          Don’t have an account?{' '}
          <span
            className='text-primary cursor-pointer hover:underline font-medium'
            onClick={() => { navigate('/signup'); setShowLogin(false); }}
          >
            Sign up
          </span>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
