import type { ReviewResponseDto } from "../dtos/review.DTO";
import { reviewsData } from "../mock/home-data";

const forceFailureKey = "forceReviewsFailure";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function shouldFailRandomly(): boolean {
  return Math.random() < 0.35;
}

function shouldForceFailure(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return sessionStorage.getItem(forceFailureKey) === "true";
}

export async function fetchReviews(): Promise<ReviewResponseDto[]> {
  await delay(900);

  if (shouldForceFailure() || shouldFailRandomly()) {
    throw new Error("Reviews endpoint failed.");
  }

  return [...reviewsData];
}

export { forceFailureKey as reviewsFailureFlag };
