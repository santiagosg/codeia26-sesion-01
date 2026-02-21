import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import { getBackdropUrl } from '@/services';
import type { Movie, TVShow } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface HeroBannerProps {
  media?: Movie | TVShow;
  loading?: boolean;
  onPlay?: () => void;
  onMoreInfo?: () => void;
}

export function HeroBanner({ media, loading = false, onPlay, onMoreInfo }: HeroBannerProps) {
  if (loading) {
    return <HeroBannerSkeleton />;
  }

  if (!media) {
    return null;
  }

  const title = 'title' in media ? media.title : media.name;
  const date = 'release_date' in media ? media.release_date : media.first_air_date;
  const year = date ? new Date(date).getFullYear() : null;
  const backdropUrl = getBackdropUrl(media.backdrop_path, 'w1280');

  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Backdrop image */}
      {backdropUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {title}
          </h1>

          <div className="flex items-center gap-4 text-white">
            {media.vote_average > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">{media.vote_average.toFixed(1)}</span>
              </div>
            )}
            {year && <span className="text-sm">{year}</span>}
          </div>

          <p className="text-base md:text-lg text-white/90 line-clamp-3 max-w-xl">
            {media.overview}
          </p>

          <div className="flex gap-3 pt-4">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90"
              onClick={onPlay}
            >
              <Play className="w-5 h-5 mr-2" />
              Reproducir
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-black/20 border-white/30 text-white hover:bg-white/20"
              onClick={onMoreInfo}
            >
              <Info className="w-5 h-5 mr-2" />
              Más información
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroBannerSkeleton() {
  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <Skeleton className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="relative h-full flex items-center px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
