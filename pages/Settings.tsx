
import React from 'react';
import { useApp } from '../App';
import { LucideTrash2, LucideExternalLink, LucideShieldCheck } from 'lucide-react';

const Settings: React.FC = () => {
  const { resetProgress } = useApp();

  return (
    <div className="max-w-2xl mx-auto space-y-12 fade-in">
      <header>
        <h2 className="text-3xl font-serif text-stone-800">Settings</h2>
        <p className="text-stone-500 mt-2">Manage your data and journal configuration.</p>
      </header>

      <section className="space-y-6">
        <h3 className="text-xs uppercase tracking-widest text-stone-400 font-bold px-1">Your Privacy</h3>
        <div className="bg-white border border-stone-100 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="flex gap-4 items-start">
            <div className="p-2 bg-stone-50 rounded-lg text-stone-600">
              <LucideShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-medium text-stone-800">Local Storage Only</h4>
              <p className="text-sm text-stone-500 mt-1 leading-relaxed">
                Your entries are stored exclusively in your browser's local storage. We do not transmit or store your personal reflections on any external server. This journey is yours alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xs uppercase tracking-widest text-stone-400 font-bold px-1">Data Management</h3>
        <div className="bg-white border border-stone-100 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-stone-800">Reset All Data</h4>
              <p className="text-sm text-stone-500 mt-1">Permanently delete all journal entries and progress.</p>
            </div>
            <button 
              onClick={resetProgress}
              className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LucideTrash2 size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xs uppercase tracking-widest text-stone-400 font-bold px-1">About the Journal</h3>
        <div className="bg-stone-50 border border-stone-100 rounded-3xl p-8 space-y-4">
          <p className="text-sm text-stone-600 leading-relaxed italic">
            This digital journal is designed as a companion to the Aura Physical Reflection cards. It is a premium space for those seeking to reconnect with their inner voice through a bilingual, structured 90-day journey.
          </p>
          <a href="#" className="inline-flex items-center gap-2 text-stone-800 font-medium text-sm hover:underline">
            Visit our Etsy Shop <LucideExternalLink size={14} />
          </a>
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-stone-100">
        <p className="text-xs text-stone-300">Aura v1.0.0 — Crafted for meaningful growth.</p>
      </footer>
    </div>
  );
};

export default Settings;
