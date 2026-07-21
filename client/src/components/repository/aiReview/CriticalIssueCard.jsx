import { AlertTriangle } from "lucide-react";

export default function CriticalIssueCard({
  title,
  severity,
  description,
}) {
  const severityStyles = {
    High: {
      badge:
        "bg-red-500/10 text-red-400 border border-red-500/20",
      icon: "text-red-400",
    },
    Medium: {
      badge:
        "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
      icon: "text-yellow-400",
    },
    Low: {
      badge:
        "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      icon: "text-blue-400",
    },
  };

  const style =
    severityStyles[severity] || severityStyles.Low;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-slate-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-slate-800 p-3">
            <AlertTriangle
              className={`h-5 w-5 ${style.icon}`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {title}
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              {description}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
        >
          {severity}
        </span>
      </div>
    </div>
  );
}