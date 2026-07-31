import { reviewsData } from "../data.js";
const forceFailureKey = "forceReviewsFailure";
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
export async function fetchReviews() {
    await delay(900);
    if (shouldForceFailure() || shouldFailRandomly()) {
        throw new Error("Reviews endpoint failed.");
    }
    return [...reviewsData];
}
export { forceFailureKey as reviewsFailureFlag };
//# sourceMappingURL=reviewService.js.map