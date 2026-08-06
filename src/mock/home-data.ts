import type { MovieResponseDto } from "../dtos/movie.DTO";
import type { PromotionResponseDto } from "../dtos/promotion.DTO";
import type { ReviewResponseDto } from "../dtos/review.DTO";

export const moviesData: MovieResponseDto[] = [
  {
    id: 1,
    title: { es: "Luz de Medianoche", en: "Midnight Signal" },
    year: 2026,
    duration: "118 min",
    genreKey: "science_fiction",
    description: {
      es: "Una mensajera urbana descubre una red de senales en el cielo que predicen apagones en toda la ciudad.",
      en: "An urban courier discovers a network of signals in the sky that predicts blackouts across the city."
    },
    image: "/images/luz-de-medianoche.svg"
  },
  {
    id: 2,
    title: { es: "Ruta 88", en: "Route 88" },
    year: 2025,
    duration: "102 min",
    genreKey: "action",
    description: {
      es: "Dos pilotos clandestinos cruzan fronteras digitales y reales para entregar una memoria con datos prohibidos.",
      en: "Two underground drivers cross digital and physical borders to deliver a drive full of forbidden data."
    },
    image: "/images/ruta-88.svg"
  },
  {
    id: 3,
    title: { es: "Jardin de Humo", en: "Garden of Smoke" },
    year: 2026,
    duration: "110 min",
    genreKey: "drama",
    description: {
      es: "Una fotografa regresa a su barrio para documentar el ultimo cine antes de que cierre para siempre.",
      en: "A photographer returns to her neighborhood to document the last cinema before it closes forever."
    },
    image: "/images/jardin-de-humo.svg"
  },
  {
    id: 4,
    title: { es: "Orbita Coral", en: "Coral Orbit" },
    year: 2024,
    duration: "126 min",
    genreKey: "adventure",
    description: {
      es: "Una tripulacion submarina sigue una frecuencia misteriosa que parece venir desde otra dimension marina.",
      en: "An underwater crew follows a mysterious frequency that seems to come from another marine dimension."
    },
    image: "/images/orbita-coral.svg"
  },
  {
    id: 5,
    title: { es: "Codigo Lluvia", en: "Rain Code" },
    year: 2026,
    duration: "99 min",
    genreKey: "thriller",
    description: {
      es: "Un programador anonimo recibe mensajes cifrados cada vez que empieza una tormenta sobre la capital.",
      en: "An anonymous programmer receives encrypted messages every time a storm begins over the capital."
    },
    image: "/images/codigo-lluvia.svg"
  },
  {
    id: 6,
    title: { es: "Hotel Aurora", en: "Hotel Aurora" },
    year: 2023,
    duration: "108 min",
    genreKey: "horror",
    description: {
      es: "Los huespedes de un hotel abandonado despiertan cada noche en una decada distinta y deben encontrar la salida.",
      en: "Guests inside an abandoned hotel wake up each night in a different decade and must find a way out."
    },
    image: "/images/hotel-aurora.svg"
  },
  {
    id: 7,
    title: { es: "Brasa del Norte", en: "Ember of the North" },
    year: 2025,
    duration: "115 min",
    genreKey: "fantasy",
    description: {
      es: "Una chef hereda un recetario antiguo capaz de abrir portales a pueblos perdidos entre montanas nevadas.",
      en: "A chef inherits an ancient recipe book able to open portals to villages lost among snowy mountains."
    },
    image: "/images/brasa-del-norte.svg"
  },
  {
    id: 8,
    title: { es: "Vector Solar", en: "Solar Vector" },
    year: 2026,
    duration: "121 min",
    genreKey: "animation",
    description: {
      es: "Un aprendiz de inventor y una cometa consciente intentan salvar una ciudad construida sobre espejos solares.",
      en: "A young inventor and a sentient kite try to save a city built on top of solar mirrors."
    },
    image: "/images/vector-solar.svg"
  },
  {
    id: 9,
    title: { es: "Turbo Jaguar", en: "Turbo Jaguar" },
    year: 2026,
    duration: "109 min",
    genreKey: "action",
    description: {
      es: "Una piloto de escape compite por recuperar un prototipo robado antes de que caiga en manos militares.",
      en: "A getaway pilot races to recover a stolen prototype before it falls into military hands."
    },
    image: "/images/turbo-jaguar.svg"
  },
  {
    id: 10,
    title: { es: "Satelite Gris", en: "Grey Satellite" },
    year: 2025,
    duration: "113 min",
    genreKey: "science_fiction",
    description: {
      es: "Una senal perdida vuelve a encender un satelite caido y revela recuerdos que no pertenecen a ningun humano.",
      en: "A lost signal powers up a fallen satellite and reveals memories that do not belong to any human."
    },
    image: "/images/satelite-gris.svg"
  },
  {
    id: 11,
    title: { es: "La Octava Butaca", en: "The Eighth Seat" },
    year: 2024,
    duration: "117 min",
    genreKey: "drama",
    description: {
      es: "Ocho desconocidos quedan unidos por una sala de cine historica y por una carta hallada bajo una butaca antigua.",
      en: "Eight strangers are linked by a historic movie theater and a letter hidden beneath an old seat."
    },
    image: "/images/la-octava-butaca.svg"
  },
  {
    id: 12,
    title: { es: "Selva de Bronce", en: "Bronze Jungle" },
    year: 2026,
    duration: "124 min",
    genreKey: "adventure",
    description: {
      es: "Un mapa ceremonial lleva a una arqueologa y a su hermano a un valle que desaparece cada amanecer.",
      en: "A ceremonial map leads an archaeologist and her brother to a valley that vanishes every dawn."
    },
    image: "/images/selva-de-bronce.svg"
  },
  {
    id: 13,
    title: { es: "Niebla 47", en: "Fog 47" },
    year: 2026,
    duration: "101 min",
    genreKey: "thriller",
    description: {
      es: "Un locutor nocturno recibe llamadas de personas que afirman estar atrapadas en un mismo minuto de la madrugada.",
      en: "A late-night radio host receives calls from people trapped inside the same minute before dawn."
    },
    image: "/images/niebla-47.svg"
  },
  {
    id: 14,
    title: { es: "Casa de Ceniza", en: "House of Ash" },
    year: 2025,
    duration: "106 min",
    genreKey: "horror",
    description: {
      es: "Cada cuarto de una hacienda quemada conserva una voz distinta, y escucharlas completas abre una puerta imposible.",
      en: "Each room in a burned estate keeps a different voice, and hearing them all opens an impossible door."
    },
    image: "/images/casa-de-ceniza.svg"
  },
  {
    id: 15,
    title: { es: "Corona de Musgo", en: "Moss Crown" },
    year: 2024,
    duration: "119 min",
    genreKey: "fantasy",
    description: {
      es: "Un joven jardinero descubre que los parques de la ciudad son reinos dormidos protegidos por criaturas de barro y luz.",
      en: "A young gardener discovers that the city's parks are sleeping kingdoms guarded by creatures of clay and light."
    },
    image: "/images/corona-de-musgo.svg"
  },
  {
    id: 16,
    title: { es: "Pixel Salvaje", en: "Wild Pixel" },
    year: 2026,
    duration: "96 min",
    genreKey: "animation",
    description: {
      es: "Dos hermanos viajan dentro de una consola olvidada para restaurar niveles creados por su madre desaparecida.",
      en: "Two siblings travel inside a forgotten console to restore levels created by their missing mother."
    },
    image: "/images/pixel-salvaje.svg"
  }
];

