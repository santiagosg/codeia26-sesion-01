import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieService, tvService, searchService } from '@/services';
import type { Movie, TVShow } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { HeroBanner } from '@/components/media/HeroBanner';
import { MediaRow } from '@/components/media/MediaRow';
import { useApp } from '@/context/AppContext';

export function HomePage() {
  const navigate = useNavigate();
  const { loading: configLoading } = useApp();

  const [trending, setTrending] = useState<(Movie | TVShow)[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularTV, setPopularTV] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [trendingData, popularMoviesData, topRatedMoviesData, popularTVData] =
          await Promise.all([
            searchService.getTrending('all', 'week'),
            movieService.getPopular(1),
            movieService.getTopRated(1),
            tvService.getPopular(1),
          ]);

        setTrending(trendingData.results.slice(0, 10));
        setPopularMovies(popularMoviesData.results);
        setTopRatedMovies(topRatedMoviesData.results);
        setPopularTV(popularTVData.results);
      } catch (err) {
        setError('Error al cargar el contenido. Por favor intenta de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleMediaClick = (media: Movie | TVShow) => {
    const mediaType = 'title' in media ? 'movie' : 'tv';
    navigate(`/${mediaType}/${media.id}`);
  };

  if (configLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16">
          <HeroBanner loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-destructive">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const featuredMedia = trending[0];

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />

      <div className="pt-16">
        {/* Hero Banner */}
        {featuredMedia && (
          <HeroBanner
            media={featuredMedia}
            onPlay={() => handleMediaClick(featuredMedia)}
            onMoreInfo={() => handleMediaClick(featuredMedia)}
          />
        )}

        {/* Content Rows */}
        <div className="space-y-8 px-6 md:px-12 lg:px-24 -mt-16 relative z-10">
          {trending.slice(1).length > 0 && (
            <MediaRow
              title="Tendencias"
              mediaList={trending.slice(1)}
              onMediaClick={handleMediaClick}
            />
          )}

          {popularMovies.length > 0 && (
            <MediaRow
              title="Películas Populares"
              mediaList={popularMovies}
              onMediaClick={handleMediaClick}
            />
          )}

          {topRatedMovies.length > 0 && (
            <MediaRow
              title="Mejor Valoradas"
              mediaList={topRatedMovies}
              onMediaClick={handleMediaClick}
            />
          )}

          {popularTV.length > 0 && (
            <MediaRow
              title="Series Populares"
              mediaList={popularTV}
              onMediaClick={handleMediaClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
