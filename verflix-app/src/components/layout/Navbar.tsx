import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Film, Tv } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchService, getImageUrl } from '@/services';
import type { MediaSearchResult } from '@/types';

function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]) as T;
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Estados para búsqueda dinámica
  const [searchResults, setSearchResults] = useState<MediaSearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lógica de búsqueda dinámica con debouncing
  const performSearch = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      setTotalResults(0);
      setIsDropdownOpen(false);
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchService.searchMulti(query, 1);
      const mediaResults = data.results.filter(
        (r): r is MediaSearchResult => r.media_type === 'movie' || r.media_type === 'tv'
      );
      setSearchResults(mediaResults.slice(0, 8));
      setTotalResults(mediaResults.length);
      setIsDropdownOpen(true);
    } catch (err) {
      console.error('Error en búsqueda dinámica:', err);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = useDebounce(performSearch, 300);

  // Detectar clicks fuera del dropdown para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
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
      <div className="px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16">
          {/* Logo and nav links */}
          <div className="flex items-center gap-8 relative">
            <img
              src="/logo.png"
              alt="Verflix logo"
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 h-8 w-auto"
            />
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
            <div className="relative" ref={dropdownRef}>
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    debouncedSearch(e.target.value);
                  }}
                  onFocus={() => searchResults.length > 0 && setIsDropdownOpen(true)}
                  className="pl-10 w-40 md:w-64 bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-netflix-red"
                />
              </form>

              {/* Dropdown de resultados */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-netflix-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-2xl z-[100] overflow-hidden">
                  {isSearching ? (
                    <div className="p-4 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-netflix-red"></div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((result) => {
                        const title = result.media_type === 'movie' ? result.title : result.name;
                        const date = result.media_type === 'movie' ? result.release_date : result.first_air_date;
                        const year = date ? new Date(date).getFullYear() : null;
                        const imageUrl = getImageUrl(result.poster_path, 'w154');

                        return (
                          <button
                            key={`${result.media_type}-${result.id}`}
                            onClick={() => {
                              const path = result.media_type === 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`;
                              navigate(path);
                              setIsDropdownOpen(false);
                              setSearchQuery('');
                            }}
                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-0 group"
                          >
                            {/* Imagen miniatura */}
                            <div className="w-12 h-18 flex-shrink-0 rounded overflow-hidden bg-netflix-gray">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-xs text-muted-foreground">No img</span>
                                </div>
                              )}
                            </div>

                            {/* Información */}
                            <div className="flex-1 text-left min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {result.media_type === 'movie' ? (
                                  <Film className="w-3 h-3 text-netflix-red flex-shrink-0" />
                                ) : (
                                  <Tv className="w-3 h-3 text-netflix-red flex-shrink-0" />
                                )}
                                <p className="text-sm font-medium text-white truncate group-hover:text-netflix-red transition-colors">
                                  {title}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                {year && <span>{year}</span>}
                                {result.vote_average > 0 && (
                                  <>
                                    <span>•</span>
                                    <span className="text-netflix-red">{result.vote_average.toFixed(1)}</span>
                                  </>
                                )}
                              </div>
                              {result.overview && (
                                <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                                  {result.overview}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}

                      {/* Enlace para ver todos los resultados */}
                      {totalResults > 8 && (
                        <button
                          onClick={() => {
                            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-sm font-medium text-netflix-red hover:bg-white/10 transition-colors duration-200 border-t border-white/10"
                        >
                          Ver todos los resultados ({totalResults})
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No se encontraron resultados
                    </div>
                  )}
                </div>
              )}
            </div>

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
