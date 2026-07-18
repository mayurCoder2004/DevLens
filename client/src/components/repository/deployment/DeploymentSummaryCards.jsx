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
    console.log(deployment);
  if (!deployment) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <SummaryMetricCard
        title="Deployment Score"
        value={`${deployment.deploymentScore}%`}
        icon={Rocket}
        color="blue"
      />

      <SummaryMetricCard
        title="Infrastructure"
        value={`${deployment.infrastructure.score}%`}
        icon={Server}
        color="red"
      />

      <SummaryMetricCard
        title="Build Readiness"
        value={`${deployment.buildReadiness.score}%`}
        icon={Package}
        color="emerald"
      />

      <SummaryMetricCard
        title="CI/CD"
        value={`${deployment.ciCd.score}%`}
        icon={GitBranch}
        color="amber"
      />

      <SummaryMetricCard
        title="Runtime"
        value={`${deployment.runtime.score}%`}
        icon={Cpu}
        color="violet"
      />

      <SummaryMetricCard
        title="Lock Files"
        value={`${deployment.lockFiles.score}%`}
        icon={ShieldCheck}
        color="cyan"
      />
    </div>
  );
}