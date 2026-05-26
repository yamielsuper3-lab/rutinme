import React, { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../store/translations';
import { RoutineItem } from '../types';

interface DashboardProps {
  onStartExercise: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartExercise }) => {
  const { language, schedule, exercises } = useAppStore();
  const t = translations[language].dashboard;

  // Get current day (0=Sunday, 1=Monday...)
  const today = new Date().getDay();
  const tomorrow = (today + 1) % 7;

  // Helper to get routine and title for a specific day
  const getDailyData = (dayIndex: number) => {
    const routine: RoutineItem[] = schedule[dayIndex] || [];
    let title = '';
    let subtitle = '';

    switch (dayIndex) {
      case 1: title = language === 'es' ? 'Lunes' : 'Monday'; subtitle = language === 'es' ? 'Sentadilla & Accesorios' : 'Squat & Accessories'; break;
      case 2: title = language === 'es' ? 'Martes' : 'Tuesday'; subtitle = language === 'es' ? 'Banca & Espalda' : 'Bench & Back'; break;
      case 3: title = language === 'es' ? 'Miércoles' : 'Wednesday'; subtitle = language === 'es' ? 'Recuperación Activa' : 'Active Recovery'; break;
      case 4: title = language === 'es' ? 'Jueves' : 'Thursday'; subtitle = language === 'es' ? 'Peso Muerto & Pierna' : 'Deadlift & Legs'; break;
      case 5: title = language === 'es' ? 'Viernes' : 'Friday'; subtitle = language === 'es' ? 'Militar & Hipertrofia' : 'OHP & Hypertrophy'; break;
      case 6: title = language === 'es' ? 'Sábado' : 'Saturday'; subtitle = language === 'es' ? 'Optimización' : 'Optimization'; break;
      case 0: title = language === 'es' ? 'Domingo' : 'Sunday'; subtitle = language === 'es' ? 'Descanso Total' : 'Rest Day'; break;
    }

    const mappedExercises = routine.map(item => {
      const exercise = exercises.find(e => e.id === item.exerciseId);
      return {
        ...exercise,
        setsLabel: item.sets,
        repsLabel: item.reps,
        color: exercise?.category === 'Legs' ? 'bg-primary' : exercise?.category === 'Chest' ? 'bg-blue-500' : 'bg-indigo-500'
      };
    }).filter(e => e.id);

    return { title, subtitle, exercises: mappedExercises, isRest: routine.length === 0 };
  };

  const todayData = getDailyData(today);
  const tomorrowData = getDailyData(tomorrow);

  return (
    <div className="px-6 py-4 space-y-8 pb-8">
      {/* Readiness Card */}
      <div className="bg-white dark:bg-surface-card p-5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm flex items-center gap-5 relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100 dark:text-slate-800" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="251.2" strokeDashoffset="37.68" strokeLinecap="round" className="text-recovery-green drop-shadow-[0_0_4px_rgba(52,199,89,0.5)]" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold tracking-tighter">85</span>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg">Readiness High</h3>
          <div className="text-[11px] text-slate-500 flex gap-x-3 mt-1 font-mono uppercase">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>HRV 62ms</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>Sleep 8.1h</span>
          </div>
        </div>
      </div>

      {/* TODAY'S ROUTINE */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold leading-tight">{todayData.title}</h2>
            <p className="text-sm text-slate-500 font-medium">{todayData.subtitle}</p>
          </div>
        </div>

        <div className="relative space-y-3 pl-2">
          {!todayData.isRest && <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-200 dark:bg-white/10" />}

          {todayData.exercises.map((ex, idx) => (
            <div key={idx} className="relative pl-8 group cursor-pointer" onClick={onStartExercise}>
              <div className={`absolute left-[3px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-background-light dark:border-background-dark z-10 ${ex.color || 'bg-slate-400'}`} />
              <div className="bg-white dark:bg-surface-card border-l-2 border-slate-200 dark:border-white/5 rounded-r-xl py-3.5 px-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <div className="flex flex-col">
                  <span className={`text-[9px] font-bold uppercase tracking-widest mb-0.5 ${ex.color?.replace('bg-', 'text-') || 'text-slate-400'}`}>{ex.setsLabel}</span>
                  <span className="font-semibold text-sm">{ex.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono bg-slate-100 dark:bg-black/40 px-2 py-1 rounded text-slate-500 dark:text-slate-400">{ex.repsLabel}</span>
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
                </div>
              </div>
            </div>
          ))}

          {todayData.isRest && (
            <div className="py-8 text-center border-2 border-dashed border-slate-200 dark:border-white/5 rounded-2xl">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">spa</span>
              <p className="text-slate-500 font-medium">{t.restDay}</p>
            </div>
          )}

          {!todayData.isRest && (
            <button className="w-full relative pl-8 mt-2 group">
              <div className="absolute left-[3px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-transparent z-10" />
              <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl py-3 flex items-center justify-center text-slate-400 group-hover:border-primary group-hover:text-primary transition-all">
                <span className="material-symbols-outlined text-sm mr-2">add</span>
                <span className="text-xs font-bold uppercase tracking-widest">{t.startWorkout}</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {!todayData.isRest && (
        <button
          onClick={onStartExercise}
          className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined">play_arrow</span>
          {t.startWorkout}
        </button>
      )}

      {/* TOMORROW'S ROUTINE */}
      <div className="pt-6 border-t border-slate-100 dark:border-white/5">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{t.tomorrowsRoutine} — {tomorrowData.title}</h3>

        <div className="space-y-3 opacity-60 hover:opacity-100 transition-opacity">
          {tomorrowData.isRest ? (
            <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">spa</span>
              <span className="text-sm font-medium text-slate-500">{t.restDay}</span>
            </div>
          ) : (
            tomorrowData.exercises.map((ex, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <div className={`w-1.5 h-8 rounded-full ${ex.color || 'bg-slate-400'}`} />
                <div>
                  <p className="text-sm font-bold">{ex.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">{ex.setsLabel}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
