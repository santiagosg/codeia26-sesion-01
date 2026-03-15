import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { movieService } from '@/services';
import type { Movie, MovieListResponse } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { MediaCard, MediaCardSkeleton } from '@/components/media/MediaCard';
import { GenreFilter } from '@/components/media/GenreFilter';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function MoviesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { movieGenres, loading: genresLoading } = useApp();

  const genreParam = searchParams.get('genre');

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<'popular' | 'top_rated' | 'now_playing'>('popular');

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        let data: MovieListResponse;

        if (genreParam) {
          // Use discover endpoint with genre filter
          data = await movieService.discover({
            page: currentPage,
            with_genres: genreParam,
            sort_by: filter === 'top_rated' ? 'vote_average.desc' : 'popularity.desc',
          });
        } else {
          // Use standard endpoints
          switch (filter) {
            case 'popular':
              data = await movieService.getPopular(currentPage);
              break;
            case 'top_rated':
              data = await movieService.getTopRated(currentPage);
              break;
            case 'now_playing':
              data = await movieService.getNowPlaying(currentPage);
              break;
          }
        }
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error('Error loading movies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [currentPage, filter, genreParam]);

  const handleMediaClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const handleGenreChange = (genreId: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (genreId === null) {
      newParams.delete('genre');
    } else {
      newParams.set('genre', genreId);
    }
    newParams.delete('page'); // Reset page when changing genre
    setSearchParams(newParams);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilter: 'popular' | 'top_rated' | 'now_playing') => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(page));
    setSearchParams(newParams);
    setCurrentPage(page);
  };

  // Get genre name for title
  const selectedGenre = movieGenres.find((g) => String(g.id) === genreParam);

  const titles = {
    popular: 'Películas Populares',
    top_rated: 'Mejor Valoradas',
    now_playing: 'En Cartelera',
  };

  // Display title with genre if selected
  const displayTitle = selectedGenre
    ? `${selectedGenre.name} - ${titles[filter]}`
    : titles[filter];

  return (
    <div className="bg-background">
      <Navbar />

      <div className="pt-24 px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">{displayTitle}</h1>

          {/* Filter buttons */}
          <div className="flex gap-2">
            {(['popular', 'top_rated', 'now_playing'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange(filterType)}
              >
                {filterType === 'popular' && 'Populares'}
                {filterType === 'top_rated' && 'Mejor valoradas'}
                {filterType === 'now_playing' && 'En cartelera'}
              </Button>
            ))}
          </div>
        </div>

        {/* Genre filter */}
        {!genresLoading && (
          <GenreFilter
            genres={movieGenres}
            selectedGenreId={genreParam}
            onGenreChange={handleGenreChange}
          />
        )}

        {/* Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <MediaCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MediaCard
                key={movie.id}
                media={movie}
                onClick={() => handleMediaClick(movie)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
