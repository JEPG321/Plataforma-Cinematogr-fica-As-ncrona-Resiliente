import type {
  GenreFilterKey,
  GenreOption,
  LanguageCode,
  Movie,
  UiTexts
} from "../entities/domain";

export function getGenreOptions(movies: Movie[], texts: UiTexts): GenreOption[] {
  const genreKeys = [...new Set(movies.map((movie) => movie.genreKey))];

  return [
    { key: "all", label: texts.genres.all },
    ...genreKeys.map((key) => ({ key, label: texts.genres[key] }))
  ];
}

interface VisibleMoviesParams {
  movies: Movie[];
  favorites: number[];
  lang: LanguageCode;
  searchTerm: string;
  activeGenreKey: GenreFilterKey;
  showOnlyFavorites: boolean;
  texts: UiTexts;
}

export function getVisibleMovies({
  movies,
  favorites,
  lang,
  searchTerm,
  activeGenreKey,
  showOnlyFavorites,
  texts
}: VisibleMoviesParams): Movie[] {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return movies.filter((movie) => {
    const localizedTitle = movie.title[lang].toLowerCase();
    const localizedGenre = texts.genres[movie.genreKey].toLowerCase();
    const localizedDescription = movie.description[lang].toLowerCase();
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
