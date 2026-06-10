import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate sending recovery link
    setTimeout(() => {
      // Redirect to OTP verification page to simulate entering recovery code sent to email
      navigate('/otp-verify', { state: { email, purpose: 'password_reset' } });
    }, 2800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-medical-50/50 via-teal-50/10 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl relative z-10 space-y-6"
      >
        <Link 
          to="/login"
          className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-850 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
        </Link>

        {/* Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-11 w-11 rounded-xl bg-gradient-to-r from-medical-500 to-teal-500 text-white flex items-center justify-center shadow-md">
            <HeartPulse className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Recover Password</h2>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Enter your email and we'll dispatch a secure recovery code to reset credentials.</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="h-12 w-12 border-4 border-medical-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-650 dark:text-slate-350 font-bold">
              Dispatching secure recovery code to <span className="text-medical-600 dark:text-medical-400">{email}</span>...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl pl-10 pr-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-2.5 rounded-xl shadow hover:shadow-md transition-all flex items-center justify-center gap-1"
            >
              Dispatch Recovery Code <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
