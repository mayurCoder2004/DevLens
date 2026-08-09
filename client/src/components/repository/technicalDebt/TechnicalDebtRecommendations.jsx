import {
  Lightbulb,
  AlertTriangle,
  Info,
  Layers3,
  Trash2,
  Network,
} from "lucide-react";

const PRIORITY_STYLES = {
  HIGH: {
    badge: "bg-red-500/15 text-red-400 border border-red-500/30",
    icon: AlertTriangle,
  },
  MEDIUM: {
    badge: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    icon: Info,
  },
  LOW: {
    badge: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
    icon: Info,
  },
};

export default function TechnicalDebtRecommendations({ technicalDebt }) {
  if (!technicalDebt) return null;

  const recommendations = technicalDebt.recommendations || [];

  const getRecommendationMeta = (recommendation) => {
    const text = recommendation.toLowerCase();

    if (text.includes("large files") || text.includes("refactor")) {
      return {
        icon: Layers3,
        priority: "HIGH",
        category: "Code Quality",
      };
    }

    if (text.includes("dead files") || text.includes("unused")) {
      return {
        icon: Trash2,
        priority: "MEDIUM",
        category: "Cleanup",
      };
    }

    if (text.includes("dependency") || text.includes("coupling")) {
      return {
        icon: Network,
        priority: "MEDIUM",
        category: "Architecture",
      };
    }

    return {
      icon: Info,
      priority: "LOW",
      category: "Enhancement",
    };
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-yellow-500/10 p-2">
          <Lightbulb className="h-6 w-6 text-yellow-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            AI Technical Debt Recommendations
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Prioritized actions to reduce technical debt.
          </p>
        </div>
      </div>

      <div className="my-6 border-t border-slate-800" />

      {recommendations.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 py-14 text-center">
          <Lightbulb className="mx-auto h-12 w-12 text-slate-500" />

          <h3 className="mt-5 text-xl font-semibold text-white">
            No Recommendations Generated
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Your repository shows no major technical debt issues.
          </p>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => {
            const meta = getRecommendationMeta(recommendation);
            const priorityStyle = PRIORITY_STYLES[meta.priority];
            const Icon = meta.icon;
            const PriorityIcon = priorityStyle.icon;

            return (
              <div
                key={index}
                className="group rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-slate-800/60 p-2">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${priorityStyle.badge}`}
                    >
                      <PriorityIcon className="h-3.5 w-3.5" />
                      {meta.priority}
                    </span>

                    <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-300">
                      {meta.category}
                    </span>
                  </div>
                </div>

                <p className="mt-4 leading-7 text-slate-300">
                  {recommendation}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
