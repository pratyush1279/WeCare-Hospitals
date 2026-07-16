import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Mail, Lock, User, Phone, CalendarDays, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

interface AuthPanelProps {
  onSuccess?: () => void;
  message?: string;
}

export default function AuthPanel({ onSuccess, message }: AuthPanelProps) {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Validation
        if (!name.trim()) throw new Error('Full name is required.');
        if (!email.trim()) throw new Error('Email address is required.');
        if (!password || password.length < 6) throw new Error('Password must be at least 6 characters.');
        if (!phone.trim()) throw new Error('Phone number is required.');
        if (!age || parseInt(age) <= 0) throw new Error('Please enter a valid age.');

        await signUp(email, password, name, phone, parseInt(age));
      } else {
        const emailClean = email.trim();
        if (!emailClean) throw new Error('Email address is required.');
        if (!password) throw new Error('Password is required.');

        const ADMIN_EMAILS = ['pratyushpatwal7629@gmail.com', 'pratyushpatwal@gmail.com'];
        const DEFAULT_ADMIN_PASSWORD = '00000000';

        try {
          await signIn(emailClean, password);
        } catch (signInErr: any) {
          if (ADMIN_EMAILS.includes(emailClean) && password === DEFAULT_ADMIN_PASSWORD) {
            console.log("Predefined admin user not found in AuthPanel; automatically provisioning admin user...");
            await signUp(emailClean, DEFAULT_ADMIN_PASSWORD, 'Clinical Admin', '9999999999', 35);
          } else {
            throw signInErr;
          }
        }
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error(err);
      let errMsg = err.message || 'An error occurred during authentication.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errMsg = 'Invalid email address or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        errMsg = 'This email address is already registered.';
      } else if (err.code === 'auth/invalid-email') {
        errMsg = 'Please enter a valid email address.';
      } else if (err.code === 'auth/weak-password') {
        errMsg = 'Password is too weak. Please use at least 6 characters.';
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-slate-100 rounded-3xl shadow-xl p-8 sm:p-10 space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto h-12 w-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shadow-inner">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {isSignUp ? 'Create Admin / Patient Account' : 'Admin Portal Sign In'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          {message || (isSignUp 
            ? 'Sign up to safely book and access medical appointments.' 
            : 'Access the administrative tools or schedule patient care instantly.')}
        </p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start space-x-3 text-rose-800">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
          <p className="text-xs sm:text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-150 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-150 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                  Age
                </label>
                <div className="relative">
                  <CalendarDays className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="number"
                    placeholder="35"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-150 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    required
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="email"
              placeholder="patient@wecare.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-150 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-150 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 px-4 rounded-2xl shadow-lg shadow-teal-600/10 hover:shadow-teal-600/20 transition-all duration-200 flex items-center justify-center space-x-2 mt-2 disabled:opacity-75 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Please wait...</span>
            </>
          ) : (
            <span>{isSignUp ? 'Register & Continue' : 'Sign In'}</span>
          )}
        </button>
      </form>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-100"></div>
        <span className="flex-shrink mx-4 text-slate-400 text-xs font-medium font-mono uppercase">Or</span>
        <div className="flex-grow border-t border-slate-100"></div>
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError('');
          }}
          className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
