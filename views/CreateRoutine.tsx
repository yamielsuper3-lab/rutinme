import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../store/translations';
import { WeeklySchedule, RoutineItem, Exercise } from '../types';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const CreateRoutine: React.FC = () => {
    const navigate = useNavigate();
    const { language, exercises, setSchedule } = useAppStore();
    const t = translations[language].createRoutine;

    const [currentDayIndex, setCurrentDayIndex] = useState(1); // Start on Monday
    const [scheduleMap, setScheduleMap] = useState<WeeklySchedule>({
        0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Selection State
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [setsInput, setSetsInput] = useState('3 Sets');
    const [repsInput, setRepsInput] = useState('10 Reps');

    const currentDayName = language === 'es' ? dias[currentDayIndex] : days[currentDayIndex];
    const currentExercises = scheduleMap[currentDayIndex] || [];

    const handleNext = () => { /* logic inside handleProgress */ };

    const handleProgress = () => {
        if (currentDayIndex === 6) {
            setCurrentDayIndex(0);
        } else if (currentDayIndex === 0) {
            handleFinish();
        } else {
            setCurrentDayIndex(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentDayIndex === 1) return;
        if (currentDayIndex === 0) {
            setCurrentDayIndex(6);
        } else {
            setCurrentDayIndex(prev => prev - 1);
        }
    };

    const handleFinish = () => {
        setSchedule(scheduleMap);
        navigate('/dashboard');
    };

    const toggleRestDay = () => {
        setScheduleMap(prev => ({
            ...prev,
            [currentDayIndex]: []
        }));
    };

    const confirmAddExercise = () => {
        if (!selectedExercise) return;

        const newItem: RoutineItem = {
            exerciseId: selectedExercise.id,
            sets: setsInput,
            reps: repsInput
        };
        setScheduleMap(prev => ({
            ...prev,
            [currentDayIndex]: [...(prev[currentDayIndex] || []), newItem]
        }));

        // Reset and close
        setSelectedExercise(null);
        setSetsInput('3 Sets');
        setRepsInput('10 Reps');
        setIsModalOpen(false);
    };

    const openModal = () => {
        setSelectedExercise(null);
        setIsModalOpen(true);
    }

    const step = currentDayIndex === 0 ? 7 : currentDayIndex;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-sans">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between bg-white dark:bg-surface-card border-b border-slate-100 dark:border-white/5">
                <button onClick={() => navigate('/')} className="text-slate-400 hover:text-primary active:scale-95 transition-transform">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h1 className="font-black text-lg tracking-tight uppercase">{t.title}</h1>
                <div className="w-6" />
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-slate-100 dark:bg-white/5 w-full">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(step / 7) * 100}%` }}
                />
            </div>

            <div className="flex-1 p-6 flex flex-col space-y-6 overflow-y-auto">
                <div className="text-center space-y-1">
                    <h2 className="text-4xl font-black">{currentDayName}</h2>
                    <p className="text-slate-500 font-medium text-sm uppercase tracking-widest">{currentExercises.length} {language === 'es' ? 'Ejercicios' : 'Exercises'}</p>
                </div>

                <div className="space-y-3">
                    {currentExercises.length === 0 && (
                        <div className="p-8 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-400 space-y-2">
                            <span className="material-symbols-outlined text-4xl">bedtime</span>
                            <span className="font-bold">{t.isRestDay}</span>
                        </div>
                    )}

                    {currentExercises.map((item, idx) => {
                        const ex = exercises.find(e => e.id === item.exerciseId);
                        return (
                            <div key={idx} className="bg-white dark:bg-surface-card p-4 rounded-xl shadow-sm border border-slate-100 dark:border-white/5 flex justify-between items-center animate-fade-in-up">
                                <div>
                                    <p className="font-bold">{ex?.name || 'Unknown'}</p>
                                    <p className="text-xs text-slate-500">{item.sets} • {item.reps}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        const newDayList = [...currentExercises];
                                        newDayList.splice(idx, 1);
                                        setScheduleMap(prev => ({ ...prev, [currentDayIndex]: newDayList }));
                                    }}
                                    className="text-slate-300 hover:text-red-500 active:scale-90 transition-transform"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={openModal}
                        className="py-4 rounded-xl bg-slate-100 dark:bg-white/5 font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-white/10 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined">add</span>
                        {t.addExercise}
                    </button>
                    <button
                        onClick={toggleRestDay}
                        className="py-4 rounded-xl border border-slate-200 dark:border-white/10 font-bold text-slate-400 hover:text-primary hover:border-primary active:scale-95 transition-all"
                    >
                        {t.setRestDay}
                    </button>
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="p-6 bg-white dark:bg-surface-card border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <button
                    onClick={handleBack}
                    disabled={currentDayIndex === 1}
                    className={`font-bold text-slate-400 uppercase tracking-widest text-sm ${currentDayIndex === 1 ? 'opacity-30' : 'hover:text-primary active:scale-95 transition-transform'}`}
                >
                    {t.back}
                </button>

                <button
                    onClick={handleProgress}
                    className="bg-primary text-white px-8 py-3 rounded-full font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
                >
                    {currentDayIndex === 0 ? t.finish : t.next}
                </button>
            </div>

            {/* Add Exercise Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-background-dark w-full max-w-md rounded-2xl h-[80vh] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-white/5">
                            <h3 className="font-bold text-lg">{selectedExercise ? selectedExercise.name : t.selectExercises}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {!selectedExercise ? (
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {exercises.map(ex => (
                                    <div
                                        key={ex.id}
                                        className="w-full text-left p-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl flex justify-between items-center group hover:border-primary/50 transition-colors"
                                    >
                                        <div className="flex-1 min-w-0 mr-3">
                                            <p className="font-bold truncate">{ex.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{ex.category}</p>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigate(`/exercise/${ex.id}`); }}
                                                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:scale-105 active:scale-95 transition-all"
                                                title="Info"
                                            >
                                                <span className="material-symbols-outlined text-sm font-bold">question_mark</span>
                                            </button>
                                            <button
                                                onClick={() => setSelectedExercise(ex)}
                                                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:scale-105 active:scale-95 transition-all"
                                                title="Add"
                                            >
                                                <span className="material-symbols-outlined text-sm font-bold">add</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="h-12" /> {/* Spacer for bottom safe area */}
                            </div>
                        ) : (
                            <div className="p-6 space-y-6 animate-fade-in-right">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">{t.sets}</label>
                                        <input
                                            type="text"
                                            value={setsInput}
                                            onChange={(e) => setSetsInput(e.target.value)}
                                            className="w-full p-4 bg-slate-100 dark:bg-white/5 rounded-xl font-bold border-2 border-transparent focus:border-primary outline-none"
                                            placeholder="e.g. 3 Sets"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">{t.reps}</label>
                                        <input
                                            type="text"
                                            value={repsInput}
                                            onChange={(e) => setRepsInput(e.target.value)}
                                            className="w-full p-4 bg-slate-100 dark:bg-white/5 rounded-xl font-bold border-2 border-transparent focus:border-primary outline-none"
                                            placeholder="e.g. 10-12 Reps"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setSelectedExercise(null)}
                                        className="flex-1 py-4 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors active:scale-95"
                                    >
                                        {t.back}
                                    </button>
                                    <button
                                        onClick={confirmAddExercise}
                                        className="flex-1 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-dark active:scale-95 transition-all"
                                    >
                                        {t.addExercise}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateRoutine;
