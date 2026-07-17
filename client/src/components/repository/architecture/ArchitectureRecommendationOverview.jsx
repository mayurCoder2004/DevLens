import { useMemo } from "react";
import {
  Sparkles,
  AlertTriangle,
  Info,
  ShieldCheck,
} from "lucide-react";

const PRIORITY = {
  HIGH: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    icon: AlertTriangle,
    subtitle: "Needs immediate attention",
  },
  MEDIUM: {
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    icon: Info,
    subtitle: "Recommended improvements",
  },
  LOW: {
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    icon: ShieldCheck,
    subtitle: "Optional enhancements",
  },
};

export default function ArchitectureRecommendationOverview({
  recommendations = [],
}) {
  const stats = useMemo(() => {
    const result = {
      total: recommendations.length,
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0,
      categories: [],
    };

    const categorySet = new Set();

    recommendations.forEach((recommendation) => {
      const priority = recommendation.priority?.toUpperCase() || "LOW";
      if (result[priority] !== undefined) {
        result[priority]++;
      }

      recommendation.category
        ?.split(",")
        .map((c) => c.trim())
        .filter(Boolean)
        .forEach((c) => categorySet.add(c));
    });

    result.categories = [...categorySet];
    return result;
  }, [recommendations]);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="rounded-xl bg-yellow-500/10 p-3">
          <Sparkles className="h-6 w-6 text-yellow-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Recommendation Overview
          </h2>

          <p className="mt-1 text-slate-400">
            High-level summary of the AI architecture analysis.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 min-h-[180px]">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">Total</h3>
            <Sparkles className="h-5 w-5 text-slate-400" />
          </div>

          <div className="mt-8">
            <p className="text-5xl font-bold text-white">{stats.total}</p>
            <p className="mt-3 text-sm text-slate-500">Recommendations</p>
          </div>
        </div>

        {["HIGH", "MEDIUM", "LOW"].map((priority) => {
          const config = PRIORITY[priority];
          const Icon = config.icon;

          return (
            <div
              key={priority}
              className={`rounded-xl border ${config.border} ${config.bg} p-6 min-h-[180px]`}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium text-slate-400">
                  {priority.charAt(0) + priority.slice(1).toLowerCase()} Priority
                </h3>

                <div className="rounded-xl bg-slate-900/60 p-3">
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>
              </div>

              <div className="mt-8">
                <p className={`text-5xl font-bold ${config.color}`}>
                  {stats[priority]}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {config.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {stats.categories.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Category Coverage
          </h3>

          <div className="flex flex-wrap gap-3">
            {stats.categories.map((category) => (
              <span
                key={category}
                className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
