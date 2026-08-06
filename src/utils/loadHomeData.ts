import type { HomeData, Promotion } from "../entities/domain";
import { mapMovies } from "../mappers/movie.mapper";
import { mapPromotions } from "../mappers/promotion.mapper";
import { mapReviews } from "../mappers/review.mapper";
import { fetchPromotions } from "../services/ad.service";
import { fetchMovies } from "../services/movie.service";
import { fetchReviews } from "../services/review.service";

export async function loadHomeData(): Promise<HomeData> {
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
  const promotions: Promotion[] = adsResult.status === "fulfilled"
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
