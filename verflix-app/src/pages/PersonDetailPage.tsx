import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share, User, Calendar, MapPin, Film, Tv } from 'lucide-react';
import { personService, getProfileUrl } from '@/services';
import type { PersonDetails, Credit } from '@/types';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CreditCard } from '@/components/media/CreditCard';
import { MediaCard } from '@/components/media/MediaCard';

export function PersonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);
  const [filter, setFilter] = useState<'all' | 'movie' | 'tv'>('all');
  const [displayedCount, setDisplayedCount] = useState(12);

  useEffect(() => {
    if (!id) return;

    const loadPerson = async () => {
      try {
        const data = await personService.getDetails(Number(id));
        setPerson(data);
      } catch (err) {
        console.error('Error loading person:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPerson();
  }, [id]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getGenderText = (gender: number) => {
    switch (gender) {
      case 1: return 'Mujer';
      case 2: return 'Hombre';
      case 3: return 'No binario';
      default: return 'Desconocido';
    }
  };

  const getActiveYears = (birthday: string | null) => {
    if (!birthday) return 'Desconocido';
    const birthYear = new Date(birthday).getFullYear();
    return `${birthYear} - ${person?.deathday ? new Date(person.deathday).getFullYear() : 'presente'}`;
  };

  // Combinar créditos de películas y series
  const allCredits: Credit[] = [
    ...(person?.movie_credits?.cast || []).map(c => ({ ...c, media_type: 'movie' as const })),
    ...(person?.tv_credits?.cast || []).map(c => ({ ...c, media_type: 'tv' as const })),
  ].sort((a, b) => {
    // Ordenar por fecha de lanzamiento (más recientes primero)
    const dateA = a.release_date || a.first_air_date || '';
    const dateB = b.release_date || b.first_air_date || '';
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const filteredCredits = filter === 'all'
    ? allCredits
    : allCredits.filter(c => c.media_type === filter);

  const movieCount = person?.movie_credits?.cast.length || 0;
  const tvCount = person?.tv_credits?.cast.length || 0;

  if (loading) {
    return (
      <div className="bg-background">
        <Navbar />
        <div className="px-6 md:px-12 lg:px-24 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-[300px] shrink-0">
              <Skeleton className="w-full aspect-[2/3] rounded-lg" />
            </div>
            <div className="flex-1 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex gap-3 pt-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Info Personal Skeleton */}
        <div className="px-6 md:px-12 lg:px-24 py-8 border-y border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </div>

        {/* Filmografía Skeleton */}
        <div className="px-6 md:px-12 lg:px-24 py-12">
          <div className="flex justify-between mb-6">
            <Skeleton className="h-8 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="w-full aspect-[2/3] rounded-lg" />
                <div className="mt-2 space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="bg-background flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p>Actor/Actriz no encontrado/a</p>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="px-6 md:px-12 lg:px-24 pt-20 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Foto Grande */}
          <div className="w-full md:w-[300px] shrink-0">
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-muted">
              {person.profile_path ? (
                <img
                  src={getProfileUrl(person.profile_path, 'h632')}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <User className="w-24 h-24 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* Información Principal */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">{person.name}</h1>

            {/* Profesión */}
            <p className="text-lg text-muted-foreground">
              {person.known_for_department}
            </p>

            {/* Biografía Corta */}
            {person.biography ? (
              <p className="text-base text-muted-foreground line-clamp-3">
                {person.biography}
              </p>
            ) : (
              <p className="text-base text-muted-foreground">
                No hay información disponible sobre la biografía de este actor/actriz.
              </p>
            )}

            {/* Botones de Acción */}
            <div className="flex gap-3 pt-4">
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5 mr-2" />
                Seguir
              </Button>
              <Button size="lg" variant="ghost">
                <Share className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Información Personal */}
      <div className="px-6 md:px-12 lg:px-24 py-8 border-y border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Fecha de nacimiento */}
          {person.birthday && (
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Fecha de nacimiento
              </p>
              <p className="font-medium">{formatDate(person.birthday)}</p>
              {person.deathday && (
                <p className="text-sm text-muted-foreground">
                  Fallecido: {formatDate(person.deathday)}
                </p>
              )}
            </div>
          )}

          {/* Lugar de nacimiento */}
          {person.place_of_birth && (
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lugar de nacimiento
              </p>
              <p className="font-medium">{person.place_of_birth}</p>
            </div>
          )}

          {/* Género */}
          {person.gender !== 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Género</p>
              <p className="font-medium">{getGenderText(person.gender)}</p>
            </div>
          )}

          {/* Años activo */}
          {person.birthday && (
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Film className="w-4 h-4" />
                Años activo
              </p>
              <p className="font-medium">{getActiveYears(person.birthday)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Biografía Completa */}
      {person.biography ? (
        <div className="px-6 md:px-12 lg:px-24 py-8">
          <h2 className="text-2xl font-bold mb-4">Biografía</h2>
          <p className={`text-muted-foreground ${showFullBio ? '' : 'line-clamp-6'}`}>
            {person.biography}
          </p>
          {person.biography.length > 300 && (
            <Button
              variant="ghost"
              onClick={() => setShowFullBio(!showFullBio)}
              className="mt-4 text-netflix-red hover:text-netflix-red/80"
            >
              {showFullBio ? 'Ver menos' : 'Ver más'}
            </Button>
          )}
        </div>
      ) : (
        <div className="px-6 md:px-12 lg:px-24 py-8">
          <h2 className="text-2xl font-bold mb-4">Biografía</h2>
          <p className="text-muted-foreground">
            No hay información disponible sobre la biografía de este actor/actriz.
          </p>
        </div>
      )}

      {/* Filmografía */}
      {filteredCredits.length > 0 && (
        <div className="px-6 md:px-12 lg:px-24 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold">Filmografía</h2>

            {/* Tabs de Filtro */}
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                Todos ({allCredits.length})
              </Button>
              <Button
                variant={filter === 'movie' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('movie')}
              >
                <Film className="w-4 h-4 mr-1" />
                Películas ({movieCount})
              </Button>
              <Button
                variant={filter === 'tv' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('tv')}
              >
                <Tv className="w-4 h-4 mr-1" />
                Series ({tvCount})
              </Button>
            </div>
          </div>

          {/* Grid de Contenido */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredCredits.slice(0, displayedCount).map((credit) => (
              <CreditCard
                key={`${credit.id}-${credit.media_type}-${credit.credit_id}`}
                credit={credit}
                onClick={() => navigate(
                  credit.media_type === 'movie'
                    ? `/movies/${credit.id}`
                    : `/tv/${credit.id}`
                )}
              />
            ))}
          </div>

          {/* Botón Ver Más */}
          {filteredCredits.length > displayedCount && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={() => setDisplayedCount(prev => prev + 12)}
              >
                Ver más filmografía
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Conocido Por */}
      {person.known_for && Array.isArray(person.known_for) && person.known_for.length > 0 && (
        <div className="px-6 md:px-12 lg:px-24 py-12">
          <h2 className="text-2xl font-bold mb-6">Conocido por</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {person.known_for.map((work) => (
              <MediaCard
                key={work.id}
                media={work}
                onClick={() => navigate(
                  'title' in work
                    ? `/movies/${work.id}`
                    : `/tv/${work.id}`
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
