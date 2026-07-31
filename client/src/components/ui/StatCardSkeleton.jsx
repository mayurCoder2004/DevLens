/**
 * StatCardSkeleton Component
 * 
 * A reusable skeleton for stat/metric cards.
 * Used for dashboard metrics, overview cards, and similar components.
 */

import Skeleton from './Skeleton';

const StatCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      {/* Header with icon */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-20" />
        </div>
        <Skeleton className="h-11 w-11 rounded-xl" />
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-2 pt-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
};

export default StatCardSkeleton;
