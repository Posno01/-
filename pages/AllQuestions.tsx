
import React from 'react';
import { PROMPTS } from '../data/prompts';
import { LucideEye } from 'lucide-react';

const AllQuestions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto fade-in">
      <header className="mb-12">
        <h2 className="text-3xl font-serif text-stone-800">The Full Journey</h2>
        <p className="text-stone-500 mt-2">A curated map of your 90-day exploration.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROMPTS.map(prompt => (
          <div key={prompt.id} className="bg-white border border-stone-100 p-6 rounded-2xl hover:bg-stone-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-widest">Day {prompt.id}</span>
              <LucideEye size={14} className="text-stone-200" />
            </div>
            <h4 className="font-medium text-stone-800 text-sm uppercase tracking-wide mb-2">{prompt.titleEn} / {prompt.titleKo}</h4>
            <div className="space-y-1">
              <p className="text-stone-500 text-xs leading-relaxed italic line-clamp-2">{prompt.questionEn}</p>
              <p className="text-stone-400 text-xs leading-relaxed line-clamp-2">{prompt.questionKo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQuestions;
