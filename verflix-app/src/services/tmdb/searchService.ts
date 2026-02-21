import tmdbClient from '../api/axiosConfig';
import type { SearchFilters, SearchResultsResponse } from '@/types';

export const searchService = {
  // Multi search (movies, tv, people)
  searchMulti: (query: string, page: number = 1): Promise<SearchResultsResponse> =>
    tmdbClient.get('/search/multi', {
      params: { query, page, include_adult: false },
    }).then(res => res.data),

  // Search movies
  searchMovies: (query: string, page: number = 1, filters?: SearchFilters): Promise<SearchResultsResponse> =>
    tmdbClient.get('/search/movie', {
      params: { query, page, include_adult: false, ...filters },
    }).then(res => res.data),

  // Search TV shows
  searchTV: (query: string, page: number = 1, filters?: SearchFilters): Promise<SearchResultsResponse> =>
    tmdbClient.get('/search/tv', {
      params: { query, page, include_adult: false, ...filters },
    }).then(res => res.data),

  // Get trending content
  getTrending: (mediaType: 'all' | 'movie' | 'tv' | 'person' = 'all', timeWindow: 'day' | 'week' = 'week'): Promise<SearchResultsResponse> =>
    tmdbClient.get(`/trending/${mediaType}/${timeWindow}`).then(res => res.data),
};
