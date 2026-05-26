import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { WorkoutSet } from '../types';
import { translations } from '../store/translations';

interface LogSetProps {
  onBack?: () => void;
}

const LogSet: React.FC<LogSetProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { exercises, logWorkout, history, language } = useAppStore();
  const t = translations[language].logSet;

  // Get exercise ID from navigation state or URL params
  const exerciseId = location.state?.exerciseId || '1'; // Default to Squat if no ID
  const exercise = exercises.find(e => e.id === exerciseId);

  const [weight, setWeight] = useState(135);
  const [reps, setReps] = useState(8);
  const [rpe, setRpe] = useState(8);
  const [currentSet, setCurrentSet] = useState(1);
  const [sets, setSets] = useState<WorkoutSet[]>([]);

  // Find last session for this exercise
  const lastSession = history.find(h => h.exerciseId === exerciseId);

  if (!exercise) return <div className="p-6">Exercise not found</div>;

  const incrementWeight = () => setWeight(prev => prev + 5);
  const decrementWeight = () => setWeight(prev => Math.max(0, prev - 5));
  const incrementReps = () => setReps(prev => prev + 1);
  const decrementReps = () => setReps(prev => Math.max(0, prev - 1));

  const handleLogSet = () => {
    const newSet: WorkoutSet = { weight, reps, rpe };
    const updatedSets = [...sets, newSet];
    setSets(updatedSets);
    setCurrentSet(prev => prev + 1);

    // Save to global history
    logWorkout({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      exerciseId: exercise.id,
      sets: [newSet],
    });

    navigate(-1);
  };

  return (
    <div className="px-6 py-4 space-y-6 pb-32">
      <div className="space-y-2">
        <h1 className="text-4xl font-black">{exercise.name}</h1>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest border border-blue-200 dark:border-blue-800">{t.target}: {exercise.category}</span>
          {exercise.tags?.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] font-black uppercase tracking-widest border border-purple-200 dark:border-purple-800">{tag}</span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s < currentSet ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
          ))}
        </div>
        <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <span>{language === 'es' ? 'Serie' : 'Set'} {currentSet}</span>
          <span>{t.target}: 8-10 reps</span>
        </div>
      </div>

      {/* Media Player Component */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-900 shadow-2xl group">
        <img
          src={`https://picsum.photos/seed/${exercise.id}/800/450`}
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          alt="Exercise visual"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
          <div className="flex items-center gap-3 text-white">
            <span className="material-symbols-outlined text-4xl">play_circle</span>
            <div>
              <p className="font-bold">{language === 'es' ? 'Ver guía de forma' : 'Watch form guide'}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">{language === 'es' ? 'Impulsado por Gemini AI' : 'Powered by Gemini AI'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Card */}
      <div className="bg-white dark:bg-surface-card rounded-[2rem] p-8 shadow-2xl border border-slate-100 dark:border-white/5 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center block">{t.weight} (lbs)</label>
            <div className="text-center space-y-4">
              <div className="text-6xl font-black text-primary tracking-tighter">{weight}</div>
              <div className="flex justify-center gap-4">
                <button onClick={decrementWeight} className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center active:scale-90 transition-all">
                  <span className="material-symbols-outlined font-bold">remove</span>
                </button>
                <button onClick={incrementWeight} className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center active:scale-90 transition-all">
                  <span className="material-symbols-outlined font-bold">add</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center block">{t.reps}</label>
            <div className="text-center space-y-4">
              <div className="text-6xl font-black text-primary tracking-tighter">{reps}</div>
              <div className="flex justify-center gap-4">
                <button onClick={decrementReps} className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center active:scale-90 transition-all">
                  <span className="material-symbols-outlined font-bold">remove</span>
                </button>
                <button onClick={incrementReps} className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center active:scale-90 transition-all">
                  <span className="material-symbols-outlined font-bold">add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.rpe}</label>
            <span className="text-sm font-black text-orange-500">{rpe} / 10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={rpe}
            onChange={(e) => setRpe(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-orange-500"
          />
          <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
            <span>{t.easy}</span>
            <span>{t.failure}</span>
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col items-center gap-4">
        {lastSession && (
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">history</span>
            {t.lastSession}: {new Date(lastSession.date).toLocaleDateString()}
          </p>
        )}

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark">
          <button
            onClick={handleLogSet}
            className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined font-black">check_circle</span>
            {t.logBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogSet;
