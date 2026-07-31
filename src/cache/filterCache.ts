import type { GenreFilterKey, Movie } from "../entities/domain.js";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

interface MovieFilterCache {
  filterByGenre: (movies: Movie[], genreKey: GenreFilterKey) => Promise<Movie[]>;
}

export function createMovieFilterCache(): MovieFilterCache {
  const cache: Partial<Record<GenreFilterKey, Movie[]>> = {};

  return {
    async filterByGenre(movies: Movie[], genreKey: GenreFilterKey): Promise<Movie[]> {
      const cachedMovies = cache[genreKey];

      if (cachedMovies) {
        console.info(`[filter cache] hit for genre: ${genreKey}`);
        return cachedMovies;
      }

      console.info(`[filter cache] miss for genre: ${genreKey}`);
      await delay(500);

      const filteredMovies = genreKey === "all"
        ? [...movies]
        : movies.filter((movie) => movie.genreKey === genreKey);

      cache[genreKey] = filteredMovies;
      return filteredMovies;
    }
  };
}
