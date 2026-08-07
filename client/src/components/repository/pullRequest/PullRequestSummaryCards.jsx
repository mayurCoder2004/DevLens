import {
  ShieldAlert,
  GitCompareArrows,
  Files,
  ServerCog,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

import SummaryMetricCard from "../common/SummaryMetricCard";

const getRiskConfig = (riskLevel) => {
  switch (riskLevel?.toLowerCase()) {
    case "critical":
      return { iconBg: "bg-red-500/10", iconColor: "text-red-400" };
    case "high":
      return { iconBg: "bg-orange-500/10", iconColor: "text-orange-400" };
    case "medium":
      return { iconBg: "bg-amber-500/10", iconColor: "text-amber-400" };
    default:
      return { iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400" };
  }
};

export default function PullRequestSummaryCards({ pullRequestAnalysis }) {
  if (!pullRequestAnalysis) return null;

  const riskConfig = getRiskConfig(pullRequestAnalysis.riskLevel);
  const criticalFiles = pullRequestAnalysis.criticalFiles || [];

  const metrics = [
    {
      title: "Risk Score",
      value: pullRequestAnalysis.riskScore,
      subtitle: `${pullRequestAnalysis.riskLevel} Risk`,
      icon: AlertTriangle,
      iconBg: riskConfig.iconBg,
      iconColor: riskConfig.iconColor,
    },
    {
      title: "Risk Level",
      value: pullRequestAnalysis.riskLevel,
      subtitle: "Overall classification",
      icon: TrendingUp,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      title: "Files Changed",
      value: pullRequestAnalysis.totalFiles,
      subtitle: "Modified files",
      icon: Files,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Lines Changed",
      value: pullRequestAnalysis.totalChanges,
      subtitle: "Total line changes",
      icon: GitCompareArrows,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      title: "Critical Files",
      value: criticalFiles.length,
      subtitle: "Sensitive files touched",
      icon: ShieldAlert,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
    {
      title: "Infrastructure",
      value: pullRequestAnalysis.hasConfigurationChanges ? "Yes" : "No",
      subtitle: "Config changes detected",
      icon: ServerCog,
      iconBg: "bg-slate-500/10",
      iconColor: "text-slate-400",
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
