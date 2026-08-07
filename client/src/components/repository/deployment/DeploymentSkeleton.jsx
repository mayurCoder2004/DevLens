import Skeleton from "../../ui/Skeleton";

const DeploymentSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Summary Cards - 6 cards in 3-column grid */}
      <section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-12 w-12 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deployment Analytics */}
      <section>
        <div className="mb-6 space-y-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          {/* Progress Metrics - 5 bars */}
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>

          {/* Deployment Health */}
          <div className="mt-10 border-t border-slate-800 pt-8">
            <Skeleton className="h-6 w-48" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Deployment Overview */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="mb-8 flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-72" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-700 bg-slate-900 p-6 min-h-[180px]"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-5 rounded" />
              </div>
              <div className="mt-8 space-y-3">
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Details Section - 2x2 Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, sectionIndex) => (
          <section
            key={sectionIndex}
            className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {Array.from({ length: 3 }).map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Configuration Breakdown */}
      <section>
        <div className="mb-6 space-y-2">
          <Skeleton className="h-7 w-80" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-6 w-48" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between py-2.5"
                  >
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DeploymentSkeleton;
