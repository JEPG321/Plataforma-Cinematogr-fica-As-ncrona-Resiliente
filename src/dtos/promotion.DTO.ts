import type { LocalizedText } from "../entities/domain.js";

export interface PromotionResponseDto {
  id: number;
  badge: LocalizedText;
  title: LocalizedText;
  copy: LocalizedText;
}
