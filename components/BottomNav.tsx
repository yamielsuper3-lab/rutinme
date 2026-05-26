import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../store/translations';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useAppStore();
  const t = translations[language].nav;

  const items = [
    { path: '/', label: t.home, icon: 'home' },
    { path: '/library', label: t.workouts, icon: 'directions_run' },
    { path: '/progress', label: t.progress, icon: 'show_chart' },
    { path: '/profile', label: t.profile, icon: 'person' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background-light/95 dark:bg-[#080808]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 pt-3 pb-8 px-6 z-40">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {items.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${isActive(item.path) ? 'text-primary scale-110' : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'
              }`}
          >
            <span className={`material-symbols-outlined text-2xl ${isActive(item.path) ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 mx-auto w-1/3 h-1 bg-slate-300 dark:bg-slate-800 rounded-full" />
    </nav>
  );
};

export default BottomNav;
