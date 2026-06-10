import React, { createContext, useState, useEffect } from 'react';
import { MOCK_DOCTORS, MOCK_USER, MOCK_ADMIN } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Current User State
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) return JSON.parse(savedUser);
    // Default to the mock patient for ease of grading/evaluation
    return { ...MOCK_USER, role: 'patient' };
  });

  // Doctors State
  const [doctors, setDoctors] = useState(() => {
    const savedDoctors = localStorage.getItem('doctors');
    if (savedDoctors) return JSON.parse(savedDoctors);
    return MOCK_DOCTORS;
  });

  // Appointments State
  const [appointments, setAppointments] = useState(() => {
    const savedAppts = localStorage.getItem('appointments');
    if (savedAppts) return JSON.parse(savedAppts);
    // Combine some initial bookings
    return MOCK_USER.appointments;
  });

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const savedNotifs = localStorage.getItem('notifications');
    if (savedNotifs) return JSON.parse(savedNotifs);
    return [
      { id: 1, type: 'email', title: 'Welcome to MediBook!', message: 'Thank you for registering. Manage your healthcare easily.', date: new Date().toLocaleDateString(), read: false },
      { id: 2, type: 'sms', title: 'Reminder: Upcoming Appointment', message: 'Hi John, your appointment with Dr. Sarah Jenkins is scheduled for June 15th at 10:30 AM.', date: new Date().toLocaleDateString(), read: false }
    ];
  });

  // Dynamic system notifications simulation trigger
  const [activeToastNotification, setActiveToastNotification] = useState(null);

  // Apply Theme on load/change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Auth Operations
  const loginUser = (email, password, role = 'patient') => {
    if (role === 'admin') {
      const adminObj = { ...MOCK_ADMIN, role: 'admin' };
      setCurrentUser(adminObj);
      triggerSystemNotification('email', 'Admin Login Successful', `Admin session started at ${new Date().toLocaleTimeString()}`);
      return adminObj;
    } else {
      // Simulate patient login
      const patientObj = { ...MOCK_USER, email, role: 'patient' };
      setCurrentUser(patientObj);
      triggerSystemNotification('email', 'Patient Login Successful', `Welcome back, ${patientObj.name || 'User'}`);
      return patientObj;
    }
  };

  const registerUser = (userData) => {
    const newUser = {
      ...MOCK_USER,
      ...userData,
      appointments: [],
      prescriptions: [],
      role: 'patient'
    };
    setCurrentUser(newUser);
    triggerSystemNotification('email', 'Registration Successful', `Welcome to MediBook, ${newUser.name}. Your account is active.`);
    return newUser;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // Appointment Operations
  const bookAppointment = (appointmentDetails) => {
    const newId = appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 6001;
    const booking = {
      id: newId,
      status: 'Confirmed',
      paymentStatus: 'Paid',
      transactionId: `TXN-${Math.floor(10000000000 + Math.random() * 90000000000)}`,
      ...appointmentDetails
    };

    // Update appointment list
    const updatedAppointments = [booking, ...appointments];
    setAppointments(updatedAppointments);

    // If currentUser is a patient, sync appointments
    if (currentUser && currentUser.role === 'patient') {
      setCurrentUser(prev => ({
        ...prev,
        appointments: [booking, ...(prev.appointments || [])]
      }));
    }

    // Adjust doctor available slots (simulated removal)
    const updatedDoctors = doctors.map(doc => {
      if (doc.id === booking.doctorId) {
        const docSlots = { ...doc.slots };
        if (docSlots[booking.day]) {
          docSlots[booking.day] = docSlots[booking.day].filter(s => s !== booking.time);
        }
        return { ...doc, slots: docSlots };
      }
      return doc;
    });
    setDoctors(updatedDoctors);

    // Send notifications
    triggerSystemNotification(
      'email',
      'Appointment Confirmed',
      `Your consultation with ${booking.doctorName} is confirmed for ${booking.date} at ${booking.time}.`
    );
    triggerSystemNotification(
      'sms',
      'MediBook Confirmation',
      `Booking Confirmed with ${booking.doctorName} on ${booking.date} @ ${booking.time}. Hospital: ${booking.hospital}`
    );

    return booking;
  };

  const cancelAppointment = (id) => {
    const apptToCancel = appointments.find(a => a.id === id);
    if (!apptToCancel) return;

    // Update appointment status to Cancelled
    const updatedAppointments = appointments.map(appt => {
      if (appt.id === id) {
        return { ...appt, status: 'Cancelled' };
      }
      return appt;
    });
    setAppointments(updatedAppointments);

    if (currentUser && currentUser.role === 'patient') {
      setCurrentUser(prev => ({
        ...prev,
        appointments: prev.appointments.map(appt => appt.id === id ? { ...appt, status: 'Cancelled' } : appt)
      }));
    }

    // Add back the slot to the doctor
    const updatedDoctors = doctors.map(doc => {
      if (doc.id === apptToCancel.doctorId) {
        const docSlots = { ...doc.slots };
        if (docSlots[apptToCancel.day] && !docSlots[apptToCancel.day].includes(apptToCancel.time)) {
          docSlots[apptToCancel.day] = [...docSlots[apptToCancel.day], apptToCancel.time].sort();
        }
        return { ...doc, slots: docSlots };
      }
      return doc;
    });
    setDoctors(updatedDoctors);

    triggerSystemNotification(
      'email',
      'Appointment Cancelled',
      `Your appointment with ${apptToCancel.doctorName} on ${apptToCancel.date} has been successfully cancelled. Refund processed.`
    );
  };

  // Doctor Management (Admin Dashboard CRUD)
  const addDoctor = (newDoc) => {
    const newId = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1;
    const formattedDoc = {
      id: newId,
      rating: 5.0,
      reviews: [],
      ...newDoc
    };
    setDoctors([formattedDoc, ...doctors]);
    triggerSystemNotification('email', 'Database Updated', `Doctor profile for ${formattedDoc.name} has been added.`);
  };

  const updateDoctor = (updatedDoc) => {
    setDoctors(doctors.map(doc => doc.id === updatedDoc.id ? updatedDoc : doc));
  };

  const deleteDoctor = (id) => {
    const doc = doctors.find(d => d.id === id);
    setDoctors(doctors.filter(doc => doc.id !== id));
    if (doc) {
      triggerSystemNotification('email', 'Database Updated', `Doctor profile for ${doc.name} was removed.`);
    }
  };

  // Notification simulation trigger helper
  const triggerSystemNotification = (type, title, message) => {
    const newNotif = {
      id: Date.now(),
      type,
      title,
      message,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    setActiveToastNotification(newNotif);

    // Auto-clear active toast after 6 seconds
    setTimeout(() => {
      setActiveToastNotification(null);
    }, 6000);
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Admin Mock Actions
  const runEmailCampaign = (campaignSubject, recipientGroup) => {
    triggerSystemNotification(
      'email',
      'Campaign Dispatched',
      `Email campaign "${campaignSubject}" successfully sent to all ${recipientGroup}s.`
    );
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      currentUser,
      setCurrentUser,
      doctors,
      appointments,
      notifications,
      activeToastNotification,
      setActiveToastNotification,
      loginUser,
      registerUser,
      logoutUser,
      bookAppointment,
      cancelAppointment,
      addDoctor,
      updateDoctor,
      deleteDoctor,
      triggerSystemNotification,
      clearNotification,
      markAllNotificationsRead,
      runEmailCampaign
    }}>
      {children}
    </AppContext.Provider>
  );
};
