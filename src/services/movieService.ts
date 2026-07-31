import type { MovieResponseDto } from "../dtos/movie.DTO.js";
import { moviesData } from "../data.js";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function fetchMovies(): Promise<MovieResponseDto[]> {
  await delay(650);
  return [...moviesData];
}
