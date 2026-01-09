
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { LucideHome, LucideBookOpen, LucideList, LucideGift, LucideBarChart2, LucideSettings, LucideChevronLeft, LucideChevronRight, LucideCheckCircle2 } from 'lucide-react';
import { PROMPTS } from './data/prompts';
import { BONUS_CARDS } from './data/bonus';
import { UserState, JournalEntry } from './types';

// Pages
import Home from './pages/Home';
import Today from './pages/Today';
import MyJournal from './pages/MyJournal';
import AllQuestions from './pages/AllQuestions';
import BonusCards from './pages/BonusCards';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

// Context
interface AppContextType {
  state: UserState;
  currentDayIndex: number;
  updateEntry: (day: number, content: string, isLocked: boolean) => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [state, setState] = useState<UserState>(() => {
    const saved = localStorage.getItem('aura_journal_state');
    if (saved) return JSON.parse(saved);
    return {
      startDate: null,
      entries: {}
    };
  });

  // Calculate current day based on start date
  const currentDayIndex = useMemo(() => {
    if (!state.startDate) return 0;
    const start = new Date(state.startDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    // Users advance one day at a time, but we don't let them jump ahead
    // If they skipped days, they should still be on their "relative" day from start
    return Math.min(89, diffDays);
  }, [state.startDate]);

  useEffect(() => {
    localStorage.setItem('aura_journal_state', JSON.stringify(state));
  }, [state]);

  const updateEntry = (day: number, content: string, isLocked: boolean) => {
    setState(prev => {
      const newState = { ...prev };
      // If it's the first time writing anything, set the start date to today
      if (!newState.startDate) {
        newState.startDate = new Date().toISOString();
      }
      newState.entries[day] = {
        day,
        content,
        date: new Date().toLocaleDateString(),
        isLocked
      };
      return newState;
    });
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
      setState({ startDate: null, entries: {} });
      localStorage.removeItem('aura_journal_state');
      window.location.reload();
    }
  };

  return (
    <AppContext.Provider value={{ state, currentDayIndex, updateEntry, resetProgress }}>
      <Router>
        <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto md:px-4 lg:px-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 py-12 px-6">
            <div className="mb-12">
              <h1 className="text-3xl font-serif italic font-semibold tracking-tight text-stone-800">Aura</h1>
              <p className="text-xs uppercase tracking-widest text-stone-400 mt-2">Self-Reflection Journal</p>
            </div>
            <nav className="flex flex-col gap-6">
              <NavLink to="/" icon={<LucideHome size={20} />} label="Home" />
              <NavLink to="/today" icon={<LucideBookOpen size={20} />} label="Today's Question" />
              <NavLink to="/journal" icon={<LucideList size={20} />} label="My Journal" />
              <NavLink to="/all" icon={<LucideList size={20} />} label="All Questions" />
              <NavLink to="/bonus" icon={<LucideGift size={20} />} label="Bonus Cards" />
              <NavLink to="/progress" icon={<LucideBarChart2 size={20} />} label="Progress" />
            </nav>
            <div className="mt-auto pt-6 border-t border-stone-200">
              <NavLink to="/settings" icon={<LucideSettings size={20} />} label="Settings" />
            </div>
          </aside>

          {/* Mobile Navigation (Bottom) */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-stone-200 px-4 py-3 flex justify-around items-center z-50">
            <MobileNavLink to="/" icon={<LucideHome size={20} />} />
            <MobileNavLink to="/today" icon={<LucideBookOpen size={20} />} />
            <MobileNavLink to="/journal" icon={<LucideList size={20} />} />
            <MobileNavLink to="/progress" icon={<LucideBarChart2 size={20} />} />
            <MobileNavLink to="/settings" icon={<LucideSettings size={20} />} />
          </nav>

          {/* Main Content */}
          <main className="flex-1 px-4 py-8 md:py-16 pb-24 md:pb-16 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/today" element={<Today />} />
              <Route path="/journal" element={<MyJournal />} />
              <Route path="/all" element={<AllQuestions />} />
              <Route path="/bonus" element={<BonusCards />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

const NavLink: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${isActive ? 'bg-stone-100 text-stone-900 font-medium' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const MobileNavLink: React.FC<{ to: string, icon: React.ReactNode }> = ({ to, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`p-2 rounded-full transition-all ${isActive ? 'bg-stone-900 text-white shadow-lg' : 'text-stone-400'}`}>
      {icon}
    </Link>
  );
};

export default App;
