export default function ProgressMetric({
  title,
  value,
  status,
  color = "blue",
}) {
  const percentage = Math.max(0, Math.min(value, 100));

  const colorClasses = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    violet: "bg-violet-500",
    cyan: "bg-cyan-500",
    slate: "bg-slate-500",
  };

  const progressColor =
    colorClasses[color] || colorClasses.blue;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-white">
            {title}
          </h4>

          <p className="mt-1 text-xs text-slate-400">
            {status}
          </p>
        </div>

        <span className="text-lg font-bold text-white">
          {percentage}%
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}