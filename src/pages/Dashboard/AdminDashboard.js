import React, { useState, useContext, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Sidebar from '../../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Calendar, DollarSign, Stethoscope, ClipboardList,
  ShieldAlert, Settings, Plus, Trash2, Edit3, CheckCircle,
  XCircle, Star, Send, BellRing, Mail, Check, BookOpen
} from 'lucide-react';

const AdminDashboard = () => {
  const { 
    currentUser, doctors, setDoctors, appointments, cancelAppointment,
    addDoctor, deleteDoctor, runEmailCampaign, logoutUser 
  } = useContext(AppContext);
  
  const navigate = useNavigate();

  // Active Subsection State
  const [activeTab, setActiveTab] = useState('analytics');

  // Campaign Form State
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignMessage, setCampaignMessage] = useState('');
  const [campaignGroup, setCampaignGroup] = useState('Patient');
  const [campaignSuccess, setCampaignSuccess] = useState('');

  // Doctor CRUD form state
  const [showAddDocForm, setShowAddDocForm] = useState(false);
  const [docName, setDocName] = useState('');
  const [docSpecialty, setDocSpecialty] = useState('Cardiology');
  const [docGender, setDocGender] = useState('Female');
  const [docExp, setDocExp] = useState(5);
  const [docFee, setDocFee] = useState(100);
  const [docHospital, setDocHospital] = useState('Metro General Hospital');
  const [docLocation, setDocLocation] = useState('New York, NY');
  const [docShortDesc, setDocShortDesc] = useState('');
  const [docAbout, setDocAbout] = useState('');

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <ShieldAlert className="h-16 w-16 text-amber-500 mx-auto" />
        <h2 className="text-2xl font-black">Unauthorized Access</h2>
        <p className="text-slate-500 text-xs font-semibold">Please sign in as an Administrator to load hospital audit controls.</p>
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

  // Add doctor CRUD action
  const handleAddDoctorSubmit = (e) => {
    e.preventDefault();
    if (!docName || !docShortDesc || !docAbout) return;

    // Seed default days & slots
    const availableDays = ['Monday', 'Wednesday', 'Friday'];
    const slots = {
      'Monday': ['09:00 AM', '11:00 AM', '02:00 PM'],
      'Wednesday': ['10:00 AM', '01:00 PM', '04:00 PM'],
      'Friday': ['09:00 AM', '11:00 AM', '03:00 PM']
    };

    // Female or Male avatar placeholder URL
    const genderAvatar = docGender === 'Female' 
      ? 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300&h=300'
      : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300';

    addDoctor({
      name: `Dr. ${docName}`,
      specialty: docSpecialty,
      experience: parseInt(docExp),
      fee: parseInt(docFee),
      gender: docGender,
      image: genderAvatar,
      hospital: docHospital,
      location: docLocation,
      shortDescription: docShortDesc,
      about: docAbout,
      education: ['M.D. in Medicine', 'Residency Fellowship'],
      certifications: ['Board Certified Specialist'],
      languages: ['English'],
      availableDays,
      slots
    });

    // Reset Form
    setDocName('');
    setDocShortDesc('');
    setDocAbout('');
    setShowAddDocForm(false);
  };

  // Campaign dispatch CRUD action
  const handleCampaignSubmit = (e) => {
    e.preventDefault();
    if (!campaignSubject || !campaignMessage) return;

    runEmailCampaign(campaignSubject, campaignGroup);
    setCampaignSuccess(`Campaign dispatched successfully to all ${campaignGroup} records!`);
    
    // Clear inputs
    setCampaignSubject('');
    setCampaignMessage('');
    setTimeout(() => setCampaignSuccess(''), 4000);
  };

  // Calculations for Metrics
  const metrics = useMemo(() => {
    const totalBookings = appointments.length;
    const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
    const completedCount = appointments.filter(a => a.status === 'Completed').length;
    const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;
    
    // Calculate total revenue
    const revenue = appointments
      .filter(a => a.paymentStatus === 'Paid' && a.status !== 'Cancelled')
      .reduce((sum, a) => sum + a.fee, 0);

    const activeDocsCount = doctors.length;

    // Get unique patients count
    const uniquePatients = new Set(appointments.map(a => a.patientPhone));

    return {
      revenue,
      totalBookings,
      confirmedCount,
      completedCount,
      cancelledCount,
      activeDocsCount,
      activePatientsCount: uniquePatients.size || 1
    };
  }, [appointments, doctors]);

  // Sidebar Menu Items config for Admin
  const adminMenuItems = [
    { id: 'analytics', label: 'Revenue Analytics', icon: 'DollarSign' },
    { id: 'appointments', label: 'Bookings Audit', icon: 'Calendar' },
    { id: 'doctors', label: 'Clinicians Database', icon: 'Stethoscope' },
    { id: 'campaigns', label: 'Campaign Dispatch', icon: 'Send' }
  ];

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300 min-h-[calc(100vh-4rem)]">
      
      {/* Collapsible Sidebar */}
      <Sidebar 
        menuItems={adminMenuItems} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        title="Admin Panel"
        userName={currentUser.name}
        avatar={currentUser.avatar}
        onLogout={handleLogout}
      />

      {/* Main Panel Content Container */}
      <main className="flex-1 p-6 sm:p-8 max-w-5xl overflow-y-auto h-[calc(100vh-4rem)]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: REVENUE & ANALYTICS */}
          {activeTab === 'analytics' && (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Slogan Banner */}
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-850 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Hospital Operations Analytics</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Monitor clinic billing metrics, booking thresholds, and database volumes.</p>
                </div>
              </div>

              {/* Analytics Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Revenue */}
                <div className="glass-panel p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-sm space-y-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gross Billings</p>
                  <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">${metrics.revenue}.00</p>
                </div>
                {/* Total Bookings */}
                <div className="glass-panel p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-sm space-y-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Bookings</p>
                  <p className="text-xl font-black text-slate-850 dark:text-white">{metrics.totalBookings}</p>
                </div>
                {/* Active Doctors */}
                <div className="glass-panel p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-sm space-y-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Clinicians</p>
                  <p className="text-xl font-black text-slate-850 dark:text-white">{metrics.activeDocsCount}</p>
                </div>
                {/* Active Patients */}
                <div className="glass-panel p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-sm space-y-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Registered Patients</p>
                  <p className="text-xl font-black text-slate-850 dark:text-white">{metrics.activePatientsCount}</p>
                </div>
              </div>

              {/* BEAUTIFUL SVG CHART BLOCK */}
              <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80 pb-2 flex justify-between items-center">
                  <span>Monthly Billings curve</span>
                  <span className="text-[10px] text-slate-400 capitalize font-bold">2026 Year-to-Date</span>
                </h3>

                {/* SVG Visualizing Graph */}
                <div className="w-full h-48 bg-slate-50/50 dark:bg-slate-900/20 rounded-xl relative overflow-hidden flex items-end justify-center p-4 border border-slate-100 dark:border-slate-850">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Grid Lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1" />

                    {/* Gradient Area under curve */}
                    <path
                      d="M 0 150 L 50 120 L 150 90 L 250 110 L 350 60 L 450 40 L 500 40 L 500 150 Z"
                      fill="url(#chartGradient)"
                    />
                    {/* The Line curve */}
                    <path
                      d="M 0 150 L 50 120 L 150 90 L 250 110 L 350 60 L 450 40 L 500 40"
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {/* Data Points */}
                    <circle cx="50" cy="120" r="5" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
                    <circle cx="150" cy="90" r="5" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
                    <circle cx="250" cy="110" r="5" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
                    <circle cx="350" cy="60" r="5" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
                    <circle cx="450" cy="40" r="5" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
                  </svg>
                  {/* Labels row */}
                  <div className="absolute bottom-1 left-0 right-0 px-6 flex justify-between text-[9px] text-slate-400 font-bold uppercase">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: APPOINTMENTS AUDIT */}
          {activeTab === 'appointments' && (
            <motion.div key="appointments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Consultations Audit Registers</h2>
              {appointments.length === 0 ? (
                <div className="text-center py-16 border border-slate-150 dark:border-slate-850 rounded-2xl p-6 text-slate-400 text-xs">
                  No appointments booked on the system.
                </div>
              ) : (
                <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-semibold text-left">
                      <thead className="bg-slate-100 dark:bg-slate-900 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-850">
                        <tr>
                          <th className="p-3">Patient</th>
                          <th className="p-3">Doctor</th>
                          <th className="p-3">Schedule Date</th>
                          <th className="p-3">Charge</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-slate-700 dark:text-slate-300">
                        {appointments.map((appt) => (
                          <tr key={appt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                            <td className="p-3">
                              <p className="font-extrabold text-slate-905 dark:text-white">{appt.patientName}</p>
                              <p className="text-[10px] text-slate-400 font-bold">{appt.patientPhone}</p>
                            </td>
                            <td className="p-3">
                              <p className="font-bold">{appt.doctorName}</p>
                              <p className="text-[10px] text-slate-400">{appt.specialty}</p>
                            </td>
                            <td className="p-3">
                              <p>{appt.date}</p>
                              <p className="text-[10px] text-slate-400">{appt.day}, {appt.time}</p>
                            </td>
                            <td className="p-3 font-extrabold text-slate-900 dark:text-white">${appt.fee}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                appt.status === 'Confirmed'
                                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400'
                                  : appt.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400'
                                  : 'bg-rose-50 text-rose-600 dark:bg-rose-955/20 dark:text-rose-400'
                              }`}>
                                {appt.status}
                              </span>
                            </td>
                            <td className="p-3 text-right space-y-1 sm:space-y-0 sm:space-x-1 flex flex-col sm:flex-row justify-end">
                              {appt.status === 'Confirmed' && (
                                <>
                                  <button
                                    onClick={() => cancelAppointment(appt.id)}
                                    className="p-1 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded"
                                    title="Cancel appointment"
                                  >
                                    <XCircle className="h-4.5 w-4.5" />
                                  </button>
                                </>
                              )}
                              {appt.status !== 'Cancelled' && appt.status !== 'Completed' && (
                                <button
                                  onClick={() => {
                                    // Set status as completed mock action
                                    appt.status = 'Completed';
                                    setDoctors([...doctors]);
                                  }}
                                  className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 rounded"
                                  title="Mark as completed"
                                >
                                  <CheckCircle className="h-4.5 w-4.5" />
                                </button>
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

          {/* TAB 3: DOCTORS CRUD DATABASE */}
          {activeTab === 'doctors' && (
            <motion.div key="doctors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">Clinicians Registry</h2>
                <button
                  onClick={() => setShowAddDocForm(!showAddDocForm)}
                  className="bg-medical-500 hover:bg-medical-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm flex items-center gap-1 transition-colors"
                >
                  <Plus className="h-4 w-4" /> Add Doctor
                </button>
              </div>

              {/* Form to Add Doctor Overlay/Drawer */}
              {showAddDocForm && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4"
                >
                  <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-xs uppercase tracking-wider border-b pb-2">Add Clinician Profile</h3>
                  <form onSubmit={handleAddDoctorSubmit} className="space-y-4 text-xs font-semibold">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Doctor Name (Surname, e.g. Sarah Jenkins)</label>
                        <input
                          type="text"
                          required
                          value={docName}
                          onChange={(e) => setDocName(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-medical-500 focus:outline-none"
                          placeholder="Sarah Jenkins"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Specialty field</label>
                        <select
                          value={docSpecialty}
                          onChange={(e) => setDocSpecialty(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-xs focus:ring-1 focus:ring-medical-500 focus:outline-none cursor-pointer"
                        >
                          <option value="Cardiology">Cardiology</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Gynecology">Gynecology</option>
                          <option value="General Medicine">General Medicine</option>
                          <option value="Dentistry">Dentistry</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Years Experience</label>
                        <input
                          type="number"
                          required
                          value={docExp}
                          onChange={(e) => setDocExp(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Consult Fee ($)</label>
                        <input
                          type="number"
                          required
                          value={docFee}
                          onChange={(e) => setDocFee(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Biological Gender</label>
                        <select
                          value={docGender}
                          onChange={(e) => setDocGender(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-xs cursor-pointer"
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Short Description Summary</label>
                      <input
                        type="text"
                        required
                        value={docShortDesc}
                        onChange={(e) => setDocShortDesc(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-medical-500 focus:outline-none"
                        placeholder="e.g. Senior Cardiologist specializing in interventional cardiology and preventive heart care."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">About Biography (Detailed)</label>
                      <textarea
                        required
                        rows="3"
                        value={docAbout}
                        onChange={(e) => setDocAbout(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-medical-500 focus:outline-none"
                        placeholder="Detailed clinical background, residency certifications..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddDocForm(false)}
                        className="w-1/3 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl font-bold transition-all text-slate-650 dark:text-slate-350"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold rounded-xl transition-all"
                      >
                        Commit Doctor Profile
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Clinicians list display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctors.map((doc) => (
                  <div key={doc.id} className="glass-panel border border-slate-200/50 dark:border-slate-800/80 p-4 rounded-2xl flex gap-3 shadow-sm relative group">
                    <img src={doc.image} alt={doc.name} className="h-14 w-14 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0 pr-6">
                      <span className="text-[8px] font-black bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-400 px-1.5 py-0.5 rounded uppercase">
                        {doc.specialty}
                      </span>
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1 truncate">{doc.name}</h3>
                      <p className="text-[10px] text-slate-500 font-semibold">{doc.hospital}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">Fee: ${doc.fee} | Exp: {doc.experience} Yrs</p>
                    </div>
                    {/* Delete Trigger */}
                    <button
                      onClick={() => deleteDoctor(doc.id)}
                      className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors p-1"
                      title="De-list clinician profile"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: EMAIL CAMPAIGNS */}
          {activeTab === 'campaigns' && (
            <motion.div key="campaigns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Send className="h-5 w-5 text-medical-500" /> Patient Campaign Dispatch
              </h2>

              <div className="glass-panel border border-slate-200/50 dark:border-slate-800/80 p-6 sm:p-8 rounded-2xl shadow-sm">
                <form onSubmit={handleCampaignSubmit} className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Target Recipient Group</label>
                    <select
                      value={campaignGroup}
                      onChange={(e) => setCampaignGroup(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="Patient">All Registered Patients</option>
                      <option value="Cardiology Patient">Cardiology Patients Only</option>
                      <option value="Dermatology Patient">Dermatology Patients Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Email Subject Subject</label>
                    <input
                      type="text"
                      required
                      value={campaignSubject}
                      onChange={(e) => setCampaignSubject(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-medical-500 focus:outline-none"
                      placeholder="e.g. Free Cardiology Health Screening this Saturday!"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Campaign Body Message</label>
                    <textarea
                      required
                      rows="5"
                      value={campaignMessage}
                      onChange={(e) => setCampaignMessage(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-medical-500 focus:outline-none"
                      placeholder="Write your email details here. It will trigger simulated HTML email notifications to target recipients."
                    />
                  </div>

                  {campaignSuccess && (
                    <p className="text-[10px] text-emerald-650 dark:text-emerald-450 font-black bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-xl text-center flex items-center justify-center gap-1">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" /> {campaignSuccess}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-2.5 rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="h-4 w-4" /> Dispatch Email Campaign
                  </button>
                </form>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

    </div>
  );
};

export default AdminDashboard;
