import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, LogOut, HeartPulse 
} from 'lucide-react';
import * as Icons from 'lucide-react';

const Sidebar = ({ menuItems, activeTab, setActiveTab, title, userName, avatar, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  const renderIcon = (iconName, className) => {
    const IconComponent = Icons[iconName] || Icons.HelpCircle;
    return <IconComponent className={className} />;
  };

  return (
    <aside 
      className={`glass-panel border-r border-slate-200 dark:border-slate-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 z-20 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200/50 dark:border-slate-800/50">
        {!collapsed && (
          <span className="font-extrabold text-sm tracking-wider uppercase bg-gradient-to-r from-medical-600 to-teal-500 bg-clip-text text-transparent dark:from-medical-400 dark:to-teal-300">
            {title}
          </span>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400 mx-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Profile summary */}
      <div className="p-4 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center gap-3">
        <img 
          src={avatar} 
          alt={userName} 
          className="h-9 w-9 rounded-full object-cover shadow-md border-2 border-medical-500 shrink-0" 
        />
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-bold text-xs truncate text-slate-800 dark:text-slate-200">{userName}</p>
            <p className="text-[10px] text-slate-500 font-medium">Online</p>
          </div>
        )}
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-medical-600/10 to-teal-500/10 dark:from-medical-600/20 dark:to-teal-500/20 text-medical-600 dark:text-medical-400 border-l-4 border-medical-500' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title={collapsed ? item.label : undefined}
            >
              {renderIcon(item.icon, `h-5 w-5 shrink-0 ${isActive ? 'text-medical-500' : 'text-slate-400 dark:text-slate-500'}`)}
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer / Logout */}
      <div className="p-2 border-t border-slate-200/50 dark:border-slate-800/50">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-all"
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
