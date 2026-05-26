import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../store/translations';

const Progress: React.FC = () => {
  const { history, language } = useAppStore();
  const t = translations[language].progress;

  // Process history data for charts
  const volumeData = useMemo(() => {
    // Group by date (simplified for weekly view)
    const groupedData: Record<string, { name: string; volume: number; sets: number }> = {};

    history.forEach(log => {
      const date = new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

      if (!groupedData[date]) {
        groupedData[date] = { name: date, volume: 0, sets: 0 };
      }

      const logVolume = log.sets.reduce((acc, set) => acc + (set.weight * set.reps), 0);
      groupedData[date].volume += logVolume;
      groupedData[date].sets += log.sets.length;
    });

    // Sort by date (naive sort for this prototype)
    return Object.values(groupedData).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
  }, [history]);

  // Calculate generic stats
  const totalWorkouts = history.length;
  const totalVolume = history.reduce((acc, log) => {
    return acc + log.sets.reduce((sAcc, set) => sAcc + (set.weight * set.reps), 0);
  }, 0);

  return (
    <div className="px-6 py-4 space-y-8 pb-24">
      <header>
        <h1 className="text-3xl font-black">{t.title}</h1>
        <p className="text-sm text-slate-500 font-medium">{t.subtitle}</p>
      </header>

      {/* Summary Stats */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-surface-card p-4 rounded-2xl border border-slate-100 dark:border-white/5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.totalSessions}</span>
          <p className="text-3xl font-black text-primary mt-1">{totalWorkouts}</p>
        </div>
        <div className="bg-white dark:bg-surface-card p-4 rounded-2xl border border-slate-100 dark:border-white/5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.globalVolume}</span>
          <p className="text-3xl font-black text-recovery-green mt-1">{(totalVolume / 1000).toFixed(1)}k <span className="text-sm text-slate-400">lbs</span></p>
        </div>
      </section>

      {/* Volume Chart */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{t.volumeChart}</h2>
          <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-primary"></span> Volume</span>
          </div>
        </div>
        <div className="h-48 bg-white dark:bg-surface-card rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-white/5">
          {volumeData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a2230', borderColor: '#333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="volume" stroke="#0163f5" strokeWidth={3} dot={{ r: 4, fill: '#0163f5', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm font-medium">
              {t.noData}
            </div>
          )}
        </div>
      </section>

      {/* Frequency Chart */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{t.frequencyChart}</h2>
        </div>
        <div className="h-48 bg-white dark:bg-surface-card rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-white/5">
          {volumeData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1a2230', borderColor: '#333', borderRadius: '12px' }}
                />
                <Bar dataKey="sets" fill="#bf5af2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm font-medium">
              {t.noData}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Progress;
