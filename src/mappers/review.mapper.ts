import type { ReviewResponseDto } from "../dtos/review.DTO";
import type { LocalizedText, Review } from "../entities/domain";

function normalizeLocalizedText(value: LocalizedText): LocalizedText {
  return {
    es: value.es.trim(),
    en: value.en.trim()
  };
}

function normalizeRating(rating: number): number {
  return Math.max(1, Math.min(5, Math.round(rating)));
}

export function mapReview(dto: ReviewResponseDto): Review {
  return {
    id: dto.id,
    movieId: dto.movieId,
    author: dto.author.trim(),
    rating: normalizeRating(dto.rating),
    comment: normalizeLocalizedText(dto.comment)
  };
}

export function mapReviews(dtos: ReviewResponseDto[]): Review[] {
  return dtos.map(mapReview);
}
