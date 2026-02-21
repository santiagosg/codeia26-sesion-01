import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchService } from '@/services';
import type { SearchResult } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { MediaCard, MediaCardSkeleton } from '@/components/media/MediaCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChevronLeft, ChevronRight, Film, Tv, User } from 'lucide-react';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';
  const mediaType = searchParams.get('type') as 'all' | 'movie' | 'tv' | 'person' || 'all';

  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query, 1);
    }
  }, [query, mediaType]);

  const performSearch = async (q: string, page: number = 1) => {
    if (!q.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    try {
      let data;
      if (mediaType === 'all') {
        data = await searchService.searchMulti(q, page);
      } else if (mediaType === 'movie') {
        data = await searchService.searchMovies(q, page);
      } else if (mediaType === 'tv') {
        data = await searchService.searchTV(q, page);
      } else {
        data = await searchService.searchMulti(q, page);
      }
      setResults(data.results);
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error searching:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&type=${mediaType}`);
    }
  };

  const handleTypeChange = (type: 'all' | 'movie' | 'tv' | 'person') => {
    setSearchParams({ q: searchQuery, type });
  };

  const handleMediaClick = (result: SearchResult) => {
    if (result.media_type === 'movie') {
      navigate(`/movie/${result.id}`);
    } else if (result.media_type === 'tv') {
      navigate(`/tv/${result.id}`);
    }
    // Person pages not implemented yet
  };

  const mediaResults = results.filter(
    (r) => r.media_type === 'movie' || r.media_type === 'tv'
  );

  const typeLabels = {
    all: 'Todo',
    movie: 'Películas',
    tv: 'Series',
    person: 'Personas',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Search form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar películas, series..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" className="bg-netflix-red hover:bg-netflix-red/90">
              Buscar
            </Button>
          </div>
        </form>

        {/* Type filters */}
        <div className="flex gap-2 mb-8">
          {(['all', 'movie', 'tv'] as const).map((type) => (
            <Button
              key={type}
              variant={mediaType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTypeChange(type)}
            >
              {type === 'all' && <Search className="w-4 h-4 mr-2" />}
              {type === 'movie' && <Film className="w-4 h-4 mr-2" />}
              {type === 'tv' && <Tv className="w-4 h-4 mr-2" />}
              {typeLabels[type]}
            </Button>
          ))}
        </div>

        {/* Results */}
        {!hasSearched && !query && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg">
              Busca tu película o serie favorita
            </p>
          </div>
        )}

        {hasSearched && loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <MediaCardSkeleton key={i} />
            ))}
          </div>
        )}

        {hasSearched && !loading && mediaResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No se encontraron resultados para "{query}"
            </p>
          </div>
        )}

        {hasSearched && !loading && mediaResults.length > 0 && (
          <>
            <p className="text-muted-foreground mb-6">
              Se encontraron {mediaResults.length} resultados para "{query}"
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {mediaResults.map((result) => (
                <MediaCard
                  key={`${result.media_type}-${result.id}`}
                  media={result}
                  onClick={() => handleMediaClick(result)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => performSearch(query, currentPage - 1)}
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
                  onClick={() => performSearch(query, currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
