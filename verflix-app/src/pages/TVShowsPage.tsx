import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tvService } from '@/services';
import type { TVShow } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { MediaCard, MediaCardSkeleton } from '@/components/media/MediaCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TVShowsPage() {
  const navigate = useNavigate();
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<'popular' | 'top_rated'>('popular');

  useEffect(() => {
    const loadShows = async () => {
      setLoading(true);
      try {
        const data =
          filter === 'popular'
            ? await tvService.getPopular(currentPage)
            : await tvService.getTopRated(currentPage);
        setShows(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error('Error loading TV shows:', err);
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, [currentPage, filter]);

  const handleMediaClick = (show: TVShow) => {
    navigate(`/tv/${show.id}`);
  };

  const titles = {
    popular: 'Series Populares',
    top_rated: 'Mejor Valoradas',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{titles[filter]}</h1>

          {/* Filter buttons */}
          <div className="flex gap-2">
            {(['popular', 'top_rated'] as const).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setFilter(filterType);
                  setCurrentPage(1);
                }}
              >
                {filterType === 'popular' ? 'Populares' : 'Mejor valoradas'}
              </Button>
            ))}
          </div>
        </div>

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
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
