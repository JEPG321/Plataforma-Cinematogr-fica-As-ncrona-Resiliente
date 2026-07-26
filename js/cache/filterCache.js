function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function createMovieFilterCache() {
  const cache = {};

  return {
    async filterByGenre(movies, genreKey) {
      if (cache[genreKey]) {
        console.info(`[filter cache] hit for genre: ${genreKey}`);
        return cache[genreKey];
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
