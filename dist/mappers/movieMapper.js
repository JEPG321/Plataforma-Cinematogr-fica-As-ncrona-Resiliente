const genreKeys = [
    "science_fiction",
    "action",
    "drama",
    "adventure",
    "thriller",
    "horror",
    "fantasy",
    "animation"
];
function normalizeLocalizedText(value) {
    return {
        es: value.es.trim(),
        en: value.en.trim()
    };
}
function normalizeGenreKey(genreKey) {
    return genreKeys.includes(genreKey) ? genreKey : "drama";
}
export function mapMovie(dto) {
    return {
        id: dto.id,
        title: normalizeLocalizedText(dto.title),
        year: dto.year,
        duration: dto.duration.trim(),
        genreKey: normalizeGenreKey(dto.genreKey),
        description: normalizeLocalizedText(dto.description),
        image: dto.image.trim()
    };
}
export function mapMovies(dtos) {
    return dtos.map(mapMovie);
}
//# sourceMappingURL=movieMapper.js.map