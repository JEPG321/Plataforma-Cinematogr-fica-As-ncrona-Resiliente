export type LanguageCode = "es" | "en";

export type GenreKey =
  | "science_fiction"
  | "action"
  | "drama"
  | "adventure"
  | "thriller"
  | "horror"
  | "fantasy"
  | "animation";

export type GenreFilterKey = GenreKey | "all";

export interface LocalizedText {
  es: string;
  en: string;
}

export interface Movie {
  id: number;
  title: LocalizedText;
  year: number;
  duration: string;
  genreKey: GenreKey;
  description: LocalizedText;
  image: string;
}

export interface Review {
  id: number;
  movieId: number;
  author: string;
  rating: number;
  comment: LocalizedText;
}

export interface Promotion {
  id: number;
  badge: LocalizedText;
  title: LocalizedText;
  copy: LocalizedText;
}

export interface HomeData {
  movies: Movie[];
  reviews: Review[];
  promotion: Promotion | null;
  reviewsUnavailable: boolean;
  adsUnavailable: boolean;
}

export interface GenreOption {
  key: GenreFilterKey;
  label: string;
}

export interface ServiceAlert {
  title: string;
  message: string;
}

export interface UiTexts {
  pageTitle: string;
  heroEyebrow: string;
  heroTitle: string;
  heroCopy: string;
  favoritesLabel: string;
  filtersAria: string;
  languageAria: string;
  searchPlaceholder: string;
  sectionKicker: string;
  sectionTitle: string;
  promotionKicker: string;
  reviewsKicker: string;
  reviewsTitle: string;
  gridAria: string;
  footerText: string;
  closeModal: string;
  favoriteAria: string;
  cardHint: string;
  noResultsTag: string;
  noResultsTitle: string;
  noResultsCopy: string;
  showing: string;
  filtering: string;
  movieWord: (count: number) => string;
  favoriteWord: (count: number) => string;
  loadErrorTag: string;
  loadErrorTitle: string;
  loadErrorCopy: string;
  secondaryServiceTitle: string;
  reviewsFallback: string;
  adsFallback: string;
  yearLabel: (year: number) => string;
  durationLabel: (duration: string) => string;
  posterAlt: (title: string) => string;
  genres: Record<GenreFilterKey, string>;
}
