import {
  ArrowRight,
  Layers3,
  Trash2,
  Network,
} from "lucide-react";

export default function TechnicalDebtRecommendations({ technicalDebt }) {
  if (!technicalDebt) return null;

  const recommendations = technicalDebt.recommendations || [];

  const getRecommendationMeta = (recommendation) => {
    const text = recommendation.toLowerCase();

    if (text.includes("large files")) {
      return {
        icon: Layers3,
        priority: "High",
        badge:
          "bg-red-500/10 text-red-400 border-red-500/20",
      };
    }

    if (text.includes("dead files")) {
      return {
        icon: Trash2,
        priority: "Medium",
        badge:
          "bg-amber-500/10 text-amber-400 border-amber-500/20",
      };
    }

    if (text.includes("dependency")) {
      return {
        icon: Network,
        priority: "Medium",
        badge:
          "bg-blue-500/10 text-blue-400 border-blue-500/20",
      };
    }

    return {
      icon: ArrowRight,
      priority: "Low",
      badge:
        "bg-slate-500/10 text-slate-300 border-slate-500/20",
    };
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Recommended Actions
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Prioritized improvements to reduce technical debt and
          improve repository maintainability.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {recommendations.map((recommendation, index) => {
          const meta = getRecommendationMeta(recommendation);
          const Icon = meta.icon;

          return (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 transition-colors hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-blue-400" />

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${meta.badge}`}
                  >
                    {meta.priority} Priority
                  </span>
                </div>
              </div>

              <p className="mt-4 leading-7 text-slate-300">
                {recommendation}
              </p>
            </div>
          );
        })}

        {recommendations.length === 0 && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <p className="text-sm text-emerald-300">
              No recommendations available. Your repository
              currently shows no major technical debt issues.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}