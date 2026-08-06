"use client";

import { useEffect, useMemo, useState } from "react";
import { createMovieFilterCache } from "../cache/filterCache";
import type {
  GenreFilterKey,
  HomeData,
  LanguageCode,
  Movie,
  ServiceAlert
} from "../entities/domain";
import { FiltersBar } from "./filters-bar";
import { Hero } from "./hero";
import { MovieModal } from "./movie-modal";
import { MoviesGrid } from "./movies-grid";
import { PromotionPanel } from "./promotion-panel";
import { ReviewsPanel } from "./reviews-panel";
import { ServiceAlerts } from "./service-alerts";
import { getFavorites, toggleFavorite } from "../lib/favorites";
import { i18n } from "../lib/i18n";
import { getGenreOptions, getVisibleMovies } from "../lib/selectors";

const movieFilterCache = createMovieFilterCache();

interface HomeExperienceProps {
  initialHomeData: HomeData | null;
  initialLoadFailed: boolean;
}

function getInitialSecondaryAlertKeys(
  homeData: HomeData | null
): Array<"reviewsFallback" | "adsFallback"> {
  if (!homeData) {
    return [];
  }

  const nextAlerts: Array<"reviewsFallback" | "adsFallback"> = [];

  if (homeData.reviewsUnavailable) {
    nextAlerts.push("reviewsFallback");
  }

  if (homeData.adsUnavailable) {
    nextAlerts.push("adsFallback");
  }

  return nextAlerts;
}

export function HomeExperience({
  initialHomeData,
  initialLoadFailed
}: HomeExperienceProps) {
  const [allMovies] = useState<Movie[]>(initialHomeData?.movies ?? []);
  const [genreFilteredMovies, setGenreFilteredMovies] = useState<Movie[]>(
    initialHomeData?.movies ?? []
  );
  const [reviews] = useState<HomeData["reviews"]>(initialHomeData?.reviews ?? []);
  const [promotion] = useState<HomeData["promotion"]>(initialHomeData?.promotion ?? null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentLang, setCurrentLang] = useState<LanguageCode>("es");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [activeGenreKey, setActiveGenreKey] = useState<GenreFilterKey>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilteringGenre, setIsFilteringGenre] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [secondaryAlertKeys] = useState<Array<"reviewsFallback" | "adsFallback">>(
    getInitialSecondaryAlertKeys(initialHomeData)
  );

  const texts = i18n[currentLang];

  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.title = texts.pageTitle;
  }, [currentLang, texts.pageTitle]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const genreOptions = useMemo(
    () => getGenreOptions(allMovies, texts),
    [allMovies, texts]
  );

  const visibleMovies = useMemo(
    () =>
      getVisibleMovies({
        movies: genreFilteredMovies,
        favorites,
        lang: currentLang,
        searchTerm,
        activeGenreKey,
        showOnlyFavorites,
        texts
      }),
    [
      activeGenreKey,
      currentLang,
      favorites,
      genreFilteredMovies,
      searchTerm,
      showOnlyFavorites,
      texts
    ]
  );

  const moviesById = useMemo(
    () => new Map<number, Movie>(allMovies.map((movie) => [movie.id, movie])),
    [allMovies]
  );

  const alerts: ServiceAlert[] = useMemo(
    () =>
      secondaryAlertKeys.map((key) => ({
        title: texts.secondaryServiceTitle,
        message: texts[key]
      })),
    [secondaryAlertKeys, texts]
  );

  async function handleGenreChange(genreKey: GenreFilterKey) {
    setActiveGenreKey(genreKey);
    setIsFilteringGenre(true);

    const filteredMovies = await movieFilterCache.filterByGenre(allMovies, genreKey);

    setGenreFilteredMovies(filteredMovies);
    setIsFilteringGenre(false);
  }

  function handleToggleFavorite(movieId: number) {
    const nextFavorites = toggleFavorite(movieId);
    setFavorites(nextFavorites);
  }

  const resultsText = isFilteringGenre
    ? texts.filtering
    : `${texts.showing} ${visibleMovies.length} ${
        showOnlyFavorites
          ? texts.favoriteWord(visibleMovies.length)
          : texts.movieWord(visibleMovies.length)
      }`;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <Hero
        texts={texts}
        favoritesCount={favorites.length}
        showOnlyFavorites={showOnlyFavorites}
        onToggleFavorites={() => setShowOnlyFavorites((current) => !current)}
      />

      <ServiceAlerts alerts={alerts} />

      <PromotionPanel promotion={promotion} lang={currentLang} texts={texts} />

      <FiltersBar
        texts={texts}
        currentLang={currentLang}
        searchTerm={searchTerm}
        genreOptions={genreOptions}
        activeGenreKey={activeGenreKey}
        isFilteringGenre={isFilteringGenre}
        onLanguageChange={setCurrentLang}
        onSearchChange={setSearchTerm}
        onGenreChange={(genreKey) => {
          void handleGenreChange(genreKey);
        }}
      />

      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-200">
            {initialLoadFailed ? texts.loadErrorTag : texts.sectionKicker}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            {initialLoadFailed ? texts.loadErrorTitle : texts.sectionTitle}
          </h2>
        </div>
        <p className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-slate-300">
          {resultsText}
        </p>
      </section>

      {initialLoadFailed ? (
        <MoviesGrid
          movies={[]}
          favorites={favorites}
          lang={currentLang}
          texts={{
            ...texts,
            noResultsTag: texts.loadErrorTag,
            noResultsTitle: texts.loadErrorTitle,
            noResultsCopy: texts.loadErrorCopy
          }}
          onOpenMovie={setSelectedMovie}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <MoviesGrid
          movies={visibleMovies}
          favorites={favorites}
          lang={currentLang}
          texts={texts}
          onOpenMovie={setSelectedMovie}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      <ReviewsPanel
        reviews={reviews}
        moviesById={moviesById}
        lang={currentLang}
        texts={texts}
      />

      <footer className="border-t border-white/10 pt-6 text-sm text-slate-400">
        {texts.footerText}
      </footer>

      <MovieModal
        movie={selectedMovie}
        lang={currentLang}
        texts={texts}
        onClose={() => setSelectedMovie(null)}
      />
    </main>
  );
}
