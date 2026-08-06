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
    <article className="group glass-panel relative overflow-hidden rounded-[1.65rem] border border-white/10 shadow-lg shadow-slate-950/30 transition duration-300 hover:-translate-y-1 hover:border-orange-300/25 hover:shadow-2xl hover:shadow-black/25">
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

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-slate-400">
          <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[10px] text-slate-200">
            {texts.genres[movie.genreKey]}
          </span>
          <span>{movie.year}</span>
        </div>
        <h3 className="text-xl font-bold text-white">{movie.title[lang]}</h3>
        <p className="line-clamp-3 text-sm leading-6 text-slate-300">
          {movie.description[lang]}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpen(movie)}
            aria-label={`${texts.cardHint}: ${movie.title[lang]}`}
            className="inline-flex items-center rounded-full border border-orange-300/30 bg-orange-300/12 px-4 py-2 text-sm font-semibold text-orange-100 transition hover:border-orange-200 hover:bg-orange-300/18 focus-visible:outline-offset-2"
          >
            {texts.cardHint}
          </button>

          <button
            type="button"
            onClick={() => onToggleFavorite(movie.id)}
            aria-label={texts.favoriteAria}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-offset-2 ${
              isFavorite
                ? "border-orange-300 bg-orange-300 text-slate-950"
                : "border-white/15 bg-slate-900/70 text-white hover:border-white/30"
            }`}
          >
            {isFavorite ? "Favorita" : "Guardar"}
          </button>
        </div>
      </div>
    </article>
  );
}
