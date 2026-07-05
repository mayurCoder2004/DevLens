const MetricCard = ({ title, value }) => {
  const numericValue = Number(value);
  const hasValue =
    value !== null && value !== undefined && !Number.isNaN(numericValue);

  const displayValue = hasValue ? numericValue : "--";

  const scoreClasses = !hasValue
    ? {
        text: "text-slate-400",
        bar: "bg-slate-300",
      }
    : numericValue >= 80
      ? {
          text: "text-green-600",
          bar: "bg-green-500",
        }
      : numericValue >= 60
        ? {
            text: "text-amber-500",
            bar: "bg-amber-500",
          }
        : {
            text: "text-red-500",
            bar: "bg-red-500",
          };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>

      <div className="mt-4 flex items-baseline gap-2">
        <span className={`text-4xl font-bold ${scoreClasses.text}`}>
          {displayValue}
        </span>

        {hasValue && (
          <span className="text-sm font-semibold text-slate-400">/ 100</span>
        )}
      </div>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        {hasValue && (
          <div
            className={`h-2 rounded-full transition-all duration-700 ease-out ${scoreClasses.bar}`}
            style={{
              width: `${Math.max(0, Math.min(numericValue, 100))}%`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MetricCard;
