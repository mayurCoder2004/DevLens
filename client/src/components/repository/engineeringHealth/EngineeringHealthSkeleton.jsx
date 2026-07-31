/**
 * EngineeringHealthSkeleton Component
 * 
 * Skeleton loading state for the Engineering Health page.
 * Matches the layout of:
 * - EngineeringHealthSummaryCards (metric cards grid)
 * - EngineeringScoreBreakdown (score breakdown section)
 * - EngineeringHealthOverview (overview with charts)
 * - EngineeringInsights (insights cards)
 * - EngineeringRecommendations (recommendations list)
 * - EngineeringHealthBreakdown (detailed breakdown)
 */

import Skeleton from '../../ui/Skeleton';

const EngineeringHealthSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-11 w-11 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Score Breakdown */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-80" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Score Categories */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6"
            >
              <Skeleton className="h-5 w-32" />
              <Skeleton className="mt-4 h-12 w-16" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Health Overview */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-72" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Left: Overall Assessment */}
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
              <Skeleton className="h-6 w-48" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Metric Items */}
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-12" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chart */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <Skeleton className="h-6 w-40" />
            <div className="mt-6 flex items-end justify-between gap-2">
              {Array.from({ length: 6 }).map((_, index) => {
                const heights = ['h-24', 'h-32', 'h-28', 'h-36', 'h-30', 'h-34'];
                return (
                  <Skeleton
                    key={index}
                    className={`w-full ${heights[index]} rounded-t-lg`}
                  />
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-3 w-8" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Insights */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>
        </div>

        {/* Insight Cards */}
        <div className="mt-8 space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-6"
            >
              <Skeleton className="mt-1 h-10 w-10 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Recommendations */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-80" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        {/* Recommendation Cards */}
        <div className="mt-8 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
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
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Health Breakdown */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-96" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>

        {/* Breakdown Sections */}
        <div className="mt-8 space-y-6">
          {Array.from({ length: 4 }).map((_, sectionIndex) => (
            <div
              key={sectionIndex}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
              <div className="mt-6 space-y-4">
                {Array.from({ length: 3 }).map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-b-0 last:pb-0"
                  >
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-6 w-20 rounded-full" />
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

export default EngineeringHealthSkeleton;
