import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CreditCard, Wallet, Smartphone, Landmark,
  ShieldCheck, ShieldAlert, CheckCircle2, Clock, XCircle,
  Download, ExternalLink, Calendar, HeartPulse, Building
} from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookAppointment } = useContext(AppContext);
  const checkoutDetails = location.state;

  // Checkout Options: 'upi', 'card', 'netbanking', 'wallet'
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Status Gateways: 'select', 'processing', 'success', 'failure', 'pending'
  const [paymentStatus, setPaymentStatus] = useState('select');

  // Input states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('Paytm');
  const [selectedBank, setSelectedBank] = useState('Chase Bank');

  // Transaction Receipt details (populated upon success)
  const [receipt, setReceipt] = useState(null);

  if (!checkoutDetails) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <ShieldAlert className="h-16 w-16 text-amber-500 mx-auto" />
        <h2 className="text-2xl font-black">Checkout Data Missing</h2>
        <p className="text-slate-500 text-xs font-semibold">Please select a doctor and complete the patient forms prior to entering the payment gateway.</p>
        <Link to="/doctors" className="inline-block text-xs font-bold text-medical-500 hover:underline">
          Return to Browse Doctors
        </Link>
      </div>
    );
  }

  const {
    doctorId, doctorName, doctorImage, specialty,
    hospital, selectedDay, selectedTime, totalAmount,
    patientName, patientPhone, patientAge, patientGender, reason
  } = checkoutDetails;

  // Handles simulated submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus('processing');

    // Simulate bank authorization (3.5 seconds delay)
    setTimeout(() => {
      // 85% success, 10% pending, 5% failure simulation based on card inputs or random selection
      const rand = Math.random();
      
      // Let user cause manual failure by inputting "0000" in CVV or "fail" in UPI
      if (cardCvv === '000' || upiId.toLowerCase() === 'fail@upi') {
        setPaymentStatus('failure');
        return;
      }

      if (cardCvv === '999') {
        setPaymentStatus('pending');
        return;
      }

      if (rand < 0.1) {
        setPaymentStatus('pending');
      } else if (rand < 0.15) {
        setPaymentStatus('failure');
      } else {
        // SUCCESS
        const bookedReceipt = bookAppointment({
          doctorId,
          doctorName,
          doctorImage,
          specialty,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          day: selectedDay,
          time: selectedTime,
          hospital,
          patientName,
          patientPhone,
          patientAge,
          reason,
          fee: totalAmount,
          paymentMethod: paymentMethod.toUpperCase()
        });

        setReceipt(bookedReceipt);
        setPaymentStatus('success');
      }
    }, 3200);
  };

  // Mock Invoice Downloader (saves text content as a download file)
  const downloadReceiptInvoice = () => {
    if (!receipt) return;
    const invoiceText = `
=========================================
          MEDIBOOK HEALTHCARE GROUP
             INVOICE RECEIPT
=========================================
Invoice Date:    ${receipt.date}
Invoice ID:      INV-${receipt.id}
Transaction ID:  ${receipt.transactionId}
Payment Status:  PAID
Payment Method:  ${receipt.paymentMethod}
-----------------------------------------
PATIENT CHART DETAILS:
Patient Name:    ${receipt.patientName}
Mobile Number:   ${receipt.patientPhone}
Biological Age:  ${receipt.patientAge}
Gender:          ${patientGender}
Symptoms/Reason: ${receipt.reason}
-----------------------------------------
CONSULTATION DETAILS:
Doctor Name:     ${receipt.doctorName}
Specialization:  ${receipt.specialty}
Facility/Clinic: ${receipt.hospital}
Schedule Time:   ${receipt.day}, ${receipt.time}
-----------------------------------------
BILLING STATEMENTS:
Platform Base:   $${checkoutDetails.baseFee}.00
Tax charges:     $${checkoutDetails.taxAmount}.00
Service Fees:    $${checkoutDetails.serviceFee}.00
Coupon discount: -$${checkoutDetails.discountAmount}.00
-----------------------------------------
TOTAL CHARGE:    $${receipt.fee}.00
=========================================
Thank you for booking with MediBook!
Contact support@medibook-health.com for refunds.
`;
    const element = document.createElement('a');
    const file = new Blob([invoiceText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `MediBook_Invoice_${receipt.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 transition-colors duration-300">
      
      {/* 1. SELECTION STATE SCREEN */}
      {paymentStatus === 'select' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Secure Payments Gateway</h2>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Amount payable: <span className="text-medical-500 font-extrabold">${totalAmount}.00</span></p>
            </div>
            <ShieldCheck className="h-8 w-8 text-medical-500 shrink-0" />
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center justify-center text-[10px] font-extrabold text-slate-400">
            <div className="flex items-center gap-1">
              <span className="h-4.5 w-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[9px]">✓</span>
              <span>Details</span>
            </div>
            <div className="h-0.5 w-10 bg-emerald-500 mx-2" />
            <div className="flex items-center gap-1 text-medical-600 dark:text-medical-400">
              <span className="h-4.5 w-4.5 rounded-full bg-medical-500 text-white flex items-center justify-center font-bold text-[9px]">2</span>
              <span>Payment Gateway</span>
            </div>
            <div className="h-0.5 w-10 bg-slate-200 dark:bg-slate-800 mx-2" />
            <div className="flex items-center gap-1">
              <span className="h-4.5 w-4.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-450 flex items-center justify-center font-bold text-[9px]">3</span>
              <span>Success</span>
            </div>
          </div>

          {/* Checkout Modes grid selector */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'card', label: 'Card', icon: CreditCard },
              { id: 'upi', label: 'UPI', icon: Smartphone },
              { id: 'netbanking', label: 'Bank', icon: Landmark },
              { id: 'wallet', label: 'Wallet', icon: Wallet }
            ].map((method) => {
              const isSelected = paymentMethod === method.id;
              const IconComp = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`py-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    isSelected
                      ? 'border-medical-500 bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <IconComp className="h-5 w-5 shrink-0" />
                  <span className="text-[9px] font-bold">{method.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            
            {/* CARD MODE INPUTS */}
            {paymentMethod === 'card' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3.5">
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Card Number</label>
                  <input
                    type="text"
                    required
                    pattern="\d{16}"
                    maxLength="16"
                    placeholder="1234567890123456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-mono font-bold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-850 dark:text-slate-200 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">CVV (000 for fail, 999 for pending)</label>
                    <input
                      type="password"
                      required
                      pattern="\d{3}"
                      maxLength="3"
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-850 dark:text-slate-200 font-mono font-bold"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* UPI MODE INPUTS */}
            {paymentMethod === 'upi' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">UPI ID (VPA) / Enter 'fail@upi' to test failure</label>
                  <input
                    type="text"
                    required
                    placeholder="john.doe@okaxis"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-bold"
                  />
                </div>
              </motion.div>
            )}

            {/* NETBANKING MODE INPUTS */}
            {paymentMethod === 'netbanking' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Select Bank Authority</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-medical-500 text-slate-800 dark:text-slate-200 font-bold cursor-pointer"
                  >
                    <option value="Chase Bank">Chase Bank</option>
                    <option value="Bank of America">Bank of America</option>
                    <option value="Wells Fargo">Wells Fargo</option>
                    <option value="CitiBank">CitiBank</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* WALLET MODE INPUTS */}
            {paymentMethod === 'wallet' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Choose Wallet Provider</label>
                  <select
                    value={selectedWallet}
                    onChange={(e) => setSelectedWallet(e.target.value)}
                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-medical-500 text-slate-850 dark:text-slate-200 font-bold cursor-pointer"
                  >
                    <option value="Apple Pay">Apple Pay</option>
                    <option value="Google Pay">Google Pay</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Paytm Wallet">Paytm Wallet</option>
                  </select>
                </div>
              </motion.div>
            )}

            <div className="text-[10px] text-slate-400 font-semibold bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 flex gap-2 items-start leading-relaxed">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Payments are secured with SSL 256-bit TLS encryption. Transaction triggers will update your appointments database globally.</span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-1/3 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl text-slate-650 dark:text-slate-350 text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-2/3 bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-all duration-300"
              >
                Pay & Finalize Slot
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* 2. PROCESSING STATE SCREEN */}
      {paymentStatus === 'processing' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel p-10 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl text-center space-y-6"
        >
          <div className="h-16 w-16 border-4 border-medical-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Authorizing Payment...</h3>
            <p className="text-xs text-slate-550 dark:text-slate-400 font-medium">Please do not refresh the browser or click the back trigger. We are verifying credentials with your bank gateway.</p>
          </div>
        </motion.div>
      )}

      {/* 3. SUCCESS STATE SCREEN */}
      {paymentStatus === 'success' && receipt && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl space-y-6"
        >
          <div className="text-center space-y-2">
            <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto animate-bounce" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Appointment Confirmed!</h2>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-extrabold bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 rounded-full inline-block">Transaction ID: {receipt.transactionId}</p>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center justify-center text-[10px] font-extrabold text-slate-400">
            <div className="flex items-center gap-1">
              <span className="h-4.5 w-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[9px]">✓</span>
              <span>Details</span>
            </div>
            <div className="h-0.5 w-10 bg-emerald-500 mx-2" />
            <div className="flex items-center gap-1">
              <span className="h-4.5 w-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[9px]">✓</span>
              <span>Payment</span>
            </div>
            <div className="h-0.5 w-10 bg-emerald-500 mx-2" />
            <div className="flex items-center gap-1 text-medical-600 dark:text-medical-400">
              <span className="h-4.5 w-4.5 rounded-full bg-medical-500 text-white flex items-center justify-center font-bold text-[9px]">✓</span>
              <span>Success</span>
            </div>
          </div>

          {/* Brief Receipt Info Box */}
          <div className="border border-slate-100 dark:border-slate-850 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-900/40 space-y-3 text-xs font-semibold text-slate-650 dark:text-slate-350">
            <div className="flex justify-between items-center">
              <span>Patient Name:</span>
              <span className="font-extrabold text-slate-850 dark:text-slate-150">{receipt.patientName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Doctor / Specialist:</span>
              <span className="font-extrabold text-slate-850 dark:text-slate-150">{receipt.doctorName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Clinic / Hospital:</span>
              <span className="font-extrabold text-slate-850 dark:text-slate-150">{receipt.hospital}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Time Scheduled:</span>
              <span className="font-extrabold text-medical-650 dark:text-medical-400">{receipt.day}, {receipt.time}</span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-200/50 dark:border-slate-800 pt-2 font-extrabold text-slate-900 dark:text-white">
              <span>Amount Paid:</span>
              <span>${receipt.fee}.00</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={downloadReceiptInvoice}
              className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-2.5 rounded-xl shadow-sm transition-all"
            >
              <Download className="h-4.5 w-4.5" /> Download PDF-Style Invoice
            </button>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/dashboard"
                className="py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 font-bold text-center text-xs rounded-xl flex items-center justify-center gap-1 transition-all"
              >
                Go to Dashboard <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/"
                className="py-2.5 bg-slate-850 dark:bg-slate-850 hover:bg-slate-750 text-white font-bold text-center text-xs rounded-xl flex items-center justify-center transition-colors"
              >
                Book Another Visit
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* 4. PENDING STATE SCREEN */}
      {paymentStatus === 'pending' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl text-center space-y-6"
        >
          <Clock className="h-16 w-16 text-amber-500 mx-auto animate-pulse" />
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Authorization Pending...</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              We are waiting for authorization confirmation from your bank or provider. 
              Usually this resolves within 5 minutes. Check your email alerts for validation.
            </p>
          </div>

          <div className="border border-slate-100 dark:border-slate-850 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/40 text-xs font-semibold text-slate-600 dark:text-slate-400 flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Patient Name:</span>
              <span className="font-bold text-slate-850 dark:text-slate-200">{patientName}</span>
            </div>
            <div className="flex justify-between">
              <span>Specialist Doctor:</span>
              <span className="font-bold text-slate-850 dark:text-slate-200">{doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Charge:</span>
              <span className="font-bold text-slate-850 dark:text-slate-200">${totalAmount}.00</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPaymentStatus('select')}
              className="w-1/2 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
            >
              Try Another Mode
            </button>
            <Link
              to="/dashboard"
              className="w-1/2 py-2.5 bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs rounded-xl flex items-center justify-center"
            >
              Check My Dashboard
            </Link>
          </div>
        </motion.div>
      )}

      {/* 5. FAILURE STATE SCREEN */}
      {paymentStatus === 'failure' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl text-center space-y-6"
        >
          <XCircle className="h-16 w-16 text-rose-500 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-xl font-black text-rose-600 dark:text-rose-500">Transaction Failed</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
              We encountered an authorization failure. This can occur due to insufficient funds, 
              incorrect CVV numbers, or generic banking communication outages.
            </p>
          </div>

          <div className="border border-slate-100 dark:border-slate-850 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/40 text-xs font-semibold text-slate-600 dark:text-slate-400 flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Failure Code:</span>
              <span className="font-extrabold text-rose-600 dark:text-rose-500 font-mono">AUTH_ERR_GATEWAY_302</span>
            </div>
            <div className="flex justify-between">
              <span>Doctor Target:</span>
              <span className="font-bold text-slate-850 dark:text-slate-200">{doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Charge:</span>
              <span className="font-bold text-slate-850 dark:text-slate-200">${totalAmount}.00</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPaymentStatus('select')}
              className="w-1/2 py-2.5 border border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-350 font-bold text-xs rounded-xl"
            >
              Retry Payment
            </button>
            <Link
              to="/doctors"
              className="w-1/2 py-2.5 bg-slate-850 dark:bg-slate-800 text-white font-bold text-center text-xs rounded-xl flex items-center justify-center"
            >
              Choose Other Doctor
            </Link>
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default Payment;
