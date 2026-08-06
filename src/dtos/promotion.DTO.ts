import type { LocalizedText } from "../entities/domain";

export interface PromotionResponseDto {
  id: number;
  badge: LocalizedText;
  title: LocalizedText;
  copy: LocalizedText;
}
