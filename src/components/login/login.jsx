import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, X } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('Login');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form className='relative bg-card-background p-10 rounded-2xl text-text-primary w-full max-w-md shadow-2xl transition-all duration-300 border border-border-color/50'>

        {/* Heading */}
        <h1 className='text-center text-3xl font-bold text-text-primary mb-1'>
          {state}
        </h1>
        <p className='text-sm text-center mb-6 text-text-secondary'>
          Welcome back! Please sign in to continue
        </p>

        {/* Full Name (Sign Up Only) */}
        {state !== 'Login' && (
          <div className='border border-border-color px-4 py-2 flex items-center gap-3 rounded-full mt-2 focus-within:ring-2 focus-within:ring-accent'>
            <User size={20} className="text-text-secondary" />
            <input
              type='text'
              className='outline-none text-sm h-8 w-full bg-transparent'
              placeholder='Full Name'
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
          className='bg-accent w-full text-white py-2 rounded-full mt-5 hover:bg-accent-dark transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'
        >
          {state === 'Login' ? 'Login' : 'Create Account'} with Google
        </button>

        {/* Main Auth Button */}
        <button
          type="submit"
          className='bg-primary w-full text-white py-2 rounded-full mt-3 hover:bg-primary-hover transition-all duration-300 ease-in-out shadow-md hover:shadow-lg'
        >
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {/* Toggle between Login/Signup */}
        <p className='mt-5 text-center text-sm text-text-secondary'>
          {state === 'Login' ? (
            <>Don’t have an account?{' '}
              <span
                className='text-primary cursor-pointer hover:underline'
                onClick={() => setState('Sign Up')}
              >
                Sign up
              </span>
            </>
          ) : (
            <>Already have an account?{' '}
              <span
                className='text-primary cursor-pointer hover:underline'
                onClick={() => setState('Login')}
              >
                Login
              </span>
            </>
          )}
        </p>

        {/* Close button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className='absolute top-5 right-5 cursor-pointer text-text-secondary hover:text-red-500 transition'
        >
          <X size={22} />
        </button>
      </form>
    </div>
  );
};

export default Login;
