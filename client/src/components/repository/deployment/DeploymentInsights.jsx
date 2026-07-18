import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

export default function DeploymentInsights({ deployment }) {
  if (!deployment) return null;

  const strengths = deployment.strengths || [];
  const warnings = deployment.warnings || [];
  const criticalIssues = deployment.criticalIssues || [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Deployment Insights
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Key findings from the deployment readiness analysis.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {/* Strengths */}

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />

            <h3 className="text-lg font-semibold text-white">
              Strengths
            </h3>
          </div>

          <div className="mt-5 space-y-4">
            {strengths.length === 0 ? (
              <p className="text-sm text-slate-400">
                No strengths detected.
              </p>
            ) : (
              strengths.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />

                  <p className="text-sm text-slate-300">
                    {item}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Warnings */}

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-400" />

            <h3 className="text-lg font-semibold text-white">
              Warnings
            </h3>
          </div>

          <div className="mt-5 space-y-4">
            {warnings.length === 0 ? (
              <p className="text-sm text-slate-400">
                No warnings detected.
              </p>
            ) : (
              warnings.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-400" />

                  <p className="text-sm text-slate-300">
                    {item}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Critical Issues */}

      <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-6">
        <div className="flex items-center gap-3">
          <XCircle className="h-6 w-6 text-red-400" />

          <h3 className="text-lg font-semibold text-white">
            Critical Issues
          </h3>
        </div>

        <div className="mt-5 space-y-4">
          {criticalIssues.length === 0 ? (
            <p className="text-sm text-slate-400">
              No critical deployment issues found.
            </p>
          ) : (
            criticalIssues.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <XCircle className="mt-0.5 h-4 w-4 text-red-400" />

                <p className="text-sm text-slate-300">
                  {item}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}