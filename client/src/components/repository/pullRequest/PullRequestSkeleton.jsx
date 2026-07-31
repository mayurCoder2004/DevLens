/**
 * PullRequestSkeleton Component
 * 
 * Skeleton loading state for the Pull Request Analysis page.
 * Matches the layout of:
 * - PullRequestSummaryCards (6 metric cards)
 * - PullRequestRiskBreakdown (6 risk breakdown cards with progress bars)
 * - PullRequestOverview (PR details + author/status cards)
 * - PullRequestRecommendations (recommendation cards)
 * - PullRequestChangedFiles (file list)
 */

import Skeleton from '../../ui/Skeleton';

const PullRequestSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Summary Header + Cards */}
      <section>
        {/* Header */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-7 w-72" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* 6 Summary Cards */}
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
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-11 w-11 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Risk Breakdown */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-80" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>

        {/* 6 Risk Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-11 w-11 rounded-lg" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="mt-5 h-6 w-32" />
              <div className="mt-2 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PR Overview */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-7 w-72" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          {/* Left: PR Details */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <div className="flex items-start gap-4">
              <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-7 w-3/4" />

                {/* Info Grid */}
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <Skeleton className="mt-6 h-10 w-48 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Right: Author + Status */}
          <div className="space-y-6">
            {/* Author Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
              <Skeleton className="mb-5 h-6 w-20" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
              <Skeleton className="mb-5 h-6 w-20" />
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4"
                  >
                    <Skeleton className="h-4 w-20" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-64" />
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
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Changed Files */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* File List */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-5"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-64" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PullRequestSkeleton;
