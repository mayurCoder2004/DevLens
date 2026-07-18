import DeploymentSummaryCards from "../deployment/DeploymentSummaryCards";
import DeploymentAnalytics from "../deployment/DeploymentAnalytics";
import DeploymentOverview from "../deployment/DeploymentOverview";
import DeploymentInsights from "../deployment/DeploymentInsights";

export default function RepositoryDeployment({ deployment }) {
  if (!deployment) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-slate-400">
        Loading deployment analysis...
      </div>
    );
  }

  return (
    <div className="space-y-8">
  <DeploymentSummaryCards deployment={deployment} />

  <DeploymentAnalytics deployment={deployment} />

  <DeploymentOverview deployment={deployment} />

  <DeploymentInsights deployment={deployment} />
</div>
  );
}