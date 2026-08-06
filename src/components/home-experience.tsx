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
import { loadHomeData } from "../utils/loadHomeData";
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

export function HomeExperience() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [genreFilteredMovies, setGenreFilteredMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<HomeData["reviews"]>([]);
  const [promotion, setPromotion] = useState<HomeData["promotion"]>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentLang, setCurrentLang] = useState<LanguageCode>("es");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [activeGenreKey, setActiveGenreKey] = useState<GenreFilterKey>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilteringGenre, setIsFilteringGenre] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainLoadFailed, setMainLoadFailed] = useState(false);
  const [secondaryAlertKeys, setSecondaryAlertKeys] = useState<
    Array<"reviewsFallback" | "adsFallback">
  >([]);

  const texts = i18n[currentLang];

  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.title = texts.pageTitle;
  }, [currentLang, texts.pageTitle]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function startApp() {
      try {
        const homeData = await loadHomeData();

        if (!isMounted) {
          return;
        }

        const nextAlerts: Array<"reviewsFallback" | "adsFallback"> = [];

        if (homeData.reviewsUnavailable) {
          nextAlerts.push("reviewsFallback");
        }

        if (homeData.adsUnavailable) {
          nextAlerts.push("adsFallback");
        }

        setAllMovies(homeData.movies);
        setGenreFilteredMovies(homeData.movies);
        setReviews(homeData.reviews);
        setPromotion(homeData.promotion);
        setSecondaryAlertKeys(nextAlerts);
      } catch (error) {
        console.error("Main catalog load failed:", error);

        if (!isMounted) {
          return;
        }

        setMainLoadFailed(true);
        setAllMovies([]);
        setGenreFilteredMovies([]);
        setReviews([]);
        setPromotion(null);
        setSecondaryAlertKeys([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void startApp();

    return () => {
      isMounted = false;
    };
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

  const resultsText = isLoading
    ? "Cargando peliculas..."
    : isFilteringGenre
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
            {mainLoadFailed ? texts.loadErrorTag : texts.sectionKicker}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            {mainLoadFailed ? texts.loadErrorTitle : texts.sectionTitle}
          </h2>
        </div>
        <p className="text-sm font-medium text-slate-300">{resultsText}</p>
      </section>

      {isLoading ? (
        <section
          aria-label={texts.gridAria}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <article
              key={`loading-card-${index}`}
              className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5"
            >
              <div className="aspect-[4/5] animate-pulse bg-slate-800/70" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-24 animate-pulse rounded-full bg-slate-700/80" />
                <div className="h-6 w-3/4 animate-pulse rounded-full bg-slate-700/80" />
                <div className="h-4 w-full animate-pulse rounded-full bg-slate-800/80" />
                <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-800/80" />
              </div>
            </article>
          ))}
        </section>
      ) : mainLoadFailed ? (
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
