// src/components/SignUp/SignUpForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { firebaseSignUp } from '../../firebase/authFunctions';

// Animation variants for form elements (inputs, buttons)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    setIsLoading(true);

    if (!email || !password || !fullName) {
      setMessage('All fields are required.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    let result = await firebaseSignUp(email, password);

    if (result.success) {
      setMessage('Account created successfully! Redirecting to login...');
      setMessageType('success');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } else {
      setMessage(result.error || 'An unexpected error occurred during sign up.');
      setMessageType('error');
    }
    setIsLoading(false);
  };

  return (
    <motion.form // Apply motion to the form
      onSubmit={handleSignUpSubmit}
      className='relative bg-card-background/90 p-10 rounded-2xl text-text-primary w-full max-w-md shadow-2xl transition-all duration-300 border border-border-color/50 backdrop-blur-sm'
      initial="hidden"
      animate="visible"
      variants={{ // Define formVariants directly here as it's the root of the form
        hidden: { opacity: 0, x: -100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.7,
            ease: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {/* Heading */}
      <motion.h1
        className='text-center text-3xl font-bold text-text-primary mb-1'
        variants={itemVariants}
      >
        Sign Up
      </motion.h1>
      <motion.p
        className='text-sm text-center mb-6 text-text-secondary'
        variants={itemVariants}
      >
        Create your account to get started!
      </motion.p>

      {/* Message Display with AnimatePresence */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`p-3 rounded-lg text-sm mb-4 ${messageType === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
              }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Name */}
      <motion.div
        className='border border-border-color px-4 py-2 flex items-center gap-3 rounded-full mt-2 focus-within:ring-2 focus-within:ring-accent'
        variants={itemVariants}
      >
        <User size={20} className="text-text-secondary" />
        <input
          type='text'
          className='outline-none text-sm h-8 w-full bg-transparent'
          placeholder='Full Name'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </motion.div>

      {/* Email */}
      <motion.div
        className='border border-border-color px-4 py-2 flex items-center gap-3 rounded-full mt-4 focus-within:ring-2 focus-within:ring-accent'
        variants={itemVariants}
      >
        <Mail size={20} className="text-text-secondary" />
        <input
          type='email'
          className='outline-none text-sm h-8 w-full bg-transparent'
          placeholder='Email ID'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </motion.div>

      {/* Password with toggle */}
      <motion.div
        className='border border-border-color px-4 py-2 flex items-center gap-3 rounded-full mt-4 focus-within:ring-2 focus-within:ring-accent'
        variants={itemVariants}
      >
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
      </motion.div>

      {/* Confirm Password */}
      <motion.div
        className='border border-border-color px-4 py-2 flex items-center gap-3 rounded-full mt-4 focus-within:ring-2 focus-within:ring-accent'
        variants={itemVariants}
      >
        <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input
          type={showPassword ? 'text' : 'password'}
          className='outline-none text-sm h-8 w-full bg-transparent'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </motion.div>

      {/* Google Auth Button (Placeholder for now) */}
      <motion.button
        type="button"
        className='bg-accent w-full text-white py-2 rounded-full mt-5 hover:bg-accent-dark transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'
        disabled={isLoading}
        variants={itemVariants}
      >
        Create Account with Google
      </motion.button>

      {/* Main Auth Button */}
      <motion.button
        type="submit"
        className='bg-primary w-full text-white py-2 rounded-full mt-3 hover:bg-primary-hover transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'
        disabled={isLoading}
        variants={itemVariants}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          'Create Account'
        )}
      </motion.button>

      {/* Link to Login */}
      <motion.p
        className='mt-5 text-center text-sm text-text-secondary'
        variants={itemVariants}
      >
        Already have an account?{' '}
        <span
          className='text-primary cursor-pointer hover:underline font-medium'
          onClick={() => navigate('/login')}
        >
          Login
        </span>
      </motion.p>
    </motion.form>
  );
};

export default SignUpForm;
