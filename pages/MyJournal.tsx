
import React, { useState } from 'react';
import { useApp } from '../App';
import { PROMPTS } from '../data/prompts';
import { LucideChevronRight, LucideCalendar } from 'lucide-react';
// Import JournalEntry to resolve type errors in entries mapping
import { JournalEntry } from '../types';

const MyJournal: React.FC = () => {
  const { state } = useApp();
  const [filterMonth, setFilterMonth] = useState<number | 'all'>('all');

  // Explicitly cast to JournalEntry[] as Object.values on a Record may lose type information in some environments
  const entries = (Object.values(state.entries) as JournalEntry[]).sort((a, b) => b.day - a.day);
  
  const filteredEntries = filterMonth === 'all' 
    ? entries 
    : entries.filter(e => Math.ceil(e.day / 30) === filterMonth);

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-serif text-stone-800">My Journal Archive</h2>
          <p className="text-stone-500 mt-2">A record of your internal landscape.</p>
        </div>
        
        <div className="flex bg-stone-100 p-1 rounded-xl">
          <FilterBtn active={filterMonth === 'all'} onClick={() => setFilterMonth('all')}>All</FilterBtn>
          <FilterBtn active={filterMonth === 1} onClick={() => setFilterMonth(1)}>Month 1</FilterBtn>
          <FilterBtn active={filterMonth === 2} onClick={() => setFilterMonth(2)}>Month 2</FilterBtn>
          <FilterBtn active={filterMonth === 3} onClick={() => setFilterMonth(3)}>Month 3</FilterBtn>
        </div>
      </header>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-stone-100">
          <LucideCalendar size={48} className="mx-auto text-stone-200 mb-4" />
          <p className="text-stone-400 font-serif italic text-lg">No entries found for this period.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredEntries.map(entry => {
            const prompt = PROMPTS[entry.day - 1];
            return (
              <div key={entry.day} className="bg-white border border-stone-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Day {entry.day} — {entry.date}</span>
                    <h3 className="text-xl font-serif text-stone-800 mt-1">{prompt.titleEn} / {prompt.titleKo}</h3>
                  </div>
                </div>
                <div className="mb-6 pb-6 border-b border-stone-50 italic text-stone-500 text-sm leading-relaxed">
                  <p>Q: {prompt.questionEn}</p>
                </div>
                <div className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const FilterBtn: React.FC<{ active: boolean, onClick: () => void, children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
  >
    {children}
  </button>
);

export default MyJournal;
