function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
export function createMovieFilterCache() {
    const cache = {};
    return {
        async filterByGenre(movies, genreKey) {
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
//# sourceMappingURL=filterCache.js.map