function normalizeLocalizedText(value) {
    return {
        es: value.es.trim(),
        en: value.en.trim()
    };
}
export function mapPromotion(dto) {
    return {
        id: dto.id,
        badge: normalizeLocalizedText(dto.badge),
        title: normalizeLocalizedText(dto.title),
        copy: normalizeLocalizedText(dto.copy)
    };
}
export function mapPromotions(dtos) {
    return dtos.map(mapPromotion);
}
//# sourceMappingURL=promotionMapper.js.map