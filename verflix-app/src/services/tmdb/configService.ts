import tmdbClient from '../api/axiosConfig';
import type { Genre } from '@/types';

export const configService = {
  // Get configuration (image sizes, etc.)
  getConfiguration: () =>
    tmdbClient.get('/configuration').then(res => res.data),

  // Get movie genres
  getMovieGenres: (): Promise<{ genres: Genre[] }> =>
    tmdbClient.get('/genre/movie/list').then(res => res.data),

  // Get TV genres
  getTVGenres: (): Promise<{ genres: Genre[] }> =>
    tmdbClient.get('/genre/tv/list').then(res => res.data),
};

// Helper function to get image URL
export const getImageUrl = (
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'w1280' | 'original' = 'original'
): string => {
  if (!path) return '';

  const baseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
  return `${baseUrl}/${size}${path}`;
};

// Helper function to get backdrop URL
export const getBackdropUrl = (path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w780'): string => {
  if (!path) return '';

  const baseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
  return `${baseUrl}/${size}${path}`;
};

// Helper function to get profile URL
export const getProfileUrl = (path: string | null, size: 'w45' | 'w185' | 'h632' | 'original' = 'w185'): string => {
  if (!path) return '';

  const baseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
  return `${baseUrl}/${size}${path}`;
};
