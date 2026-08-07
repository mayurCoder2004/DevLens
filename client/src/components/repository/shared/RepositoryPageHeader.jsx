export default function RepositoryPageHeader({
  title,
  description,
  action,
  actionLabel,
  loading = false,
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-2 max-w-3xl text-slate-400">
          {description}
        </p>
      </div>

      {action && (
        <button
          onClick={action}
          disabled={loading}
          className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Processing..." : actionLabel}
        </button>
      )}
    </div>
  );
}