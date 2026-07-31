import type { PromotionResponseDto } from "../dtos/promotion.DTO.js";
import type { LocalizedText, Promotion } from "../entities/domain.js";

function normalizeLocalizedText(value: LocalizedText): LocalizedText {
  return {
    es: value.es.trim(),
    en: value.en.trim()
  };
}

export function mapPromotion(dto: PromotionResponseDto): Promotion {
  return {
    id: dto.id,
    badge: normalizeLocalizedText(dto.badge),
    title: normalizeLocalizedText(dto.title),
    copy: normalizeLocalizedText(dto.copy)
  };
}

export function mapPromotions(dtos: PromotionResponseDto[]): Promotion[] {
  return dtos.map(mapPromotion);
}
