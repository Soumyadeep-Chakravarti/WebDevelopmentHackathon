import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, X, LogIn, UserPlus } from 'lucide-react';
// Import the Firebase authentication functions
import { firebaseSignIn, firebaseSignUp } from '../../firebase/authFunctions';

// The Login component now correctly accepts setShowLogin as a prop
export const Login = ({ setShowLogin }) => { // <--- CORRECTED: setShowLogin is now accepted as a prop
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup (renamed 'state' to 'isLogin')
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For signup
  const [fullName, setFullName] = useState(''); // For signup (though Firebase Auth doesn't directly use it for signup, it's good for UI)
  const [message, setMessage] = useState(''); // For success/error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Clear messages after a few seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000); // Message disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setMessageType('');
    setIsLoading(true);

    if (!email || !password) {
      setMessage('Email and password are required.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    let result;
    if (isLogin) {
      result = await firebaseSignIn(email, password);
    } else {
      result = await firebaseSignUp(email, password);
      // You might want to save fullName to Firestore here if needed
    }

    if (result.success) {
      setMessage(`Successfully ${isLogin ? 'logged in' : 'signed up'}!`);
      setMessageType('success');
      // Optionally close modal after a short delay or redirect
      setTimeout(() => {
        setShowLogin(false); // Close the modal on successful auth
      }, 1500);
    } else {
      // Firebase error messages are usually user-friendly, but can be customized
      setMessage(result.error || 'An unexpected error occurred.');
      setMessageType('error');
    }
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setShowLogin(false); // This will now correctly call the setShowLogin prop
  };

  return (
    <div className='fixed inset-0 z-[100] backdrop-blur-sm bg-black/30 flex justify-center items-center p-4'>
      <form
        onSubmit={handleAuthSubmit} // Bind the submit handler to the form
        className='relative bg-card-background p-10 rounded-2xl text-text-primary w-full max-w-md shadow-2xl transition-all duration-300 border border-border-color/50'
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleCloseModal} // Use the new close handler
          className='absolute top-5 right-5 cursor-pointer text-text-secondary hover:text-red-500 transition'
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <h1 className='text-center text-3xl font-bold text-text-primary mb-1'>
          {isLogin ? 'Login' : 'Sign Up'} {/* Use isLogin state */}
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

        {/* Full Name (Sign Up Only) */}
        {!isLogin && ( // Use !isLogin
          <div className='border border-border-color px-4 py-2 flex items-center gap-3 rounded-full mt-2 focus-within:ring-2 focus-within:ring-accent'>
            <User size={20} className="text-text-secondary" />
            <input
              type='text'
              className='outline-none text-sm h-8 w-full bg-transparent'
              placeholder='Full Name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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

        {/* Confirm Password (Sign Up Only) */}
        {!isLogin && ( // Use !isLogin
          <div className='border border-border-color px-4 py-2 flex items-center gap-3 rounded-full mt-4 focus-within:ring-2 focus-within:ring-accent'>
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
                type={showPassword ? 'text' : 'password'} // Keep password type consistent
                className='outline-none text-sm h-8 w-full bg-transparent'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
          </div>
        )}

        {/* Forgot password */}
        {isLogin && ( // Only show for Login state
            <p className='text-right mt-3 text-xs text-primary cursor-pointer hover:underline'>
                Forgot Password?
            </p>
        )}

        {/* Google Auth Button (Placeholder for now) */}
        <button
          type="button"
          className='bg-accent w-full text-white py-2 rounded-full mt-5 hover:bg-accent-dark transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'
          disabled={isLoading}
        >
          {isLogin ? 'Login' : 'Create Account'} with Google
        </button>

        {/* Main Auth Button */}
        <button
          type="submit"
          className='bg-primary w-full text-white py-2 rounded-full mt-3 hover:bg-primary-hover transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            isLogin ? <><LogIn size={20} className="inline-block mr-2" /> Login</> : <><UserPlus size={20} className="inline-block mr-2" /> Create Account</>
          )}
        </button>

        {/* Toggle between Login/Signup */}
        <p className='mt-5 text-center text-sm text-text-secondary'>
          {isLogin ? (
            <>Don’t have an account?{' '}
              <span
                className='text-primary cursor-pointer hover:underline font-medium'
                onClick={() => { setIsLogin(false); setMessage(''); setMessageType(''); }} // Clear messages on toggle
              >
                Sign up
              </span>
            </>
          ) : (
            <>Already have an account?{' '}
              <span
                className='text-primary cursor-pointer hover:underline font-medium'
                onClick={() => { setIsLogin(true); setMessage(''); setMessageType(''); }} // Clear messages on toggle
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
