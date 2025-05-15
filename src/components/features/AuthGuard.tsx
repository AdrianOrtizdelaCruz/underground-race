// components/AuthGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Mientras carga el estado del usuario, podemos mostrar un loader
  if (loading) return <div className="p-10 text-center">Cargando...</div>;

  // Si el usuario existe, renderiza el contenido
  return <>{children}</>;
}
