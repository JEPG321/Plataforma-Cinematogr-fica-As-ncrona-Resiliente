import type { LanguageCode, Promotion, UiTexts } from "../entities/domain";

interface PromotionPanelProps {
  promotion: Promotion | null;
  lang: LanguageCode;
  texts: UiTexts;
}

export function PromotionPanel({ promotion, lang, texts }: PromotionPanelProps) {
  if (!promotion) {
    return null;
  }

  return (
    <section className="rounded-[1.75rem] border border-orange-300/15 bg-[linear-gradient(135deg,rgba(249,115,22,0.16),rgba(15,23,42,0.82))] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-200">
        {texts.promotionKicker}
      </p>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-white">{promotion.title[lang]}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-200">
            {promotion.copy[lang]}
          </p>
        </div>
        <span className="inline-flex self-start rounded-full border border-orange-200/30 bg-orange-300/15 px-4 py-2 text-sm font-semibold text-orange-100">
          {promotion.badge[lang]}
        </span>
      </div>
    </section>
  );
}
