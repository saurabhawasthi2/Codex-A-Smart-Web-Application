import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { SPECIALTIES, LOCATIONS, HOSPITALS } from '../data/mockData';
import { motion } from 'framer-motion';
import { 
  Search, ShieldCheck, Clock, Award, Star, ArrowRight,
  HelpCircle, ChevronDown, ChevronUp, MapPin, Building,
  Stethoscope, Quote, Mail, Phone, CalendarCheck
} from 'lucide-react';
import * as Icons from 'lucide-react';

// Custom component to dynamically load Lucide icons
const DynamicIcon = ({ name, className }) => {
  const IconComponent = Icons[name] || Icons.Stethoscope;
  return <IconComponent className={className} />;
};

const Home = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  // Search form state
  const [specialtyQuery, setSpecialtyQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [hospitalQuery, setHospitalQuery] = useState('');

  // FAQ Expand state
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Handle Search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (specialtyQuery) params.set('specialty', specialtyQuery);
    if (locationQuery) params.set('location', locationQuery);
    if (hospitalQuery) params.set('hospital', hospitalQuery);
    navigate(`/doctors?${params.toString()}`);
  };

  // Featured doctors (top rated, e.g. rating >= 4.8)
  const featuredDoctors = doctors.slice(0, 3);

  const testimonials = [
    { name: 'Sarah Miller', role: 'Mother of 2', comment: 'Booking appointments for my kids has never been simpler. Dr. Rostova was exceptional, and the dashboard tracks all our immunization history!', rating: 5 },
    { name: 'David K.', role: 'Fitness Trainer', comment: 'After my sports injury, I needed an orthopedic surgeon fast. MediBook connected me with Dr. Chen, and I booked a slot within minutes. Incredible UI.', rating: 5 },
    { name: 'Elena R.', role: 'Corporate Executive', comment: 'The dark mode looks sleek, and the email reminders saved me from missing my cardiac check-up. The invoice download is very handy for my insurance.', rating: 4.8 }
  ];

  const faqs = [
    { q: 'How do I cancel or reschedule an appointment?', a: 'You can manage all your sessions directly from the Patient Dashboard. Simply log in, navigate to "Appointments," and click "Cancel" or "Reschedule" next to the booking.' },
    { q: 'Is there a consultation fee for using MediBook?', a: 'MediBook is completely free to search and book appointments! You only pay the doctor\'s consultation fee, which is processed securely through our platform during the booking checkout.' },
    { q: 'Are all listed doctors verified?', a: 'Yes. Every medical practitioner on our platform undergoes rigorous credential verification, board certifications review, and hospital affiliation checks before listing.' },
    { q: 'Can I download an invoice for my insurance?', a: 'Absolutely. Upon booking confirmation and checkout success, you can download a structured PDF-style invoice directly from the Payment Success screen or from your Dashboard Payment History.' }
  ];

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  // Animation constants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="overflow-x-hidden pb-12">
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-medical-50/50 via-teal-50/20 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-medical-400/10 blur-3xl pulse-glow dark:bg-medical-900/10" />
          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl pulse-glow dark:bg-teal-900/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Col - Slogan & Search */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-medical-100 text-medical-800 dark:bg-medical-950/40 dark:text-medical-300 border border-medical-200/50 dark:border-medical-900/30">
                <CalendarCheck className="h-3.5 w-3.5" /> Modern Healthcare booking
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
                Find & Book <br />
                <span className="bg-gradient-to-r from-medical-600 to-teal-500 bg-clip-text text-transparent dark:from-medical-400 dark:to-teal-300">
                  Top-Rated Doctors
                </span> <br />
                Instantly
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
                Skip the phone queues. Consult with board-certified healthcare professionals across multiple specialties online or in-person.
              </p>

              {/* Search Widget */}
              <form onSubmit={handleSearchSubmit} className="glass-panel p-4 rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-800/60 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Specialty */}
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <select
                      value={specialtyQuery}
                      onChange={(e) => setSpecialtyQuery(e.target.value)}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-medical-500 text-slate-700 dark:text-slate-300 appearance-none cursor-pointer"
                    >
                      <option value="">Choose Specialty</option>
                      {SPECIALTIES.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* Location */}
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <select
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-medical-500 text-slate-700 dark:text-slate-300 appearance-none cursor-pointer"
                    >
                      <option value="">Select Location</option>
                      {LOCATIONS.map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  {/* Hospital */}
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <select
                      value={hospitalQuery}
                      onChange={(e) => setHospitalQuery(e.target.value)}
                      className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-medical-500 text-slate-700 dark:text-slate-300 appearance-none cursor-pointer"
                    >
                      <option value="">Select Hospital</option>
                      {HOSPITALS.map(h => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-sm py-2.5 rounded-xl shadow-md transition-all duration-300"
                >
                  <Search className="h-4 w-4" />
                  Search Available Doctors
                </button>
              </form>
            </motion.div>

            {/* Right Col - Visual Vector Design */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Main vector banner */}
              <div className="relative w-[450px] h-[450px] rounded-3xl bg-gradient-to-br from-medical-500 to-teal-500 p-1 shadow-2xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600&h=600"
                  alt="Doctor consulting patient"
                  className="w-full h-full object-cover rounded-[22px] filter brightness-95 contrast-105 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Stats badge overlay */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl border border-white/20 shadow-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Active Experts</p>
                    <p className="text-xl font-black text-slate-800 dark:text-white">1,500+ Verified</p>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Client Rating</p>
                    <p className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-1">
                      4.95 <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Medical Specialties */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Explore Medical Specialties
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
              Find customized care by browsing verified practitioners grouped by relevant fields of medicine.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {SPECIALTIES.map((spec) => (
              <motion.div 
                key={spec.id}
                variants={itemVariants}
                onClick={() => navigate(`/doctors?specialty=${spec.name}`)}
                className="glass-card p-6 rounded-2xl cursor-pointer text-center group flex flex-col items-center justify-center"
              >
                <div className="bg-medical-50 dark:bg-slate-850 p-4 rounded-2xl text-medical-600 dark:text-medical-400 group-hover:bg-medical-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <DynamicIcon name={spec.icon} className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mt-4 group-hover:text-medical-500 dark:group-hover:text-medical-400 transition-colors">
                  {spec.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 font-medium">
                  {spec.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Featured Doctors */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Featured Medical Specialists
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
                Highly recommended doctors with active consultation slots this week.
              </p>
            </div>
            <Link 
              to="/doctors" 
              className="mt-4 sm:mt-0 font-bold text-xs text-medical-500 hover:text-medical-600 flex items-center gap-1.5 group hover:underline"
            >
              See All Specialists <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredDoctors.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="relative h-48 w-full shrink-0">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-medical-600 dark:text-medical-400 flex items-center gap-1 shadow-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {doc.rating}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase text-medical-500 tracking-wider">
                      {doc.specialty}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white hover:text-medical-500 cursor-pointer transition-colors">
                      <Link to={`/doctors/${doc.id}`}>{doc.name}</Link>
                    </h3>
                    <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                      <Building className="h-3.5 w-3.5 text-slate-400" /> {doc.hospital}
                    </p>
                    <p className="text-xs text-slate-400 font-medium line-clamp-2">
                      {doc.shortDescription}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Consultation Fee</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">${doc.fee}</p>
                    </div>
                    <Link
                      to={`/doctors/${doc.id}`}
                      className="px-4 py-2 bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white rounded-lg shadow-sm hover:shadow transition-all duration-300"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Patients Choose MediBook
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
              We streamline healthcare connection, ensuring quality, security, and velocity at every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/30 flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-medical-100 dark:bg-medical-950/40 text-medical-600 dark:text-medical-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">100% Certified Clinicians</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  We check credentials, licenses, and registrations for every healthcare provider on the portal.
                </p>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/30 flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">24/7 Portal Access</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Select available hourly slots, reschedule appointments, or contact doctor offices anytime.
                </p>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/30 flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Enterprise Dashboard</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Keep track of past appointments, prescription orders, payments receipts, and invoice records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Patient Testimonials */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Trusted by Thousands of Patients
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
              Read real-life healing journeys from patients who secured consultations on our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="glass-card p-6 rounded-2xl flex flex-col justify-between relative shadow-sm border border-slate-100 dark:border-slate-800/60"
              >
                <Quote className="h-8 w-8 text-medical-200 dark:text-slate-800 absolute top-4 right-4" />
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(test.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed italic font-medium">
                    "{test.comment}"
                  </p>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800/60 mt-6 pt-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-medical-500 to-teal-500 text-white flex items-center justify-center font-black text-xs">
                    {test.name[0]}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200">{test.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <HelpCircle className="h-7 w-7 text-medical-500" /> Frequently Asked Questions
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
              Got questions? We have answer keys to general operations.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden bg-slate-50/20 dark:bg-slate-900/10"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 font-bold text-xs text-slate-700 dark:text-slate-200 hover:text-medical-500 text-left transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isExpanded ? <ChevronUp className="h-4 w-4 shrink-0 text-medical-500" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                  </button>
                  {isExpanded && (
                    <div className="p-4 pt-0 text-xs text-slate-400 leading-relaxed font-semibold">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 dark:border-slate-800/60">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Form */}
              <div className="p-8 sm:p-12 space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Get in Touch</h2>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">Have operational queries or support issues? Send us a mail ticket.</p>
                </div>

                {contactSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 p-6 rounded-2xl text-center space-y-3"
                  >
                    <p className="text-emerald-800 dark:text-emerald-400 font-bold text-xs">Thank You!</p>
                    <p className="text-emerald-600 dark:text-emerald-500 text-xs font-semibold">Our customer success team has received your ticket and will reply within 12 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Subject</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Message Description</label>
                      <textarea
                        rows="4"
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-2.5 rounded-lg shadow transition-all"
                    >
                      Send Message Ticket
                    </button>
                  </form>
                )}
              </div>

              {/* Right Contacts Pane */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 dark:from-slate-950 dark:to-slate-900 p-8 sm:p-12 text-slate-300 flex flex-col justify-between border-l border-slate-800">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-black text-xl">Hospital Relations Office</h3>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">For doctor registration audits and API partnerships.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-medical-500 shrink-0" />
                      <span className="text-xs font-semibold">+1 (555) 019-8976 (Mon-Fri 9AM-5PM EST)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-medical-500 shrink-0" />
                      <span className="text-xs font-semibold">relations@medibook-health.com</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-medical-500 shrink-0" />
                      <span className="text-xs font-semibold">123 Health Care Blvd, Suite 400, New York, NY 10001</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800 mt-8 pt-6 text-[10px] text-slate-500 font-semibold leading-relaxed">
                  Notice: Patient data is protected under HIPAA compliance. Electronic communications are encrypted with standard AES-256 security algorithms.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
