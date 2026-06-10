import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartCrack, ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md text-center space-y-6 glass-panel p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl"
      >
        <HeartCrack className="h-16 w-16 text-rose-500 mx-auto animate-bounce" />
        
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">404 Error</h1>
          <h2 className="text-lg font-bold text-slate-750 dark:text-slate-200">Clinical Record Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
            The page or patient chart you are searching for does not exist on our servers. 
            It may have been relocated or deleted.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all duration-300"
        >
          Return Home <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
