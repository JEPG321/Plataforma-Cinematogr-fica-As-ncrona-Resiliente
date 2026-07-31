import type {
  GenreFilterKey,
  GenreOption,
  HomeData,
  LanguageCode,
  Movie,
  Promotion,
  Review,
  ServiceAlert,
  UiTexts
} from "./entities/domain.js";
import { createMovieFilterCache } from "./cache/filterCache.js";
import { getFavorites, toggleFavorite } from "./favorites.js";
import {
  bindFavoritesToggle,
  bindSearch,
  openModal,
  renderGenreFilters,
  renderLanguageButtons,
  renderMovies,
  renderPromotion,
  renderReviews,
  renderServiceAlerts,
  updateFavoritesCount,
  updateFavoritesToggle,
  updateResultsText,
  updateStaticText
} from "./ui.js";
import { loadHomeData } from "./utils/loadHomeData.js";

const i18n: Record<LanguageCode, UiTexts> = {
  es: {
    pageTitle: "Neon en Cartelera",
    heroEyebrow: "Cartelera interactiva",
    heroTitle: "Neon en Cartelera",
    heroCopy: "Una galeria responsiva de peliculas hecha con HTML, CSS y JavaScript puro. Explora titulos, abre el modal al tocar una tarjeta y marca tus favoritas.",
    favoritesLabel: "Favoritas",
    filtersAria: "Filtros por genero",
    languageAria: "Seleccionar idioma",
    searchPlaceholder: "Buscar pelicula...",
    sectionKicker: "Seleccion destacada",
    sectionTitle: "Favoritos y estrenos visuales",
    promotionKicker: "Promocion activa",
    reviewsKicker: "Pulso del publico",
    reviewsTitle: "Resenas recientes",
    gridAria: "Galeria de peliculas",
    footerText: "Neon en Cartelera · Proyecto responsivo con codificacion UTF-8, modal, grid y favoritos.",
    closeModal: "Cerrar modal",
    favoriteAria: "Seleccionar favorito",
    cardHint: "Haz clic en la tarjeta",
    noResultsTag: "Sin resultados",
    noResultsTitle: "No hay resultados aun",
    noResultsCopy: "Prueba otro genero, cambia de idioma o marca una pelicula con la estrella para verla en favoritas.",
    showing: "Mostrando",
    filtering: "Filtrando...",
    movieWord: (count: number) => `pelicula${count === 1 ? "" : "s"}`,
    favoriteWord: (count: number) => `favorita${count === 1 ? "" : "s"}`,
    loadErrorTag: "Error",
    loadErrorTitle: "Catalogo no disponible",
    loadErrorCopy: "No fue posible cargar las peliculas principales. Intenta de nuevo.",
    secondaryServiceTitle: "Servicio secundario con fallo controlado.",
    reviewsFallback: "Las resenas no estuvieron disponibles, pero el catalogo sigue operativo.",
    adsFallback: "Los anuncios no pudieron cargarse, pero la cartelera principal sigue disponible.",
    yearLabel: (year: number) => `Ano: ${year}`,
    durationLabel: (duration: string) => `Duracion: ${duration}`,
    posterAlt: (title: string) => `Poster de ${title}`,
    genres: {
      all: "Todas",
      science_fiction: "Ciencia ficcion",
      action: "Accion",
      drama: "Drama",
      adventure: "Aventura",
      thriller: "Thriller",
      horror: "Terror",
      fantasy: "Fantasia",
      animation: "Animacion"
    }
  },
  en: {
    pageTitle: "Neon on Screen",
    heroEyebrow: "Interactive lineup",
    heroTitle: "Neon on Screen",
    heroCopy: "A responsive movie gallery built with HTML, CSS, and plain JavaScript. Explore titles, open the modal by clicking a card, and mark your favorites.",
    favoritesLabel: "Favorites",
    filtersAria: "Genre filters",
    languageAria: "Choose language",
    searchPlaceholder: "Search movie...",
    sectionKicker: "Featured selection",
    sectionTitle: "Favorites and visual premieres",
    promotionKicker: "Live promotion",
    reviewsKicker: "Audience pulse",
    reviewsTitle: "Recent reviews",
    gridAria: "Movie gallery",
    footerText: "Neon on Screen · Responsive project with UTF-8 encoding, modal, grid, and favorites.",
    closeModal: "Close modal",
    favoriteAria: "Select favorite",
    cardHint: "Click the card",
    noResultsTag: "No results",
    noResultsTitle: "No matches yet",
    noResultsCopy: "Try another genre, switch languages, or mark a movie with the star to see it in favorites.",
    showing: "Showing",
    filtering: "Filtering...",
    movieWord: (count: number) => `movie${count === 1 ? "" : "s"}`,
    favoriteWord: (count: number) => `favorite${count === 1 ? "" : "s"}`,
    loadErrorTag: "Error",
    loadErrorTitle: "Catalog unavailable",
    loadErrorCopy: "We could not load the main movies right now. Please try again.",
    secondaryServiceTitle: "Secondary service failed safely.",
    reviewsFallback: "User reviews could not be loaded, but the movie catalog is still working.",
    adsFallback: "Promotions could not be loaded, but the main gallery is still available.",
    yearLabel: (year: number) => `Year: ${year}`,
    durationLabel: (duration: string) => `Duration: ${duration}`,
    posterAlt: (title: string) => `Poster for ${title}`,
    genres: {
      all: "All",
      science_fiction: "Science Fiction",
      action: "Action",
      drama: "Drama",
      adventure: "Adventure",
      thriller: "Thriller",
      horror: "Horror",
      fantasy: "Fantasy",
      animation: "Animation"
    }
  }
};

