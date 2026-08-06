import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import type { LanguageCode, Movie, UiTexts } from "../entities/domain";

interface MovieModalProps {
  movie: Movie | null;
  lang: LanguageCode;
  texts: UiTexts;
  onClose: () => void;
}

export function MovieModal({ movie, lang, texts, onClose }: MovieModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!movie) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [movie, onClose]);

  if (!movie) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/50 lg:grid-cols-[0.95fr_1.05fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={texts.closeModal}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-white transition hover:border-orange-300"
        >
          Cerrar
        </button>

        <div className="relative min-h-[320px]">
          <Image
            src={movie.image}
            alt={texts.posterAlt(movie.title[lang])}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-200">
            {texts.genres[movie.genreKey]}
          </p>
          <h3 id={titleId} className="text-3xl font-bold text-white">
            {movie.title[lang]}
          </h3>
          <p className="text-sm leading-7 text-slate-300">{movie.description[lang]}</p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              {texts.yearLabel(movie.year)}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              {texts.durationLabel(movie.duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
