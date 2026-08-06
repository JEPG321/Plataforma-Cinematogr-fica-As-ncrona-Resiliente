import type { LocalizedText } from "../entities/domain";

export interface ReviewResponseDto {
  id: number;
  movieId: number;
  author: string;
  rating: number;
  comment: LocalizedText;
}
