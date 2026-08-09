/**
 * TechnicalDebtSkeleton Component
 *
 * Skeleton loading state for the Technical Debt page.
 * Matches the layout of:
 * - TechnicalDebtSummaryCards (6 metric cards in 3-column grid)
 * - TechnicalDebtAnalytics (progress bars + 4 stat cards)
 * - TechnicalDebtOverview (AI overview with recommendations)
 * - TechnicalDebtInsights & TechnicalDebtRecommendations (2-column grid)
 * - TechnicalDebtFileBreakdown (3-column file breakdown)
 */

import Skeleton from "../../ui/Skeleton";

const TechnicalDebtSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Summary Cards - 6 cards in 3-column grid */}
      <section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-16" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-11 w-11 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Debt Analytics */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-72" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        {/* Progress Bars */}
        <div className="mt-8 space-y-8">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>

        {/* Stats Cards - 4 cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-8 w-12" />
              </div>
              <Skeleton className="mt-4 h-4 w-32" />
            </div>
          ))}
        </div>
      </section>

      {/* AI Technical Debt Overview */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-14 w-14 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-80" />
              <Skeleton className="h-4 w-96" />
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-2 h-9 w-12" />
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/60 p-6">
          <div className="mb-5 flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-6 w-48" />
          </div>

          {/* Recommendation Items */}
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-4"
              >
                <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights and Recommendations - 2 Column Grid */}
      <div className="grid gap-8 xl:grid-cols-2">
        {/* Technical Debt Insights */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-7 rounded" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-4 w-80" />
            </div>
          </div>

          {/* Assessment Box */}
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/60 p-6 space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-4 h-4 w-40" />
          </div>

          {/* Insight Items */}
          <div className="mt-8 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <Skeleton className="mt-1 h-5 w-5 shrink-0 rounded" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Technical Debt Recommendations */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-7 rounded" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-72" />
              <Skeleton className="h-4 w-80" />
            </div>
          </div>

          {/* Recommendation Cards */}
          <div className="mt-8 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* File Breakdown - 3 Column Grid */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-80" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* 3 File Lists */}
        <div className="mt-8 grid gap-8 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="rounded-xl border border-slate-800 bg-slate-950/60"
            >
              {/* Column Header */}
              <div className="flex items-center gap-3 border-b border-slate-800 p-5">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-40" />
              </div>

              {/* File Items */}
              <div className="divide-y divide-slate-800">
                {Array.from({ length: 4 }).map((_, itemIndex) => (
                  <div key={itemIndex} className="p-5 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TechnicalDebtSkeleton;
