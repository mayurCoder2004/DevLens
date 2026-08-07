import { AlertTriangle } from "lucide-react";
import MarkdownText from "./MarkdownText";

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
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800/60">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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

            <MarkdownText className="mt-3">{description}</MarkdownText>
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
