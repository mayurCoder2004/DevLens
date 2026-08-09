import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AttentionCard({
  repository,
  owner,
  severity,
  riskScore,
  healthScore,
  deploymentScore,
  maintainabilityScore,
  issues,
  link,
}) {
  const severityStyles = {
    LOW:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    MEDIUM:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    HIGH:
      "bg-orange-500/10 text-orange-400 border-orange-500/20",
    CRITICAL:
      "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const ProgressBar = ({ label, value }) => (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          {label}
        </span>

        <span className="font-semibold text-white">
          {value ?? "--"}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-700"
          style={{
            width: `${value ?? 0}%`,
          }}
        />
      </div>
    </div>
  );

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
      "
    >
      {/* Header */}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words text-lg font-semibold text-white">
            {repository}
          </h3>

          <p className="mt-1 break-words text-sm text-slate-400">
            {owner}
          </p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${severityStyles[severity]}`}
        >
          {severity}
        </span>
      </div>

      {/* Risk */}

      <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
        <ShieldAlert
          className="text-red-400"
          size={22}
        />

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Engineering Risk
          </p>

          <p className="text-3xl font-bold text-white">
            {riskScore}
          </p>
        </div>
      </div>

      {/* Metrics */}

      <div className="mt-5 space-y-4">
        <ProgressBar
          label="Engineering Health"
          value={healthScore}
        />

        <ProgressBar
          label="Deployment"
          value={deploymentScore}
        />

        <ProgressBar
          label="Maintainability"
          value={maintainabilityScore}
        />
      </div>

      {/* Issues */}

      <div className="mt-6 flex-1">
        <div className="mb-3 flex items-center gap-2">
          <AlertTriangle
            size={16}
            className="text-yellow-400"
          />

          <span className="text-sm font-medium text-white">
            Issues
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {issues.slice(0, 4).map((issue) => (
            <span
              key={issue}
              className="
                rounded-full
                border
                border-slate-700
                bg-slate-800
                px-3
                py-1
                text-xs
                text-slate-300
              "
            >
              {issue}
            </span>
          ))}

          {issues.length > 4 && (
            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-400">
              +{issues.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}

      <div className="mt-6 border-t border-slate-800 pt-5">
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
            duration-300
            hover:gap-3
            hover:text-blue-300
          "
        >
          Open Repository

          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
