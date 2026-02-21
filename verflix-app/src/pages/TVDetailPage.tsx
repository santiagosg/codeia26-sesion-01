import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Star, Clock, Calendar, X, Heart, Share, User, Tv } from 'lucide-react';
import { tvService, getImageUrl, getBackdropUrl, getProfileUrl } from '@/services';
import type { TVShowDetails, TVShow } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { MediaCard, MediaCardSkeleton } from '@/components/media/MediaCard';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export function TVDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [show, setShow] = useState<TVShowDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);

  useEffect(() => {
    if (!id) return;

    const loadShow = async () => {
      try {
        const data = await tvService.getDetails(Number(id));
        setShow(data);
      } catch (err) {
        console.error('Error loading TV show:', err);
      } finally {
        setLoading(false);
      }
    };

    loadShow();
  }, [id]);

  const trailer = show?.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16">
          <Skeleton className="w-full h-[60vh] md:h-[70vh]" />
          <div className="px-6 md:px-12 lg:px-24 -mt-32 relative z-10 space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="grid grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <MediaCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Serie no encontrada</p>
      </div>
    );
  }

  const selectedSeasonData = show.seasons?.find((s) => s.season_number === selectedSeason);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative">
        {/* Backdrop */}
        <div className="h-[50vh] md:h-[60vh] relative">
          {show.backdrop_path ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${getBackdropUrl(show.backdrop_path, 'w1280')})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative px-6 md:px-12 lg:px-24 -mt-32">
          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            {/* Poster */}
            <div className="hidden md:block">
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                {show.poster_path ? (
                  <img
                    src={getImageUrl(show.poster_path, 'w500')}
                    alt={show.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No imagen</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">{show.name}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                {show.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{show.vote_average.toFixed(1)}</span>
                  </div>
                )}
                {show.first_air_date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(show.first_air_date)}</span>
                  </div>
                )}
                {show.number_of_seasons && (
                  <div className="flex items-center gap-1">
                    <Tv className="w-4 h-4" />
                    <span>{show.number_of_seasons} temporadas</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {show.genres?.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              {/* Overview */}
              <p className="text-base text-muted-foreground">{show.overview}</p>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                {trailer && (
                  <Dialog open={trailerOpen} onOpenChange={setTrailerOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-white text-black hover:bg-white/90">
                        <Play className="w-5 h-5 mr-2" />
                        Ver trailer
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0">
                      <div className="aspect-video bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                          title={trailer.name}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                <Button size="lg" variant="outline">
                  <Heart className="w-5 h-5 mr-2" />
                  Mi lista
                </Button>

                <Button size="lg" variant="ghost">
                  <Share className="w-5 h-5" />
                </Button>
              </div>

              {/* Seasons selector */}
              {show.seasons && show.seasons.length > 1 && (
                <div className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Temporadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {show.seasons.map((season) => (
                      <Button
                        key={season.id}
                        variant={selectedSeason === season.season_number ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedSeason(season.season_number)}
                      >
                        {season.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected season info */}
              {selectedSeasonData && (
                <div className="pt-4 p-4 bg-card rounded-lg">
                  <h3 className="font-semibold mb-2">{selectedSeasonData.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedSeasonData.overview}</p>
                  <p className="text-sm mt-2">{selectedSeasonData.episode_count} episodios</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cast */}
      {show.credits?.cast && show.credits.cast.length > 0 && (
        <div className="px-6 md:px-12 lg:px-24 py-12">
          <h2 className="text-2xl font-bold mb-6">Elenco</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {show.credits.cast.slice(0, 12).map((person) => (
              <div key={person.id} className="text-center">
                <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-muted">
                  {person.profile_path ? (
                    <img
                      src={getProfileUrl(person.profile_path, 'w185')}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <User className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <p className="font-medium text-sm">{person.name}</p>
                <p className="text-xs text-muted-foreground">{person.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Similar */}
      {show.similar?.results && show.similar.results.length > 0 && (
        <div className="px-6 md:px-12 lg:px-24 py-12">
          <h2 className="text-2xl font-bold mb-6">Series similares</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {show.similar.results.slice(0, 12).map((similarShow) => (
              <MediaCard
                key={similarShow.id}
                media={similarShow}
                onClick={() => navigate(`/tv/${similarShow.id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
