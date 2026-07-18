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
  if (value === null || value === undefined) {
    return "N/A";
  }

  return value;
};

const getMetricSubtitle = (value, subtitle) => {
  if (value === null || value === undefined) {
    return "Not Analyzed";
  }

  return subtitle;
};

export default function EngineeringHealthSummaryCards({
  engineeringHealth,
}) {
  if (!engineeringHealth) return null;

  const { engineeringScore, status, scores } = engineeringHealth;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <SummaryMetricCard
        title="Engineering Score"
        value={engineeringScore}
        subtitle={status}
        icon={Activity}
        color="blue"
      />

      <SummaryMetricCard
        title="Repository Health"
        value={getMetricValue(scores.repositoryHealth)}
        subtitle={getMetricSubtitle(
          scores.repositoryHealth,
          "Repository"
        )}
        icon={HeartPulse}
        color="emerald"
      />

      <SummaryMetricCard
        title="Architecture"
        value={getMetricValue(scores.architecture)}
        subtitle={getMetricSubtitle(
          scores.architecture,
          "Architecture"
        )}
        icon={Network}
        color="violet"
      />

      <SummaryMetricCard
        title="Technical Debt"
        value={getMetricValue(scores.technicalDebt)}
        subtitle={getMetricSubtitle(
          scores.technicalDebt,
          "Technical Debt"
        )}
        icon={Wrench}
        color="amber"
      />

      <SummaryMetricCard
        title="Deployment"
        value={getMetricValue(scores.deployment)}
        subtitle={getMetricSubtitle(
          scores.deployment,
          "Deployment"
        )}
        icon={Rocket}
        color="cyan"
      />

      <SummaryMetricCard
        title="Pull Request"
        value={getMetricValue(scores.pullRequest)}
        subtitle={getMetricSubtitle(
          scores.pullRequest,
          "Pull Request"
        )}
        icon={GitPullRequest}
        color="red"
      />
    </div>
  );
}