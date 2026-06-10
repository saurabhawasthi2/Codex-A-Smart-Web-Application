import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, Lock, HeartPulse, Check, 
  ArrowRight, ShieldCheck, ShieldAlert 
} from 'lucide-react';

const Register = () => {
  const { registerUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !phone || !password || !age) {
      setErrorMsg('Please populate all credential fields.');
      return;
    }

    if (!acceptTerms) {
      setErrorMsg('You must review and accept the HIPAA terms.');
      return;
    }

    // Trigger mock user registration
    registerUser({ name, email, phone, age: parseInt(age), gender });

    // Redirect to Email Verification code trigger page, passing email in state
    navigate('/verify-email', { state: { email } });
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
        className="max-w-md w-full glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl relative z-10 space-y-5"
      >
        {/* Title */}
        <div className="text-center space-y-1.5">
          <div className="mx-auto h-11 w-11 rounded-xl bg-gradient-to-r from-medical-500 to-teal-500 text-white flex items-center justify-center shadow-md">
            <HeartPulse className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Create Account</h2>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Join MediBook to connect with certified clinicians online.</p>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl pl-10 pr-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
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

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl pl-10 pr-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold"
                placeholder="+1 (555) 019-2834"
              />
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Age</label>
              <input
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold"
                placeholder="e.g. 30"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl pl-10 pr-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-855 dark:text-slate-200 font-semibold"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Checkbox HIPAA */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 rounded text-medical-500 focus:ring-medical-500 h-4 w-4 cursor-pointer accent-medical-500 shrink-0"
            />
            <label htmlFor="terms" className="text-[10px] text-slate-550 dark:text-slate-400 leading-normal font-semibold cursor-pointer select-none">
              I certify that I accept the MediBook{' '}
              <a href="#" className="text-medical-500 hover:underline">HIPAA Privacy Policy</a> and{' '}
              <a href="#" className="text-medical-500 hover:underline">Terms of Service</a>.
            </label>
          </div>

          {errorMsg && (
            <p className="text-[10px] text-rose-500 font-black bg-rose-50 dark:bg-rose-955/20 p-2 rounded-xl text-center flex items-center justify-center gap-1">
              <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0" /> {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-2.5 rounded-xl shadow hover:shadow-md transition-all duration-300 flex items-center justify-center gap-1"
          >
            Create Account <ArrowRight className="h-4.5 w-4.5" />
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 dark:text-slate-400 font-semibold border-t border-slate-200 dark:border-slate-800/80 pt-3">
          Already have an account?{' '}
          <Link to="/login" className="text-medical-500 font-extrabold hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
