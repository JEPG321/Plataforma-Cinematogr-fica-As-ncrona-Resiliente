function normalizeLocalizedText(value) {
    return {
        es: value.es.trim(),
        en: value.en.trim()
    };
}
function normalizeRating(rating) {
    return Math.max(1, Math.min(5, Math.round(rating)));
}
export function mapReview(dto) {
    return {
        id: dto.id,
        movieId: dto.movieId,
        author: dto.author.trim(),
        rating: normalizeRating(dto.rating),
        comment: normalizeLocalizedText(dto.comment)
    };
}
export function mapReviews(dtos) {
    return dtos.map(mapReview);
}
//# sourceMappingURL=review.mapper.js.map