export const reviewsData: ReviewResponseDto[] = [
  {
    id: 1,
    movieId: 1,
    author: "Marta L.",
    rating: 5,
    comment: {
      es: "Visualmente poderosa y con un cierre brillante.",
      en: "Visually striking with a brilliant ending."
    }
  },
  {
    id: 2,
    movieId: 9,
    author: "Diego R.",
    rating: 4,
    comment: {
      es: "Turbo Jaguar mantiene la tension de principio a fin.",
      en: "Turbo Jaguar keeps the tension high from start to finish."
    }
  },
  {
    id: 3,
    movieId: 3,
    author: "Ana P.",
    rating: 5,
    comment: {
      es: "Jardin de Humo tiene mucha sensibilidad y una gran fotografia.",
      en: "Garden of Smoke has a lot of sensitivity and beautiful cinematography."
    }
  }
];

export const adsData: PromotionResponseDto[] = [
  {
    id: 1,
    badge: {
      es: "Promo del dia",
      en: "Today's promo"
    },
    title: {
      es: "Maraton de Accion con 20% de descuento",
      en: "Action marathon with 20% off"
    },
    copy: {
      es: "Compra tu combo para Ruta 88 y Turbo Jaguar antes de medianoche y activa el descuento especial.",
      en: "Grab your combo for Route 88 and Turbo Jaguar before midnight to unlock the special discount."
    }
  },
  {
    id: 2,
    badge: {
      es: "Estreno destacado",
      en: "Featured premiere"
    },
    title: {
      es: "Semana de ciencia ficcion inmersiva",
      en: "Immersive sci-fi week"
    },
    copy: {
      es: "Descubre Luz de Medianoche y Satelite Gris con una experiencia especial de cartelera tematica.",
      en: "Discover Midnight Signal and Grey Satellite with a special themed showcase."
    }
  }
];
