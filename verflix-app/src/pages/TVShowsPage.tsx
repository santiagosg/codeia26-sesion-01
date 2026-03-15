import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { tvService } from '@/services';
import type { TVShow, TVShowListResponse } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { MediaCard, MediaCardSkeleton } from '@/components/media/MediaCard';
import { GenreFilter } from '@/components/media/GenreFilter';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function TVShowsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { tvGenres, loading: genresLoading } = useApp();

  const genreParam = searchParams.get('genre');

  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<'popular' | 'top_rated'>('popular');

  useEffect(() => {
    const loadShows = async () => {
      setLoading(true);
      try {
        let data: TVShowListResponse;

        if (genreParam) {
          // Use discover endpoint with genre filter
          data = await tvService.discover({
            page: currentPage,
            with_genres: genreParam,
            sort_by: filter === 'top_rated' ? 'vote_average.desc' : 'popularity.desc',
          });
        } else {
          // Use standard endpoints
          data =
            filter === 'popular'
              ? await tvService.getPopular(currentPage)
              : await tvService.getTopRated(currentPage);
        }
        setShows(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error('Error loading TV shows:', err);
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, [currentPage, filter, genreParam]);

  const handleMediaClick = (show: TVShow) => {
    navigate(`/tv/${show.id}`);
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

  const handleFilterChange = (newFilter: 'popular' | 'top_rated') => {
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
  const selectedGenre = tvGenres.find((g) => String(g.id) === genreParam);

  const titles = {
    popular: 'Series Populares',
    top_rated: 'Mejor Valoradas',
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
            {(['popular', 'top_rated'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange(filterType)}
              >
                {filterType === 'popular' ? 'Populares' : 'Mejor valoradas'}
              </Button>
            ))}
          </div>
        </div>

        {/* Genre filter */}
        {!genresLoading && (
          <GenreFilter
            genres={tvGenres}
            selectedGenreId={genreParam}
            onGenreChange={handleGenreChange}
          />
        )}

        {/* Shows Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <MediaCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {shows.map((show) => (
              <MediaCard
                key={show.id}
                media={show}
                onClick={() => handleMediaClick(show)}
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
