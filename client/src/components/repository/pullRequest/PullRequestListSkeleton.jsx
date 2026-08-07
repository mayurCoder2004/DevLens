import Skeleton from "../../ui/Skeleton";

const PullRequestListSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-5 w-80 sm:w-96" />
        </div>
        <Skeleton className="h-12 w-48 rounded-xl" />
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-12 w-full rounded-xl" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-20 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-1 items-start gap-4">
                <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-5 w-72 max-w-full" />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>

              <Skeleton className="h-10 w-full shrink-0 rounded-xl sm:w-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PullRequestListSkeleton;
