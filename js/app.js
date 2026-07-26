(function startApp() {
  const allMovies = window.moviesData;
  const i18n = {
    es: {
      pageTitle: "Neón en Cartelera",
      heroEyebrow: "Cartelera interactiva",
      heroTitle: "Neón en Cartelera",
      heroCopy: "Una galería responsiva de películas hecha con HTML, CSS y JavaScript puro. Explora títulos, abre el modal al tocar una tarjeta y marca tus favoritas.",
      favoritesLabel: "Favoritas",
      filtersAria: "Filtros por género",
      languageAria: "Seleccionar idioma",
      searchPlaceholder: "Buscar película...",
      sectionKicker: "Selección destacada",
      sectionTitle: "Favoritos y estrenos visuales",
      gridAria: "Galería de películas",
      footerText: "Neón en Cartelera · Proyecto responsivo con codificación UTF-8, modal, grid y favoritos.",
      closeModal: "Cerrar modal",
      favoriteAria: "Seleccionar favorito",
      cardHint: "Haz clic en la tarjeta",
      noResultsTag: "Sin resultados",
      noResultsTitle: "No hay resultados aún",
      noResultsCopy: "Prueba otro género, cambia de idioma o marca una película con la estrella para verla en favoritas.",
      showing: "Mostrando",
      movieWord: (count) => `película${count === 1 ? "" : "s"}`,
      favoriteWord: (count) => `favorita${count === 1 ? "" : "s"}`,
      yearLabel: (year) => `Año: ${year}`,
      durationLabel: (duration) => `Duración: ${duration}`,
      posterAlt: (title) => `Poster de ${title}`,
      genres: {
        all: "Todas",
        science_fiction: "Ciencia ficción",
        action: "Acción",
        drama: "Drama",
        adventure: "Aventura",
        thriller: "Thriller",
        horror: "Terror",
        fantasy: "Fantasía",
        animation: "Animación"
      }
    },
    en: {
      pageTitle: "Neon on Screen",
      heroEyebrow: "Interactive lineup",
      heroTitle: "Neon on Screen",
      heroCopy: "A responsive movie gallery built with HTML, CSS, and plain JavaScript. Explore titles, open the modal by clicking a card, and mark your favorites.",
      favoritesLabel: "Favorites",
      filtersAria: "Genre filters",
      languageAria: "Choose language",
      searchPlaceholder: "Search movie...",
      sectionKicker: "Featured selection",
      sectionTitle: "Favorites and visual premieres",
      gridAria: "Movie gallery",
      footerText: "Neon on Screen · Responsive project with UTF-8 encoding, modal, grid, and favorites.",
      closeModal: "Close modal",
      favoriteAria: "Select favorite",
      cardHint: "Click the card",
      noResultsTag: "No results",
      noResultsTitle: "No matches yet",
      noResultsCopy: "Try another genre, switch languages, or mark a movie with the star to see it in favorites.",
      showing: "Showing",
      movieWord: (count) => `movie${count === 1 ? "" : "s"}`,
      favoriteWord: (count) => `favorite${count === 1 ? "" : "s"}`,
      yearLabel: (year) => `Year: ${year}`,
      durationLabel: (duration) => `Duration: ${duration}`,
      posterAlt: (title) => `Poster for ${title}`,
      genres: {
        all: "All",
        science_fiction: "Science Fiction",
        action: "Action",
        drama: "Drama",
        adventure: "Adventure",
        thriller: "Thriller",
        horror: "Horror",
        fantasy: "Fantasy",
        animation: "Animation"
      }
    }
  };

  let currentLang = "es";
  let showOnlyFavorites = false;
  let activeGenreKey = "all";
  let searchTerm = "";

  function getTexts() {
    return i18n[currentLang];
  }

  function getGenreOptions() {
    const texts = getTexts();
    const genreKeys = [...new Set(allMovies.map((movie) => movie.genreKey))];
    return [{ key: "all", label: texts.genres.all }, ...genreKeys.map((key) => ({ key, label: texts.genres[key] }))];
  }

  function getVisibleMovies() {
    const favorites = window.favoritesStore.getFavorites();
    const texts = getTexts();
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return allMovies.filter((movie) => {
      const localizedTitle = movie.title[currentLang].toLowerCase();
      const localizedGenre = texts.genres[movie.genreKey].toLowerCase();
      const localizedDescription = movie.description[currentLang].toLowerCase();
      const matchesFavorites = showOnlyFavorites ? favorites.includes(movie.id) : true;
      const matchesGenre = activeGenreKey === "all" ? true : movie.genreKey === activeGenreKey;
      const matchesSearch = normalizedSearch
        ? localizedTitle.includes(normalizedSearch) || localizedGenre.includes(normalizedSearch) || localizedDescription.includes(normalizedSearch)
        : true;

      return matchesFavorites && matchesGenre && matchesSearch;
    });
  }

  function handleFavoriteClick(movieId) {
    window.favoritesStore.toggleFavorite(movieId);
    render();
  }

  function render() {
    const favorites = window.favoritesStore.getFavorites();
    const visibleMovies = getVisibleMovies();
    const texts = getTexts();

    window.ui.updateStaticText(currentLang, texts);
    window.ui.renderLanguageButtons(currentLang, (lang) => {
      currentLang = lang;
      render();
    });
    window.ui.renderGenreFilters(getGenreOptions(), activeGenreKey, (genreKey) => {
      activeGenreKey = genreKey;
      render();
    });
    window.ui.renderMovies(
      visibleMovies,
      favorites,
      currentLang,
      texts,
      (movie) => window.ui.openModal(movie, currentLang, texts),
      handleFavoriteClick
    );
    window.ui.updateResultsText(visibleMovies.length, showOnlyFavorites, texts);
    window.ui.updateFavoritesCount(favorites.length);
    window.ui.updateFavoritesToggle(showOnlyFavorites);
  }

  window.ui.bindFavoritesToggle(() => {
    showOnlyFavorites = !showOnlyFavorites;
    render();
  });

  window.ui.bindSearch((value) => {
    searchTerm = value;
    render();
  });

  render();
})();
