import { getImageUrl } from '@/services';
import type { Credit } from '@/types';

interface CreditCardProps {
  credit: Credit;
  onClick?: () => void;
}

export function CreditCard({ credit, onClick }: CreditCardProps) {
  const title = credit.title || credit.name;
  const imageUrl = getImageUrl(credit.poster_path, 'w500');
  const year = credit.release_date
    ? new Date(credit.release_date).getFullYear()
    : credit.first_air_date
      ? new Date(credit.first_air_date).getFullYear()
      : null;
  const hasImage = !!credit.poster_path;

  return (
    <div
      onClick={onClick}
      className="group relative rounded-lg cursor-pointer transition-all duration-200 hover:z-10"
    >
      <div className="relative aspect-[2/3] bg-muted overflow-hidden rounded-lg">
        {/* Poster */}
        {hasImage ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
            <span className="text-muted-foreground">No imagen</span>
          </div>
        )}

        {/* Overlay con nombre de personaje al hacer hover - solo cuando hay imagen */}
        {hasImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-end p-3">
            <div className="w-full">
              {credit.character && (
                <p className="text-white text-sm font-medium truncate">
                  {credit.character}
                </p>
              )}
              <p className="text-netflix-red text-xs font-medium truncate">
                {title}
              </p>
            </div>
          </div>
        )}

        {/* Rating badge - solo cuando hay imagen */}
        {hasImage && credit.vote_average && credit.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-[4px] py-[2px] leading-[1em] rounded-[3px]">
            <span className="text-xs text-white font-normal">
              {credit.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Título */}
      <div className="mt-2">
        <p className="text-sm font-medium truncate group-hover:text-netflix-red transition-colors duration-300 ease-in-out">
          {title}
        </p>
        {credit.character && (
          <p className="text-xs text-muted-foreground truncate">
            {credit.character}
          </p>
        )}
        {year && (
          <p className="text-xs text-muted-foreground">{year}</p>
        )}
      </div>
    </div>
  );
}
