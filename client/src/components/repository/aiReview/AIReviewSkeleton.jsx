import Skeleton from "../../ui/Skeleton";

const AIReviewSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </div>
        <Skeleton className="h-12 w-48 rounded-xl" />
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-7 w-40 rounded-full" />
            <Skeleton className="h-8 w-72 max-w-full" />
            <Skeleton className="h-5 w-full max-w-3xl" />
          </div>
          <Skeleton className="h-28 w-full rounded-xl lg:w-52" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-xl" />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="mb-8 flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <Skeleton className="h-44 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
          <Skeleton className="h-24 w-full rounded-2xl lg:w-44" />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-56 rounded-xl" />
          ))}
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, sectionIndex) => (
          <section
            key={sectionIndex}
            className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6"
          >
            <div className="mb-6 flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-56" />
                <Skeleton className="h-4 w-72 max-w-full" />
              </div>
            </div>

            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-36 rounded-xl" />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="mb-6 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-44" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-48 rounded-xl" />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="mb-6 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-72" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-64 rounded-xl" />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="mt-2 h-4 w-80 max-w-full" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AIReviewSkeleton;
