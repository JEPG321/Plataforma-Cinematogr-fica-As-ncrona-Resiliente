import type {
  GenreOption,
  LanguageCode,
  Movie,
  Promotion,
  Review,
  ServiceAlert,
  UiTexts
} from "../entities/domain";

function getRequiredElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing required element: ${id}`);
  }

  return element as T;
}

const grid = getRequiredElement<HTMLElement>("movies-grid");
const genreFilters = getRequiredElement<HTMLElement>("genre-filters");
const languageSwitch = getRequiredElement<HTMLElement>("language-switch");
const searchInput = getRequiredElement<HTMLInputElement>("search-input");
const resultsText = getRequiredElement<HTMLElement>("results-text");
const favoritesToggle = getRequiredElement<HTMLButtonElement>("favorites-toggle");
const favoritesLabel = getRequiredElement<HTMLElement>("favorites-label");
const favoritesCount = getRequiredElement<HTMLElement>("favorites-count");
const serviceAlerts = getRequiredElement<HTMLElement>("service-alerts");
const filtersNav = getRequiredElement<HTMLElement>("filters-nav");
const heroEyebrow = getRequiredElement<HTMLElement>("hero-eyebrow");
const heroTitle = getRequiredElement<HTMLElement>("hero-title");
const heroCopy = getRequiredElement<HTMLElement>("hero-copy");
const sectionKicker = getRequiredElement<HTMLElement>("section-kicker");
const sectionTitle = getRequiredElement<HTMLElement>("section-title");
const footerText = getRequiredElement<HTMLElement>("footer-text");
const promotionsPanel = getRequiredElement<HTMLElement>("promotions-panel");
const promotionKicker = getRequiredElement<HTMLElement>("promotion-kicker");
const promoTitle = getRequiredElement<HTMLElement>("promo-title");
const promoCopy = getRequiredElement<HTMLElement>("promo-copy");
const promoBadge = getRequiredElement<HTMLElement>("promo-badge");
const reviewsPanel = getRequiredElement<HTMLElement>("reviews-panel");
const reviewsKicker = getRequiredElement<HTMLElement>("reviews-kicker");
const reviewsTitle = getRequiredElement<HTMLElement>("reviews-title");
const reviewsList = getRequiredElement<HTMLElement>("reviews-list");
const modalCover = getRequiredElement<HTMLElement>("modal-cover");
const modalImage = getRequiredElement<HTMLImageElement>("modal-image");
const modalGenre = getRequiredElement<HTMLElement>("modal-genre");
const modalTitle = getRequiredElement<HTMLElement>("modal-title");
const modalDescription = getRequiredElement<HTMLElement>("modal-description");
const modalYear = getRequiredElement<HTMLElement>("modal-year");
const modalDuration = getRequiredElement<HTMLElement>("modal-duration");
const closeModalBtn = getRequiredElement<HTMLButtonElement>("close-modal-btn");

function createMovieCard(
  movie: Movie,
  isFavorite: boolean,
  lang: LanguageCode,
  texts: UiTexts
): HTMLElement {
  const article = document.createElement("article");
  article.className = "movie-card";
  article.tabIndex = 0;

  article.innerHTML = `
    <button class="icon-btn movie-favorite-btn ${isFavorite ? "is-favorite" : ""}" type="button" aria-label="${texts.favoriteAria}">
      ${isFavorite ? "★" : "☆"}
    </button>
    <img class="movie-poster" src="${movie.image}" alt="${texts.posterAlt(movie.title[lang])}">
    <div class="movie-body">
      <div class="movie-topline">
        <span class="movie-tag">${texts.genres[movie.genreKey]}</span>
        <span class="movie-year">${movie.year}</span>
      </div>
      <h3 class="movie-title">${movie.title[lang]}</h3>
      <div class="movie-actions">
        <span class="click-hint">${texts.cardHint}</span>
      </div>
    </div>
  `;

  return article;
}

export function renderMovies(
  movies: Movie[],
  favorites: number[],
  lang: LanguageCode,
  texts: UiTexts,
  onDetailsClick: (movie: Movie) => void,
  onFavoriteClick: (movieId: number) => void
): void {
  grid.innerHTML = "";

  if (!movies.length) {
    grid.innerHTML = `
      <article class="movie-card">
        <div class="movie-body">
          <p class="movie-tag">${texts.noResultsTag}</p>
          <h3 class="movie-title">${texts.noResultsTitle}</h3>
          <p class="movie-description">${texts.noResultsCopy}</p>
        </div>
      </article>
    `;
    return;
  }

  movies.forEach((movie) => {
    const card = createMovieCard(movie, favorites.includes(movie.id), lang, texts);
    const favoriteButton = card.querySelector<HTMLButtonElement>(".movie-favorite-btn");

    card.onclick = () => onDetailsClick(movie);
    card.onkeydown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onDetailsClick(movie);
      }
    };

    if (favoriteButton) {
      favoriteButton.onclick = (event: MouseEvent) => {
        event.stopPropagation();
        onFavoriteClick(movie.id);
      };
    }

    grid.appendChild(card);
  });
}

export function renderGenreFilters(
  genreOptions: GenreOption[],
  activeGenreKey: GenreOption["key"],
  onFilterClick: (genreKey: GenreOption["key"]) => void
): void {
  genreFilters.innerHTML = "";

  genreOptions.forEach((genre) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-btn ${genre.key === activeGenreKey ? "is-active" : ""}`;
    button.textContent = genre.label;
    button.onclick = () => onFilterClick(genre.key);
    genreFilters.appendChild(button);
  });
}

