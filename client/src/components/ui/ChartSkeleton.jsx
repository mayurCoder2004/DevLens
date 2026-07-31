/**
 * ChartSkeleton Component
 * 
 * A reusable skeleton for chart/graph components.
 * Used for analytics charts, graphs, and visual data displays.
 */

import Skeleton from './Skeleton';

const ChartSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>

      {/* Chart Area */}
      <div className="mt-6 space-y-4">
        {/* Bar Chart Representation */}
        <div className="flex items-end justify-between gap-2">
          {Array.from({ length: 7 }).map((_, index) => {
            const heights = ['h-32', 'h-24', 'h-40', 'h-28', 'h-36', 'h-20', 'h-32'];
            return (
              <Skeleton
                key={index}
                className={`w-full ${heights[index]} rounded-t-lg`}
              />
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="flex items-center justify-between">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="h-3 w-12" />
          ))}
        </div>
      </div>

      {/* Chart Legend */}
      <div className="mt-6 flex items-center justify-center gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartSkeleton;
