/**
 * AIReviewSkeleton Component
 * 
 * Skeleton loading state for the AI Review page.
 * Matches the layout of:
 * - Refresh button
 * - AIExecutiveSummary (hero section)
 * - EngineeringScore (score breakdown)
 * - CriticalIssues (issue cards)
 * - Strengths (strength cards)
 * - ActionPlan (action items)
 * - TechnologyInsights (technology cards)
 * - ArchitectureSuggestions (suggestion cards)
 */

import Skeleton from '../../ui/Skeleton';
import { HeroSkeleton } from '../../ui/skeletons';

const AIReviewSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Refresh Button */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      {/* AI Executive Summary - Hero Section */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-violet-950/40 via-slate-900 to-slate-900 p-8">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-8 w-96" />
            <Skeleton className="h-5 w-full max-w-2xl" />
          </div>
        </div>
        <div className="mt-8 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </section>

      {/* Engineering Score Breakdown */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-72" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        {/* Score Cards Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-12" />
              </div>
              <div className="mt-4">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="mt-2 h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Critical Issues */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>
        </div>

        {/* Issue Cards */}
        <div className="mt-8 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-red-900/30 bg-red-950/20 p-6"
            >
              <div className="flex items-start gap-4">
                <Skeleton className="mt-1 h-10 w-10 shrink-0 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="mt-4 flex items-center gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strengths */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        {/* Strength Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-6"
            >
              <div className="flex items-start gap-4">
                <Skeleton className="mt-1 h-10 w-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Plan */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-full max-w-2xl" />
          </div>
        </div>

        {/* Priority Sections */}
        <div className="mt-8 space-y-8">
          {Array.from({ length: 3 }).map((_, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="mb-4 flex items-center gap-2">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-5 w-48" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <Skeleton className="mt-1 h-6 w-6 shrink-0 rounded" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Insights */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-72" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        {/* Technology Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6"
            >
              <Skeleton className="h-6 w-32" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
              <div className="mt-4 flex items-center gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Suggestions */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-80" />
            <Skeleton className="h-4 w-full max-w-2xl" />
          </div>
        </div>

        {/* Suggestion Cards */}
        <div className="mt-8 space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-28 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AIReviewSkeleton;
