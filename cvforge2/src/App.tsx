// src/App.tsx

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CVForm } from './components/forms/CVForm';
import CVPreview from './components/preview/CVPreview';
import CVAnalysisDrawer from './components/analysis/CVAnalysisDrawer';
import { useCVStore } from './store/cvStore';
import { useDashboardStore } from './store/dashboardStore';
import { useAuthStore } from './store/authStore';
import { defaultCVData } from './types/cv';
import type { Template } from './types/cv';

type TabId = 'personal' | 'education' | 'experiences' | 'projects' | 'skills' | 'languages' | 'certifications' | 'share';

const TEMPLATES: { id: Template; label: string }[] = [
  { id: 'minimaliste',   label: 'Minimaliste' },
  { id: 'professionnel', label: 'Professionnel' },
  { id: 'tech',          label: 'Tech' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('personal');
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState('Mon CV');
  const [isLoaded, setIsLoaded] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const isLeavingRef = useRef(false); // track if user is navigating away

  const { template, setTemplate, setData, data } = useCVStore();
  const { currentUser } = useAuthStore();
  const { getCVById, updateCV, loadForUser } = useDashboardStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !currentUser) return;
    setIsLoaded(false);
    isLeavingRef.current = false;

    loadForUser(currentUser);

    const cv = getCVById(id);
    if (cv) {
      const safeData = {
        ...defaultCVData,
        ...cv.data,
        personal:       { ...defaultCVData.personal, ...cv.data.personal },
        education:      cv.data.education      || [],
        experiences:    cv.data.experiences    || [],
        skills:         cv.data.skills         || [],
        languages:      cv.data.languages      || [],
        projects:       cv.data.projects       || [],
        certifications: cv.data.certifications || [],
      };
      setData(safeData);
      setTitle(cv.title);
    } else {
      setData(defaultCVData);
      setTitle('Mon CV');
    }

    setTimeout(() => setIsLoaded(true), 200);
  }, [id]);

  // Auto-save — only when loaded and NOT leaving
  useEffect(() => {
    if (!isLoaded || !id || !currentUser || isLeavingRef.current) return;
    updateCV(currentUser, id, data);
  }, [data]);

  useEffect(() => {
    if (editingTitle) titleInputRef.current?.select();
  }, [editingTitle]);

  const goToDashboard = () => {
    isLeavingRef.current = true; // stop auto-save before navigating
    setIsLoaded(false);
    navigate('/dashboard');
  };

  const saveTitle = () => {
    if (!id || !currentUser) return;
    const trimmed = title.trim() || 'Mon CV';
    setTitle(trimmed);
    const cv = getCVById(id);
    if (cv) updateCV(currentUser, id, cv.data, trimmed);
    setEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') saveTitle();
    if (e.key === 'Escape') setEditingTitle(false);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0 shadow-sm no-print">
        <div className="flex items-center gap-3">
          <button onClick={goToDashboard}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition"
            title="Retour au dashboard">
            ←
          </button>
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            CV
          </div>
          {editingTitle ? (
            <input ref={titleInputRef} value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={saveTitle} onKeyDown={handleTitleKeyDown}
              className="text-sm font-semibold text-slate-800 border-b-2 border-teal-400 outline-none bg-transparent w-40 sm:w-56" />
          ) : (
            <button onClick={() => setEditingTitle(true)}
              className="flex items-center gap-1.5 group" title="Cliquer pour renommer">
              <span className="text-sm font-semibold text-slate-800 group-hover:text-teal-600 transition">{title}</span>
              <span className="text-slate-300 group-hover:text-teal-400 transition text-xs">✏️</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden md:block">Template :</span>
            <div className="flex gap-1">
              {TEMPLATES.map((t) => (
                <button key={t.id} onClick={() => setTemplate(t.id)}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    template === t.id ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex md:hidden border border-slate-200 rounded-lg overflow-hidden">
            <button onClick={() => setMobileView('form')}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${mobileView === 'form' ? 'bg-teal-500 text-white' : 'bg-white text-slate-600'}`}>
              ✏️ Formulaire
            </button>
            <button onClick={() => setMobileView('preview')}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${mobileView === 'preview' ? 'bg-teal-500 text-white' : 'bg-white text-slate-600'}`}>
              👁️ Aperçu
            </button>
          </div>
          <div className="h-5 w-px bg-slate-200 hidden sm:block" />
          <CVAnalysisDrawer />
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className={`w-full md:w-1/2 border-r border-slate-200 flex flex-col overflow-hidden bg-white
          ${mobileView === 'preview' ? 'hidden md:flex' : 'flex'}`}>
          <CVForm activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className={`w-full md:w-1/2 flex flex-col overflow-hidden
          ${mobileView === 'form' ? 'hidden md:flex' : 'flex'}`}>
          <CVPreview />
        </div>
      </main>
    </div>
  );
}
