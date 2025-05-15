'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    // Puedes redirigir a login o mostrar pantalla de login aquí
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

