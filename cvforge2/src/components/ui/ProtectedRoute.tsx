// src/components/ui/ProtectedRoute.tsx (Personne 1 — Sprint A)

import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useAuthStore();

  useEffect(() => {
    if (!currentUser) {
      window.location.replace('/login');
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  return <>{children}</>;
}
