import tmdbClient from '../api/axiosConfig';
import type { Movie, MovieDetails, MovieListResponse } from '@/types';

export const movieService = {
  // Get popular movies
  getPopular: (page: number = 1): Promise<MovieListResponse> =>
    tmdbClient.get('/movie/popular', { params: { page } }).then(res => res.data),

  // Get top rated movies
  getTopRated: (page: number = 1): Promise<MovieListResponse> =>
    tmdbClient.get('/movie/top_rated', { params: { page } }).then(res => res.data),

  // Get now playing movies
  getNowPlaying: (page: number = 1): Promise<MovieListResponse> =>
    tmdbClient.get('/movie/now_playing', { params: { page } }).then(res => res.data),

  // Get movie details
  getDetails: (id: number): Promise<MovieDetails> =>
    tmdbClient.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,videos,similar',
      },
    }).then(res => res.data),

  // Get similar movies
  getSimilar: (id: number, page: number = 1): Promise<MovieListResponse> =>
    tmdbClient.get(`/movie/${id}/similar`, { params: { page } }).then(res => res.data),

  // Get movie credits (cast and crew)
  getCredits: (id: number): Promise<MovieDetails['credits']> =>
    tmdbClient.get(`/movie/${id}/credits`).then(res => res.data),

  // Get movie videos (trailers)
  getVideos: (id: number): Promise<MovieDetails['videos']> =>
    tmdbClient.get(`/movie/${id}/videos`).then(res => res.data),

  // Discover movies with filters
  discover: (params: {
    page?: number;
    with_genres?: string;
    sort_by?: string;
    vote_average_gte?: number;
    'vote_average.lte'?: number;
    'release_date.gte'?: string;
    'release_date.lte'?: string;
  }): Promise<MovieListResponse> =>
    tmdbClient.get('/discover/movie', { params }).then(res => res.data),
};
