import Skeleton from "../../ui/Skeleton";

const EngineeringHealthSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-9 w-72 max-w-full" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </div>
        <Skeleton className="h-12 w-64 rounded-xl" />
      </div>

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
                  <Skeleton className="h-10 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-12 w-12 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Health Analytics */}
      <section>
        <div className="mb-6 space-y-2">
          <Skeleton className="h-7 w-72" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-12" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Engineering Health Overview */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="mb-8 flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-80" />
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
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
              <div className="mt-8 space-y-3">
                <Skeleton className="h-12 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </section>

      {/* Insights and Recommendations - 2 column grid */}
      <div className="grid gap-8 xl:grid-cols-2">
        {/* Insights */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>

          <div className="my-6 h-px bg-slate-800" />

          {/* Strengths */}
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="ml-auto h-5 w-8 rounded-full" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4"
              >
                <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>

          <div className="my-6 h-px bg-slate-800" />

          {/* Priority Issues */}
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="ml-auto h-5 w-8 rounded-full" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4"
              >
                <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>

          <div className="my-6 h-px bg-slate-800" />

          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Engineering Score Breakdown */}
      <section>
        <div className="mb-6 space-y-2">
          <Skeleton className="h-7 w-72" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-11 w-11 rounded-xl" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>

              <Skeleton className="mt-5 h-6 w-40" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-3/4" />

              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-10" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EngineeringHealthSkeleton;
