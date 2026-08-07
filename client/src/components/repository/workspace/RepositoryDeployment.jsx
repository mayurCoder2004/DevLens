import DeploymentSummaryCards from "../deployment/DeploymentSummaryCards";
import DeploymentAnalytics from "../deployment/DeploymentAnalytics";
import DeploymentOverview from "../deployment/DeploymentOverview";
import DeploymentInsights from "../deployment/DeploymentInsights";
import DeploymentRecommendations from "../deployment/DeploymentRecommendations";
import DeploymentConfigurationBreakdown from "../deployment/DeploymentConfigurationBreakdown";

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
      {/* Summary Cards */}
      <DeploymentSummaryCards deployment={deployment} />

      {/* Analytics */}
      <DeploymentAnalytics deployment={deployment} />

      {/* AI Overview */}
      <DeploymentOverview deployment={deployment} />

      {/* Details Section - 2x2 Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DeploymentInsights
          title="Strengths"
          items={deployment.strengths || []}
          type="success"
        />

        <DeploymentInsights
          title="Critical Issues"
          items={deployment.criticalIssues || []}
          type="error"
        />

        <DeploymentInsights
          title="Warnings"
          items={deployment.warnings || []}
          type="warning"
        />

        <DeploymentRecommendations deployment={deployment} />
      </div>

      {/* Configuration Breakdown */}
      <DeploymentConfigurationBreakdown deployment={deployment} />
    </div>
  );
}