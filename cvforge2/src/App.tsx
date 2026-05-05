// src/App.tsx (Personne 2 — Sprint 3 revised : drawer analyse)

import { useState } from 'react';
import { CVForm } from './components/forms/CVForm';
import CVPreview from './components/preview/CVPreview';
import CVAnalysisDrawer from './components/analysis/CVAnalysisDrawer';
import { useCVStore } from './store/cvStore';
import type { Template } from './types/cv';

type TabId = 'personal' | 'education' | 'experiences' | 'projects' | 'skills' | 'share';

const TEMPLATES: { id: Template; label: string }[] = [
  { id: 'minimaliste',   label: 'Minimaliste' },
  { id: 'professionnel', label: 'Professionnel' },
  { id: 'tech',          label: 'Tech' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('personal');
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const { template, setTemplate } = useCVStore();

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">

      {/* ── Top bar ── */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-sm no-print">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            CV
          </div>
          <span className="font-semibold text-slate-800 text-lg">CVForge</span>
          <span className="text-slate-400 text-sm hidden lg:block">— Générateur de CV</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Template selector — hidden on small mobile, visible from sm */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden md:block">Template :</span>
            <div className="flex gap-1">
              {TEMPLATES.map((t) => (
                <button key={t.id} onClick={() => setTemplate(t.id)}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    template === t.id ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}>
        {/* Droite du header : templates + bouton analyse */}
        <div className="flex items-center gap-3">

          {/* Sélecteur template (Personne 1 — intact) */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:block">Template :</span>
            <div className="flex gap-1">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    template === t.id
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile/tablet toggle — only visible below md */}
          <div className="flex md:hidden border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setMobileView('form')}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${
                mobileView === 'form' ? 'bg-teal-500 text-white' : 'bg-white text-slate-600'
              }`}>
              ✏️ Formulaire
            </button>
            <button
              onClick={() => setMobileView('preview')}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${
                mobileView === 'preview' ? 'bg-teal-500 text-white' : 'bg-white text-slate-600'
              }`}>
              👁️ Aperçu
            </button>
          </div>

          {/* Séparateur */}
          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          {/* Bouton Analyse CV — drawer (Personne 2) */}
          <CVAnalysisDrawer />
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 overflow-hidden">
        {/* Form — full width on mobile/tablet, half on desktop */}
        <div className={`
          w-full md:w-1/2 border-r border-slate-200 flex flex-col overflow-hidden bg-white
          ${mobileView === 'preview' ? 'hidden md:flex' : 'flex'}
        `}>
          <CVForm activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Preview — hidden on mobile unless toggled, half on desktop */}
        <div className={`
          w-full md:w-1/2 flex flex-col overflow-hidden
          ${mobileView === 'form' ? 'hidden md:flex' : 'flex'}
        `}>
      {/* ── Split screen ── */}
      <main className="flex flex-1 overflow-hidden">

        {/* Colonne gauche — Formulaire (Personne 1) */}
        <div className="w-full md:w-1/2 border-r border-slate-200 flex flex-col overflow-hidden bg-white">
          <CVForm activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Colonne droite — Preview uniquement, plein espace (Personne 2) */}
        <div className="hidden md:flex md:w-1/2 flex-col overflow-hidden">
          <CVPreview />
        </div>
      </main>
    </div>
  );
}