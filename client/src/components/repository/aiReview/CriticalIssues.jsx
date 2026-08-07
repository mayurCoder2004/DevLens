import { AlertTriangle } from "lucide-react";
import CriticalIssueCard from "./CriticalIssueCard";

export default function CriticalIssues({ data }) {
  const issues = data || [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-amber-500/10 p-2">
          <AlertTriangle className="h-6 w-6 text-amber-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Repository Weaknesses
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            High-priority engineering concerns identified during repository
            analysis.
          </p>
        </div>
      </div>

      {issues.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 py-14 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-slate-500" />
          <h3 className="mt-5 text-xl font-semibold text-white">
            No Weaknesses Listed
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            The AI review did not return critical weaknesses for this run.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {issues.map((issue, index) => (
            <CriticalIssueCard
              key={issue.title || index}
              title={issue.title}
              severity={issue.severity}
              description={issue.description}
            />
          ))}
        </div>
      )}
    </section>
  );
}
