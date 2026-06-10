import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Sidebar from '../../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, CreditCard, Clipboard, User, Bell, LogOut,
  Clock, ShieldAlert, PlusCircle, CheckCircle, FileText,
  MapPin, Phone, Info, Eye, Download, ShieldCheck
} from 'lucide-react';

const UserDashboard = () => {
  const { 
    currentUser, setCurrentUser, appointments, cancelAppointment,
    notifications, clearNotification, markAllNotificationsRead, logoutUser 
  } = useContext(AppContext);
  const navigate = useNavigate();

  // Tab state
  const [activeTab, setActiveTab] = useState('overview');

  // Profile Edit fields
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [age, setAge] = useState(currentUser?.age || '');
  const [bloodGroup, setBloodGroup] = useState(currentUser?.bloodGroup || 'O+');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [profileSuccess, setProfileSuccess] = useState('');

  if (!currentUser || currentUser.role !== 'patient') {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <ShieldAlert className="h-16 w-16 text-amber-500 mx-auto" />
        <h2 className="text-2xl font-black">Unauthorized Access</h2>
        <p className="text-slate-500 text-xs font-semibold">Please sign in as a Patient to load your medical dashboard.</p>
        <Link to="/login" className="inline-block text-xs font-bold text-medical-500 hover:underline">
          Go to Sign In
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const handleProfileUpdateSubmit = (e) => {
    e.preventDefault();
    setProfileSuccess('');
    const updatedUser = {
      ...currentUser,
      name,
      phone,
      age: parseInt(age),
      bloodGroup,
      address
    };
    setCurrentUser(updatedUser);
    setProfileSuccess('Profile charts updated successfully!');
    setTimeout(() => setProfileSuccess(''), 4000);
  };

  // Mock Invoice Downloader helper
  const triggerInvoiceDownload = (appt) => {
    const invoiceText = `
=========================================
          MEDIBOOK HEALTHCARE GROUP
             INVOICE RECEIPT
=========================================
Invoice Date:    ${appt.date}
Invoice ID:      INV-${appt.id}
Transaction ID:  ${appt.transactionId}
Payment Status:  PAID
Payment Method:  ${appt.paymentMethod || 'CREDIT CARD'}
-----------------------------------------
PATIENT CHART DETAILS:
Patient Name:    ${appt.patientName}
Mobile Number:   ${appt.patientPhone}
Biological Age:  ${appt.patientAge}
Gender:          ${currentUser.gender}
Symptoms/Reason: ${appt.reason}
-----------------------------------------
CONSULTATION DETAILS:
Doctor Name:     ${appt.doctorName}
Specialization:  ${appt.specialty}
Facility/Clinic: ${appt.hospital}
Schedule Time:   ${appt.day}, ${appt.time}
-----------------------------------------
BILLING TOTAL CHARGE:  $${appt.fee}.00
=========================================
`;
    const element = document.createElement('a');
    const file = new Blob([invoiceText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `MediBook_Invoice_${appt.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Mock Prescription Downloader
  const triggerPrescriptionDownload = (rx) => {
    const rxText = `
=========================================
          MEDIBOOK HEALTHCARE GROUP
             MEDICAL PRESCRIPTION
=========================================
Date issued:      ${rx.date}
Prescription ID:  RX-${rx.id}
-----------------------------------------
PATIENT CHART DETAILS:
Patient Name:    ${currentUser.name}
Biological Age:  ${currentUser.age}
Gender:          ${currentUser.gender}
Blood Group:     ${currentUser.bloodGroup || 'O+'}
-----------------------------------------
PRESCRIBING DOCTOR:
Doctor Name:     ${rx.doctorName}
Specialization:  ${rx.specialty}
-----------------------------------------
RX THERAPEUTIC REGIMEN:
Medicine:        ${rx.medicine}
Dosage Rate:     ${rx.dosage}
Duration Count:  ${rx.duration}
-----------------------------------------
Verification Seal: SECURE ELECTRONIC SIGNATURE
=========================================
`;
    const element = document.createElement('a');
    const file = new Blob([rxText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `MediBook_Prescription_${rx.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Sidebar Menu Items config
  const patientMenuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: 'Grid' },
    { id: 'upcoming', label: 'Upcoming Visits', icon: 'Calendar' },
    { id: 'history', label: 'Consultation History', icon: 'Clock' },
    { id: 'prescriptions', label: 'My Prescriptions', icon: 'Clipboard' },
    { id: 'payments', label: 'Payments & Invoices', icon: 'CreditCard' },
    { id: 'profile', label: 'Edit Profile', icon: 'User' },
    { id: 'alerts', label: 'Notification Inbox', icon: 'Bell' }
  ];

  // Calculated variables
  const userAppointments = appointments.filter(a => a.patientPhone === currentUser.phone || a.patientName === currentUser.name);
  const upcomingAppts = userAppointments.filter(a => a.status === 'Confirmed');
  const pastAppts = userAppointments.filter(a => a.status === 'Completed' || a.status === 'Cancelled');
  const paidAppts = userAppointments.filter(a => a.paymentStatus === 'Paid');
  const totalSpent = paidAppts.reduce((sum, a) => sum + a.fee, 0);

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300 min-h-[calc(100vh-4rem)]">
      
      {/* Collapsible Sidebar */}
      <Sidebar 
        menuItems={patientMenuItems} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        title="Patient Panel"
        userName={currentUser.name}
        avatar={currentUser.avatar}
        onLogout={handleLogout}
      />

      {/* Main Panel Content Container */}
      <main className="flex-1 p-6 sm:p-8 max-w-5xl overflow-y-auto h-[calc(100vh-4rem)]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Slogan Banner */}
              <div className="bg-gradient-to-r from-medical-600 to-teal-500 p-6 rounded-3xl text-white shadow-md relative overflow-hidden flex flex-col justify-between h-36">
                <div className="absolute right-0 bottom-0 h-44 w-44 bg-white/5 rounded-full blur-2xl" />
                <h2 className="text-xl sm:text-2xl font-black">Welcome back, {currentUser.name}!</h2>
                <p className="text-[10px] sm:text-xs text-white/90 font-medium">Keep track of your healthcare appointments and download prescription charts directly from this page.</p>
              </div>

              {/* Counters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Upcoming Visits</p>
                    <p className="text-2xl font-black text-slate-850 dark:text-white">{upcomingAppts.length}</p>
                  </div>
                  <div className="h-10 w-10 bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-400 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>

                <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Prescriptions Issued</p>
                    <p className="text-2xl font-black text-slate-850 dark:text-white">{currentUser.prescriptions.length}</p>
                  </div>
                  <div className="h-10 w-10 bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <Clipboard className="h-5 w-5" />
                  </div>
                </div>

                <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Fees Paid</p>
                    <p className="text-2xl font-black text-slate-850 dark:text-white">${totalSpent}.00</p>
                  </div>
                  <div className="h-10 w-10 bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                    <CreditCard className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Splits Grid (Quick Appt, Recent Alerts) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Upcoming Visit Brief */}
                <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm space-y-4">
                  <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80 pb-2">
                    Next Consultation Scheduled
                  </h3>
                  {upcomingAppts.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs space-y-2">
                      <Calendar className="h-8 w-8 mx-auto text-slate-350" />
                      <p>No upcoming visits scheduled.</p>
                      <Link to="/doctors" className="inline-block text-xs font-bold text-medical-500 hover:underline">Book a doctor visit now</Link>
                    </div>
                  ) : (
                    <div className="flex gap-4 items-center">
                      <img 
                        src={upcomingAppts[0].doctorImage} 
                        alt={upcomingAppts[0].doctorName}
                        className="h-14 w-14 rounded-xl object-cover border border-slate-200 dark:border-slate-850 shadow" 
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="text-[8px] bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-400 px-1.5 py-0.5 rounded font-black uppercase">
                          {upcomingAppts[0].specialty}
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{upcomingAppts[0].doctorName}</h4>
                        <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-0.5"><Building className="h-3 w-3" /> {upcomingAppts[0].hospital}</p>
                        <p className="text-[10px] text-medical-600 dark:text-medical-400 font-extrabold flex items-center gap-0.5">
                          <Clock className="h-3 w-3 animate-pulse" /> {upcomingAppts[0].day}, {upcomingAppts[0].time}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recent Notifications Inbox */}
                <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm space-y-4">
                  <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80 pb-2">
                    Recent System Updates
                  </h3>
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs">No notifications yet.</div>
                  ) : (
                    <div className="space-y-2 max-h-36 overflow-y-auto scrollbar-none">
                      {notifications.slice(0, 3).map((notif) => (
                        <div key={notif.id} className="p-2 border border-slate-100 dark:border-slate-850 bg-slate-50/30 dark:bg-slate-900/10 rounded-xl flex justify-between items-start text-[10px]">
                          <div className="space-y-0.5 min-w-0 pr-2">
                            <p className="font-bold text-slate-800 dark:text-slate-250 truncate">{notif.title}</p>
                            <p className="text-slate-500 dark:text-slate-400 line-clamp-1">{notif.message}</p>
                          </div>
                          <span className="text-[8px] text-slate-400 font-bold shrink-0">{notif.date.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: UPCOMING VISITS */}
          {activeTab === 'upcoming' && (
            <motion.div key="upcoming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Active Consultations</h2>
              {upcomingAppts.length === 0 ? (
                <div className="text-center py-16 border border-slate-150 dark:border-slate-850 rounded-2xl p-6 text-slate-400 text-xs space-y-3">
                  <Calendar className="h-10 w-10 mx-auto text-slate-300" />
                  <p>No active consultations registered on your charts.</p>
                  <Link to="/doctors" className="inline-block bg-medical-500 hover:bg-medical-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition-colors">Book Consultation Slot</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {upcomingAppts.map((appt) => (
                    <div key={appt.id} className="glass-panel border border-slate-200/50 dark:border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
                      <div className="flex gap-3">
                        <img src={appt.doctorImage} alt={appt.doctorName} className="h-12 w-12 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <span className="text-[8px] font-black bg-medical-100 dark:bg-medical-950/40 text-medical-600 dark:text-medical-400 px-1.5 py-0.5 rounded uppercase">
                            {appt.specialty}
                          </span>
                          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1 truncate">{appt.doctorName}</h3>
                          <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-0.5"><Building className="h-3 w-3" /> {appt.hospital}</p>
                          <p className="text-[10px] text-medical-600 dark:text-medical-400 font-black mt-1 flex items-center gap-0.5">
                            <Calendar className="h-3.5 w-3.5" /> {appt.date} @ {appt.time}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 flex items-center justify-between text-xs font-bold">
                        <button
                          onClick={() => cancelAppointment(appt.id)}
                          className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-transparent rounded-lg transition-colors"
                        >
                          Cancel Appointment
                        </button>
                        <button
                          onClick={() => triggerInvoiceDownload(appt)}
                          className="px-3 py-1.5 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg text-slate-700 dark:text-slate-350 flex items-center gap-1 shadow-sm"
                        >
                          <Download className="h-3.5 w-3.5" /> Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: CONSULTATION HISTORY */}
          {activeTab === 'history' && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Archived Consultations</h2>
              {pastAppts.length === 0 ? (
                <div className="text-center py-16 border border-slate-150 dark:border-slate-850 rounded-2xl p-6 text-slate-400 text-xs">
                  No completed or cancelled consultations registered in history files.
                </div>
              ) : (
                <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-semibold text-left">
                      <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-850">
                        <tr>
                          <th className="p-3">Consultant</th>
                          <th className="p-3">Specialty</th>
                          <th className="p-3">Schedule Date</th>
                          <th className="p-3">Consult Fee</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-slate-700 dark:text-slate-300">
                        {pastAppts.map((appt) => (
                          <tr key={appt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                            <td className="p-3 font-extrabold text-slate-900 dark:text-white">{appt.doctorName}</td>
                            <td className="p-3">{appt.specialty}</td>
                            <td className="p-3">{appt.date} ({appt.time})</td>
                            <td className="p-3">${appt.fee}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                appt.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400'
                                  : 'bg-rose-50 text-rose-600 dark:bg-rose-955/20 dark:text-rose-400'
                              }`}>
                                {appt.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              {appt.paymentStatus === 'Paid' ? (
                                <button 
                                  onClick={() => triggerInvoiceDownload(appt)}
                                  className="text-medical-500 hover:underline flex items-center gap-0.5 justify-end ml-auto"
                                >
                                  <Download className="h-3 w-3" /> Receipt
                                </button>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: MY PRESCRIPTIONS */}
          {activeTab === 'prescriptions' && (
            <motion.div key="prescriptions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Active Prescription Registers</h2>
              {currentUser.prescriptions.length === 0 ? (
                <div className="text-center py-16 border border-slate-150 dark:border-slate-850 rounded-2xl p-6 text-slate-400 text-xs">
                  No active prescriptions compiled on your records.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.prescriptions.map((rx) => (
                    <div key={rx.id} className="glass-panel border border-slate-200/50 dark:border-slate-800/80 p-5 rounded-2xl space-y-3 shadow-sm relative overflow-hidden">
                      <div className="absolute top-4 right-4 text-slate-200 dark:text-slate-800">
                        <FileText className="h-10 w-10 shrink-0" />
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date issued: {rx.date}</p>
                        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{rx.medicine}</h3>
                        <p className="text-[11px] text-slate-500 font-semibold">{rx.dosage}</p>
                      </div>

                      <div className="bg-slate-50/70 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850/80 text-[10px] font-bold text-slate-650 dark:text-slate-350 space-y-1">
                        <p>Doctor: <span className="font-extrabold text-slate-800 dark:text-slate-200">{rx.doctorName} ({rx.specialty})</span></p>
                        <p>Duration: <span className="font-extrabold text-slate-800 dark:text-slate-200">{rx.duration}</span></p>
                      </div>

                      <button
                        onClick={() => triggerPrescriptionDownload(rx)}
                        className="w-full flex items-center justify-center gap-1 bg-slate-850 dark:bg-slate-800 text-white text-[10px] font-bold py-2 rounded-xl hover:bg-slate-750 transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" /> Download RX Charts
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5: PAYMENTS */}
          {activeTab === 'payments' && (
            <motion.div key="payments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Transaction Logs</h2>
              {paidAppts.length === 0 ? (
                <div className="text-center py-16 border border-slate-150 dark:border-slate-850 rounded-2xl p-6 text-slate-400 text-xs">
                  No payment transactions logged.
                </div>
              ) : (
                <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-semibold text-left">
                      <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-850">
                        <tr>
                          <th className="p-3">Transaction ID</th>
                          <th className="p-3">Doctor / Visit</th>
                          <th className="p-3">Method</th>
                          <th className="p-3">Amount</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-slate-700 dark:text-slate-300">
                        {paidAppts.map((appt) => (
                          <tr key={appt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                            <td className="p-3 font-mono text-[10px] text-slate-800 dark:text-slate-100 font-extrabold">{appt.transactionId}</td>
                            <td className="p-3">
                              <p className="font-extrabold text-slate-900 dark:text-white">{appt.doctorName}</p>
                              <p className="text-[10px] text-slate-400 font-bold">{appt.date}</p>
                            </td>
                            <td className="p-3 uppercase">{appt.paymentMethod || 'Credit Card'}</td>
                            <td className="p-3 font-extrabold text-slate-900 dark:text-white">${appt.fee}.00</td>
                            <td className="p-3">
                              <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-black">
                                SUCCESS
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button 
                                onClick={() => triggerInvoiceDownload(appt)}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-slate-650 transition-colors inline-flex"
                                title="Download invoice Receipt"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 6: EDIT PROFILE */}
          {activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Profile Medical Records</h2>
              <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 p-6 sm:p-8 rounded-2xl shadow-sm">
                <form onSubmit={handleProfileUpdateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-850 dark:text-slate-200 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Age (Years)</label>
                      <input
                        type="number"
                        required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-850 dark:text-slate-200 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Blood Group</label>
                      <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-850 dark:text-slate-200 font-semibold cursor-pointer"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Mailing Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 font-semibold"
                    />
                  </div>

                  {profileSuccess && (
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-black bg-emerald-50 dark:bg-emerald-950/20 p-2 rounded-xl text-center flex items-center justify-center gap-1">
                      <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" /> {profileSuccess}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-2.5 rounded-xl shadow hover:shadow-md transition-all duration-300"
                  >
                    Commit Profile Alterations
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* TAB 7: NOTIFICATIONS */}
          {activeTab === 'alerts' && (
            <motion.div key="alerts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">System Alerts History</h2>
                {notifications.length > 0 && (
                  <button 
                    onClick={markAllNotificationsRead}
                    className="text-[10px] text-medical-500 font-bold hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-16 border border-slate-150 dark:border-slate-850 rounded-2xl p-6 text-slate-400 text-xs">
                  No alerts listed.
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 border rounded-2xl flex items-start justify-between gap-4 transition-all shadow-sm ${
                        notif.read
                          ? 'border-slate-150 dark:border-slate-850 bg-slate-50/10 dark:bg-slate-900/5 text-slate-500'
                          : 'border-medical-200 dark:border-medical-950/30 bg-medical-50/30 dark:bg-medical-950/10 text-slate-800 dark:text-slate-200 border-l-4 border-l-medical-500'
                      }`}
                    >
                      <div className="space-y-1 pr-4 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[8px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                            {notif.type}
                          </span>
                          <span className="text-[8px] text-slate-400 font-bold">{notif.date}</span>
                        </div>
                        <h4 className="font-extrabold text-xs text-slate-900 dark:text-white mt-1.5">{notif.title}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1">
                          {notif.message}
                        </p>
                      </div>

                      <button
                        onClick={() => clearNotification(notif.id)}
                        className="text-[10px] text-slate-400 hover:text-rose-500 font-bold shrink-0"
                      >
                        Dismiss
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

    </div>
  );
};

export default UserDashboard;
