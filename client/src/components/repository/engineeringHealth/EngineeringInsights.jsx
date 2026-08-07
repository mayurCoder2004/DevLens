import { AlertTriangle, BadgeCheck } from "lucide-react";

export default function EngineeringInsights({ engineeringHealth }) {
  if (!engineeringHealth) return null;

  const strengths = engineeringHealth.strengths ?? [];
  const priorityIssues = engineeringHealth.priorityRecommendations ?? [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-emerald-500/10 p-2">
          <BadgeCheck className="h-6 w-6 text-emerald-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Engineering Insights
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Key strengths and highest-priority issues.
          </p>
        </div>
      </div>

      <div className="my-6 border-t border-slate-800" />

      {/* Strengths */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-lg bg-emerald-500/10 p-1.5">
            <BadgeCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Strengths</h3>
          <span className="ml-auto rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
            {strengths.length}
          </span>
        </div>

        <div className="space-y-3">
          {strengths.length > 0 ? (
            strengths.map((strength, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4"
              >
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <p className="text-sm leading-6 text-slate-300">{strength}</p>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-5 text-center">
              <p className="text-sm text-slate-400">No strengths available.</p>
            </div>
          )}
        </div>
      </div>

      <div className="my-6 border-t border-slate-800" />

      {/* Priority Issues */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-lg bg-amber-500/10 p-1.5">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Priority Issues</h3>
          <span className="ml-auto rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-400">
            {priorityIssues.length}
          </span>
        </div>

        <div className="space-y-3">
          {priorityIssues.length > 0 ? (
            priorityIssues.slice(0, 5).map((issue, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <p className="text-sm leading-6 text-slate-300">{issue}</p>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-5 text-center">
              <p className="text-sm text-slate-400">
                No priority issues identified.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
