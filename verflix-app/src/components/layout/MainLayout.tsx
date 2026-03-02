import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children?: ReactNode;
}

/**
 * Componente de layout principal
 * Envuelve el contenido con Navbar y Footer
 * Usa Outlet para renderizar el contenido de las rutas hijas
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-1">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
