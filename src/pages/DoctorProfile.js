import React, { useState, useContext, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Star, MapPin, Building, Calendar, Clock, ArrowLeft,
  GraduationCap, Award, Globe, Heart, Shield,
  BadgeAlert, Share2, HeartCrack
} from 'lucide-react';
import { motion } from 'framer-motion';

const DoctorProfile = () => {
  const { id } = useParams();
  const { doctors, currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  
  // Find doctor
  const doctor = useMemo(() => {
    return doctors.find(doc => doc.id === parseInt(id));
  }, [doctors, id]);

  // Tab State
  const [activeTab, setActiveTab] = useState('about'); // 'about' or 'reviews'

  // Booking details selection state
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!doctor) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <HeartCrack className="h-16 w-16 text-rose-500 mx-auto" />
        <h2 className="text-2xl font-black">Doctor Profile Not Found</h2>
        <p className="text-slate-500 text-xs font-semibold">The practitioner you requested might have been de-listed or modified.</p>
        <Link to="/doctors" className="inline-block text-xs font-bold text-medical-500 hover:underline">
          Return to Doctor Listing
        </Link>
      </div>
    );
  }

  // Choose initial day on load
  const daysAvailable = doctor.availableDays;
  
  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setSelectedTime(''); // Reset time on day change
    setErrorMsg('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setErrorMsg('');
  };

  const handleBookRedirect = () => {
    if (!selectedDay) {
      setErrorMsg('Please select an appointment day.');
      return;
    }
    if (!selectedTime) {
      setErrorMsg('Please select a time slot.');
      return;
    }

    // Redirect to Booking checkout page, sending doctor & slot parameters in location state
    navigate('/booking', {
      state: {
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorImage: doctor.image,
        specialty: doctor.specialty,
        fee: doctor.fee,
        hospital: doctor.hospital,
        location: doctor.location,
        selectedDay: selectedDay,
        selectedTime: selectedTime
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
        <ArrowLeft className="h-4.5 w-4.5" /> Back to Listings
      </button>

      {/* Profile Banner Card */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800/65 shadow-lg mb-8">
        <div className="h-32 sm:h-44 bg-gradient-to-r from-medical-500/20 via-teal-500/20 to-indigo-500/10 dark:from-medical-950/20 dark:via-teal-950/20 dark:to-indigo-950/10 relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-full hover:bg-white dark:hover:bg-slate-900 shadow-sm transition-colors text-slate-500 dark:text-slate-400" title="Share profile">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-full hover:bg-white dark:hover:bg-slate-900 shadow-sm transition-colors text-rose-500" title="Add to favorites">
              <Heart className="h-4 w-4 fill-rose-500" />
            </button>
          </div>
        </div>

        {/* Doctor Info Section */}
        <div className="p-6 sm:p-8 pt-0 -mt-10 sm:-mt-14 relative flex flex-col sm:flex-row gap-6 items-start sm:items-end">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl object-cover shadow-md border-4 border-white dark:border-slate-900 shrink-0"
          />
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase bg-medical-100 dark:bg-medical-950/40 text-medical-700 dark:text-medical-300 px-3 py-1 rounded-full border border-medical-200/40 dark:border-medical-900/30">
                {doctor.specialty}
              </span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                {doctor.experience} Years Experience
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{doctor.name}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <p className="flex items-center gap-1"><Building className="h-4 w-4 text-slate-400" /> {doctor.hospital}</p>
              <p className="flex items-center gap-1"><MapPin className="h-4 w-4 text-slate-400" /> {doctor.location}</p>
            </div>
          </div>

          <div className="w-full sm:w-auto shrink-0 bg-slate-50 dark:bg-slate-900 border border-slate-250/20 dark:border-slate-800/80 p-4 rounded-2xl text-center sm:text-right flex sm:flex-col justify-between items-center sm:items-end gap-2 shadow-sm">
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-bold">Consultation Fee</p>
              <p className="text-xl font-black text-slate-900 dark:text-white">${doctor.fee}</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-lg text-xs font-black flex items-center gap-1 shadow-sm shrink-0">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {doctor.rating} ({doctor.reviews.length} reviews)
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: ABOUT, TABS */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs header */}
          <div className="border-b border-slate-200 dark:border-slate-850 flex gap-6">
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 font-extrabold text-sm border-b-2 transition-all ${
                activeTab === 'about'
                  ? 'border-medical-500 text-medical-600 dark:text-medical-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Overview & Credentials
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 font-extrabold text-sm border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-medical-500 text-medical-600 dark:text-medical-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Patient Reviews 
              <span className="bg-slate-100 dark:bg-slate-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {doctor.reviews.length}
              </span>
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div className="min-h-[250px]">
            {activeTab === 'about' ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* About Bio */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-sm sm:text-base">About Doctor</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {doctor.about}
                  </p>
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-sm sm:text-base flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-medical-500" /> Education
                  </h3>
                  <ul className="space-y-2">
                    {doctor.education.map((edu, idx) => (
                      <li key={idx} className="text-xs text-slate-550 dark:text-slate-400 font-semibold border-l-2 border-slate-200 dark:border-slate-800 pl-3.5 py-0.5">
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-sm sm:text-base flex items-center gap-2">
                    <Award className="h-5 w-5 text-medical-500" /> Board Certifications
                  </h3>
                  <ul className="space-y-2">
                    {doctor.certifications.map((cert, idx) => (
                      <li key={idx} className="text-xs text-slate-550 dark:text-slate-400 font-semibold border-l-2 border-slate-200 dark:border-slate-800 pl-3.5 py-0.5">
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Languages */}
                <div className="space-y-3">
                  <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-sm sm:text-base flex items-center gap-2">
                    <Globe className="h-5 w-5 text-medical-500" /> Languages Spoken
                  </h3>
                  <div className="flex gap-2">
                    {doctor.languages.map((lang, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-850 px-3 py-1 rounded-lg font-bold text-slate-650 dark:text-slate-350">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* HIPAA assurance badge */}
                <div className="border border-slate-150 dark:border-slate-800 p-4 rounded-2xl flex items-start gap-3 bg-slate-50/50 dark:bg-slate-900/10">
                  <Shield className="h-5 w-5 text-teal-600 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-250">HIPAA Secure Consultations</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-relaxed font-semibold">
                      Your consultations are fully secure and compliant with health information privacy standards. All medical charts are confidential.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-sm sm:text-base">What Patients Say</h3>
                </div>
                {doctor.reviews.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No reviews compiled yet for this doctor.</p>
                ) : (
                  <div className="space-y-4">
                    {doctor.reviews.map((rev) => (
                      <div 
                        key={rev.id} 
                        className="p-4 border border-slate-100 dark:border-slate-850 rounded-2xl bg-slate-50/20 dark:bg-slate-900/10 space-y-2.5 shadow-inner"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-extrabold text-xs text-slate-800 dark:text-slate-200">{rev.patientName}</p>
                            <p className="text-[9px] text-slate-400 font-bold">{rev.date}</p>
                          </div>
                          <div className="flex gap-0.5 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-lg text-[10px] font-black items-center">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {rev.rating}
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium italic">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: BOOKING INTERFACE SLOT PICKER */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-5 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg sticky top-24 space-y-6">
            <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-sm flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-medical-500" /> Schedule Visit
            </h3>

            {/* Select Day Row */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider">Select Available Day</label>
              <div className="flex flex-wrap gap-2">
                {daysAvailable.map((day) => {
                  const isSelected = selectedDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => handleDaySelect(day)}
                      className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                        isSelected
                          ? 'border-medical-500 bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-400 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Select Time slot Grid */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-455 uppercase tracking-wider">Select Available Slot</label>
              {selectedDay ? (
                doctor.slots[selectedDay] && doctor.slots[selectedDay].length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {doctor.slots[selectedDay].map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`py-2 text-[10px] font-extrabold rounded-xl border flex items-center justify-center gap-1 transition-all ${
                            isSelected
                              ? 'border-medical-500 bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-400 shadow-sm'
                              : 'border-slate-250 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <Clock className="h-3 w-3" /> {time}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-[10px] text-rose-500 font-semibold italic">All slots booked out for {selectedDay}.</p>
                )
              ) : (
                <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1">
                  <BadgeAlert className="h-4 w-4" /> Pick a day above first
                </div>
              )}
            </div>

            {/* Warning Errors */}
            {errorMsg && (
              <p className="text-[10px] text-rose-500 font-black bg-rose-50 dark:bg-rose-950/20 p-2 rounded-lg text-center">
                {errorMsg}
              </p>
            )}

            {/* Booking submission */}
            <button
              onClick={handleBookRedirect}
              className="w-full bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white font-bold text-xs py-3 rounded-xl shadow hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              Continue to Details
            </button>
            <p className="text-[9px] text-slate-400 text-center font-semibold">
              Note: You can cancel or reschedule for free up to 24 hours prior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
