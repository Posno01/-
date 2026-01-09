
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';
import { LucideChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  const { currentDayIndex, state } = useApp();
  const completedCount = Object.keys(state.entries).length;

  return (
    <div className="max-w-2xl mx-auto space-y-12 fade-in">
      <header className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif text-stone-800 leading-tight">
          One question a day.<br />
          <span className="italic">A quieter, clearer version of you.</span>
        </h2>
        <p className="text-stone-500 max-w-md text-lg leading-relaxed">
          Welcome back. Today marks Day {currentDayIndex + 1} of your 90-day reflection journey.
        </p>
      </header>

      <section className="bg-white border border-stone-100 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">Your Journey</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-serif text-stone-900">{currentDayIndex + 1}</span>
            <span className="text-stone-400 font-serif">/ 90 Days</span>
          </div>
          <p className="text-stone-500 mt-2 text-sm">{completedCount} entries written so far.</p>
        </div>

        <Link 
          to="/today" 
          className="bg-stone-900 text-stone-50 px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-stone-800 transition-all hover:scale-[1.02] active:scale-95 group"
        >
          Open Today's Question
          <LucideChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/journal" className="p-6 rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-white transition-colors group">
          <h3 className="text-lg font-medium text-stone-800 group-hover:text-stone-950">Read My Journal</h3>
          <p className="text-sm text-stone-500 mt-1">Review your past reflections and growth.</p>
        </Link>
        <Link to="/progress" className="p-6 rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-white transition-colors group">
          <h3 className="text-lg font-medium text-stone-800 group-hover:text-stone-950">View Progress</h3>
          <p className="text-sm text-stone-500 mt-1">See your milestones and bonus cards.</p>
        </Link>
      </section>
      
      <footer className="pt-8 text-center">
        <p className="text-xs text-stone-300 font-serif italic">"Honesty is the beginning of wisdom."</p>
      </footer>
    </div>
  );
};

export default Home;
