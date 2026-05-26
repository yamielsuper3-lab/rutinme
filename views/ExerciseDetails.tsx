import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../store/translations';

const ExerciseDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { exercises, language } = useAppStore();
    const t = translations[language].exerciseDetails;

    const exercise = exercises.find(e => e.id === id);

    if (!exercise) {
        return (
            <div className="p-6 text-center text-white">
                <p>Exercise not found.</p>
                <button onClick={() => navigate(-1)} className="mt-4 text-primary font-bold">Back</button>
            </div>
        )
    }

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-gray-100 font-sans antialiased min-h-screen flex flex-col selection:bg-primary selection:text-white relative pb-32">
            {/* Fixed Header Bar (Transparent but with info) - adapted from HTML but simplified for app context */}

            <div className="relative w-full h-[55vh] bg-surface-darker overflow-hidden rounded-b-[2rem] shadow-2xl shadow-black/50">
                {exercise.videoUrl ? (
                    <img alt={exercise.name} className="w-full h-full object-cover opacity-60 mix-blend-overlay" src={exercise.videoUrl} />
                ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center opacity-60">
                        <span className="material-symbols-outlined text-6xl text-slate-600">fitness_center</span>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>

                {/* 360 View Badge */}
                <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-2 flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-xl">360</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">{t.view}</span>
                </div>

                {/* Title Block */}
                <div className="absolute bottom-8 left-6 right-6">
                    <div className="flex items-center gap-2 mb-2">
                        {exercise.tags?.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-white uppercase tracking-wider">{tag}</span>
                        ))}
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-gray-300 border border-white/5 uppercase tracking-wider">{exercise.category}</span>
                    </div>
                    <h1 className="text-4xl font-black text-white leading-none tracking-tight mb-2">{exercise.name}</h1>
                    <p className="text-sm text-gray-400 font-medium">{exercise.description || 'Exercise Description'}</p>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                    </div>
                </div>
            </div>

            <div className="px-6 py-8 space-y-10">
                {/* Strategic Rationale */}
                {exercise.rationale && (
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-xl">psychology</span>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted">{t.rationale}</h2>
                        </div>
                        <div className="bg-surface-dark border border-white/5 rounded-2xl p-6 relative overflow-hidden group shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed font-medium relative z-10">
                                {exercise.rationale}
                            </p>
                        </div>
                    </section>
                )}

                {/* Biomechanical Focus */}
                {exercise.focus && (
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-xl">accessibility_new</span>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted">{t.focus}</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-surface-dark border border-white/5 rounded-xl p-5 shadow-lg">
                                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center mb-3">
                                    <span className="material-symbols-outlined text-red-500 text-sm">fitness_center</span>
                                </div>
                                <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">{t.agonists}</h3>
                                {exercise.focus.agonists.map(m => (
                                    <p key={m} className="dark:text-white text-slate-800 font-bold text-lg">{m}</p>
                                ))}
                            </div>
                            <div className="bg-surface-dark border border-white/5 rounded-xl p-5 shadow-lg">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                                    <span className="material-symbols-outlined text-blue-500 text-sm">group_work</span>
                                </div>
                                <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">{t.synergists}</h3>
                                {exercise.focus.synergists.map(m => (
                                    <p key={m} className="dark:text-white text-slate-800 font-bold text-lg">{m}</p>
                                ))}
                            </div>
                            <div className="bg-surface-dark border border-white/5 rounded-xl p-5 col-span-2 flex items-center justify-between shadow-lg">
                                <div>
                                    <h3 className="text-xs font-bold uppercase text-gray-500 mb-1">{t.stabilizers}</h3>
                                    <p className="dark:text-white text-slate-800 font-medium">{exercise.focus.stabilizers.join(', ')}</p>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-emerald-500 text-sm">balance</span>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Technical Mastery */}
                {exercise.technique && (
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted">{t.mastery}</h2>
                        </div>
                        <div className="space-y-4">
                            {exercise.technique.map((step, idx) => (
                                <div key={idx} className="relative p-5 rounded-2xl bg-surface-dark border border-white/5 hover:border-primary/30 transition-all duration-300 shadow-lg">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 dark:bg-white/10 rounded-l-2xl"></div>
                                    {/* Highlight first item or all? HTML had first item primary. Let's make first item primary for flair */}
                                    {idx === 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl z-10"></div>}

                                    <div className="flex flex-col gap-2 pl-2">
                                        <h4 className="dark:text-white text-slate-900 font-black text-lg tracking-tight uppercase flex items-center gap-2">
                                            {step.title}
                                        </h4>
                                        <p className="text-sm dark:text-gray-300 text-slate-600 leading-relaxed font-medium">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent z-40 backdrop-blur-lg">
                <button
                    onClick={() => navigate(-1)}
                    className="w-full bg-primary hover:bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    {t.backToSession}
                </button>
                <div className="mt-6 mx-auto w-1/3 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
        </div>
    );
};

export default ExerciseDetails;
