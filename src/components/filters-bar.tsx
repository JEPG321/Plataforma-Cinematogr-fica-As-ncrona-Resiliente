import type { GenreOption, LanguageCode, UiTexts } from "../entities/domain";

interface FiltersBarProps {
  texts: UiTexts;
  currentLang: LanguageCode;
  searchTerm: string;
  genreOptions: GenreOption[];
  activeGenreKey: GenreOption["key"];
  isFilteringGenre: boolean;
  onLanguageChange: (lang: LanguageCode) => void;
  onSearchChange: (value: string) => void;
  onGenreChange: (genreKey: GenreOption["key"]) => void;
}

export function FiltersBar({
  texts,
  currentLang,
  searchTerm,
  genreOptions,
  activeGenreKey,
  isFilteringGenre,
  onLanguageChange,
  onSearchChange,
  onGenreChange
}: FiltersBarProps) {
  return (
    <section className="glass-panel rounded-[1.85rem] border border-white/10 p-4 shadow-xl shadow-slate-950/20 md:p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            aria-label={texts.languageAria}
            className="inline-flex w-fit rounded-full border border-white/10 bg-slate-950/60 p-1"
          >
            {(["es", "en"] as const).map((lang) => {
              const isActive = lang === currentLang;

              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-offset-2 ${
                    isActive
                      ? "bg-orange-400 text-slate-950"
                      : "text-slate-200 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {lang === "es" ? "Espanol" : "English"}
                </button>
              );
            })}
          </div>

          <label className="block w-full max-w-xl">
            <span className="sr-only">{texts.searchPlaceholder}</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={texts.searchPlaceholder}
              className="w-full rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm text-white shadow-inner shadow-black/20 outline-none ring-0 transition placeholder:text-slate-400 focus:border-orange-300"
            />
          </label>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            {texts.filtersAria}
          </p>
          {isFilteringGenre ? (
            <span className="text-xs font-medium text-orange-200">{texts.filtering}</span>
          ) : null}
        </div>

        <div aria-label={texts.filtersAria} className="flex flex-wrap gap-2">
          {genreOptions.map((genre) => {
            const isActive = genre.key === activeGenreKey;

            return (
              <button
                key={genre.key}
                type="button"
                onClick={() => onGenreChange(genre.key)}
                disabled={isFilteringGenre}
                className={`rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition focus-visible:outline-offset-2 disabled:cursor-wait disabled:opacity-70 ${
                  isActive
                    ? "border-orange-300 bg-orange-300/90 text-slate-950"
                    : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/8 hover:text-white"
                }`}
              >
                {genre.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
