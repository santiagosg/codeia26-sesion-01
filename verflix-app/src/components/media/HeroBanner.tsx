import { Info, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { getBackdropUrl } from '@/services';
import type { Movie, TVShow } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface HeroBannerProps {
  mediaList?: (Movie | TVShow)[];
  loading?: boolean;
  onMoreInfo?: (media: Movie | TVShow) => void;
}

export function HeroBanner({
  mediaList = [],
  loading = false,
  onMoreInfo,
}: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [mediaList.length, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaList.length);
  };

  if (loading) {
    return <HeroBannerSkeleton />;
  }

  if (!mediaList.length) {
    return null;
  }

  const currentMedia = mediaList[currentIndex];
  const title = 'title' in currentMedia ? currentMedia.title : currentMedia.name;
  const date = 'release_date' in currentMedia ? currentMedia.release_date : currentMedia.first_air_date;
  const year = date ? new Date(date).getFullYear() : null;

  return (
    <div
      className="relative h-[60vh] md:h-[70vh] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div
        className="relative h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {mediaList.map((media, index) => {
          const mediaBackdropUrl = getBackdropUrl(media.backdrop_path, 'w1280');
          return (
            <div
              key={`${media.id}-${index}`}
              className="absolute inset-0 w-full h-full"
              style={{ left: `${index * 100}%` }}
            >
              {/* Backdrop image */}
              {mediaBackdropUrl ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${mediaBackdropUrl})` }}
                />
              ) : (
                <div className="absolute inset-0 bg-muted" />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />

              {/* Content */}
              {index === currentIndex && (
                <div className="relative h-full flex items-center px-6 md:px-12 lg:px-24">
                  <div className="max-w-2xl space-y-4 animate-in fade-in duration-500">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground drop-shadow-lg">
                      {title}
                    </h1>

                    <div className="flex items-center gap-4 text-foreground">
                      {media.vote_average > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{media.vote_average.toFixed(1)}</span>
                        </div>
                      )}
                      {year && <span className="text-sm">{year}</span>}
                    </div>

                    <p className="text-base md:text-lg text-foreground/90 line-clamp-3 max-w-xl">
                      {media.overview}
                    </p>

                    <div className="flex gap-3 pt-4">
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => onMoreInfo?.(media)}
                      >
                        <Info className="w-5 h-5 mr-2" />
                        Más información
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
        <Button
          variant="ghost"
          size="icon"
          className="bg-background/80 hover:bg-background/90 text-foreground border border-border opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={goToPrevious}
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <Button
          variant="ghost"
          size="icon"
          className="bg-background/80 hover:bg-background/90 text-foreground border border-border opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={goToNext}
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {mediaList.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-foreground w-8'
                : 'bg-foreground/50 hover:bg-foreground/80'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
