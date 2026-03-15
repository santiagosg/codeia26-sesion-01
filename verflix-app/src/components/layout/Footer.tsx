import { Link } from 'react-router-dom';
import { Film, Tv } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
  rel?: string;
}

interface FooterColumnProps {
  title: string;
  icon?: React.ReactNode;
  links: FooterLink[];
}

export function Footer() {
  const movieLinks: FooterLink[] = [
    { label: 'Populares', href: '/movies' },
    { label: 'Mejor valoradas', href: '/movies?filter=top_rated' },
    { label: 'En cartelera', href: '/movies?filter=now_playing' },
  ];

  const tvLinks: FooterLink[] = [
    { label: 'Populares', href: '/tv' },
    { label: 'Mejor valoradas', href: '/tv?filter=top_rated' },
  ];

  const categoryLinks: FooterLink[] = [
    { label: 'Acción', href: '/movies?genre=28' },
    { label: 'Aventura', href: '/movies?genre=12' },
    { label: 'Animación', href: '/movies?genre=16' },
    { label: 'Comedia', href: '/movies?genre=35' },
    { label: 'Drama', href: '/movies?genre=18' },
    { label: 'Fantasía', href: '/movies?genre=14' },
    { label: 'Terror', href: '/movies?genre=27' },
  ];

  return (
    <footer
      role="contentinfo"
      aria-label="Pie de página"
      className="mt-12 border-t border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-6 md:py-12">
        {/* Grid de columnas del footer */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
          {/* Logo / Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="relative flex items-center gap-2 transition-opacity duration-200 hover:opacity-90"
              aria-label="Verflix - Ir al inicio"
            >
              <img
                src="/logo.png"
                alt="V"
                className="absolute left-[-20px] top-1/2 -translate-y-1/2 h-8 w-auto"
              />
              <span className="text-xl font-bold text-netflix-red">Verflix</span>
            </Link>
          </div>

          {/* Películas */}
          <FooterColumn
            title="Películas"
            icon={<Film className="h-4 w-4" />}
            links={movieLinks}
          />

          {/* Series */}
          <FooterColumn
            title="Series"
            icon={<Tv className="h-4 w-4" />}
            links={tvLinks}
          />

          {/* Categorías */}
          <FooterColumn title="Categorías" links={categoryLinks} />
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            © 2026 Verflix. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Componente de columna del footer
 * Muestra un título (opcionalmente con icono) y una lista de enlaces
 */
function FooterColumn({ title, icon, links }: FooterColumnProps) {
  return (
    <nav aria-label={`Enlaces de ${title.toLowerCase()}`}>
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
        {icon}
        {title}
      </h3>
      <ul className="space-y-2" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className="block py-1 text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-netflix-red focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              rel={link.rel}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
