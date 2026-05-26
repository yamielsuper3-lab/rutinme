import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useNavigate } from 'react-router-dom';
import { translations } from '../store/translations';

interface LibraryProps {
  onSelectExercise?: () => void; // Made optional as we use internal navigation now too
}

const Library: React.FC<LibraryProps> = ({ onSelectExercise }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>('All');
  const { exercises, language } = useAppStore();
  const navigate = useNavigate();
  const t = translations[language].library;

  // Get unique categories from exercises
  const categories = Array.from(new Set(exercises.map(e => e.category)));

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || ex.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExerciseClick = (id: string) => {
    // Navigate to log set for this exercise
    if (onSelectExercise) {
      onSelectExercise();
    } else {
      navigate('/log-set', { state: { exerciseId: id } });
    }
  };

  return (
    <div className="px-6 py-4 space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-black">{t.title}</h1>
        <p className="text-sm text-slate-500 font-medium -mt-3">{t.subtitle}</p>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full bg-white dark:bg-surface-card border-none rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {['All', ...categories].map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase whitespace-nowrap border transition-colors ${activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                  : 'bg-white dark:bg-surface-card text-slate-500 border-slate-100 dark:border-white/5'
                }`}
            >
              {cat === 'All' ? t.all : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3">
          {filteredExercises.map((ex) => (
            <button
              key={ex.id}
              onClick={() => handleExerciseClick(ex.id)}
              className="w-full text-left bg-white dark:bg-surface-card p-5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:scale-[1.01] transition-transform active:scale-[0.99]"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl font-black">{ex.name}</h4>
                <span className="material-symbols-outlined text-primary">fitness_center</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  {ex.category}
                </span>
                {ex.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}

          {filteredExercises.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              {t.noExercises}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
