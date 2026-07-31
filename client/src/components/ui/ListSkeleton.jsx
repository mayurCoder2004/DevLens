/**
 * ListSkeleton Component
 * 
 * A reusable skeleton for list items with icon and content.
 * Used for activity feeds, notifications, and similar components.
 * 
 * @param {number} items - Number of items to render (default: 3)
 */

import Skeleton from './Skeleton';

const ListSkeleton = ({ items = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5"
        >
          {/* Icon */}
          <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-4 w-20 shrink-0" />
            </div>
            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListSkeleton;
