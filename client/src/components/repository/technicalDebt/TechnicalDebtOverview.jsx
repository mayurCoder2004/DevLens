import { Sparkles, CheckCircle2 } from "lucide-react";

export default function TechnicalDebtOverview({ technicalDebt }) {
  if (!technicalDebt) return null;

  const recommendations = technicalDebt.recommendations || [];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-6">
      <div className="mb-8 flex items-start gap-3">
        <div className="rounded-xl bg-yellow-500/10 p-3">
          <Sparkles className="h-6 w-6 text-yellow-400" />
        </div>

        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-white">
            AI Technical Debt Overview
          </h2>

          <p className="mt-1 text-slate-400">
            High-level summary of technical debt and refactoring priorities.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="min-h-[180px] rounded-xl border border-slate-700 bg-slate-900 p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">Total</h3>
            <Sparkles className="h-5 w-5 text-slate-400" />
          </div>

          <div className="mt-8">
            <p className="text-4xl font-bold text-white sm:text-5xl">
              {recommendations.length}
            </p>
            <p className="mt-3 text-sm text-slate-500">Recommendations</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 sm:p-6 lg:col-span-3">
          <div className="mb-5 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />

            <h3 className="text-lg font-semibold text-white">
              Priority Improvements
            </h3>
          </div>

          <div className="space-y-3">
            {recommendations.slice(0, 5).map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-4 transition-colors hover:border-slate-700"
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
      </div>
    </section>
  );
}
