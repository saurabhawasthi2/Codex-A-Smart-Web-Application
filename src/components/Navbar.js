import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Sun, Moon, Bell, LogOut, User, 
  Menu, X, ShieldAlert, HeartPulse, ChevronDown, CheckCheck
} from 'lucide-react';

const Navbar = () => {
  const { 
    theme, toggleTheme, currentUser, logoutUser, loginUser,
    notifications, markAllNotificationsRead 
  } = useContext(AppContext);
  
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logoutUser();
    setShowProfileMenu(false);
    navigate('/');
  };

  const handleSwitchToAdmin = () => {
    loginUser('admin@healthcare.com', 'admin', 'admin');
    setShowProfileMenu(false);
    navigate('/admin');
  };

  const handleSwitchToPatient = () => {
    loginUser('john.doe@example.com', 'patient', 'patient');
    setShowProfileMenu(false);
    navigate('/dashboard');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Doctors', path: '/doctors' },
    { name: 'Dashboard', path: currentUser?.role === 'admin' ? '/admin' : '/dashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-medical-500 to-teal-500 p-2 rounded-xl text-white shadow-md">
              <HeartPulse className="h-6 w-6 animate-pulse" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-medical-600 to-teal-500 bg-clip-text text-transparent dark:from-medical-400 dark:to-teal-300">
              MediBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 py-2 px-1 border-b-2 ${
                  location.pathname === link.path
                    ? 'border-medical-500 text-medical-600 dark:text-medical-400'
                    : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-medical-500 dark:hover:text-medical-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions Panel */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 max-h-96 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 p-2 scrollbar-thin">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <span className="font-semibold text-sm">Alert Inbox</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllNotificationsRead}
                        className="text-xs text-medical-500 hover:underline flex items-center gap-1"
                      >
                        <CheckCheck className="h-3 w-3" /> Mark all read
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs">No alerts yet.</div>
                  ) : (
                    <div className="space-y-1">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`p-2.5 rounded-lg text-xs transition-colors ${
                            notif.read 
                              ? 'bg-transparent text-slate-500' 
                              : 'bg-medical-50/50 dark:bg-medical-950/20 text-slate-800 dark:text-slate-200 border-l-2 border-medical-500'
                          }`}
                        >
                          <div className="flex justify-between font-medium">
                            <span className="capitalize text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold mb-1 text-slate-600 dark:text-slate-400">
                              {notif.type}
                            </span>
                            <span className="text-[10px] text-slate-400">{notif.date}</span>
                          </div>
                          <div className="font-bold text-xs">{notif.title}</div>
                          <div className="mt-1 font-medium">{notif.message}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2 text-center">
                    <Link 
                      to="/notifications" 
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-medical-500 hover:underline font-semibold"
                    >
                      Open Email/SMS Simulator Panel
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-7 w-7 rounded-full object-cover shadow-sm"
                  />
                  <span className="text-sm font-semibold max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl z-50 p-1.5">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1.5">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Logged in as</p>
                      <p className="font-bold text-sm truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    </div>

                    {currentUser.role === 'admin' ? (
                      <button
                        onClick={handleSwitchToPatient}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <User className="h-4 w-4 text-medical-500" />
                        Switch to Patient View
                      </button>
                    ) : (
                      <button
                        onClick={handleSwitchToAdmin}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <ShieldAlert className="h-4 w-4 text-amber-500" />
                        Switch to Admin View
                      </button>
                    )}

                    <Link
                      to={currentUser.role === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <User className="h-4 w-4 text-teal-500" />
                      My Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors border-t border-slate-100 dark:border-slate-800 mt-1.5 pt-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-medical-500 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-semibold ${
                location.pathname === link.path
                  ? 'bg-medical-50 dark:bg-medical-950/20 text-medical-600 dark:text-medical-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex flex-col gap-2">
            <Link 
              to="/notifications"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-between"
            >
              <span>Email & SMS Simulator</span>
              <span className="bg-medical-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {unreadCount} Alerts
              </span>
            </Link>
            
            {currentUser ? (
              <>
                <div className="px-3 py-2 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                  </div>
                </div>
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={() => { handleSwitchToPatient(); setIsOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-left"
                  >
                    <User className="h-4 w-4 text-medical-500" /> Switch to Patient View
                  </button>
                ) : (
                  <button
                    onClick={() => { handleSwitchToAdmin(); setIsOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-left"
                  >
                    <ShieldAlert className="h-4 w-4 text-amber-500" /> Switch to Admin View
                  </button>
                )}
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg text-left"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-center text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-center text-sm font-bold text-white bg-medical-600 rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
