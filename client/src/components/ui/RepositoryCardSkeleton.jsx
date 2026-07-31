/**
 * RepositoryCardSkeleton Component
 * 
 * A specialized skeleton for repository cards.
 * Closely matches the RepositoryCard component layout.
 */

import Skeleton from './Skeleton';

const RepositoryCardSkeleton = () => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5">
      {/* Header - Repository Name & Visibility */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Description */}
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Metadata - Language, Stars, Last Updated */}
      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-2.5 w-2.5 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Engineering Score */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-800/50 pt-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>

      {/* Footer - Open Workspace Button */}
      <div className="mt-auto pt-4">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </article>
  );
};

export default RepositoryCardSkeleton;
