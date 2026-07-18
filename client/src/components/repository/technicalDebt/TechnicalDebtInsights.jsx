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

  const assessment =
    technicalDebtScore >= 70
      ? "The repository currently has high technical debt and requires immediate refactoring to improve maintainability."
      : technicalDebtScore >= 40
      ? "The repository currently has moderate technical debt with reasonable maintainability. Addressing the highlighted issues will significantly improve code quality."
      : "The repository currently has low technical debt and is in good maintainable condition.";

  const insights = [
    {
      icon: FileCode,
      color: "text-amber-400",
      text: `${largeFileCount} large file${
        largeFileCount !== 1 ? "s" : ""
      } require refactoring.`,
    },
    {
      icon: Trash2,
      color: "text-rose-400",
      text: `${deadFileCount} unused file${
        deadFileCount !== 1 ? "s" : ""
      } should be reviewed for removal.`,
    },
    {
      icon: GitBranch,
      color: "text-violet-400",
      text:
        circularDependencyCount === 0
          ? "No circular dependencies detected."
          : `${circularDependencyCount} circular dependenc${
              circularDependencyCount === 1 ? "y" : "ies"
            } detected.`,
    },
    {
      icon: Network,
      color: "text-cyan-400",
      text: `${deepDependencyChainCount} deep dependency chain${
        deepDependencyChainCount !== 1 ? "s" : ""
      } increase module coupling.`,
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-7 w-7 text-amber-400" />

        <div>
          <h2 className="text-2xl font-semibold text-white">
            Technical Debt Insights
          </h2>

          <p className="text-sm text-slate-400">
            Repository observations derived from the technical debt analysis.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/60 p-6">
        <h3 className="text-lg font-semibold text-white">
          Repository Assessment
        </h3>

        <p className="mt-3 leading-7 text-slate-300">
          {assessment}
        </p>

        <p className="mt-4 text-sm text-slate-500">
          Maintainability Score:{" "}
          <span className="font-medium text-white">
            {maintainabilityScore}/100
          </span>
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {insights.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-5"
            >
              <Icon className={`mt-1 h-5 w-5 ${item.color}`} />

              <p className="text-slate-300">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}