import DeploymentSummaryCards from "../deployment/DeploymentSummaryCards";

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
    </div>
  );
}