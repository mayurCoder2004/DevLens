/**
 * HeroSkeleton Component
 * 
 * A reusable skeleton for hero sections.
 * Used for page headers with titles, descriptions, and stats.
 */

import Skeleton from './Skeleton';

const HeroSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left content */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-48 rounded-full" />
          <Skeleton className="h-10 w-96" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-xl" />
            <Skeleton className="h-4 w-3/4 max-w-lg" />
          </div>
        </div>

        {/* Right content - Score/CTA */}
        <div className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-950 px-10 py-8">
          <Skeleton className="h-20 w-32" />
          <Skeleton className="mt-3 h-4 w-40" />
          <Skeleton className="mt-8 h-11 w-48 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
