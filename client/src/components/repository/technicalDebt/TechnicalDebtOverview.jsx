import { Bot, CheckCircle2, Sparkles } from "lucide-react";

export default function TechnicalDebtOverview({ technicalDebt }) {
  if (!technicalDebt) return null;

  const recommendations = technicalDebt.recommendations || [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
            <Bot className="h-7 w-7 text-blue-400" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              AI Technical Debt Overview
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              AI-generated refactoring priorities for improving repository
              maintainability and reducing long-term technical debt.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-4 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Recommendations
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {recommendations.length}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-400" />

          <h3 className="text-lg font-semibold text-white">
            Priority Improvements
          </h3>
        </div>

        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-slate-700"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />

              <p className="text-sm leading-6 text-slate-300">
                {recommendation}
              </p>
            </div>
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className="rounded-lg border border-emerald-900/40 bg-emerald-500/10 p-5">
            <p className="text-sm text-emerald-300">
              No technical debt recommendations were generated. The repository
              appears to be in good condition.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}