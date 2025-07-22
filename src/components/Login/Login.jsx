import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, X, LogIn, Loader2 } from 'lucide-react'; // Added Loader2 for loading spinner
// Import the Firebase authentication functions, including Google sign-in
import { firebaseSignIn, firebaseGoogleSignIn } from '../../firebase/authFunctions';

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

  const handleGoogleSignIn = async () => {
    setMessage('');
    setMessageType('');
    setIsLoading(true);

    const result = await firebaseGoogleSignIn();

    if (result.success) {
      setMessage('Successfully logged in with Google!');
      setMessageType('success');
      setTimeout(() => {
        if (isStandalonePage) {
            navigate('/');
        } else {
            setShowLogin(false);
        }
      }, 1500);
    } else {
      setMessage(result.error || 'An unexpected error occurred with Google sign-in.');
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
  const Wrapper = isStandalonePage ? 'div' : 'div';

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

        {/* Google Auth Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn} // Call the new Google sign-in handler
          className='bg-accent w-full text-white py-2 rounded-full mt-5 hover:bg-accent-dark transition-all duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center gap-2'
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.5 24.0086C44.5 22.0986 44.32 20.2586 43.96 18.4886H24.5V29.0186H35.91C35.45 31.5486 34.05 33.7486 32.01 35.1886L32.01 35.2586L40.78 41.8386L41.07 42.0286C43.74 39.5286 45.5 36.0886 45.5 32.1886C45.5 29.8486 45.05 27.6086 44.5 25.4686V24.0086Z" fill="#4285F4"/>
                <path d="M24.5 45.5086C30.73 45.5086 36.03 43.4086 40.21 39.9286L32.01 35.1886C29.74 36.7886 27.02 37.7686 24.5 37.7686C19.74 37.7686 15.66 34.6186 14.15 30.3486L14.07 30.4286L5.05 37.3886L4.76 37.4786C6.73 41.4886 10.28 44.5086 14.5 45.5086H24.5Z" fill="#34A853"/>
                <path d="M14.15 30.3486C13.68 29.0786 13.42 27.7386 13.42 26.3786C13.42 25.0186 13.68 23.6786 14.15 22.4086L14.14 22.3386L5.04 15.3786L4.76 15.2886C3.23 18.3186 2.5 22.2586 2.5 26.3786C2.5 30.5086 3.23 34.4486 4.76 37.4786L14.15 30.3486Z" fill="#FBBC05"/>
                <path d="M24.5 15.0086C27.08 15.0086 29.41 15.9386 31.25 17.5186L38.45 10.3186C36.03 8.1686 32.79 7.0086 29.5 7.0086C25.22 7.0086 21.36 8.7886 18.45 11.5186L18.35 11.6086L14.07 7.3386L14.07 7.3386C15.66 3.0686 19.74 0.0086 24.5 0.0086V15.0086Z" fill="#EA4335"/>
              </svg>
              Login with Google
            </>
          )}
        </button>

        {/* Main Auth Button */}
        <button
          type="submit"
          className='bg-primary w-full text-white py-2 rounded-full mt-3 hover:bg-primary-hover transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin mx-auto" />
          ) : (
            <><LogIn size={20} className="inline-block mr-2" /> Login</>
          )}
        </button>

        {/* Link to Sign Up Page */}
        <p className='mt-5 text-center text-sm text-text-secondary'>
          Don’t have an account?{' '}
          <span
            className='text-primary cursor-pointer hover:underline font-medium'
            onClick={() => {navigate('/signup'); setShowLogin(false);}}
          >
            Sign up
          </span>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
