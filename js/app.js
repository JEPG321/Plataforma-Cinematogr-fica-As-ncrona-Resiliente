import { moviesData } from "./data.js";
import { getFavorites, toggleFavorite } from "./favorites.js";
import {
  bindFavoritesToggle,
  bindSearch,
  openModal,
  renderGenreFilters,
  renderLanguageButtons,
  renderMovies,
  updateFavoritesCount,
  updateFavoritesToggle,
  updateResultsText,
  updateStaticText
} from "./ui.js";

const allMovies = moviesData;

const i18n = {
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
    gridAria: "Galeria de peliculas",
    footerText: "Neon en Cartelera · Proyecto responsivo con codificacion UTF-8, modal, grid y favoritos.",
    closeModal: "Cerrar modal",
    favoriteAria: "Seleccionar favorito",
    cardHint: "Haz clic en la tarjeta",
    noResultsTag: "Sin resultados",
    noResultsTitle: "No hay resultados aun",
    noResultsCopy: "Prueba otro genero, cambia de idioma o marca una pelicula con la estrella para verla en favoritas.",
    showing: "Mostrando",
    movieWord: (count) => `pelicula${count === 1 ? "" : "s"}`,
    favoriteWord: (count) => `favorita${count === 1 ? "" : "s"}`,
    yearLabel: (year) => `Ano: ${year}`,
    durationLabel: (duration) => `Duracion: ${duration}`,
    posterAlt: (title) => `Poster de ${title}`,
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
    gridAria: "Movie gallery",
    footerText: "Neon on Screen · Responsive project with UTF-8 encoding, modal, grid, and favorites.",
    closeModal: "Close modal",
    favoriteAria: "Select favorite",
    cardHint: "Click the card",
    noResultsTag: "No results",
    noResultsTitle: "No matches yet",
    noResultsCopy: "Try another genre, switch languages, or mark a movie with the star to see it in favorites.",
    showing: "Showing",
    movieWord: (count) => `movie${count === 1 ? "" : "s"}`,
    favoriteWord: (count) => `favorite${count === 1 ? "" : "s"}`,
    yearLabel: (year) => `Year: ${year}`,
    durationLabel: (duration) => `Duration: ${duration}`,
    posterAlt: (title) => `Poster for ${title}`,
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

let currentLang = "es";
let showOnlyFavorites = false;
let activeGenreKey = "all";
let searchTerm = "";

function getTexts() {
  return i18n[currentLang];
}

function getGenreOptions() {
  const texts = getTexts();
  const genreKeys = [...new Set(allMovies.map((movie) => movie.genreKey))];
  return [{ key: "all", label: texts.genres.all }, ...genreKeys.map((key) => ({ key, label: texts.genres[key] }))];
}

function getVisibleMovies() {
  const favorites = getFavorites();
  const texts = getTexts();
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return allMovies.filter((movie) => {
    const localizedTitle = movie.title[currentLang].toLowerCase();
    const localizedGenre = texts.genres[movie.genreKey].toLowerCase();
    const localizedDescription = movie.description[currentLang].toLowerCase();
    const matchesFavorites = showOnlyFavorites ? favorites.includes(movie.id) : true;
    const matchesGenre = activeGenreKey === "all" ? true : movie.genreKey === activeGenreKey;
    const matchesSearch = normalizedSearch
      ? localizedTitle.includes(normalizedSearch) || localizedGenre.includes(normalizedSearch) || localizedDescription.includes(normalizedSearch)
      : true;

    return matchesFavorites && matchesGenre && matchesSearch;
  });
}

function handleFavoriteClick(movieId) {
  toggleFavorite(movieId);
  render();
}

function render() {
  const favorites = getFavorites();
  const visibleMovies = getVisibleMovies();
  const texts = getTexts();

  updateStaticText(currentLang, texts);
  renderLanguageButtons(currentLang, (lang) => {
    currentLang = lang;
    render();
  });
  renderGenreFilters(getGenreOptions(), activeGenreKey, (genreKey) => {
    activeGenreKey = genreKey;
    render();
  });
  renderMovies(
    visibleMovies,
    favorites,
    currentLang,
    texts,
    (movie) => openModal(movie, currentLang, texts),
    handleFavoriteClick
  );
  updateResultsText(visibleMovies.length, showOnlyFavorites, texts);
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

render();
