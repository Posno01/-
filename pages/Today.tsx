
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { PROMPTS } from '../data/prompts';
import { LucideCheckCircle2, LucideLock } from 'lucide-react';

const Today: React.FC = () => {
  const { currentDayIndex, state, updateEntry } = useApp();
  const prompt = PROMPTS[currentDayIndex];
  const entry = state.entries[currentDayIndex + 1];
  
  const [content, setContent] = useState(entry?.content || '');
  const [isSaved, setIsSaved] = useState(false);

  // Auto-save logic
  useEffect(() => {
    if (!entry?.isLocked) {
      const timer = setTimeout(() => {
        if (content !== (entry?.content || '')) {
          updateEntry(currentDayIndex + 1, content, false);
          setIsSaved(true);
          setTimeout(() => setIsSaved(false), 2000);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [content, currentDayIndex, updateEntry, entry]);

  const handleFinish = () => {
    if (content.trim().length === 0) return;
    updateEntry(currentDayIndex + 1, content, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLocked = entry?.isLocked;

  return (
    <div className="max-w-2xl mx-auto flex flex-col min-h-[70vh] fade-in">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">Today's Reflection</span>
          <h2 className="text-2xl font-serif text-stone-800 mt-1">Day {currentDayIndex + 1} — {prompt.titleEn} / {prompt.titleKo}</h2>
        </div>
        {isSaved && <span className="text-xs text-stone-400 mb-1 animate-pulse">Auto-saved</span>}
      </div>

      <div className="bg-white border border-stone-100 rounded-[2rem] p-8 md:p-12 shadow-sm mb-8 space-y-6 relative overflow-hidden">
        {isLocked && (
          <div className="absolute top-4 right-6 text-stone-300">
            <LucideLock size={20} />
          </div>
        )}
        <div className="space-y-4">
          <p className="text-2xl md:text-3xl font-serif text-stone-800 leading-relaxed italic">
            "{prompt.questionEn}"
          </p>
          <p className="text-lg md:text-xl text-stone-400 leading-relaxed">
            "{prompt.questionKo}"
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-4">
        <label className="text-xs uppercase tracking-widest text-stone-400 font-semibold px-2">Your Thoughts</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLocked}
          placeholder="Start writing here... (모든 기록은 자동으로 저장됩니다)"
          className={`flex-1 w-full bg-white border border-stone-100 rounded-2xl p-6 md:p-8 text-stone-800 text-lg leading-relaxed focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all min-h-[300px] resize-none ${isLocked ? 'bg-stone-50 text-stone-500' : ''}`}
        />
      </div>

      <div className="mt-12 flex flex-col items-center">
        {!isLocked ? (
          <button
            onClick={handleFinish}
            disabled={content.trim().length === 0}
            className={`w-full md:w-auto px-12 py-4 rounded-full font-medium transition-all shadow-md active:scale-95 ${
              content.trim().length > 0 
                ? 'bg-stone-900 text-stone-50 hover:bg-stone-800' 
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            Save & Continue Tomorrow
          </button>
        ) : (
          <div className="flex items-center gap-2 text-stone-500 italic">
            <LucideCheckCircle2 size={18} className="text-green-500" />
            Reflection complete. Come back tomorrow for the next prompt.
          </div>
        )}
        <p className="text-xs text-stone-400 mt-4 text-center">
          "This journey is yours to keep."
        </p>
      </div>
    </div>
  );
};

export default Today;
