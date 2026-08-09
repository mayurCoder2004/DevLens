export default function ProgressMetric({
  title,
  value,
  status,
  color = "blue",
}) {
  const isAvailable = value !== null && value !== undefined;

  const percentage = isAvailable
    ? Math.max(0, Math.min(value, 100))
    : 0;

  const colorClasses = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    violet: "bg-violet-500",
    cyan: "bg-cyan-500",
    rose: "bg-rose-500",
    slate: "bg-slate-500",
  };

  const progressColor =
    colorClasses[color] || color || colorClasses.blue;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="text-sm font-medium text-white">
            {title}
          </h4>

          <p className="mt-1 text-xs text-slate-400">
            {isAvailable ? status : "Not Analyzed"}
          </p>
        </div>

        <span className="text-lg font-bold text-white">
          {isAvailable ? `${percentage}%` : "N/A"}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        {isAvailable ? (
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
            style={{ width: `${percentage}%` }}
          />
        ) : (
          <div className="h-full rounded-full bg-slate-700" />
        )}
      </div>
    </div>
  );
}
