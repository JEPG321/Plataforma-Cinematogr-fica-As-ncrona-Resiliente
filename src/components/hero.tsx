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
    <header className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(249,115,22,0.2),rgba(15,23,42,0.96))] px-6 py-8 shadow-2xl shadow-orange-950/30 sm:px-8 sm:py-10 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_32%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.28),transparent_70%)] lg:block" />
      <div className="absolute -bottom-14 left-10 h-36 w-36 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-orange-200/20 bg-orange-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-100/90">
            {texts.heroEyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {texts.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
            {texts.heroCopy}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium text-slate-200">
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-2">
              Next.js App Router
            </span>
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-2">
              React + Tailwind
            </span>
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-2">
              Catalogo interactivo
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-pressed={showOnlyFavorites}
          onClick={onToggleFavorites}
          className={`inline-flex items-center gap-4 self-start rounded-full border px-5 py-3 text-sm font-semibold shadow-lg shadow-slate-950/30 transition focus-visible:outline-offset-4 ${
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
