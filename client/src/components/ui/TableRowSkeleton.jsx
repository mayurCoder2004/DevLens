/**
 * TableRowSkeleton Component
 * 
 * A reusable skeleton for table rows and list items.
 * Used for data tables, activity lists, and similar components.
 * 
 * @param {number} rows - Number of rows to render (default: 5)
 */

import Skeleton from './Skeleton';

const TableRowSkeleton = ({ rows = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4"
        >
          {/* Icon/Avatar */}
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

          {/* Content */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>

          {/* Action/Status */}
          <Skeleton className="h-8 w-20 shrink-0 rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default TableRowSkeleton;
