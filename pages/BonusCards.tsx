
import React from 'react';
import { useApp } from '../App';
import { BONUS_CARDS } from '../data/bonus';
import { LucideLock, LucideSparkles } from 'lucide-react';

const BonusCards: React.FC = () => {
  const { currentDayIndex, state } = useApp();
  const completedCount = Object.keys(state.entries).filter(k => state.entries[parseInt(k)].isLocked).length;

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <header className="mb-12">
        <h2 className="text-3xl font-serif text-stone-800">Milestones & Gifts</h2>
        <p className="text-stone-500 mt-2">Treasures discovered on your journey of persistence.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BONUS_CARDS.map(card => {
          const isUnlocked = completedCount >= card.milestoneDay;
          return (
            <div 
              key={card.id} 
              className={`relative h-[400px] rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500 shadow-sm border ${
                isUnlocked 
                ? 'bg-[#FFF9F2] border-[#F0E6D8] ring-4 ring-[#FFFDFB]' 
                : 'bg-stone-50 border-stone-100 grayscale opacity-60'
              }`}
            >
              {!isUnlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-stone-50/20 backdrop-blur-[2px] rounded-3xl">
                  <LucideLock size={32} className="text-stone-300 mb-2" />
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Day {card.milestoneDay} Unlock</p>
                </div>
              )}
              
              <div className="space-y-6">
                <div className="text-[#D4AF37] opacity-60 mb-2">
                  <LucideSparkles size={24} className="mx-auto" />
                </div>
                <div>
                  <h3 className={`text-xl font-serif ${isUnlocked ? 'text-stone-800' : 'text-stone-400'}`}>
                    {card.titleEn}<br />
                    <span className="text-lg opacity-70 italic">{card.titleKo}</span>
                  </h3>
                </div>
                
                {isUnlocked && (
                  <div className="space-y-4">
                    <p className="text-stone-600 text-sm leading-relaxed italic">
                      "{card.messageEn}"
                    </p>
                    <p className="text-stone-400 text-xs leading-relaxed">
                      "{card.messageKo}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BonusCards;
