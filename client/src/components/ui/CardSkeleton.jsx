/**
 * CardSkeleton Component
 *
 * A reusable skeleton for generic card layouts.
 * Used for repository cards, content cards, and similar components.
 */

import Skeleton from "./Skeleton";

const CardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-800/50 pt-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
};

export default CardSkeleton;
