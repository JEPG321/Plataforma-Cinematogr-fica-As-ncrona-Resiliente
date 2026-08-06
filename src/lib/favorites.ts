const storageKey = "neon-cartelera-favorites";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isFavoriteList(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((item) => typeof item === "number");
}

export function getFavorites(): number[] {
  if (!canUseStorage()) {
    return [];
  }

  const raw = window.localStorage.getItem(storageKey);

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

export function setFavorites(favorites: number[]): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(favorites));
}

export function toggleFavorite(movieId: number): number[] {
  const favorites = getFavorites();
  const exists = favorites.includes(movieId);
  const nextFavorites = exists
    ? favorites.filter((id) => id !== movieId)
    : [...favorites, movieId];

  setFavorites(nextFavorites);
  return nextFavorites;
}
