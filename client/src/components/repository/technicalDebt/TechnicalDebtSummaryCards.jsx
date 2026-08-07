import {
  FileCode,
  Gauge,
  GitBranch,
  Network,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import SummaryMetricCard from "../common/SummaryMetricCard";

export default function TechnicalDebtSummaryCards({ technicalDebt }) {
  if (!technicalDebt) return null;

  const metrics = [
    {
      title: "Technical Debt Score",
      value: technicalDebt.technicalDebtScore,
      subtitle: "Overall debt level",
      icon: Gauge,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
    },
    {
      title: "Maintainability Score",
      value: technicalDebt.maintainabilityScore,
      subtitle: "Code quality",
      icon: ShieldCheck,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Large Files",
      value: technicalDebt.largeFileCount,
      subtitle: "Need refactoring",
      icon: FileCode,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
    {
      title: "Dead Files",
      value: technicalDebt.deadFileCount,
      subtitle: "Unused files",
      icon: Trash2,
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-400",
    },
    {
      title: "Circular Dependencies",
      value: technicalDebt.circularDependencyCount,
      subtitle: "Architecture issues",
      icon: GitBranch,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      title: "Dependency Chains",
      value: technicalDebt.deepDependencyChainCount,
      subtitle: "High coupling",
      icon: Network,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
  ];

  return (
    <section>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <SummaryMetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            icon={metric.icon}
            iconBg={metric.iconBg}
            iconColor={metric.iconColor}
          />
        ))}
      </div>
    </section>
  );
}