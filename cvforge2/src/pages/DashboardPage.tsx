// src/pages/DashboardPage.tsx (Personne 1 — Sprint B)

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useDashboardStore } from '../store/dashboardStore';
import Dashboard from '../components/dashboard/Dashboard';
import type { CVEntry } from '../types/cv';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuthStore();
  const { cvList, loadForUser, createCV, deleteCV, duplicateCV } = useDashboardStore();

  useEffect(() => {
    if (currentUser) loadForUser(currentUser);
  }, [currentUser]);

  const handleCreateCV = () => {
    if (!currentUser) return;
    const newCV = createCV(currentUser, 'Mon CV');
    navigate(`/cv/${newCV.id}`);
  };

  const handleEditCV = (id: string) => {
    navigate(`/cv/${id}`);
  };

  const handleDuplicateCV = (id: string) => {
    if (!currentUser) return;
    duplicateCV(currentUser, id);
  };

  const handleDeleteCV = (id: string) => {
    if (!currentUser) return;
    deleteCV(currentUser, id);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Cast to any to avoid type conflict between our CVEntry and Dashboard's CVEntry
  const entries = cvList as unknown as CVEntry[];

  return (
    <div className="relative">
      <button onClick={handleLogout}
        className="fixed top-4 right-4 z-50 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition shadow-sm">
        Déconnexion
      </button>
      <Dashboard
        entries={entries}
        onCreateCV={handleCreateCV}
        onEditCV={handleEditCV}
        onDuplicateCV={handleDuplicateCV}
        onDeleteCV={handleDeleteCV}
      />
    </div>
  );
}
