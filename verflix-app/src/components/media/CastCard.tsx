import { ArrowRight, User } from 'lucide-react';
import { getProfileUrl } from '@/services';
import type { Cast } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface CastCardProps {
  person: Cast;
  onClick?: () => void;
}

export function CastCard({ person, onClick }: CastCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-lg cursor-pointer transition-all duration-200 hover:z-10"
    >
      <div className="relative aspect-[1/1] bg-muted overflow-hidden rounded-lg">
        {/* Imagen del actor */}
        {person.profile_path ? (
          <img
            src={getProfileUrl(person.profile_path, 'w185')}
            alt={person.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
        )}

        {/* Overlay con degradado al hacer hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-end justify-between p-3">
          {/* Nombre en rojo */}
          <span className="text-white font-medium text-sm truncate">
            {person.name}
          </span>

          {/* Flecha a la derecha */}
          <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 ease-in-out translate-x-[-20px] group-hover:translate-x-0" />
        </div>
      </div>

      {/* Información debajo (visible en idle) */}
      <div className="mt-2">
        <p className="font-medium text-xs truncate group-hover:text-netflix-red transition-colors duration-300 ease-in-out">
          {person.name}
        </p>
        {person.character && (
          <p className="text-[10px] text-muted-foreground truncate">
            {person.character}
          </p>
        )}
      </div>
    </div>
  );
}

export function CastCardSkeleton() {
  return (
    <div className="group relative rounded-lg">
      <Skeleton className="w-full aspect-[1/1] rounded-lg" />
      <div className="mt-2 space-y-1">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-2 w-1/2" />
      </div>
    </div>
  );
}
