import {
  Lightbulb,
  AlertTriangle,
  Info,
  FolderTree,
  FileText,
  TrendingUp,
  Wrench,
  Sparkles,
} from "lucide-react";

const PRIORITY_STYLES = {
  HIGH: {
    badge:
      "bg-red-500/15 text-red-400 border border-red-500/30",
    border: "border-l-red-500",
    icon: AlertTriangle,
  },
  MEDIUM: {
    badge:
      "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    border: "border-l-amber-500",
    icon: Info,
  },
  LOW: {
    badge:
      "bg-blue-500/15 text-blue-400 border border-blue-500/30",
    border: "border-l-blue-500",
    icon: Info,
  },
};

export default function ArchitectureRecommendations({
  recommendations = [],
}) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur-sm">
      {/* Header */}

      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-yellow-500/10 p-2">
          <Lightbulb className="h-6 w-6 text-yellow-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Architecture Recommendations
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            AI-generated engineering recommendations to improve
            maintainability, scalability and architectural quality.
          </p>
        </div>
      </div>

      <div className="my-6 border-t border-slate-800" />

      {/* Empty State */}

      {recommendations.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 py-14 text-center">
          <Sparkles className="mx-auto h-12 w-12 text-slate-500" />

          <h3 className="mt-5 text-xl font-semibold text-white">
            No AI Recommendations Generated
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            The AI did not generate any recommendations for this
            repository.
          </p>
        </div>
      )}

      {/* Recommendation Cards */}

      <div className="space-y-6">
        {recommendations.map((recommendation, index) => {
          const priority =
            PRIORITY_STYLES[recommendation.priority] ??
            PRIORITY_STYLES.LOW;

          const PriorityIcon = priority.icon;

          return (
            <div
              key={`${recommendation.title}-${index}`}
              className={`rounded-2xl border border-slate-800 bg-slate-900/50 border-l-4 ${priority.border}
              p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl`}
            >
              {/* Top */}

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Recommendation {index + 1}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {recommendation.title}
                  </h3>
                </div>

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${priority.badge}`}
                >
                  <PriorityIcon className="h-4 w-4" />
                  {recommendation.priority}
                </span>
              </div>

              {/* Category */}

              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <FolderTree className="h-4 w-4 text-violet-400" />

                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Category
                  </h4>
                </div>

                <span className="mt-3 inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-xs font-medium text-violet-300">
                  {recommendation.category}
                </span>
              </div>

              {/* Description */}

              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-cyan-400" />

                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                    Description
                  </h4>
                </div>

                <p className="mt-3 leading-7 text-slate-300">
                  {recommendation.description}
                </p>
              </div>

              {/* Impact */}

              <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />

                  <h4 className="font-semibold text-white">
                    Engineering Impact
                  </h4>
                </div>

                <p className="mt-3 leading-7 text-slate-300">
                  {recommendation.impact}
                </p>
              </div>

              {/* Implementation */}

              <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-400" />

                  <h4 className="font-semibold text-white">
                    Recommended Implementation
                  </h4>
                </div>

                <p className="mt-3 leading-7 text-slate-300">
                  {recommendation.implementation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}