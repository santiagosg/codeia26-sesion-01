import tmdbClient from '../api/axiosConfig';
import type { TVShow, TVShowDetails, TVShowListResponse } from '@/types';

export const tvService = {
  // Get popular TV shows
  getPopular: (page: number = 1): Promise<TVShowListResponse> =>
    tmdbClient.get('/tv/popular', { params: { page } }).then(res => res.data),

  // Get top rated TV shows
  getTopRated: (page: number = 1): Promise<TVShowListResponse> =>
    tmdbClient.get('/tv/top_rated', { params: { page } }).then(res => res.data),

  // Get TV show details
  getDetails: (id: number): Promise<TVShowDetails> =>
    tmdbClient.get(`/tv/${id}`, {
      params: {
        append_to_response: 'credits,videos,similar',
      },
    }).then(res => res.data),

  // Get similar TV shows
  getSimilar: (id: number, page: number = 1): Promise<TVShowListResponse> =>
    tmdbClient.get(`/tv/${id}/similar`, { params: { page } }).then(res => res.data),

  // Get TV show credits (cast and crew)
  getCredits: (id: number): Promise<TVShowDetails['credits']> =>
    tmdbClient.get(`/tv/${id}/credits`).then(res => res.data),

  // Get TV show videos (trailers)
  getVideos: (id: number): Promise<TVShowDetails['videos']> =>
    tmdbClient.get(`/tv/${id}/videos`).then(res => res.data),

  // Discover TV shows with filters
  discover: (params: {
    page?: number;
    with_genres?: string;
    sort_by?: string;
    vote_average_gte?: number;
    'vote_average.lte'?: number;
    'first_air_date.gte'?: string;
    'first_air_date.lte'?: string;
  }): Promise<TVShowListResponse> =>
    tmdbClient.get('/discover/tv', { params }).then(res => res.data),
};
