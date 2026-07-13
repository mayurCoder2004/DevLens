import {
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AttentionCard({
  repository,
  score,
  issue,
  severity = "High",
  link,
}) {
  const severityColor = {
    High: "text-red-400 bg-red-500/10 border-red-500/20",
    Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    Low: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

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
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">
            {repository}
          </h3>

          <p className="mt-2 text-xs text-slate-400">
            Engineering Score
          </p>

          <p className="mt-1 text-3xl font-bold leading-none text-white">
            {score}
          </p>
        </div>

        <span
          className={`
            flex-shrink-0
            rounded-full
            border
            px-2.5
            py-1
            text-xs
            font-semibold
            whitespace-nowrap
            ${severityColor[severity]}
          `}
          aria-label={`Severity: ${severity}`}
        >
          {severity}
        </span>
      </div>

      {/* Issue */}
      <div className="mt-5 flex items-start gap-2.5 flex-1">
        <AlertTriangle
          size={16}
          className="mt-0.5 flex-shrink-0 text-yellow-400"
          aria-hidden="true"
        />

        <p className="text-sm leading-relaxed text-slate-300 line-clamp-3">
          {issue}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-slate-800/50">
        <Link
          to={link}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-blue-400
            transition-all
            duration-200
            hover:text-blue-300
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/40
            focus:ring-offset-2
            focus:ring-offset-slate-900
            rounded
            group-hover:gap-3
          "
          aria-label={`Open workspace for ${repository}`}
        >
          Open Workspace

          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}