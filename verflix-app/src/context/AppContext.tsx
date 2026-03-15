import React, { createContext, useContext, useState, useEffect } from 'react';
import { configService } from '@/services';
import type { Genre } from '@/types';

interface AppContextType {
  imageBaseUrl: string;
  movieGenres: Genre[];
  tvGenres: Genre[];
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [imageBaseUrl] = useState<string>(
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'
  );
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
  const [tvGenres, setTVGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Load both movie and TV genres
        const [movieGenresData, tvGenresData] = await Promise.all([
          configService.getMovieGenres(),
          configService.getTVGenres(),
        ]);
        setMovieGenres(movieGenresData.genres);
        setTVGenres(tvGenresData.genres);
      } catch (error) {
        console.error('Failed to load app config:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  return (
    <AppContext.Provider value={{ imageBaseUrl, movieGenres, tvGenres, loading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
