import React, { createContext, useContext, useState, useEffect } from 'react';
import { configService, getImageUrl } from '@/services';
import type { Genre } from '@/types';

interface AppContextType {
  imageBaseUrl: string;
  genres: Genre[];
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [imageBaseUrl, setImageBaseUrl] = useState<string>(
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'
  );
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Load genres
        const movieGenres = await configService.getMovieGenres();
        setGenres(movieGenres.genres);
      } catch (error) {
        console.error('Failed to load app config:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  return (
    <AppContext.Provider value={{ imageBaseUrl, genres, loading }}>
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
