/**
 * PullRequestListSkeleton Component
 * 
 * Skeleton loading state for the Pull Requests List page.
 * Matches the layout of PullRequestList component with PR cards.
 */

import Skeleton from '../../ui/Skeleton';

const PullRequestListSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Render 5 PR card skeletons */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5"
        >
          <div className="flex items-start justify-between">
            {/* Left side: PR Info */}
            <div className="flex-1 space-y-3">
              {/* Icon + Title */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-6 w-96" />
              </div>

              {/* Author */}
              <Skeleton className="h-4 w-40" />

              {/* State Badge */}
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* Right side: Analyze Button */}
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PullRequestListSkeleton;
