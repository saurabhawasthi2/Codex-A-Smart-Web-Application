import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { SPECIALTIES, LOCATIONS } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, SlidersHorizontal, Grid, List, Star, MapPin, 
  Building, User2, DollarSign, Calendar, Eye, 
  HelpCircle, RefreshCw, X 
} from 'lucide-react';

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // URL search states
  const urlSpecialty = searchParams.get('specialty') || '';
  const urlLocation = searchParams.get('location') || '';
  const urlHospital = searchParams.get('hospital') || '';

  // Local Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(urlSpecialty);
  const [selectedLocation, setSelectedLocation] = useState(urlLocation);
  const [selectedGender, setSelectedGender] = useState('');
  const [minExperience, setMinExperience] = useState(0);
  const [maxFee, setMaxFee] = useState(250);
  const [minRating, setMinRating] = useState(0);

  // Layout View Mode (grid vs list)
  const [viewMode, setViewMode] = useState('grid');
  
  // Loading simulator state
  const [loading, setLoading] = useState(false);

  // Sync URL params to local state on URL change
  useEffect(() => {
    setSelectedSpecialty(urlSpecialty);
    setSelectedLocation(urlLocation);
  }, [urlSpecialty, urlLocation]);

  // Handle filter changes (simulate a quick fetch delay for premium feel)
  const triggerFiltersReload = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    triggerFiltersReload();
  }, [selectedSpecialty, selectedLocation, selectedGender, minExperience, maxFee, minRating, searchQuery]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('');
    setSelectedLocation('');
    setSelectedGender('');
    setMinExperience(0);
    setMaxFee(250);
    setMinRating(0);
    setSearchParams({});
  };

  // Filtered Doctors Calculation
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchSearch = searchQuery 
        ? doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.hospital.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchSpecialty = selectedSpecialty 
        ? doc.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
        : true;
      const matchLocation = selectedLocation 
        ? doc.location.toLowerCase() === selectedLocation.toLowerCase()
        : true;
      const matchGender = selectedGender 
        ? doc.gender.toLowerCase() === selectedGender.toLowerCase()
        : true;
      const matchExp = doc.experience >= minExperience;
      const matchFee = doc.fee <= maxFee;
      const matchRating = doc.rating >= minRating;

      return matchSearch && matchSpecialty && matchLocation && matchGender && matchExp && matchFee && matchRating;
    });
  }, [doctors, searchQuery, selectedSpecialty, selectedLocation, selectedGender, minExperience, maxFee, minRating]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      {/* Header Description */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Browse Verified Doctors
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold">
          Check credentials, consultation costs, rating indexes, and book direct medical slots.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* FILTERS PANEL */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <span className="font-extrabold text-sm flex items-center gap-1.5">
                <SlidersHorizontal className="h-4.5 w-4.5 text-medical-500" /> Filters
              </span>
              <button 
                onClick={handleResetFilters}
                className="text-[10px] font-black text-rose-500 hover:underline flex items-center gap-1"
              >
                Reset All
              </button>
            </div>

            {/* Specialty Selection */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider">Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-medical-500 text-slate-700 dark:text-slate-350 cursor-pointer"
              >
                <option value="">All Specialties</option>
                {SPECIALTIES.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Location Selection */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-455 uppercase tracking-wider">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-medical-500 text-slate-700 dark:text-slate-350 cursor-pointer"
              >
                <option value="">All Locations</option>
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Gender Selection */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-455 uppercase tracking-wider">Gender</label>
              <div className="grid grid-cols-3 gap-2">
                {['', 'Female', 'Male'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`py-1.5 text-[10px] font-extrabold rounded-lg border transition-all ${
                      selectedGender === g
                        ? 'border-medical-500 bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-450'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {g === '' ? 'All' : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Min Experience */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-455 uppercase tracking-wider">
                <span>Min Experience</span>
                <span className="text-medical-500 font-extrabold">{minExperience}+ Years</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="2"
                value={minExperience}
                onChange={(e) => setMinExperience(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-medical-500"
              />
            </div>

            {/* Max Fee */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-455 uppercase tracking-wider">
                <span>Max Consult Cost</span>
                <span className="text-medical-500 font-extrabold">${maxFee}</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={maxFee}
                onChange={(e) => setMaxFee(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer accent-medical-500"
              />
            </div>

            {/* Min Rating */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-455 uppercase tracking-wider">Min Rating</label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 4.5, 4.7, 4.9].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`py-1.5 text-[10px] font-extrabold rounded-lg border flex items-center justify-center gap-0.5 transition-all ${
                      minRating === rate
                        ? 'border-medical-500 bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-450'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {rate === 0 ? 'Any' : `${rate}★`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LISTINGS SIDE */}
        <div className="lg:col-span-3 space-y-6">
          {/* SEARCH BAR & VIEW ACTIONS */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctors by name or clinic hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-medical-500 text-slate-800 dark:text-slate-200 placeholder-slate-400"
              />
            </div>

            <div className="flex gap-3 shrink-0">
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-1 flex gap-1 bg-slate-50/50 dark:bg-slate-900/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-800 shadow text-medical-500'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title="Grid View"
                >
                  <Grid className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-800 shadow text-medical-500'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title="List View"
                >
                  <List className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* DYNAMIC LISTINGS BODY */}
          <div className="min-h-[400px]">
            {loading ? (
              // SKELETON LAYOUTS
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-3 gap-6' : 'space-y-4'}>
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className="border border-slate-200 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-900/40 p-5 space-y-4 animate-pulse"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="h-16 w-16 bg-slate-200 dark:bg-slate-800 rounded-2xl shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                      </div>
                    </div>
                    <div className="h-16 bg-slate-100 dark:bg-slate-800/20 rounded-xl" />
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredDoctors.length === 0 ? (
              // EMPTY STATE
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/10 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4"
              >
                <div className="h-14 w-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                  <User2 className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-850 dark:text-slate-150">No matching doctors found</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold max-w-sm mx-auto">
                    Try broadening your filters, choosing a different location, or reducing the rating thresholds.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-850 rounded-xl font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              // DOCTORS DISPLAY
              <AnimatePresence>
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-3 gap-6' : 'space-y-4'}>
                  {filteredDoctors.map((doc, idx) => {
                    const availableSlotsCount = Object.values(doc.slots).flat().length;

                    return (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                        className={`glass-card rounded-2xl overflow-hidden flex ${
                          viewMode === 'grid' ? 'flex-col justify-between' : 'flex-col sm:flex-row gap-5 p-5'
                        }`}
                      >
                        {/* Profile Image & Rating Badge */}
                        <div className={`relative shrink-0 ${viewMode === 'grid' ? 'h-48 w-full' : 'h-32 w-32 rounded-xl overflow-hidden shadow'}`}>
                          <img 
                            src={doc.image} 
                            alt={doc.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2.5 right-2.5 bg-white/95 dark:bg-slate-900/95 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-medical-600 dark:text-medical-400 flex items-center gap-0.5 shadow-sm">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {doc.rating}
                          </div>
                        </div>

                        {/* Middle Content */}
                        <div className={`flex-1 flex flex-col justify-between ${viewMode === 'grid' ? 'p-5 space-y-4' : 'space-y-3'}`}>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-black uppercase tracking-wider bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-400 px-2 py-0.5 rounded-md">
                                {doc.specialty}
                              </span>
                              <span className="text-[9px] font-bold text-slate-400">
                                {doc.experience} Years Exp
                              </span>
                            </div>
                            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white hover:text-medical-500 transition-colors">
                              <Link to={`/doctors/${doc.id}`}>{doc.name}</Link>
                            </h3>
                            
                            <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                              <Building className="h-3.5 w-3.5 text-slate-450" /> {doc.hospital}
                            </p>
                            <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-slate-455" /> {doc.location}
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium line-clamp-2">
                              {doc.shortDescription}
                            </p>
                          </div>

                          {/* Quick availability status info */}
                          <div className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 rounded-xl p-2.5 flex items-center justify-between text-[10px] font-bold text-slate-650 dark:text-slate-350">
                            <span className="flex items-center gap-1 text-teal-650 dark:text-teal-400">
                              <Calendar className="h-3.5 w-3.5" /> Next: {doc.availableDays[0]}
                            </span>
                            <span>{availableSlotsCount} Slots Open</span>
                          </div>

                          {/* Bottom Row (Price and Actions) */}
                          <div className="border-t border-slate-100 dark:border-slate-850 pt-3 flex items-center justify-between">
                            <div>
                              <p className="text-[9px] text-slate-400 uppercase font-semibold">Consultation</p>
                              <p className="text-sm font-black text-slate-900 dark:text-white">${doc.fee}</p>
                            </div>
                            <div className="flex gap-2">
                              <Link
                                to={`/doctors/${doc.id}`}
                                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-800 transition-all shadow-sm"
                                title="View Profile"
                              >
                                <Eye className="h-4.5 w-4.5" />
                              </Link>
                              <Link
                                to={`/doctors/${doc.id}`}
                                className="px-3.5 py-2 bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white rounded-lg text-xs font-bold shadow-sm hover:shadow transition-all duration-300 flex items-center gap-1"
                              >
                                Book Visit
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
