import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../store/translations';

interface ProfileProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({ darkMode, setDarkMode }) => {
  const { userProfile, updateProfile, language, setLanguage } = useAppStore();
  const t = translations[language].profile;
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userProfile.name);

  // Simple BMI calc just for visuals
  const heightM = (userProfile.height || 180) / 100;
  const bmi = (userProfile.weight || 75) / (heightM * heightM);
  let bmiLabel = 'Normal';
  if (bmi > 25) bmiLabel = 'Overweight';
  if (bmi > 30) bmiLabel = 'Obese';
  if (bmi < 18.5) bmiLabel = 'Underweight';
  if (bmi > 25 && bmi < 30 && (userProfile.bodyFat || 15) < 15) bmiLabel = 'Athletic';

  const handleSave = () => {
    updateProfile({ name: tempName });
    setIsEditing(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <div className="px-6 py-4 space-y-8 pb-24">
      <header className="flex justify-between items-center">
        <div>
          {isEditing ? (
            <input
              autoFocus
              className="text-3xl font-black bg-transparent border-b border-primary outline-none max-w-[200px]"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          ) : (
            <h1 className="text-3xl font-black onClick={() => setIsEditing(true)} cursor-pointer">{userProfile.name}</h1>
          )}
          <p className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase mt-1">{t.subtitle}</p>
        </div>
        <div className="relative" onClick={() => setIsEditing(true)}>
          <img src="https://picsum.photos/100/100" className="w-12 h-12 rounded-full border-2 border-primary shadow-lg shadow-primary/20" alt="Avatar" />
          <div className="absolute -bottom-1 -right-1 bg-primary text-white p-0.5 rounded-full border-2 border-background-light dark:border-background-dark">
            <span className="material-symbols-outlined text-[12px] font-bold">edit</span>
          </div>
        </div>
      </header>

      {/* Silhouette & Stats Area */}
      <div className="relative h-[440px] flex items-center justify-center">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Floating Stat Boxes */}
        <div className="absolute left-0 top-10 space-y-4">
          <div className="bg-white/50 dark:bg-surface-card/60 backdrop-blur-md p-3 rounded-xl border border-white/5 shadow-sm text-center w-24">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.age}</span>
            <span className="text-xl font-black">28</span>
          </div>
          <div className="bg-white/50 dark:bg-surface-card/60 backdrop-blur-md p-3 rounded-xl border border-white/5 shadow-sm text-center w-24">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.weight}</span>
            <span className="text-xl font-black">{userProfile.weight || 75}<span className="text-xs font-medium ml-0.5">kg</span></span>
          </div>
        </div>

        <div className="absolute right-0 top-10 space-y-4">
          <div className="bg-white/50 dark:bg-surface-card/60 backdrop-blur-md p-3 rounded-xl border border-white/5 shadow-sm text-center w-24">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.height}</span>
            <span className="text-xl font-black">{userProfile.height || 180}<span className="text-xs font-medium ml-0.5">cm</span></span>
          </div>
          <div className="bg-white/50 dark:bg-surface-card/60 backdrop-blur-md p-3 rounded-xl border border-white/5 shadow-sm text-center w-24">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.bodyFat}</span>
            <span className="text-xl font-black">{userProfile.bodyFat || 15}<span className="text-xs font-medium ml-0.5">%</span></span>
          </div>
        </div>

        {/* Body SVG */}
        <div className="relative w-48 h-full flex flex-col items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(1,99,245,0.4)]">
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0163f5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0163f5" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M50 10 C55 10 60 14 60 20 C60 26 55 30 50 30 C45 30 40 26 40 20 C40 14 45 10 50 10 Z" fill="url(#bodyGradient)" />
            <path d="M50 32 C65 32 75 40 78 55 L82 90 C83 95 80 98 75 98 L72 98 C68 98 66 94 65 90 L62 60 L62 95 L65 130 C66 140 68 150 70 180 C71 185 68 188 62 188 L58 188 C54 188 52 184 51 180 L50 140 L49 180 C48 184 46 188 42 188 L38 188 C32 188 29 185 30 180 C32 150 34 140 35 130 L38 95 L38 60 L35 90 C34 94 32 98 28 98 L25 98 C20 98 17 95 18 90 L22 55 C25 40 35 32 50 32 Z" fill="url(#bodyGradient)" />
          </svg>

          <div className="absolute bottom-8 px-4 py-2 rounded-full bg-white dark:bg-surface-card border border-primary/20 flex items-center gap-2 shadow-xl">
            <span className="material-symbols-outlined text-sm text-primary">shield</span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">{bmiLabel}</span>
          </div>
        </div>
      </div>

      {/* Preferences / Settings */}
      <section className="space-y-4 pb-8">
        <h3 className="font-black text-lg">{t.preferences}</h3>
        <div className="bg-white dark:bg-surface-card rounded-2xl border border-slate-100 dark:border-white/5 divide-y dark:divide-white/5 overflow-hidden">
          {/* Dark Mode */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-primary">dark_mode</span>
              <span className="font-bold">{t.darkMode}</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-primary' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${darkMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-indigo-500">translate</span>
              <span className="font-bold">{t.language}</span>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-xs uppercase tracking-wider"
            >
              <span>{language === 'es' ? 'Español' : 'English'}</span>
              <span className="material-symbols-outlined text-sm">sync_alt</span>
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-4 opacity-50">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">notifications</span>
              <span className="font-bold">{t.notifications}</span>
            </div>
            <button className="relative w-12 h-6 bg-slate-200 rounded-full">
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow" />
            </button>
          </div>
        </div>

        {/* Premium Promo */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl border border-white/5 shadow-2xl">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative space-y-4">
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest">Pro</span>
            <div>
              <h4 className="text-2xl font-black text-white leading-tight">{t.proTitle}</h4>
              <p className="text-sm text-slate-400 font-medium mt-2 max-w-[240px]">{t.proDesc}</p>
            </div>
            <button className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all">
              {t.goPremium} <span className="text-xs opacity-70 ml-2">$4.99/mo</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <button className="w-full py-4 text-red-500 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500/5 rounded-xl transition-all">
          <span className="material-symbols-outlined">logout</span>
          {t.signOut}
        </button>
      </section>
    </div>
  );
};

export default Profile;
