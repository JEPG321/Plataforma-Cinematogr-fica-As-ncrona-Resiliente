import type { LocalizedText } from "../entities/domain";

export interface MovieResponseDto {
  id: number;
  title: LocalizedText;
  year: number;
  duration: string;
  genreKey: string;
  description: LocalizedText;
  image: string;
}
