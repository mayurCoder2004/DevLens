import SummaryMetricCard from "../common/SummaryMetricCard";
import {
  Rocket,
  Server,
  Package,
  GitBranch,
  Cpu,
  ShieldCheck,
} from "lucide-react";

export default function DeploymentSummaryCards({ deployment }) {
  if (!deployment) return null;

  const metrics = [
    {
      title: "Deployment Score",
      value: `${deployment.deploymentScore}%`,
      subtitle: "Overall readiness",
      icon: Rocket,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Infrastructure",
      value: `${deployment.infrastructure.score}%`,
      subtitle: "Docker & platforms",
      icon: Server,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
    },
    {
      title: "Build Readiness",
      value: `${deployment.buildReadiness.score}%`,
      subtitle: "Dependencies & scripts",
      icon: Package,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "CI/CD",
      value: `${deployment.ciCd.score}%`,
      subtitle: "Pipelines & workflows",
      icon: GitBranch,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
    {
      title: "Runtime",
      value: `${deployment.runtime.score}%`,
      subtitle: "Environment config",
      icon: Cpu,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      title: "Lock Files",
      value: `${deployment.lockFiles.score}%`,
      subtitle: "Dependency locking",
      icon: ShieldCheck,
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
