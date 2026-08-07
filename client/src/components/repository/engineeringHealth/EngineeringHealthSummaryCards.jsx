import {
  Activity,
  HeartPulse,
  Network,
  Wrench,
  Rocket,
  GitPullRequest,
} from "lucide-react";

import SummaryMetricCard from "../common/SummaryMetricCard";

const getMetricValue = (value) => {
  if (value === null || value === undefined) return "N/A";
  return value;
};

const getMetricSubtitle = (value, subtitle) => {
  if (value === null || value === undefined) return "Not analyzed";
  return subtitle;
};

export default function EngineeringHealthSummaryCards({ engineeringHealth }) {
  if (!engineeringHealth) return null;

  const { engineeringScore, status, scores } = engineeringHealth;

  const metrics = [
    {
      title: "Engineering Score",
      value: engineeringScore,
      subtitle: status,
      icon: Activity,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Repository Health",
      value: getMetricValue(scores.repositoryHealth),
      subtitle: getMetricSubtitle(scores.repositoryHealth, "Repository"),
      icon: HeartPulse,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Architecture",
      value: getMetricValue(scores.architecture),
      subtitle: getMetricSubtitle(scores.architecture, "Architecture"),
      icon: Network,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      title: "Technical Debt",
      value: getMetricValue(scores.technicalDebt),
      subtitle: getMetricSubtitle(scores.technicalDebt, "Technical Debt"),
      icon: Wrench,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
    {
      title: "Deployment",
      value: getMetricValue(scores.deployment),
      subtitle: getMetricSubtitle(scores.deployment, "Deployment"),
      icon: Rocket,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      title: "Pull Request",
      value: getMetricValue(scores.pullRequest),
      subtitle: getMetricSubtitle(scores.pullRequest, "Pull Request"),
      icon: GitPullRequest,
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-400",
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
