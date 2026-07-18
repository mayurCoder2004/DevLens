import { Wrench } from "lucide-react";

export default function DeploymentRecommendations({ deployment }) {
  if (!deployment) return null;

  const recommendations = deployment.recommendations || [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Deployment Recommendations
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Recommended actions to improve deployment readiness.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {recommendations.length === 0 ? (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <p className="text-sm text-slate-300">
              🎉 No deployment recommendations. Your repository is deployment ready.
            </p>
          </div>
        ) : (
          recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-5 transition-colors hover:border-blue-500/40"
            >
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Wrench className="h-5 w-5 text-blue-400" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Recommendation #{index + 1}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {recommendation}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}