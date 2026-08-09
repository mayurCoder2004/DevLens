/**
 * MetricGridSkeleton Component
 *
 * A reusable skeleton for metric grids.
 * Used for dashboard stats, overview metrics, and similar grid layouts.
 *
 * @param {number} columns - Number of columns (default: 4)
 * @param {number} rows - Number of rows (default: 1)
 */

import Skeleton from "./Skeleton";

const MetricGridSkeleton = ({ columns = 4, rows = 1 }) => {
  const totalCards = columns * rows;

  return (
    <div
      className="grid gap-6"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
      }}
    >
      {Array.from({ length: totalCards }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5 rounded-lg" />
          </div>

          {/* Value */}
          <Skeleton className="mt-3 h-9 w-16" />

          {/* Subtitle */}
          <Skeleton className="mt-1.5 h-3 w-32" />
        </div>
      ))}
    </div>
  );
};

export default MetricGridSkeleton;
