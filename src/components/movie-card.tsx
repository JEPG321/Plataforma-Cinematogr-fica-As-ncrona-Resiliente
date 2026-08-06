import Image from "next/image";
import type { LanguageCode, Movie, UiTexts } from "../entities/domain";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  lang: LanguageCode;
  texts: UiTexts;
  onOpen: (movie: Movie) => void;
  onToggleFavorite: (movieId: number) => void;
}

export function MovieCard({
  movie,
  isFavorite,
  lang,
  texts,
  onOpen,
  onToggleFavorite
}: MovieCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/75 shadow-lg shadow-slate-950/30 transition hover:-translate-y-1 hover:border-orange-300/25">
      <button
        type="button"
        onClick={() => onToggleFavorite(movie.id)}
        aria-label={texts.favoriteAria}
        className={`absolute right-4 top-4 z-10 rounded-full border px-3 py-2 text-sm font-semibold backdrop-blur transition ${
          isFavorite
            ? "border-orange-300 bg-orange-300 text-slate-950"
            : "border-white/15 bg-slate-950/55 text-white hover:border-white/30"
        }`}
      >
        {isFavorite ? "Favorita" : "Guardar"}
      </button>

      <button
        type="button"
        onClick={() => onOpen(movie)}
        className="block w-full text-left"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={movie.image}
            alt={texts.posterAlt(movie.title[lang])}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-slate-400">
            <span>{texts.genres[movie.genreKey]}</span>
            <span>{movie.year}</span>
          </div>
          <h3 className="text-xl font-bold text-white">{movie.title[lang]}</h3>
          <p className="line-clamp-3 text-sm leading-6 text-slate-300">
            {movie.description[lang]}
          </p>
          <span className="inline-flex text-sm font-semibold text-orange-200">
            {texts.cardHint}
          </span>
        </div>
      </button>
    </article>
  );
}
