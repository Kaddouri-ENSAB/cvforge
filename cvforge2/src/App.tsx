// src/App.tsx

import { useState } from 'react';
import { CVForm } from './components/forms/CVForm';
import { CVPreview } from './components/preview/CVPreview';
import { useCVStore } from './store/cvStore';
import type { Template } from './types/cv';

type TabId = 'personal' | 'education' | 'experiences' | 'projects' | 'skills';

const TEMPLATES: { id: Template; label: string }[] = [
  { id: 'minimaliste',   label: 'Minimaliste' },
  { id: 'professionnel', label: 'Professionnel' },
  { id: 'tech',          label: 'Tech' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('personal');
  const { template, setTemplate } = useCVStore();

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-sm">
            CV
          </div>
          <span className="font-semibold text-slate-800 text-lg">CVForge</span>
          <span className="text-slate-400 text-sm hidden sm:block">— Générateur de CV</span>
        </div>

        {/* Template selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:block">Template :</span>
          <div className="flex gap-1">
            {TEMPLATES.map((t) => (
              <button key={t.id} onClick={() => setTemplate(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  template === t.id ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Split screen */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left — Form (Personne 1) */}
        <div className="w-full md:w-1/2 border-r border-slate-200 flex flex-col overflow-hidden bg-white">
          <CVForm activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Right — Preview (Personne 2) */}
        <div className="hidden md:flex md:w-1/2 flex-col overflow-hidden">
          <CVPreview />
        </div>
      </main>
    </div>
  );
}
