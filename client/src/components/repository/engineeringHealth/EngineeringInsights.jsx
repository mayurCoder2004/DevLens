import { AlertTriangle, BadgeCheck } from "lucide-react";

export default function EngineeringInsights({ engineeringHealth }) {
  if (!engineeringHealth) return null;

  const strengths = engineeringHealth.strengths ?? [];
  const priorityIssues =
    engineeringHealth.priorityRecommendations ?? [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Engineering Insights
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Key engineering strengths and the highest-priority areas
          that require attention.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Strengths */}
        <div className="rounded-xl border border-emerald-900/50 bg-slate-950/60 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2">
              <BadgeCheck className="h-5 w-5 text-emerald-400" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              Strengths
            </h3>
          </div>

          <div className="mt-6 space-y-4">
            {strengths.length ? (
              strengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

                  <p className="text-sm leading-6 text-slate-300">
                    {strength}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">
                No strengths available.
              </p>
            )}
          </div>
        </div>

        {/* Priority Issues */}
        <div className="rounded-xl border border-amber-900/50 bg-slate-950/60 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-500/10 p-2">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              Priority Issues
            </h3>
          </div>

          <div className="mt-6 space-y-4">
            {priorityIssues.length ? (
              priorityIssues.slice(0, 5).map((issue, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

                  <p className="text-sm leading-6 text-slate-300">
                    {issue}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">
                No priority issues identified.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}