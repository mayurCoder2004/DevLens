import clsx from "clsx";

export default function OverviewMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-blue-400",
  trend,
  trendColor = "text-emerald-400",
}) {
  return (
    <div
      className="
        group
        flex
        h-full
        flex-col
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-500/30
        hover:bg-slate-900/80
        hover:shadow-lg
        hover:shadow-blue-500/5
        focus-within:border-blue-500/30
        focus-within:outline
        focus-within:outline-2
        focus-within:outline-offset-2
        focus-within:outline-blue-500/20
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-400">{title}</p>

          <h3 className="mt-3 text-4xl font-bold tracking-tight text-white">
            {value}
          </h3>
        </div>

        <div
          className="
            flex
            h-11
            w-11
            flex-shrink-0
            items-center
            justify-center
            rounded-xl
            bg-slate-800
            transition-all
            duration-300
            group-hover:scale-105
            group-hover:bg-slate-700
          "
        >
          <Icon
            size={20}
            className={clsx(
              iconColor,
              "transition-transform duration-300 group-hover:scale-110",
            )}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Footer */}

      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <p className="line-clamp-2 min-h-[2.75rem] text-sm leading-5 text-slate-500">
          {subtitle}
        </p>

        {trend && (
          <span
            className={clsx(
              "whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold",
              trendColor,
            )}
            aria-label={`Trend: ${trend}`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