export function renderLanguageButtons(
  currentLang: LanguageCode,
  onLanguageChange: (lang: LanguageCode) => void
): void {
  const buttons = languageSwitch.querySelectorAll<HTMLButtonElement>(".language-btn");

  buttons.forEach((button) => {
    const lang = button.dataset.lang;
    const isActive = lang === currentLang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));

    if (lang === "es" || lang === "en") {
      button.onclick = () => onLanguageChange(lang);
    }
  });
}

export function bindSearch(onSearchInput: (value: string) => void): void {
  searchInput.oninput = (event: Event) => {
    const target = event.target;

    if (target instanceof HTMLInputElement) {
      onSearchInput(target.value);
    }
  };
}

export function bindFavoritesToggle(onToggle: () => void): void {
  favoritesToggle.onclick = onToggle;
}

export function updateResultsText(count: number | string, onlyFavorites: boolean, texts: UiTexts): void {
  if (typeof count === "string") {
    resultsText.textContent = count;
    return;
  }

  const itemText = onlyFavorites ? texts.favoriteWord(count) : texts.movieWord(count);
  resultsText.textContent = `${texts.showing} ${count} ${itemText}`;
}

export function updateFavoritesCount(count: number): void {
  favoritesCount.textContent = String(count);
}

export function updateFavoritesToggle(isActive: boolean): void {
  favoritesToggle.classList.toggle("is-active", isActive);
  favoritesToggle.setAttribute("aria-pressed", String(isActive));
}

export function renderServiceAlerts(alerts: ServiceAlert[]): void {
  serviceAlerts.innerHTML = "";

  if (!alerts.length) {
    serviceAlerts.classList.add("hidden");
    return;
  }

  alerts.forEach((alert) => {
    const item = document.createElement("article");
    item.className = "service-alert";
    item.innerHTML = `<strong>${alert.title}</strong> ${alert.message}`;
    serviceAlerts.appendChild(item);
  });

  serviceAlerts.classList.remove("hidden");
}

export function renderPromotion(promotion: Promotion | null, lang: LanguageCode): void {
  if (!promotion) {
    promotionsPanel.classList.add("hidden");
    promoTitle.textContent = "";
    promoCopy.textContent = "";
    promoBadge.textContent = "";
    return;
  }

  promoTitle.textContent = promotion.title[lang];
  promoCopy.textContent = promotion.copy[lang];
  promoBadge.textContent = promotion.badge[lang];
  promotionsPanel.classList.remove("hidden");
}

export function renderReviews(reviews: Review[], moviesById: Map<number, Movie>, lang: LanguageCode): void {
  reviewsList.innerHTML = "";

  if (!reviews.length) {
    reviewsPanel.classList.add("hidden");
    return;
  }

  reviews.forEach((review) => {
    const card = document.createElement("article");
    const movie = moviesById.get(review.movieId);
    card.className = "review-card";
    card.innerHTML = `
      <p class="review-rating">${"★".repeat(review.rating)}</p>
      <p class="review-movie">${movie ? movie.title[lang] : lang === "es" ? "Catalogo" : "Catalog"}</p>
      <p class="review-author">${review.author}</p>
      <p class="review-comment">${review.comment[lang]}</p>
    `;
    reviewsList.appendChild(card);
  });

  reviewsPanel.classList.remove("hidden");
}

export function updateStaticText(lang: LanguageCode, texts: UiTexts): void {
  document.documentElement.lang = lang;
  document.title = texts.pageTitle;
  heroEyebrow.textContent = texts.heroEyebrow;
  heroTitle.textContent = texts.heroTitle;
  heroCopy.textContent = texts.heroCopy;
  favoritesLabel.textContent = texts.favoritesLabel;
  filtersNav.setAttribute("aria-label", texts.filtersAria);
  languageSwitch.setAttribute("aria-label", texts.languageAria);
  searchInput.placeholder = texts.searchPlaceholder;
  searchInput.setAttribute("aria-label", texts.searchPlaceholder);
  sectionKicker.textContent = texts.sectionKicker;
  sectionTitle.textContent = texts.sectionTitle;
  promotionKicker.textContent = texts.promotionKicker;
  reviewsKicker.textContent = texts.reviewsKicker;
  reviewsTitle.textContent = texts.reviewsTitle;
  grid.setAttribute("aria-label", texts.gridAria);
  footerText.textContent = texts.footerText;
  closeModalBtn.setAttribute("aria-label", texts.closeModal);
}

export function openModal(movie: Movie, lang: LanguageCode, texts: UiTexts): void {
  modalImage.src = movie.image;
  modalImage.alt = texts.posterAlt(movie.title[lang]);
  modalGenre.textContent = texts.genres[movie.genreKey];
  modalTitle.textContent = movie.title[lang];
  modalDescription.textContent = movie.description[lang];
  modalYear.textContent = texts.yearLabel(movie.year);
  modalDuration.textContent = texts.durationLabel(movie.duration);
  modalCover.classList.remove("hidden");
}

export function closeModal(): void {
  modalCover.classList.add("hidden");
}

closeModalBtn.onclick = closeModal;
modalCover.onclick = (event: MouseEvent) => {
  if (event.target === modalCover) {
    closeModal();
  }
};

document.onkeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeModal();
  }
};
