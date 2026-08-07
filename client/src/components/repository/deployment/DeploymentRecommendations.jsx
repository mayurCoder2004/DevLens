import { Lightbulb, Wrench } from "lucide-react";

export default function DeploymentRecommendations({ deployment }) {
  if (!deployment) return null;

  const recommendations = deployment.recommendations || [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-yellow-500/10 p-2">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Recommendations</h3>
          <p className="text-sm text-slate-500">{recommendations.length} items</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {recommendations.length === 0 ? (
          <div className="rounded-lg border border-emerald-900/40 bg-emerald-500/10 p-5 text-center">
            <p className="text-sm text-emerald-300">
              No deployment recommendations. Your repository is deployment ready!
            </p>
          </div>
        ) : (
          recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="group flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-4 transition-all duration-200 hover:border-slate-700"
            >
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Wrench className="h-4 w-4 text-blue-400" />
              </div>

              <p className="text-sm leading-6 text-slate-300">{recommendation}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}