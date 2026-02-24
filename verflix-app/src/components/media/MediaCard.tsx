import { Play } from 'lucide-react';
import { getImageUrl } from '@/services';
import type { Movie, TVShow } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface MediaCardProps {
  media: Movie | TVShow;
  onClick?: () => void;
  showRating?: boolean;
  variant?: 'poster' | 'backdrop';
}

export function MediaCard({ media, onClick, showRating = true, variant = 'poster' }: MediaCardProps) {
  const title = 'title' in media ? media.title : media.name;
  const date = 'release_date' in media ? media.release_date : media.first_air_date;
  const year = date ? new Date(date).getFullYear() : null;
  const imagePath = variant === 'poster' ? media.poster_path : media.backdrop_path;
  const imageUrl = getImageUrl(imagePath, variant === 'poster' ? 'w500' : 'w780');

  return (
    <div
      onClick={onClick}
      className="group relative rounded-lg cursor-pointer transition-all duration-200 hover:z-10"
    >
      <div className={`relative ${variant === 'poster' ? 'aspect-[2/3]' : 'aspect-video'} bg-muted overflow-hidden rounded-lg`}>
        <div className="relative w-full h-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-muted-foreground text-sm">No imagen</span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[300ms] ease-in-out flex items-center justify-center">
            <Play className="w-12 h-12 text-white transition-all duration-[300ms] ease-in-out scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100" />
          </div>
        </div>

        {/* Rating badge */}
        {showRating && media.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-[4px] py-[2px] leading-[1em] rounded-[3px]">
            <span className="text-xs text-white font-normal">
              {media.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="mt-2">
        <p className="text-sm font-medium truncate group-hover:text-netflix-red transition-colors duration-300 ease-in-out" title={title}>{title}</p>
        {year && <p className="text-xs text-muted-foreground">{year}</p>}
      </div>
    </div>
  );
}

export function MediaCardSkeleton() {
  return (
    <div>
      <Skeleton className="w-full aspect-[2/3] rounded-lg" />
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
}
