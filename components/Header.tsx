import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../store/translations';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useAppStore();
  const t = translations[language].header;

  const getTitle = () => {
    switch (location.pathname) {
      case '/': return t.rutinme;
      case '/library': return t.library;
      case '/progress': return t.progress;
      case '/profile': return t.profile;
      case '/log-set': return t.activeSession;
      default: return t.rutinme;
    }
  };

  const isLogSet = location.pathname === '/log-set';

  return (
    <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 pt-4 pb-2 border-b border-transparent dark:border-white/5">
      <div className="flex justify-between items-center mb-2">
        <div className="text-[14px] font-semibold tracking-wide">9:41</div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px]">signal_cellular_alt</span>
          <span className="material-symbols-outlined text-[18px]">wifi</span>
          <span className="material-symbols-outlined text-[18px] rotate-180">battery_full</span>
        </div>
      </div>

      <div className="flex items-center justify-between py-2">
        {isLogSet ? (
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        ) : (
          <div className="w-10" />
        )}

        <h1 className="text-xl font-extrabold tracking-tight">{getTitle()}</h1>

        <button className="p-2 -mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