let allMovies: Movie[] = [];
let genreFilteredMovies: Movie[] = [];
let reviews: Review[] = [];
let promotion: Promotion | null = null;
let currentLang: LanguageCode = "es";
let showOnlyFavorites = false;
let activeGenreKey: GenreFilterKey = "all";
let searchTerm = "";
let secondaryAlertKeys: Array<"reviewsFallback" | "adsFallback"> = [];
let isFilteringGenre = false;

const movieFilterCache = createMovieFilterCache();

function getTexts(): UiTexts {
  return i18n[currentLang];
}

function getGenreOptions(): GenreOption[] {
  const texts = getTexts();
  const genreKeys = [...new Set(allMovies.map((movie) => movie.genreKey))];

  return [
    { key: "all", label: texts.genres.all },
    ...genreKeys.map((key) => ({ key, label: texts.genres[key] }))
  ];
}

function getVisibleMovies(): Movie[] {
  const favorites = getFavorites();
  const texts = getTexts();
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return genreFilteredMovies.filter((movie) => {
    const localizedTitle = movie.title[currentLang].toLowerCase();
    const localizedGenre = texts.genres[movie.genreKey].toLowerCase();
    const localizedDescription = movie.description[currentLang].toLowerCase();
    const matchesFavorites = showOnlyFavorites ? favorites.includes(movie.id) : true;
    const matchesGenre = activeGenreKey === "all" ? true : movie.genreKey === activeGenreKey;
    const matchesSearch = normalizedSearch
      ? localizedTitle.includes(normalizedSearch)
        || localizedGenre.includes(normalizedSearch)
        || localizedDescription.includes(normalizedSearch)
      : true;

    return matchesFavorites && matchesGenre && matchesSearch;
  });
}

function getAlertMessages(texts: UiTexts): ServiceAlert[] {
  return secondaryAlertKeys.map((key) => ({
    title: texts.secondaryServiceTitle,
    message: texts[key]
  }));
}

function handleFavoriteClick(movieId: number): void {
  toggleFavorite(movieId);
  render();
}

async function handleGenreChange(genreKey: GenreFilterKey): Promise<void> {
  activeGenreKey = genreKey;
  isFilteringGenre = true;
  render();

  genreFilteredMovies = await movieFilterCache.filterByGenre(allMovies, genreKey);
  isFilteringGenre = false;
  render();
}

function renderCatalogUnavailable(): void {
  const texts = getTexts();

  updateStaticText(currentLang, texts);
  renderServiceAlerts([]);
  renderPromotion(null, currentLang);
  renderReviews([], new Map<number, Movie>(), currentLang);
  renderGenreFilters([{ key: "all", label: texts.genres.all }], "all", () => {});
  renderMovies(
    [],
    [],
    currentLang,
    {
      ...texts,
      noResultsTag: texts.loadErrorTag,
      noResultsTitle: texts.loadErrorTitle,
      noResultsCopy: texts.loadErrorCopy
    },
    () => {},
    () => {}
  );
  updateResultsText(0, false, texts);
  updateFavoritesCount(getFavorites().length);
  updateFavoritesToggle(false);
}

function render(): void {
  const favorites = getFavorites();
  const visibleMovies = getVisibleMovies();
  const texts = getTexts();
  const moviesById = new Map<number, Movie>(allMovies.map((movie) => [movie.id, movie]));

  updateStaticText(currentLang, texts);
  renderServiceAlerts(getAlertMessages(texts));
  renderPromotion(promotion, currentLang);
  renderReviews(reviews, moviesById, currentLang);
  renderLanguageButtons(currentLang, (lang) => {
    currentLang = lang;
    render();
  });
  renderGenreFilters(getGenreOptions(), activeGenreKey, handleGenreChange);
  renderMovies(
    visibleMovies,
    favorites,
    currentLang,
    texts,
    (movie) => openModal(movie, currentLang, texts),
    handleFavoriteClick
  );

  if (isFilteringGenre) {
    updateResultsText(texts.filtering, false, texts);
  } else {
    updateResultsText(visibleMovies.length, showOnlyFavorites, texts);
  }

  updateFavoritesCount(favorites.length);
  updateFavoritesToggle(showOnlyFavorites);
}

bindFavoritesToggle(() => {
  showOnlyFavorites = !showOnlyFavorites;
  render();
});

bindSearch((value) => {
  searchTerm = value;
  render();
});

async function startApp(): Promise<void> {
  const texts = getTexts();
  updateStaticText(currentLang, texts);

  try {
    const homeData: HomeData = await loadHomeData();
    allMovies = homeData.movies;
    genreFilteredMovies = [...homeData.movies];
    reviews = homeData.reviews;
    promotion = homeData.promotion;
    secondaryAlertKeys = [];

    if (homeData.reviewsUnavailable) {
      secondaryAlertKeys.push("reviewsFallback");
    }

    if (homeData.adsUnavailable) {
      secondaryAlertKeys.push("adsFallback");
    }

    render();
  } catch (error: unknown) {
    console.error("Main catalog load failed:", error);
    allMovies = [];
    genreFilteredMovies = [];
    reviews = [];
    promotion = null;
    secondaryAlertKeys = [];
    renderCatalogUnavailable();
  }
}

void startApp();
