/**
 * ArchitectureSkeleton Component
 * 
 * Skeleton loading state for the Architecture page.
 * Matches the layout of:
 * - ArchitectureSummaryCards (header + 4 metric cards)
 * - ArchitectureGraphCard (graph visualization)
 * - ArchitectureAnalytics (6 analytics cards)
 * - ArchitectureRecommendationOverview (AI overview with 4 cards)
 * - ArchitectureInsights & ArchitectureRecommendations (2-column grid)
 */

import { ArchitectureGraphSkeleton } from '../../ui/skeletons';
import Skeleton from '../../ui/Skeleton';

const ArchitectureSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Summary Header + 4 Metric Cards */}
      <section>
        {/* Header */}
        <div className="mb-6 space-y-2">
          <Skeleton className="h-9 w-80" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* 4 Metric Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <Skeleton className="h-4 w-32" />
              <Skeleton className="mt-4 h-10 w-20" />
              <Skeleton className="mt-2 h-4 w-24" />
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Graph Card */}
      <ArchitectureGraphSkeleton />

      {/* Analytics Section */}
      <section>
        {/* Header */}
        <div className="mb-6 space-y-2">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* 6 Analytics Cards (3 columns) */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-5 rounded-lg" />
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Recommendation Overview */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-80" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        {/* 4 Priority Cards */}
        <div className="grid gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="min-h-[180px] rounded-xl border border-slate-700 bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-11 w-11 rounded-xl" />
              </div>
              <div className="mt-8 space-y-3">
                <Skeleton className="h-12 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>

        {/* Category Tags */}
        <div className="mt-10">
          <Skeleton className="mb-4 h-4 w-40" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-32 rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Details Section - 2 Column Grid */}
      <div className="grid gap-8 xl:grid-cols-2">
        {/* Insights Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-800 bg-slate-950 p-5"
              >
                <div className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-800 bg-slate-950 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
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
        </div>
      </div>
    </div>
  );
};

export default ArchitectureSkeleton;
