import {
  Lightbulb,
  FileCode,
  Trash2,
  GitBranch,
  Network,
} from "lucide-react";

export default function TechnicalDebtInsights({ technicalDebt }) {
  if (!technicalDebt) return null;

  const {
    technicalDebtScore,
    maintainabilityScore,
    largeFileCount,
    deadFileCount,
    circularDependencyCount,
    deepDependencyChainCount,
  } = technicalDebt;

  const getAssessment = () => {
    if (technicalDebtScore >= 70) {
      return "High technical debt detected. Immediate refactoring is recommended to improve maintainability and reduce long-term costs.";
    }
    if (technicalDebtScore >= 40) {
      return "Moderate technical debt detected. Addressing the highlighted issues will significantly improve code quality and team productivity.";
    }
    return "Low technical debt detected. The repository is in good maintainable condition with minimal refactoring needs.";
  };

  const insights = [
    {
      icon: FileCode,
      color: "text-amber-400",
      text: `${largeFileCount} large file${
        largeFileCount !== 1 ? "s" : ""
      } require refactoring to improve readability and maintainability.`,
      show: largeFileCount > 0,
    },
    {
      icon: Trash2,
      color: "text-rose-400",
      text: `${deadFileCount} unused file${
        deadFileCount !== 1 ? "s" : ""
      } detected and should be reviewed for safe removal.`,
      show: deadFileCount > 0,
    },
    {
      icon: GitBranch,
      color: "text-violet-400",
      text:
        circularDependencyCount === 0
          ? "No circular dependencies detected. Module structure is healthy."
          : `${circularDependencyCount} circular dependenc${
              circularDependencyCount === 1 ? "y" : "ies"
            } detected. These create tight coupling and should be refactored.`,
      show: true,
    },
    {
      icon: Network,
      color: "text-cyan-400",
      text: `${deepDependencyChainCount} deep dependency chain${
        deepDependencyChainCount !== 1 ? "s" : ""
      } increase module coupling and complexity.`,
      show: deepDependencyChainCount > 0,
    },
  ].filter((insight) => insight.show);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-amber-500/10 p-2">
          <Lightbulb className="h-6 w-6 text-amber-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Technical Debt Insights
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Engineering observations from technical debt analysis.
          </p>
        </div>
      </div>

      <div className="my-6 border-t border-slate-800" />

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Repository Assessment
        </h3>

        <p className="mt-3 leading-7 text-slate-300">{getAssessment()}</p>

        <div className="mt-4 flex items-center gap-6">
          <div>
            <p className="text-xs text-slate-500">Technical Debt</p>
            <p className="mt-1 text-lg font-bold text-white">
              {technicalDebtScore}/100
            </p>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          <div>
            <p className="text-xs text-slate-500">Maintainability</p>
            <p className="mt-1 text-lg font-bold text-white">
              {maintainabilityScore}/100
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {insights.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${item.color}`} />

              <p className="text-sm leading-6 text-slate-300">{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}