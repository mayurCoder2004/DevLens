import { CheckCircle2, Info, Lightbulb, ShieldCheck } from "lucide-react";

const RecommendationCard = ({ recommendations = [] }) => {
  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">
            Recommendations
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Review guidance generated from the pull request risk profile.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
          {recommendations.length} items
        </span>
      </div>

      {recommendations.length === 0 ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="mt-0.5 h-5 w-5 flex-none text-emerald-600"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-emerald-900">
                No recommendations available
              </p>
              <p className="mt-1 text-sm text-emerald-700">
                The analysis did not identify any specific follow-up actions for
                this pull request.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {recommendations.map((recommendation, index) => (
            <article
              key={`${recommendation}-${index}`}
              className="rounded-lg border border-blue-100 bg-blue-50/70 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-white p-2 text-blue-600 shadow-sm">
                  {index === 0 ? (
                    <Info className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  )}
                </div>

                <p className="text-sm leading-6 text-slate-700">
                  {recommendation}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendationCard;
