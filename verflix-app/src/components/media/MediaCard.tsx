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
      className="group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-2xl"
    >
      <div className={`relative ${variant === 'poster' ? 'aspect-[2/3]' : 'aspect-video'} bg-muted`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            <span className="text-muted-foreground text-sm">No imagen</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
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
        <p className="text-sm font-medium truncate" title={title}>{title}</p>
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
