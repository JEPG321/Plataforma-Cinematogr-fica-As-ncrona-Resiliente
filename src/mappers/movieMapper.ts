import type { MovieResponseDto } from "../dtos/movie.DTO.js";
import type { GenreKey, LocalizedText, Movie } from "../entities/domain.js";

const genreKeys: GenreKey[] = [
  "science_fiction",
  "action",
  "drama",
  "adventure",
  "thriller",
  "horror",
  "fantasy",
  "animation"
];

function normalizeLocalizedText(value: LocalizedText): LocalizedText {
  return {
    es: value.es.trim(),
    en: value.en.trim()
  };
}

function normalizeGenreKey(genreKey: string): GenreKey {
  return genreKeys.includes(genreKey as GenreKey) ? (genreKey as GenreKey) : "drama";
}

export function mapMovie(dto: MovieResponseDto): Movie {
  return {
    id: dto.id,
    title: normalizeLocalizedText(dto.title),
    year: dto.year,
    duration: dto.duration.trim(),
    genreKey: normalizeGenreKey(dto.genreKey),
    description: normalizeLocalizedText(dto.description),
    image: dto.image.trim()
  };
}

export function mapMovies(dtos: MovieResponseDto[]): Movie[] {
  return dtos.map(mapMovie);
}
