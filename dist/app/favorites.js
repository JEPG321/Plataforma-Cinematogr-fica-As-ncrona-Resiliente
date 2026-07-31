const storageKey = "neon-cartelera-favorites";
function isFavoriteList(value) {
    return Array.isArray(value) && value.every((item) => typeof item === "number");
}
export function getFavorites() {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
        return [];
    }
    try {
        const parsed = JSON.parse(raw);
        return isFavoriteList(parsed) ? parsed : [];
    }
    catch {
        return [];
    }
}
function saveFavorites(favorites) {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
}
export function toggleFavorite(movieId) {
    const favorites = getFavorites();
    const exists = favorites.includes(movieId);
    const nextFavorites = exists
        ? favorites.filter((id) => id !== movieId)
        : [...favorites, movieId];
    saveFavorites(nextFavorites);
    return nextFavorites;
}
export function isFavorite(movieId) {
    return getFavorites().includes(movieId);
}
//# sourceMappingURL=favorites.js.map