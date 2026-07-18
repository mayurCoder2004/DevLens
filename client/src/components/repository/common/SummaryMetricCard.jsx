import React from "react";

export default function SummaryMetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-blue-500/10",
  iconColor = "text-blue-400",
}) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-800/60">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>

          <h3 className="mt-3 text-4xl font-bold tracking-tight text-white">
            {value}
          </h3>

          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}