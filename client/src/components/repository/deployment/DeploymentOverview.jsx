import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Rocket,
} from "lucide-react";

export default function DeploymentOverview({ deployment }) {
  if (!deployment) return null;

  const platform =
    deployment.platforms?.platforms?.join(", ") || "Not Detected";

  const statusColor =
    deployment.status === "Deployment Ready"
      ? "text-emerald-400"
      : deployment.status === "Partially Ready"
      ? "text-amber-400"
      : "text-red-400";

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Deployment Overview
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Executive summary of your repository's deployment readiness.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Overall Status */}

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
          <div className="flex items-center gap-3">
            <Rocket className="h-6 w-6 text-blue-400" />

            <div>
              <h3 className="text-lg font-semibold text-white">
                Overall Status
              </h3>

              <p className={`mt-2 text-xl font-bold ${statusColor}`}>
                {deployment.status}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Deployment Score
              </span>

              <span className="text-lg font-bold text-white">
                {deployment.deploymentScore}%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${deployment.deploymentScore}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Summary */}

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
          <h3 className="text-lg font-semibold text-white">
            Deployment Summary
          </h3>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-400" />
                <span className="text-sm text-slate-300">
                  Critical Issues
                </span>
              </div>

              <span className="font-semibold text-white">
                {deployment.criticalIssues.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <span className="text-sm text-slate-300">
                  Warnings
                </span>
              </div>

              <span className="font-semibold text-white">
                {deployment.warnings.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-sm text-slate-300">
                  Strengths
                </span>
              </div>

              <span className="font-semibold text-white">
                {deployment.strengths.length}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-5">
              <span className="text-sm text-slate-300">
                Deployment Platform
              </span>

              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                {platform}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}