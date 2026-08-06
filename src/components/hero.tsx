import type { UiTexts } from "../entities/domain";

interface HeroProps {
  texts: UiTexts;
  favoritesCount: number;
  showOnlyFavorites: boolean;
  onToggleFavorites: () => void;
}

export function Hero({
  texts,
  favoritesCount,
  showOnlyFavorites,
  onToggleFavorites
}: HeroProps) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(249,115,22,0.22),rgba(15,23,42,0.92))] px-6 py-8 shadow-2xl shadow-orange-950/20 sm:px-8 sm:py-10">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.28),transparent_70%)] lg:block" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-200/90">
            {texts.heroEyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {texts.heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
            {texts.heroCopy}
          </p>
        </div>

        <button
          type="button"
          aria-pressed={showOnlyFavorites}
          onClick={onToggleFavorites}
          className={`inline-flex items-center gap-4 self-start rounded-full border px-5 py-3 text-sm font-semibold transition ${
            showOnlyFavorites
              ? "border-orange-300 bg-orange-400 text-slate-950"
              : "border-white/15 bg-white/8 text-white hover:bg-white/12"
          }`}
        >
          <span>{texts.favoritesLabel}</span>
          <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs text-orange-100">
            {favoritesCount}
          </span>
        </button>
      </div>
    </header>
  );
}
