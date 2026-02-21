import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Film, Tv } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-sm shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and nav links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-2xl font-bold text-netflix-red hover:opacity-90 transition-opacity"
            >
              Verflix
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-netflix-red ${
                  location.pathname === '/' ? 'text-white' : 'text-gray-300'
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/movies"
                className={`text-sm font-medium transition-colors hover:text-netflix-red flex items-center gap-1 ${
                  location.pathname.startsWith('/movies') ? 'text-white' : 'text-gray-300'
                }`}
              >
                <Film className="w-4 h-4" />
                Películas
              </Link>
              <Link
                to="/tv"
                className={`text-sm font-medium transition-colors hover:text-netflix-red flex items-center gap-1 ${
                  location.pathname.startsWith('/tv') ? 'text-white' : 'text-gray-300'
                }`}
              >
                <Tv className="w-4 h-4" />
                Series
              </Link>
            </div>
          </div>

          {/* Search and theme toggle */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-40 md:w-64 bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-netflix-red"
              />
            </form>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-white hover:text-netflix-red"
              aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
