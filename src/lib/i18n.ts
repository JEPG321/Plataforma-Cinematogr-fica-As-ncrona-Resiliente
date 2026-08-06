import type {
  GenreFilterKey,
  LanguageCode,
  UiTexts
} from "../entities/domain";

export const i18n: Record<LanguageCode, UiTexts> = {
  es: {
    pageTitle: "Neon en Cartelera",
    heroEyebrow: "Cartelera interactiva",
    heroTitle: "Neon en Cartelera",
    heroCopy:
      "Una galeria responsiva de peliculas hecha ahora sobre Next.js, React y Tailwind CSS. Explora titulos, filtra, busca y marca favoritas.",
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
    footerText: "Neon en Cartelera · Base migrada a Next.js, React y Tailwind CSS.",
    closeModal: "Cerrar modal",
    favoriteAria: "Seleccionar favorito",
    cardHint: "Ver detalle",
    noResultsTag: "Sin resultados",
    noResultsTitle: "No hay resultados aun",
    noResultsCopy:
      "Prueba otro genero, cambia de idioma o marca una pelicula con la estrella para verla en favoritas.",
    showing: "Mostrando",
    filtering: "Filtrando...",
    movieWord: (count: number) => `pelicula${count === 1 ? "" : "s"}`,
    favoriteWord: (count: number) => `favorita${count === 1 ? "" : "s"}`,
    loadErrorTag: "Error",
    loadErrorTitle: "Catalogo no disponible",
    loadErrorCopy:
      "No fue posible cargar las peliculas principales. Intenta de nuevo.",
    secondaryServiceTitle: "Servicio secundario con fallo controlado.",
    reviewsFallback:
      "Las resenas no estuvieron disponibles, pero el catalogo sigue operativo.",
    adsFallback:
      "Los anuncios no pudieron cargarse, pero la cartelera principal sigue disponible.",
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
    heroCopy:
      "A responsive movie gallery now rebuilt with Next.js, React, and Tailwind CSS. Explore titles, filter, search, and mark favorites.",
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
    footerText: "Neon on Screen · Base migrated to Next.js, React, and Tailwind CSS.",
    closeModal: "Close modal",
    favoriteAria: "Select favorite",
    cardHint: "View details",
    noResultsTag: "No results",
    noResultsTitle: "No matches yet",
    noResultsCopy:
      "Try another genre, switch languages, or mark a movie with the star to see it in favorites.",
    showing: "Showing",
    filtering: "Filtering...",
    movieWord: (count: number) => `movie${count === 1 ? "" : "s"}`,
    favoriteWord: (count: number) => `favorite${count === 1 ? "" : "s"}`,
    loadErrorTag: "Error",
    loadErrorTitle: "Catalog unavailable",
    loadErrorCopy:
      "We could not load the main movies right now. Please try again.",
    secondaryServiceTitle: "Secondary service failed safely.",
    reviewsFallback:
      "User reviews could not be loaded, but the movie catalog is still working.",
    adsFallback:
      "Promotions could not be loaded, but the main gallery is still available.",
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

export function getGenreLabel(
  texts: UiTexts,
  genreKey: GenreFilterKey
): string {
  return texts.genres[genreKey];
}
