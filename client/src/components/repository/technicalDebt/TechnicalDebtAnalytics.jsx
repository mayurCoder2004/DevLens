import {
  AlertTriangle,
  FileCode,
  GitBranch,
  Network,
  Trash2,
} from "lucide-react";

import ProgressMetric from "../common/ProgressMetric";

export default function TechnicalDebtAnalytics({ technicalDebt }) {
  if (!technicalDebt) return null;

  const {
    technicalDebtScore,
    maintainabilityScore,
    largeFileCount,
    deadFileCount,
    circularDependencyCount,
    deepDependencyChainCount,
  } = technicalDebt;

  const debtStatus =
    technicalDebtScore <= 40
      ? "Low Debt"
      : technicalDebtScore <= 70
      ? "Moderate Debt"
      : "High Debt";

  const debtColor =
    technicalDebtScore <= 40
      ? "bg-emerald-500"
      : technicalDebtScore <= 70
      ? "bg-amber-500"
      : "bg-red-500";

  const maintainabilityStatus =
    maintainabilityScore >= 71
      ? "Good"
      : maintainabilityScore >= 41
      ? "Fair"
      : "Poor";

  const maintainabilityColor =
    maintainabilityScore >= 71
      ? "bg-emerald-500"
      : maintainabilityScore >= 41
      ? "bg-amber-500"
      : "bg-red-500";

  const stats = [
    {
      title: "Large Files",
      value: largeFileCount,
      icon: FileCode,
      color: "text-amber-400",
    },
    {
      title: "Dead Files",
      value: deadFileCount,
      icon: Trash2,
      color: "text-rose-400",
    },
    {
      title: "Circular Dependencies",
      value: circularDependencyCount,
      icon: GitBranch,
      color: "text-violet-400",
    },
    {
      title: "Dependency Chains",
      value: deepDependencyChainCount,
      icon: Network,
      color: "text-cyan-400",
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Technical Debt Analytics
        </h2>

        <p className="mt-2 text-slate-400">
          Repository maintainability and code quality insights.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <div className="space-y-8">
          <ProgressMetric
            title="Technical Debt Score"
            value={technicalDebtScore}
            status={debtStatus}
            color={debtColor}
          />

          <ProgressMetric
            title="Maintainability Score"
            value={maintainabilityScore}
            status={maintainabilityStatus}
            color={maintainabilityColor}
          />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <Icon className={`h-5 w-5 ${item.color}`} />

                  <span className="text-2xl font-bold text-white">
                    {item.value}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-400">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}