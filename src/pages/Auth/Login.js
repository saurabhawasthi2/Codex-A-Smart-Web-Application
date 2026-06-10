import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
  Mail, Lock, ShieldAlert, ArrowRight, Eye, EyeOff,
  User, Shield, HeartPulse
} from 'lucide-react';

const Login = () => {
  const { loginUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); // 'patient' or 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please input your credentials.');
      return;
    }

    try {
      const loggedUser = loginUser(email, password, role);
      if (loggedUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMsg('Invalid login details.');
    }
  };

  // Quick Sign In Helpers
  const handleQuickLogin = (selectedRole) => {
    if (selectedRole === 'admin') {
      loginUser('admin@healthcare.com', 'admin123', 'admin');
      navigate('/admin');
    } else {
      loginUser('john.doe@example.com', 'patient123', 'patient');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-medical-50/50 via-teal-50/10 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 h-64 w-64 bg-medical-500/5 rounded-full blur-3xl pulse-glow" />
        <div className="absolute bottom-10 right-10 h-64 w-64 bg-teal-500/5 rounded-full blur-3xl pulse-glow" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl relative z-10 space-y-6"
      >
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-r from-medical-500 to-teal-500 text-white flex items-center justify-center shadow-md">
            <HeartPulse className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Welcome Back</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Sign in to book doctor visits and view medical prescriptions.</p>
        </div>

        {/* Role Tab Selector */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setRole('patient')}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'patient'
                ? 'bg-white dark:bg-slate-800 text-medical-600 dark:text-medical-400 shadow'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-250'
            }`}
          >
            <User className="h-4 w-4" /> Patient
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'admin'
                ? 'bg-white dark:bg-slate-800 text-medical-600 dark:text-medical-400 shadow'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-250'
            }`}
          >
            <Shield className="h-4 w-4" /> Admin
          </button>
        </div>

        {/* Login form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
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

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold">
              <label className="text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
              <Link to="/forgot-password" className="text-medical-500 hover:underline capitalize font-bold">Forgot Password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl pl-10 pr-10 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-650"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <p className="text-[10px] text-rose-500 font-black bg-rose-50 dark:bg-rose-955/20 p-2.5 rounded-xl text-center flex items-center justify-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0" /> {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-2.5 rounded-xl shadow hover:shadow-md transition-all duration-300 flex items-center justify-center gap-1"
          >
            Sign In <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </form>

        {/* DEMO SIGN IN TRIGGERS */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 pt-4 space-y-3">
          <p className="text-[9px] text-center text-slate-455 font-bold uppercase tracking-wider">Fast Demo Accounts Login</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('patient')}
              className="py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl text-[10px] font-bold text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-1 shadow-sm"
            >
              <User className="h-3.5 w-3.5 text-medical-500" /> Patient Demo
            </button>
            <button
              onClick={() => handleQuickLogin('admin')}
              className="py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl text-[10px] font-bold text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-1 shadow-sm"
            >
              <Shield className="h-3.5 w-3.5 text-amber-500" /> Admin Demo
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400 font-semibold">
          Don't have an account?{' '}
          <Link to="/signup" className="text-medical-500 font-extrabold hover:underline">
            Register Here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
