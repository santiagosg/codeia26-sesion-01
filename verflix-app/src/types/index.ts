// TMDB API Types

export interface Movie {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TVShow {
  id: number;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails extends Movie {
  belongs_to_collection: boolean;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  credits?: Credits;
  videos?: VideoResults;
  similar?: MovieListResponse;
}

export interface TVShowDetails extends TVShow {
  created_by: { id: string; name: string; profile_path: string };
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  credits?: Credits;
  videos?: VideoResults;
  similar?: TVShowListResponse;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface Person {
  id: number;
  adult: boolean;
  also_known_as: string[];
  biography: string | null;
  birthday: string | null;
  deathday: string | null;
  gender: number; // 0 = unknown, 1 = female, 2 = male, 3 = non-binary
  homepage: string | null;
  imdb_id: string;
  known_for_department: string;
  known_for: string | Array<Movie | TVShow>;
  name: string;
  place_of_birth: string | null;
  profile_path: string | null;
  popularity: number;
}

export interface PersonDetails extends Person {
  external_ids: ExternalIds;
  images: PersonImages;
  known_for: Array<Movie | TVShow>;
  movie_credits: PersonMovieCredits;
  tv_credits: PersonTVCredits;
}

export interface ExternalIds {
  imdb_id: string | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  tiktok_id: string | null;
  youtube_id: string | null;
}

export interface PersonImages {
  profiles: ProfileImage[];
}

export interface ProfileImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Credit {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  character?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  media_type: 'movie' | 'tv';
  credit_id: string;
  order?: number;
}

export interface PersonMovieCredits {
  cast: Credit[];
  crew: Crew[];
}

export interface PersonTVCredits {
  cast: Credit[];
  crew: Crew[];
}

export interface Cast extends Person {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew extends Person {
  credit_id: string;
  department: string;
  job: string;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_639_2: string;
  key: string;
  name: string;
  site: string;
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette';
  official: boolean;
  published_at: string;
  size: number;
}

export interface VideoResults {
  id: number;
  results: Video[];
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TVShowListResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

export interface SearchFilters {
  query?: string;
  media_type?: 'all' | 'movie' | 'tv' | 'person';
  genres?: number[];
  year?: number;
  rating?: number;
  page?: number;
}

export type SearchResult =
  | (Movie & { media_type: 'movie' })
  | (TVShow & { media_type: 'tv' })
  | (Person & { media_type: 'person' });

export type MediaSearchResult = Extract<SearchResult, Movie | TVShow>;

export interface SearchResultsResponse {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}
