import type { LocalizedText } from "../entities/domain.js";

export interface ReviewResponseDto {
  id: number;
  movieId: number;
  author: string;
  rating: number;
  comment: LocalizedText;
}
