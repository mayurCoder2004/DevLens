import {
  Lightbulb,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function PullRequestRecommendations({
  pullRequestAnalysis,
}) {
  if (!pullRequestAnalysis) return null;

  const recommendations =
    pullRequestAnalysis.recommendations || [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-violet-500/10 p-3">
            <Sparkles className="h-6 w-6 text-violet-400" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              AI Recommendations
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Actionable engineering recommendations generated
              from the pull request analysis.
            </p>
          </div>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 py-16">
          <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-400" />

          <h3 className="text-lg font-semibold text-white">
            No Recommendations
          </h3>

          <p className="mt-2 max-w-md text-center text-sm text-slate-400">
            This pull request looks healthy. No additional
            engineering recommendations were generated.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 transition-all hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                  <Lightbulb className="h-6 w-6 text-violet-400" />
                </div>

                <div className="flex-1">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold text-white">
                      Recommendation {index + 1}
                    </h3>

                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                      AI Insight
                    </span>
                  </div>

                  <p className="leading-7 text-slate-300">
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