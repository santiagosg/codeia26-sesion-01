import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaCard, MediaCardSkeleton } from './MediaCard';
import type { Movie, TVShow, MediaSearchResult } from '@/types';
import { Button } from '@/components/ui/button';

interface MediaRowProps {
  title: string;
  mediaList: Movie[] | TVShow[] | MediaSearchResult[];
  loading?: boolean;
  onMediaClick?: (media: Movie | TVShow | MediaSearchResult) => void;
}

export function MediaRow({ title, mediaList, loading = false, onMediaClick }: MediaRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative group">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Scroll buttons */}
      {canScrollLeft && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      )}

      {canScrollRight && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      )}

      {/* Media list */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <MediaCardSkeleton key={i} />)
          : mediaList.map((media) => (
              <div key={media.id} className="flex-shrink-0 w-[160px] snap-start">
                <MediaCard media={media} onClick={() => onMediaClick?.(media)} />
              </div>
            ))}
      </div>
    </div>
  );
}
