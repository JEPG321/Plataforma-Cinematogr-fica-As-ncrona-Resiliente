import { mapMovies } from "../mappers/movieMapper.js";
import { mapPromotions } from "../mappers/promotionMapper.js";
import { mapReviews } from "../mappers/reviewMapper.js";
import { fetchPromotions } from "../services/adService.js";
import { fetchMovies } from "../services/movieService.js";
import { fetchReviews } from "../services/reviewService.js";
export async function loadHomeData() {
    const [moviesResult, reviewsResult, adsResult] = await Promise.allSettled([
        fetchMovies(),
        fetchReviews(),
        fetchPromotions()
    ]);
    if (moviesResult.status === "rejected") {
        throw moviesResult.reason;
    }
    const reviewsUnavailable = reviewsResult.status === "rejected";
    const adsUnavailable = adsResult.status === "rejected";
    const promotions = adsResult.status === "fulfilled"
        ? mapPromotions(adsResult.value)
        : [];
    if (reviewsUnavailable) {
        console.warn("Reviews service failed safely:", reviewsResult.reason);
    }
    if (adsUnavailable) {
        console.warn("Ads service failed safely:", adsResult.reason);
    }
    return {
        movies: mapMovies(moviesResult.value),
        reviews: reviewsResult.status === "fulfilled" ? mapReviews(reviewsResult.value) : [],
        promotion: promotions[0] ?? null,
        reviewsUnavailable,
        adsUnavailable
    };
}
//# sourceMappingURL=loadHomeData.js.map