/**
 * DeploymentSkeleton Component
 * 
 * Skeleton loading state for the Deployment page.
 * Matches the layout of:
 * - DeploymentSummaryCards (6 metric cards in 3-column grid)
 * - DeploymentAnalytics (5 progress bars + deployment health grid)
 * - DeploymentOverview (2-column summary cards)
 * - DeploymentInsights (single column insights)
 * - DeploymentRecommendations (single column recommendations)
 * - DeploymentConfigurationBreakdown (configuration details)
 */

import Skeleton from '../../ui/Skeleton';

const DeploymentSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Summary Cards - 6 cards in 3-column grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-11 w-11 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* Deployment Analytics */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Progress Metrics - 5 bars */}
        <div className="mt-8 space-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>

        {/* Deployment Health */}
        <div className="mt-10 border-t border-slate-800 pt-8">
          <Skeleton className="h-6 w-48" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Overview */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-72" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* 2-Column Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Overall Status Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-7 w-48" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          </div>

          {/* Summary Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <Skeleton className="h-6 w-48" />
            <div className="mt-6 space-y-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-5 w-8" />
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-slate-800 pt-5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Insights */}
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
        <div className="mt-8 space-y-6">
          {/* Critical Issues */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="mt-4 space-y-3">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
                >
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>

          {/* Warnings */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
                >
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="mt-2 h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-36" />
            </div>
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-4"
                >
                  <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Recommendations */}
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
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-28 rounded-full" />
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

      {/* Configuration Breakdown */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-80" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Configuration Sections */}
        <div className="mt-8 space-y-6">
          {Array.from({ length: 3 }).map((_, sectionIndex) => (
            <div
              key={sectionIndex}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="mt-6 space-y-4">
                {Array.from({ length: 4 }).map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between"
                  >
                    <Skeleton className="h-4 w-40" />
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

export default DeploymentSkeleton;
