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
        duration-200
        hover:-translate-y-0.5
        hover:border-blue-500/40
        focus-within:border-blue-500/40
        focus-within:outline
        focus-within:outline-2
        focus-within:outline-offset-2
        focus-within:outline-blue-500/20
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <h3 className="mt-2 text-4xl font-bold leading-none text-white">
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
            bg-slate-800/80
            transition-colors
            duration-200
            group-hover:bg-slate-800
          "
        >
          <Icon
            size={20}
            className={iconColor}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 flex items-center justify-between gap-2">
        <p className="text-sm text-slate-500">
          {subtitle}
        </p>

        {trend && (
          <span
            className={clsx(
              "text-sm font-semibold whitespace-nowrap",
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