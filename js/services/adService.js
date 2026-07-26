import { adsData } from "../data.js";

const forceFailureKey = "forceAdsFailure";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function shouldFailRandomly() {
  return Math.random() < 0.35;
}

function shouldForceFailure() {
  return sessionStorage.getItem(forceFailureKey) === "true";
}

export async function fetchPromotions() {
  await delay(750);

  if (shouldForceFailure() || shouldFailRandomly()) {
    throw new Error("Ads endpoint failed.");
  }

  return [...adsData];
}

export { forceFailureKey as adsFailureFlag };
