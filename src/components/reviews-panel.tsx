import type { LanguageCode, Movie, Review, UiTexts } from "../entities/domain";

interface ReviewsPanelProps {
  reviews: Review[];
  moviesById: Map<number, Movie>;
  lang: LanguageCode;
  texts: UiTexts;
}

export function ReviewsPanel({
  reviews,
  moviesById,
  lang,
  texts
}: ReviewsPanelProps) {
  if (!reviews.length) {
    return null;
  }

  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-200">
          {texts.reviewsKicker}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">{texts.reviewsTitle}</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {reviews.map((review) => {
          const movie = moviesById.get(review.movieId);

          return (
            <article
              key={review.id}
              className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-200">
                {"*".repeat(review.rating)}
              </p>
              <p className="mt-3 text-lg font-bold text-white">
                {movie ? movie.title[lang] : lang === "es" ? "Catalogo" : "Catalog"}
              </p>
              <p className="mt-1 text-sm text-slate-400">{review.author}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {review.comment[lang]}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
