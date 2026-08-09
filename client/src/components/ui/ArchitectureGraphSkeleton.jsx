/**
 * ArchitectureGraphSkeleton Component
 *
 * A specialized skeleton for architecture/dependency graph visualizations.
 * Used for graph-based components with nodes and connections.
 */

import Skeleton from "./Skeleton";

const ArchitectureGraphSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      {/* Graph Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>

      {/* Graph Area */}
      <div className="relative mt-6 h-96 rounded-xl border border-slate-800 bg-slate-950 p-8">
        {/* Central node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Skeleton className="h-24 w-24 rounded-2xl" />
        </div>

        {/* Surrounding nodes */}
        <div className="absolute left-1/4 top-1/4">
          <Skeleton className="h-16 w-16 rounded-xl" />
        </div>
        <div className="absolute right-1/4 top-1/4">
          <Skeleton className="h-16 w-16 rounded-xl" />
        </div>
        <div className="absolute bottom-1/4 left-1/3">
          <Skeleton className="h-16 w-16 rounded-xl" />
        </div>
        <div className="absolute bottom-1/4 right-1/3">
          <Skeleton className="h-16 w-16 rounded-xl" />
        </div>

        {/* Connection lines */}
        <div className="absolute left-1/2 top-1/3 h-0.5 w-24 -translate-x-1/2 bg-slate-700" />
        <div className="absolute bottom-1/3 left-1/2 h-0.5 w-24 -translate-x-1/2 bg-slate-700" />
      </div>

      {/* Graph Legend */}
      <div className="mt-6 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
        <Skeleton className="h-8 w-32 rounded-lg" />
      </div>
    </div>
  );
};

export default ArchitectureGraphSkeleton;
