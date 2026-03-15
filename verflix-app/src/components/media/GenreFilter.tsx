import type { Genre } from '@/types';
import { Button } from '@/components/ui/button';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenreId: string | null;
  onGenreChange: (genreId: string | null) => void;
  allLabel?: string;
}

export function GenreFilter({
  genres,
  selectedGenreId,
  onGenreChange,
  allLabel = 'Todos los géneros',
}: GenreFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <Button
        variant={selectedGenreId === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onGenreChange(null)}
        className="flex-shrink-0"
      >
        {allLabel}
      </Button>
      {genres.map((genre) => (
        <Button
          key={genre.id}
          variant={selectedGenreId === String(genre.id) ? 'default' : 'outline'}
          size="sm"
          onClick={() => onGenreChange(String(genre.id))}
          className="flex-shrink-0"
        >
          {genre.name}
        </Button>
      ))}
    </div>
  );
}
