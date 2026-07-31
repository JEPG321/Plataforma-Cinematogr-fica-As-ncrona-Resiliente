import type { ReviewResponseDto } from "../dtos/review.DTO.js";
import { reviewsData } from "../app/data.js";

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
