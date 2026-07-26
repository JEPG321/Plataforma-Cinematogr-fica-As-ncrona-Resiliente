const grid = document.getElementById("movies-grid");
const genreFilters = document.getElementById("genre-filters");
const languageSwitch = document.getElementById("language-switch");
const searchInput = document.getElementById("search-input");
const resultsText = document.getElementById("results-text");
const favoritesToggle = document.getElementById("favorites-toggle");
const favoritesLabel = document.getElementById("favorites-label");
const favoritesCount = document.getElementById("favorites-count");
const serviceAlerts = document.getElementById("service-alerts");
const filtersNav = document.getElementById("filters-nav");
const heroEyebrow = document.getElementById("hero-eyebrow");
const heroTitle = document.getElementById("hero-title");
const heroCopy = document.getElementById("hero-copy");
const sectionKicker = document.getElementById("section-kicker");
const sectionTitle = document.getElementById("section-title");
const footerText = document.getElementById("footer-text");
const promotionsPanel = document.getElementById("promotions-panel");
const promoTitle = document.getElementById("promo-title");
const promoCopy = document.getElementById("promo-copy");
const promoBadge = document.getElementById("promo-badge");
const reviewsPanel = document.getElementById("reviews-panel");
const reviewsList = document.getElementById("reviews-list");
const modalCover = document.getElementById("modal-cover");
const modalImage = document.getElementById("modal-image");
const modalGenre = document.getElementById("modal-genre");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalYear = document.getElementById("modal-year");
const modalDuration = document.getElementById("modal-duration");
const closeModalBtn = document.getElementById("close-modal-btn");

function createMovieCard(movie, isFavorite, lang, texts) {
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

export function renderMovies(movies, favorites, lang, texts, onDetailsClick, onFavoriteClick) {
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
    const favoriteButton = card.querySelector(".movie-favorite-btn");

    card.onclick = () => onDetailsClick(movie);
    card.onkeydown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onDetailsClick(movie);
      }
    };
    favoriteButton.onclick = (event) => {
      event.stopPropagation();
      onFavoriteClick(movie.id);
    };

    grid.appendChild(card);
  });
}

export function renderGenreFilters(genreOptions, activeGenreKey, onFilterClick) {
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

export function renderLanguageButtons(currentLang, onLanguageChange) {
  const buttons = languageSwitch.querySelectorAll(".language-btn");
  buttons.forEach((button) => {
    const isActive = button.dataset.lang === currentLang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.onclick = () => onLanguageChange(button.dataset.lang);
  });
}

export function bindSearch(onSearchInput) {
  searchInput.oninput = (event) => {
    onSearchInput(event.target.value);
  };
}

export function bindFavoritesToggle(onToggle) {
  favoritesToggle.onclick = onToggle;
}

export function updateResultsText(count, onlyFavorites, texts) {
  if (typeof count === "string") {
    resultsText.textContent = count;
    return;
  }

  const itemText = onlyFavorites ? texts.favoriteWord(count) : texts.movieWord(count);
  resultsText.textContent = `${texts.showing} ${count} ${itemText}`;
}

export function updateFavoritesCount(count) {
  favoritesCount.textContent = count;
}

export function updateFavoritesToggle(isActive) {
  favoritesToggle.classList.toggle("is-active", isActive);
  favoritesToggle.setAttribute("aria-pressed", String(isActive));
}

export function renderServiceAlerts(alerts) {
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

export function renderPromotion(promotion, lang) {
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

export function renderReviews(reviews, moviesById, lang) {
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
      <p class="review-movie">${movie ? movie.title[lang] : "Catalogo"}</p>
      <p class="review-author">${review.author}</p>
      <p class="review-comment">${review.comment[lang]}</p>
    `;
    reviewsList.appendChild(card);
  });

  reviewsPanel.classList.remove("hidden");
}

export function updateStaticText(lang, texts) {
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
  grid.setAttribute("aria-label", texts.gridAria);
  footerText.textContent = texts.footerText;
  closeModalBtn.setAttribute("aria-label", texts.closeModal);
}

export function openModal(movie, lang, texts) {
  modalImage.src = movie.image;
  modalImage.alt = texts.posterAlt(movie.title[lang]);
  modalGenre.textContent = texts.genres[movie.genreKey];
  modalTitle.textContent = movie.title[lang];
  modalDescription.textContent = movie.description[lang];
  modalYear.textContent = texts.yearLabel(movie.year);
  modalDuration.textContent = texts.durationLabel(movie.duration);
  modalCover.classList.remove("hidden");
}

export function closeModal() {
  modalCover.classList.add("hidden");
}

closeModalBtn.onclick = closeModal;
modalCover.onclick = (event) => {
  if (event.target === modalCover) {
    closeModal();
  }
};
document.onkeydown = (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
};
