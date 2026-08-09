export default function RepositoryPageHeader({
  title,
  description,
  action,
  actionLabel,
  loading = false,
}) {
  return (
    <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">
          {description}
        </p>
      </div>

      {action && (
        <button
          onClick={action}
          disabled={loading}
          className="inline-flex w-full max-w-full items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-center font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading ? "Processing..." : actionLabel}
        </button>
      )}
    </div>
  );
}
