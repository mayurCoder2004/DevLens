import { Lightbulb } from "lucide-react";

export default function EngineeringRecommendations({
  engineeringHealth,
}) {
  if (!engineeringHealth) return null;

  const recommendations =
    engineeringHealth.priorityRecommendations ?? [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Engineering Recommendations
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Prioritized actions that can improve your repository's
          engineering health and overall software quality.
        </p>
      </div>

      {/* Empty State */}
      {recommendations.length === 0 ? (
        <div className="mt-8 rounded-xl border border-emerald-900/50 bg-slate-950/60 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
            <Lightbulb className="h-7 w-7 text-emerald-400" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">
            No Recommendations Available
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Your repository already demonstrates strong engineering
            practices. Keep monitoring future analyses for new
            improvements.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 transition-colors hover:border-amber-500/40"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-amber-500/10 p-3">
                  <Lightbulb className="h-5 w-5 text-amber-400" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    Recommendation {index + 1}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-300">
                    {recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}