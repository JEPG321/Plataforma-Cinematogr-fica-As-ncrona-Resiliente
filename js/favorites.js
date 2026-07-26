const storageKey = "neon-cartelera-favorites";

export function getFavorites() {
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : [];
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
