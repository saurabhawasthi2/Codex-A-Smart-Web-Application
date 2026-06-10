import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  ArrowLeft, Calendar, Clock, DollarSign, ShieldAlert,
  Ticket, Check, User, HeartPulse, Building
} from 'lucide-react';
import { motion } from 'framer-motion';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);
  const bookingParams = location.state;

  // Form Fields
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Male');
  const [reason, setReason] = useState('');
  
  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Form validation
  const [formError, setFormError] = useState('');

  // Sync current logged in user details
  useEffect(() => {
    if (currentUser && currentUser.role === 'patient') {
      setPatientName(currentUser.name || '');
      setPatientPhone(currentUser.phone || '');
      setPatientAge(currentUser.age || '');
      setPatientGender(currentUser.gender || 'Male');
    }
  }, [currentUser]);

  if (!bookingParams) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <ShieldAlert className="h-16 w-16 text-amber-500 mx-auto" />
        <h2 className="text-2xl font-black">No Booking Data Provided</h2>
        <p className="text-slate-500 text-xs font-semibold">Please select a doctor and appointment slot prior to entering checkout.</p>
        <Link to="/doctors" className="inline-block text-xs font-bold text-medical-500 hover:underline">
          Browse Doctors
        </Link>
      </div>
    );
  }

  const {
    doctorId, doctorName, doctorImage, specialty,
    fee, hospital, location: docLocation, selectedDay, selectedTime
  } = bookingParams;

  // Coupon Checker
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    if (couponCode.toUpperCase() === 'HEALTH20') {
      setDiscountPercent(20);
      setCouponSuccess('Coupon applied: 20% discount added!');
    } else {
      setCouponError('Invalid coupon code. Try HEALTH20.');
      setDiscountPercent(0);
    }
  };

  // Calculations
  const baseFee = fee;
  const discountAmount = Math.round((baseFee * discountPercent) / 100);
  const serviceFee = 5.00;
  const taxAmount = Math.round((baseFee - discountAmount) * 0.08); // 8% tax
  const totalAmount = baseFee - discountAmount + serviceFee + taxAmount;

  // Handle Checkout submission
  const handleSubmitCheckout = (e) => {
    e.preventDefault();
    setFormError('');

    if (!patientName || !patientPhone || !patientAge || !reason) {
      setFormError('Please fill out all patient information fields.');
      return;
    }

    // Go to Payment Gateway screen, passing booking details + calculations
    navigate('/payment', {
      state: {
        ...bookingParams,
        patientName,
        patientPhone,
        patientAge,
        patientGender,
        reason,
        baseFee,
        discountAmount,
        serviceFee,
        taxAmount,
        totalAmount,
        couponCode: discountPercent > 0 ? couponCode.toUpperCase() : ''
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4.5 w-4.5" /> Back to Profile
      </button>

      {/* Stepper Progress */}
      <div className="flex items-center justify-center max-w-xl mx-auto mb-10 text-xs font-extrabold text-slate-400">
        <div className="flex items-center gap-1.5 text-medical-600 dark:text-medical-400">
          <span className="h-6 w-6 rounded-full bg-medical-500 text-white flex items-center justify-center font-bold text-xs">1</span>
          <span>Fill Details</span>
        </div>
        <div className="h-0.5 w-16 bg-slate-200 dark:bg-slate-800 mx-3" />
        <div className="flex items-center gap-1.5">
          <span className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-450 flex items-center justify-center font-bold text-xs">2</span>
          <span>Payment Gateway</span>
        </div>
        <div className="h-0.5 w-16 bg-slate-200 dark:bg-slate-800 mx-3" />
        <div className="flex items-center gap-1.5">
          <span className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-450 flex items-center justify-center font-bold text-xs">3</span>
          <span>Invoice Success</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: APPOINTMENT DETAILS FORM */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Patient Consultation Details</h2>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Please provide the medical charts details for the consulting patient.</p>
            </div>

            <form onSubmit={handleSubmitCheckout} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold"
                    placeholder="Enter patient full name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold"
                    placeholder="e.g. +1 (555) 019-2834"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Patient Age</label>
                  <input
                    type="number"
                    required
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold"
                    placeholder="e.g. 32"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Biological Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Male', 'Female'].map((gender) => {
                      const isSelected = patientGender === gender;
                      return (
                        <button
                          key={gender}
                          type="button"
                          onClick={() => setPatientGender(gender)}
                          className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                            isSelected
                              ? 'border-medical-500 bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-400 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {gender}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Reason for Appointment / Symptoms</label>
                <textarea
                  required
                  rows="4"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold"
                  placeholder="Summarize your symptoms or reason for consulting the doctor (e.g. Chronic chest pain, follow-up on dermatology prescription)"
                />
              </div>

              {formError && (
                <p className="text-[10px] text-rose-500 font-black bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-xl text-center">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-3 rounded-xl shadow hover:shadow-lg transition-all duration-300"
              >
                Proceed to Payment Gateway
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: BOOKING SUMMARY & BILLING */}
        <div className="lg:col-span-1 space-y-6">
          {/* Doctor Brief Summary */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg space-y-4">
            <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80 pb-2">
              Appointment Summary
            </h3>

            <div className="flex gap-4 items-center">
              <img 
                src={doctorImage} 
                alt={doctorName} 
                className="h-14 w-14 rounded-2xl object-cover shadow border border-slate-200 dark:border-slate-800"
              />
              <div className="min-w-0">
                <span className="text-[8px] font-black uppercase tracking-wider bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-400 px-1.5 py-0.5 rounded">
                  {specialty}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1 truncate">{doctorName}</h4>
                <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-0.5 truncate"><Building className="h-3 w-3" /> {hospital}</p>
              </div>
            </div>

            <div className="border-t border-b border-slate-100 dark:border-slate-800/85 py-3 space-y-2 text-xs font-semibold text-slate-650 dark:text-slate-350">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-slate-400" /> Day Chosen</span>
                <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedDay}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-slate-400" /> Hourly Slot</span>
                <span className="font-extrabold text-slate-800 dark:text-slate-200">{selectedTime}</span>
              </div>
            </div>
          </div>

          {/* Coupon Code section */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg space-y-4">
            <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-xs uppercase tracking-wider flex items-center gap-1">
              <Ticket className="h-4 w-4 text-medical-500" /> Promo Coupons
            </h3>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Code: HEALTH20"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-250 dark:border-slate-800/80 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-medical-500 font-black uppercase text-slate-800 dark:text-slate-100"
              />
              <button
                type="submit"
                className="bg-slate-850 dark:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-slate-750 transition-colors shrink-0 flex items-center justify-center"
              >
                Apply
              </button>
            </form>
            {couponError && <p className="text-[9px] text-rose-500 font-bold italic">{couponError}</p>}
            {couponSuccess && <p className="text-[9px] text-emerald-600 dark:text-emerald-500 font-bold flex items-center gap-0.5"><Check className="h-3 w-3" /> {couponSuccess}</p>}
          </div>

          {/* Billing Breakdown */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg space-y-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80 pb-2">
              Billing Breakdown
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Base Consultation Cost</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">${baseFee}.00</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-500">
                  <span>Coupon Discount ({discountPercent}%)</span>
                  <span>-${discountAmount}.00</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>App Platform Charge</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Local Health Taxes (8%)</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">${taxAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between items-center text-sm font-extrabold text-slate-900 dark:text-white">
              <span>Total Charge</span>
              <span className="text-xl font-black text-medical-600 dark:text-medical-400">${totalAmount}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
