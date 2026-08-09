/**
 * RepositoryOverviewSkeleton Component
 *
 * Skeleton loading state for the Repository Overview page.
 * Matches the layout of:
 * - EngineeringScoreCard
 * - RepositoryMetricsGrid (4 metric cards)
 * - WorkspaceActions (3 action cards)
 */

import { HeroSkeleton } from "../../ui/skeletons";
import Skeleton from "../../ui/Skeleton";

const RepositoryOverviewSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Engineering Score Card Skeleton */}
      <HeroSkeleton />

      {/* Repository Metrics Grid Skeleton - 4 cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            {/* Header with Icon */}
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
              <Skeleton className="h-12 w-12 rounded-xl" />
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Workspace Actions Skeleton */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Section Header */}
        <div className="mb-6 space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Action Cards Grid */}
        <div className="grid gap-5 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-start rounded-xl border border-slate-700 bg-slate-800 p-6"
            >
              <Skeleton className="h-7 w-7 rounded-lg" />
              <Skeleton className="mt-5 h-6 w-40" />
              <div className="mt-2 w-full space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RepositoryOverviewSkeleton;
