import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../store/translations';

const Welcome: React.FC = () => {
    const navigate = useNavigate();
    const { userProfile, language } = useAppStore();
    const t = translations[language].welcome || {
        greeting: `Welcome, ${userProfile.name}`,
        ready: 'Ready to train?',
        start: 'START'
    };

    const [showOptions, setShowOptions] = useState(false);

    // Fallback if translation missing during transition
    const greeting = language === 'es' ? `Bienvenido, ${userProfile.name}` : `Welcome, ${userProfile.name}`;
    const ready = language === 'es' ? '¿Listo para entrenar?' : 'Ready to train?';
    const start = language === 'es' ? 'INICIAR' : 'START';

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Abstract Background Decoration */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[30%] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="z-10 text-center space-y-8 animate-fade-in-up">
                <div className="mb-8">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-primary to-blue-600 rounded-3xl shadow-2xl shadow-primary/40 flex items-center justify-center rotate-3 mb-6">
                        <span className="material-symbols-outlined text-5xl text-white">fitness_center</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                        {greeting}
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                        {ready}
                    </p>
                </div>

                {!showOptions ? (
                    <button
                        onClick={() => setShowOptions(true)}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-black text-white transition-all duration-300 bg-primary rounded-full hover:bg-primary-dark hover:scale-105 shadow-xl shadow-primary/30 mt-12 w-full max-w-xs"
                    >
                        <span className="mr-2 text-lg tracking-widest uppercase">{start}</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                ) : (
                    <div className="flex flex-col gap-4 mt-8 w-full max-w-xs animate-fade-in-up">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-4 bg-white dark:bg-surface-card border border-slate-100 dark:border-white/10 rounded-2xl font-bold text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary transition-all shadow-lg"
                        >
                            {t.useEstablished || 'Use Current Routine'}
                        </button>
                        <button
                            onClick={() => navigate('/create-routine')}
                            className="w-full py-4 bg-slate-800 dark:bg-white/10 rounded-2xl font-bold text-white hover:bg-primary transition-all shadow-lg"
                        >
                            {t.createNew || 'Create New Routine'}
                        </button>
                    </div>
                )}
            </div>

            <p className="absolute bottom-8 text-[10px] uppercase tracking-[0.3em] text-slate-400 opacity-60">
                RutinMe Performance
            </p>
        </div>
    );
};

export default Welcome;
