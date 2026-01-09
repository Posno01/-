
import React from 'react';
import { useApp } from '../App';
import { LucideCheckCircle2, LucideSparkles } from 'lucide-react';

const Progress: React.FC = () => {
  const { currentDayIndex, state } = useApp();
  const progressPercent = ((currentDayIndex + 1) / 90) * 100;
  const isFinished = currentDayIndex >= 89 && Object.keys(state.entries).length >= 90;

  return (
    <div className="max-w-2xl mx-auto space-y-16 fade-in">
      <header className="text-center">
        <h2 className="text-4xl font-serif text-stone-800 mb-2">Your Progress</h2>
        <p className="text-stone-500">The slow and steady walk toward your center.</p>
      </header>

      <section className="space-y-8">
        <div className="relative h-4 w-full bg-stone-100 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-stone-800 transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
          <span>Start</span>
          <span>Month 1</span>
          <span>Month 2</span>
          <span>Completion</span>
        </div>
      </section>

      <section className="bg-white border border-stone-100 rounded-3xl p-8 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-stone-400 text-xs uppercase tracking-widest font-bold">Current Standing</p>
            <p className="text-3xl font-serif text-stone-800">Day {currentDayIndex + 1} of 90</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-stone-800 flex items-center justify-center">
            <span className="text-lg font-bold text-stone-800">{Math.round(progressPercent)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ProgressStat label="Entries Written" value={Object.keys(state.entries).length.toString()} />
          <ProgressStat label="Next Milestone" value={`Day ${[15, 30, 45, 60, 75, 90].find(m => m > currentDayIndex + 1) || 90}`} />
        </div>
      </section>

      {isFinished && (
        <div className="bg-[#FFF9F2] border border-[#F0E6D8] rounded-3xl p-10 text-center space-y-6">
          <LucideSparkles size={40} className="mx-auto text-[#D4AF37]" />
          <h3 className="text-3xl font-serif text-stone-800">The Journey is Complete.</h3>
          <p className="text-lg text-stone-600 italic">"This journey is yours to keep."</p>
          <p className="text-stone-500 leading-relaxed max-w-md mx-auto">
            You have walked 90 days with yourself. The wisdom you found here will remain as a quiet, steady flame.
          </p>
        </div>
      )}

      <footer className="text-center pt-8">
        <p className="text-xs text-stone-400">“Consistency is the truest form of self-love.”</p>
      </footer>
    </div>
  );
};

const ProgressStat: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-50">
    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">{label}</p>
    <p className="text-xl font-medium text-stone-800">{value}</p>
  </div>
);

export default Progress;
