import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MailCheck, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'user@example.com';
  
  const [countdown, setCountdown] = useState(59);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerifyManually = () => {
    setVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setVerifying(false);
      navigate('/otp-verify', { state: { email, purpose: 'verification' } });
    }, 1800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-medical-50/50 via-teal-50/10 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl relative z-10 space-y-6 text-center"
      >
        <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-r from-medical-500 to-teal-500 text-white flex items-center justify-center shadow-md animate-bounce">
          <MailCheck className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Verify Your Email</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
            We dispatched a HIPAA verification request to <span className="text-medical-600 dark:text-medical-400 font-bold">{email}</span>. <br />
            Open your mail client and select the secure link to activate your portal.
          </p>
        </div>

        {verifying ? (
          <div className="space-y-3 py-6">
            <RefreshCw className="h-8 w-8 text-medical-500 animate-spin mx-auto" />
            <p className="text-xs text-slate-400 font-bold">Synchronizing medical databases...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleVerifyManually}
              className="w-full bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-2.5 rounded-xl shadow hover:shadow-md transition-all flex items-center justify-center gap-1"
            >
              Verify Manually via OTP Code <ArrowRight className="h-4.5 w-4.5" />
            </button>

            <div className="text-[11px] text-slate-400 font-semibold bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center">
              <span>Code expires in:</span>
              <span className="font-extrabold text-slate-750 dark:text-slate-200 font-mono">00:{countdown < 10 ? `0${countdown}` : countdown}</span>
            </div>
          </div>
        )}

        <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold pt-2 border-t border-slate-100 dark:border-slate-800/80">
          Didn't receive the verification email?{' '}
          <button 
            type="button" 
            disabled={countdown > 0}
            onClick={() => setCountdown(59)}
            className={`font-extrabold ${countdown > 0 ? 'text-slate-350 cursor-not-allowed' : 'text-medical-500 hover:underline'}`}
          >
            Resend Email Link
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
