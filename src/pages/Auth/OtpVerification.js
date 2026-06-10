import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartPulse, KeyRound, ArrowRight, ShieldAlert } from 'lucide-react';

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'user@example.com';
  const purpose = location.state?.purpose || 'verification';

  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [verifying, setVerifying] = useState(false);

  // Auto-focus next field helper
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const fullOtp = otp.join('');

    if (fullOtp.length < 4) {
      setErrorMsg('Please enter all 4 digits.');
      return;
    }

    setVerifying(true);

    // Simulate OTP server check (2 seconds)
    setTimeout(() => {
      setVerifying(false);
      // Demo validation code: '1234'
      if (fullOtp === '1234' || fullOtp === '0000') {
        setSuccessMsg('Security code verified successfully!');
        setTimeout(() => {
          if (purpose === 'password_reset') {
            // Password reset success -> Login page
            navigate('/login');
          } else {
            // Register flow -> Dashboard page
            navigate('/dashboard');
          }
        }, 1500);
      } else {
        setErrorMsg('Invalid code entered. Enter 1234 or 0000.');
      }
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-medical-50/50 via-teal-50/10 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl relative z-10 space-y-6"
      >
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-11 w-11 rounded-xl bg-gradient-to-r from-medical-500 to-teal-500 text-white flex items-center justify-center shadow-md">
            <KeyRound className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">OTP Verification</h2>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
            We dispatched a 4-digit code to <span className="text-medical-600 dark:text-medical-400">{email}</span>. <br />
            Enter it below (Use demo code: <span className="font-extrabold text-medical-600 dark:text-medical-400">1234</span>).
          </p>
        </div>

        {verifying ? (
          <div className="text-center space-y-4 py-6">
            <div className="h-12 w-12 border-4 border-medical-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-550 dark:text-slate-450 font-bold">Verifying security token...</p>
          </div>
        ) : (
          <form onSubmit={handleVerifyOtpSubmit} className="space-y-6">
            {/* Code Inputs row */}
            <div className="flex justify-center gap-3">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="h-14 w-12 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-center text-xl font-black focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-900 dark:text-white"
                />
              ))}
            </div>

            {errorMsg && (
              <p className="text-[10px] text-rose-500 font-black bg-rose-50 dark:bg-rose-955/20 p-2.5 rounded-xl text-center flex items-center justify-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0" /> {errorMsg}
              </p>
            )}

            {successMsg && (
              <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-black bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-xl text-center flex items-center justify-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" /> {successMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-2.5 rounded-xl shadow hover:shadow-md transition-all flex items-center justify-center gap-1"
            >
              Verify Code <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </form>
        )}

        <div className="text-xs text-center text-slate-500 dark:text-slate-400 font-semibold pt-2 border-t border-slate-100 dark:border-slate-800/80">
          Didn't receive the SMS code?{' '}
          <button 
            type="button" 
            onClick={() => { setOtp(['', '', '', '']); setSuccessMsg('OTP Code re-sent successfully!'); }}
            className="text-medical-500 font-extrabold hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpVerification;
