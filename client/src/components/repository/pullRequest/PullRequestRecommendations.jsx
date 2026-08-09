import { Lightbulb, CheckCircle2 } from "lucide-react";

export default function PullRequestRecommendations({ pullRequestAnalysis }) {
  if (!pullRequestAnalysis) return null;

  const recommendations = pullRequestAnalysis.recommendations || [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-yellow-500/10 p-2">
          <Lightbulb className="h-6 w-6 text-yellow-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            AI Recommendations
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Actionable review suggestions for this pull request.
          </p>
        </div>
      </div>

      <div className="my-6 border-t border-slate-800" />

      {recommendations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 py-14 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />

          <h3 className="mt-5 text-xl font-semibold text-white">All Clear</h3>

          <p className="mt-2 text-sm text-slate-400">
            No recommendations generated. This pull request looks healthy.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="group flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-lg"
            >
              <div className="rounded-lg bg-violet-500/10 p-2 shrink-0">
                <Lightbulb className="h-4 w-4 text-violet-400" />
              </div>

              <p className="text-sm leading-7 text-slate-300">
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
