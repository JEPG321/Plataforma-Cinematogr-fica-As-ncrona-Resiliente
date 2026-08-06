import type { LanguageCode, Movie, UiTexts } from "../entities/domain";
import { MovieCard } from "./movie-card";

interface MoviesGridProps {
  movies: Movie[];
  favorites: number[];
  lang: LanguageCode;
  texts: UiTexts;
  onOpenMovie: (movie: Movie) => void;
  onToggleFavorite: (movieId: number) => void;
}

export function MoviesGrid({
  movies,
  favorites,
  lang,
  texts,
  onOpenMovie,
  onToggleFavorite
}: MoviesGridProps) {
  if (!movies.length) {
    return (
      <section
        aria-label={texts.gridAria}
        className="rounded-[1.75rem] border border-dashed border-white/15 bg-white/5 p-8 text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">
          {texts.noResultsTag}
        </p>
        <h3 className="mt-3 text-2xl font-bold text-white">{texts.noResultsTitle}</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300">
          {texts.noResultsCopy}
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label={texts.gridAria}
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-6"
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          lang={lang}
          texts={texts}
          onOpen={onOpenMovie}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}
