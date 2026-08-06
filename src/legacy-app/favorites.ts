const storageKey = "neon-cartelera-favorites";

function isFavoriteList(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === "number");
}

export function getFavorites(): number[] {
  const raw = localStorage.getItem(storageKey);

  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    return isFavoriteList(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites: number[]): void {
  localStorage.setItem(storageKey, JSON.stringify(favorites));
}

export function toggleFavorite(movieId: number): number[] {
  const favorites = getFavorites();
  const exists = favorites.includes(movieId);
  const nextFavorites = exists
    ? favorites.filter((id) => id !== movieId)
    : [...favorites, movieId];

  saveFavorites(nextFavorites);
  return nextFavorites;
}

export function isFavorite(movieId: number): boolean {
  return getFavorites().includes(movieId);
}
