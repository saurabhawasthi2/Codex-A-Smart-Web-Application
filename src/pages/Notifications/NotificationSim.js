import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Smartphone, ShieldCheck, HeartPulse, Trash2, 
  Send, ExternalLink, Calendar, CreditCard, ShieldAlert 
} from 'lucide-react';

const NotificationSim = () => {
  const { notifications, clearNotification, triggerSystemNotification } = useContext(AppContext);
  const [activeNotifId, setActiveNotifId] = useState(notifications[0]?.id || null);

  const activeNotif = notifications.find(n => n.id === activeNotifId) || notifications[0];

  const handleCreateMockReminder = (type) => {
    if (type === 'appt') {
      triggerSystemNotification(
        'email',
        'APPOINTMENT REMINDER: Consult on June 15th',
        'Dear John Doe, this is a friendly reminder that you have an upcoming consultation with Dr. Sarah Jenkins scheduled for June 15th at 10:30 AM at Metro General Hospital. Please arrive 10 minutes early.'
      );
    } else {
      triggerSystemNotification(
        'sms',
        'PAYMENT REMINDER: MediBook Invoice',
        'MediBook Alert: Payment invoice INV-9018 is pending audit check. Amount due: $150.00. Please clear via link: medibook-pay.com'
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      
      {/* Header Description */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Email & SMS Notification Simulator
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold">
          Audit the responsive HTML emails and mobile SMS templates dispatched by the MediBook platform.
        </p>
      </div>

      {/* Controller Buttons to trigger mock alerts */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 mb-6 flex flex-wrap gap-3 items-center justify-between">
        <span className="text-xs font-bold text-slate-650 dark:text-slate-350">Quick Trigger Testing Alerts:</span>
        <div className="flex gap-2">
          <button
            onClick={() => handleCreateMockReminder('appt')}
            className="px-3.5 py-2 bg-gradient-to-r from-medical-600 to-teal-500 hover:from-medical-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Calendar className="h-3.5 w-3.5" /> Trigger Appointment Reminder
          </button>
          <button
            onClick={() => handleCreateMockReminder('payment')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <CreditCard className="h-3.5 w-3.5" /> Trigger Payment Reminder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: LIST OF DISPATCHED NOTIFICATIONS */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-sm border-b pb-2 uppercase tracking-wider text-[11px] text-slate-500">Dispatched logs</h3>
          
          {notifications.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-6">No logs recorded yet. Click a trigger above to dispatch.</p>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              {notifications.map((notif) => {
                const isActive = (activeNotif?.id === notif.id);
                return (
                  <div
                    key={notif.id}
                    onClick={() => setActiveNotifId(notif.id)}
                    className={`p-3.5 border rounded-2xl cursor-pointer text-left transition-all ${
                      isActive
                        ? 'border-medical-500 bg-medical-50/50 dark:bg-medical-950/20 shadow-sm'
                        : 'border-slate-150 dark:border-slate-850 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 text-slate-500'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1 ${
                        notif.type === 'email' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40' : 'bg-green-100 text-green-700 dark:bg-green-950/40'
                      }`}>
                        {notif.type === 'email' ? <Mail className="h-2.5 w-2.5" /> : <Smartphone className="h-2.5 w-2.5" />}
                        {notif.type}
                      </span>
                      <span className="text-[8px] text-slate-400 font-bold">{notif.date.split(' ')[0]}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-2 line-clamp-1">{notif.title}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{notif.message}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INTERACTIVE VISUAL DISPLAY IN MOCK DEVICE FRAMES */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-extrabold text-slate-850 dark:text-slate-150 text-sm border-b pb-2 uppercase tracking-wider text-[11px] text-slate-500">Visual mockup frames</h3>
          
          <AnimatePresence mode="wait">
            {!activeNotif ? (
              <div className="text-center py-20 bg-slate-50/20 dark:bg-slate-900/10 border border-dashed rounded-3xl p-8">
                <ShieldCheck className="h-10 w-10 text-slate-350 mx-auto" />
                <p className="text-xs text-slate-400 font-bold mt-2">Pick an alert log on the sidebar to view mock frame rendering.</p>
              </div>
            ) : activeNotif.type === 'email' ? (
              
              // DESKTOP EMAIL BROWSER MOCKUP
              <motion.div
                key={activeNotif.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-lg bg-white text-slate-800"
              >
                {/* Browser top bars */}
                <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5 shrink-0">
                    <span className="h-3 w-3 rounded-full bg-rose-450 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <div className="bg-white border border-slate-200 text-[10px] text-slate-500 font-bold px-3 py-0.5 rounded-md w-full max-w-sm truncate select-none">
                    https://medibook-health-inbox.com/verification
                  </div>
                </div>

                {/* Email headers */}
                <div className="p-4 border-b border-slate-100 space-y-1 bg-slate-50 text-xs font-semibold text-slate-650">
                  <p>From: <span className="font-extrabold text-slate-800">MediBook Systems &lt;noreply@medibook-health.com&gt;</span></p>
                  <p>To: <span className="font-bold">John Doe &lt;john.doe@example.com&gt;</span></p>
                  <p>Subject: <span className="font-extrabold text-slate-900">{activeNotif.title}</span></p>
                </div>

                {/* Responsive Email template content rendering */}
                <div className="p-6 sm:p-10 space-y-6">
                  {/* Email Logo Header */}
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                    <div className="bg-medical-500 p-2 rounded-xl text-white">
                      <HeartPulse className="h-6 w-6" />
                    </div>
                    <span className="font-extrabold text-lg text-slate-900">MediBook Health Group</span>
                  </div>

                  {/* Mail description */}
                  <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                    <h3 className="font-extrabold text-base text-slate-900">{activeNotif.title}</h3>
                    <p>{activeNotif.message}</p>
                    <p>If you did not initiate this action or would like to change your booking slot settings, please access your profile dashboard.</p>
                  </div>

                  {/* Email footer credentials */}
                  <div className="border-t border-slate-100 pt-6 text-[10px] text-slate-400 font-semibold space-y-1">
                    <p>© 2026 MediBook Group Inc. 123 Health Care Blvd, Suite 400, New York, NY 10001</p>
                    <p>HIPAA Compliance Protected Electronic Message. Do not forward to unverified addresses.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              
              // MOBILE SMS SMARTPHONE DEVICE MOCKUP
              <motion.div
                key={activeNotif.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-xs mx-auto border-8 border-slate-800 dark:border-slate-850 rounded-[40px] overflow-hidden bg-slate-950 text-white relative shadow-2xl h-[500px] flex flex-col"
              >
                {/* Speaker top bar */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-28 bg-slate-800 rounded-full z-20 flex justify-center items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-900 inline-block" />
                </div>

                {/* Device Screen body */}
                <div className="flex-1 flex flex-col pt-8 bg-slate-900">
                  {/* SMS contact header */}
                  <div className="p-3 border-b border-slate-800/80 text-center space-y-0.5 shrink-0 bg-slate-850/50">
                    <p className="font-black text-xs">MEDIBOOK ALERT</p>
                    <p className="text-[9px] text-slate-500 font-bold">Online</p>
                  </div>

                  {/* SMS Message panel body */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col justify-end">
                    
                    {/* Timestamp header */}
                    <p className="text-[8px] text-slate-500 text-center font-bold uppercase tracking-wider">Today {activeNotif.date.split(' ')[1]}</p>

                    {/* Received Message speech bubbles bubble */}
                    <div className="bg-slate-800 text-slate-100 text-[11px] font-semibold leading-relaxed p-3.5 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm self-start">
                      {activeNotif.message}
                    </div>

                    {/* Sent Reply bubble simulator */}
                    <div className="bg-medical-600 text-white text-[11px] font-bold p-3.5 rounded-2xl rounded-tr-none max-w-[80%] shadow-sm self-end">
                      Thank you. I have checked my MediBook dashboard.
                    </div>
                  </div>

                  {/* SMS text field footer */}
                  <div className="p-2 border-t border-slate-800/80 bg-slate-950 flex gap-2 items-center shrink-0 pb-4">
                    <input 
                      type="text" 
                      placeholder="Text Message" 
                      disabled
                      className="bg-slate-900 border border-slate-800 text-slate-500 rounded-full px-3 py-1.5 text-[10px] w-full" 
                    />
                    <div className="h-6 w-6 bg-medical-500 text-white rounded-full flex items-center justify-center shrink-0">
                      <Send className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default NotificationSim;
