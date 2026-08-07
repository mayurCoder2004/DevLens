import Skeleton from "../../ui/Skeleton";

const PullRequestSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-9 w-80 max-w-full" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </div>
        <Skeleton className="h-12 w-32 rounded-xl" />
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-5">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-28 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
            <Skeleton className="h-8 w-full max-w-3xl" />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-20 rounded-xl" />
              ))}
            </div>
          </div>
          <Skeleton className="h-28 w-full rounded-xl lg:w-60" />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-12 w-12 rounded-xl" />
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="mb-8 flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-72 max-w-full" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-44 rounded-xl lg:col-span-2" />
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, sectionIndex) => (
          <section
            key={sectionIndex}
            className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-44" />
                <Skeleton className="h-4 w-60 max-w-full" />
              </div>
            </div>

            <div className="my-6 h-px bg-slate-800" />

            <div className="space-y-4">
              {Array.from({ length: sectionIndex === 0 ? 6 : 5 }).map(
                (_, index) => (
                  <Skeleton key={index} className="h-28 rounded-xl" />
                )
              )}
            </div>
          </section>
        ))}
      </div>

      <section>
        <div className="mb-6 space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-2xl" />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="mb-6 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PullRequestSkeleton;
