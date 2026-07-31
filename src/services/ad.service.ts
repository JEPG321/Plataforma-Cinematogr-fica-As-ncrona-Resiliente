import type { PromotionResponseDto } from "../dtos/promotion.DTO.js";
import { adsData } from "../app/data.js";

const forceFailureKey = "forceAdsFailure";

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

export async function fetchPromotions(): Promise<PromotionResponseDto[]> {
  await delay(750);

  if (shouldForceFailure() || shouldFailRandomly()) {
    throw new Error("Ads endpoint failed.");
  }

  return [...adsData];
}

export { forceFailureKey as adsFailureFlag };
