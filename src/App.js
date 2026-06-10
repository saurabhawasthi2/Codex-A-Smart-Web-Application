import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorProfile from './pages/DoctorProfile';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import OtpVerification from './pages/Auth/OtpVerification';
import EmailVerification from './pages/Auth/EmailVerification';
import UserDashboard from './pages/Dashboard/UserDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import NotificationSim from './pages/Notifications/NotificationSim';
import NotFound from './pages/NotFound';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Smartphone, Bell, X } from 'lucide-react';
import './App.css';

// Layout component to include Navbar, Footer, and active notifications toast
const AppLayout = () => {
  const { activeToastNotification, setActiveToastNotification } = useContext(AppContext);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verify" element={<OtpVerification />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/notifications" element={<NotificationSim />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />

      {/* Floating Global Toast Notification for simulated Emails/SMS */}
      <AnimatePresence>
        {activeToastNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl p-4 flex gap-3.5 items-start justify-between"
          >
            <div className="h-9 w-9 rounded-xl bg-medical-500 text-white flex items-center justify-center shrink-0 shadow-md">
              {activeToastNotification.type === 'email' ? <Mail className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex justify-between items-center text-[8px] font-black uppercase text-slate-400">
                <span>SIMULATED {activeToastNotification.type}</span>
                <span>JUST NOW</span>
              </div>
              <p className="font-extrabold text-xs truncate text-white">{activeToastNotification.title}</p>
              <p className="text-[10px] text-slate-350 leading-relaxed line-clamp-2">{activeToastNotification.message}</p>
              
              <Link 
                to="/notifications" 
                onClick={() => setActiveToastNotification(null)}
                className="inline-block text-[9px] text-medical-400 hover:underline font-extrabold"
              >
                Inspect Visual Mockup Frame
              </Link>
            </div>

            <button 
              onClick={() => setActiveToastNotification(null)}
              className="text-slate-500 hover:text-slate-300 transition-colors shrink-0 p-0.5"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout />
      </Router>
    </AppProvider>
  );
}

export default App;
