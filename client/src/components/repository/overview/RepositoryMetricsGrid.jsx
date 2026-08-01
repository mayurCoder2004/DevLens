import {
  Boxes,
  Wrench,
  Rocket,
  Activity,
} from "lucide-react";

import MetricCard from "./MetricCard";

export default function RepositoryMetricsGrid({
  repository,
}) {
  const getStatus = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Healthy";
    if (score >= 50) return "Needs Attention";
    return "Critical";
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Architecture"
        score={repository.architecture?.complexityScore ?? 0}
        status={
          repository.architecture
            ? getStatus(
                repository.architecture.complexityScore
              )
            : "Not Analyzed"
        }
        icon={Boxes}
        color="blue"
      />

      <MetricCard
        title="Technical Debt"
        score={repository.technicalDebt?.technicalDebtScore ?? 0}
        status={
          repository.technicalDebt
            ? getStatus(
                repository.technicalDebt.technicalDebtScore
              )
            : "Not Analyzed"
        }
        icon={Wrench}
        color="yellow"
      />

      <MetricCard
        title="Deployment"
        score={repository.deployment?.deploymentScore ?? 0}
        status={
          repository.deployment
            ? getStatus(
                repository.deployment.deploymentScore
              )
            : "Not Analyzed"
        }
        icon={Rocket}
        color="emerald"
      />

      <MetricCard
        title="Engineering Health"
        score={repository.health?.healthScore ?? 0}
        status={
          repository.health
            ? getStatus(
                repository.health.healthScore
              )
            : "Not Analyzed"
        }
        icon={Activity}
        color="blue"
      />
    </div>
  );
}