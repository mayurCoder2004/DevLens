import { Sparkles, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function DeploymentOverview({ deployment }) {
  if (!deployment) return null;

  const platform =
    deployment.platforms?.platforms?.join(", ") || "Not Detected";

  const statusConfig = {
    "Deployment Ready": {
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
    },
    "Partially Ready": {
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
    },
    "Not Ready": {
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
    },
  };

  const config = statusConfig[deployment.status] || statusConfig["Not Ready"];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-6">
      <div className="mb-8 flex items-start gap-3">
        <div className="rounded-xl bg-yellow-500/10 p-3">
          <Sparkles className="h-6 w-6 text-yellow-400" />
        </div>

        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-white">
            AI Deployment Overview
          </h2>

          <p className="mt-1 text-slate-400">
            High-level summary of deployment readiness and configuration.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Status Card */}
        <div className="min-h-[180px] rounded-xl border border-slate-700 bg-slate-900 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">Status</h3>
            <Sparkles className="h-5 w-5 text-slate-400" />
          </div>

          <div className="mt-8">
            <p className={`text-2xl font-bold ${config.color}`}>
              {deployment.status}
            </p>
            <p className="mt-3 text-sm text-slate-500">Overall readiness</p>
          </div>
        </div>

        {/* Deployment Score Card */}
        <div className="min-h-[180px] rounded-xl border border-blue-500/30 bg-blue-500/10 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">
              Deployment Score
            </h3>
            <div className="rounded-xl bg-slate-900/60 p-3">
              <Sparkles className="h-5 w-5 text-blue-400" />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-4xl font-bold text-blue-400 sm:text-5xl">
              {deployment.deploymentScore}%
            </p>
            <p className="mt-3 text-sm text-slate-500">
              {deployment.deploymentScore >= 80
                ? "Excellent readiness"
                : deployment.deploymentScore >= 60
                  ? "Good readiness"
                  : "Needs improvement"}
            </p>
          </div>
        </div>

        {/* Issues Summary Card */}
        <div className="min-h-[180px] rounded-xl border border-slate-700 bg-slate-900 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">Issues</h3>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-400" />
                <span className="text-xs text-slate-400">Critical</span>
              </div>
              <span className="text-lg font-bold text-white">
                {deployment.criticalIssues.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="text-xs text-slate-400">Warnings</span>
              </div>
              <span className="text-lg font-bold text-white">
                {deployment.warnings.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-slate-400">Strengths</span>
              </div>
              <span className="text-lg font-bold text-white">
                {deployment.strengths.length}
              </span>
            </div>
          </div>
        </div>

        {/* Platform Card */}
        <div className="min-h-[180px] rounded-xl border border-slate-700 bg-slate-900 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">Platform</h3>
          </div>

          <div className="mt-8">
            <p className="break-words text-lg font-semibold text-white">
              {platform}
            </p>
            <p className="mt-3 text-sm text-slate-500">Detected platform</p>
          </div>
        </div>
      </div>
    </section>
  );
}
