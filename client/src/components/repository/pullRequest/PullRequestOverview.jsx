import {
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  GitCompareArrows,
  Info,
  Package,
  ServerCog,
  Shield,
  Sparkles,
} from "lucide-react";

const RISK_CONFIG = {
  Critical: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    icon: AlertTriangle,
    label: "Critical review required",
  },
  High: {
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    icon: AlertTriangle,
    label: "Review carefully",
  },
  Medium: {
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    icon: Info,
    label: "Moderate review needed",
  },
  Low: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    icon: Shield,
    label: "Low risk",
  },
};

export default function PullRequestOverview({ pullRequestAnalysis }) {
  if (!pullRequestAnalysis) return null;

  const {
    riskScore,
    riskLevel,
    totalFiles,
    totalChanges,
    additions,
    deletions,
    criticalFiles = [],
    hasConfigurationChanges,
    hasDependencyChanges,
    recommendations = [],
  } = pullRequestAnalysis;

  const riskConfig = RISK_CONFIG[riskLevel] ?? RISK_CONFIG.Low;
  const RiskIcon = riskConfig.icon;

  const signals = [
    {
      label: "Critical Files",
      value: criticalFiles.length,
      icon: FileWarning,
      tone:
        criticalFiles.length > 0
          ? "bg-orange-500/10 text-orange-400"
          : "bg-emerald-500/10 text-emerald-400",
    },
    {
      label: "Dependencies",
      value: hasDependencyChanges ? "Changed" : "Clean",
      icon: Package,
      tone: hasDependencyChanges
        ? "bg-violet-500/10 text-violet-400"
        : "bg-slate-500/10 text-slate-400",
    },
    {
      label: "Configuration",
      value: hasConfigurationChanges ? "Changed" : "Clean",
      icon: ServerCog,
      tone: hasConfigurationChanges
        ? "bg-blue-500/10 text-blue-400"
        : "bg-slate-500/10 text-slate-400",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-yellow-500/10 p-3">
          <Sparkles className="h-6 w-6 text-yellow-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Pull Request Overview
          </h2>

          <p className="mt-1 text-slate-400">
            High-level analysis of pull request risk and review priority.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div
          className={`min-h-[180px] rounded-xl border ${riskConfig.border} ${riskConfig.bg} p-6`}
        >
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">Risk Score</h3>
            <div className="rounded-xl bg-slate-900/60 p-3">
              <RiskIcon className={`h-5 w-5 ${riskConfig.color}`} />
            </div>
          </div>

          <div className="mt-8">
            <p className={`text-5xl font-bold ${riskConfig.color}`}>
              {riskScore}%
            </p>
            <p className="mt-3 text-sm text-slate-500">{riskConfig.label}</p>
          </div>
        </div>

        <div className="min-h-[180px] rounded-xl border border-slate-700 bg-slate-900 p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">Change Size</h3>
            <GitCompareArrows className="h-5 w-5 text-slate-400" />
          </div>

          <div className="mt-6 space-y-3">
            <MetricRow label="Files" value={totalFiles} />
            <MetricRow label="Lines" value={totalChanges} />
            <MetricRow label="Added" value={`+${additions}`} />
            <MetricRow label="Deleted" value={`-${deletions}`} />
          </div>
        </div>

        <div className="min-h-[180px] rounded-xl border border-slate-700 bg-slate-900 p-6 lg:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">
              Review Signals
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {signals.map((signal) => {
              const Icon = signal.icon;

              return (
                <div
                  key={signal.label}
                  className="rounded-lg border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div
                    className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${signal.tone}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-xs text-slate-500">{signal.label}</p>
                  <p className="mt-1 font-semibold text-white">
                    {signal.value}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            {recommendations.length > 0
              ? `${recommendations.length} AI recommendation${
                  recommendations.length === 1 ? "" : "s"
                } generated for reviewer follow-up.`
              : "No AI recommendations were generated for this pull request."}
          </p>
        </div>
      </div>
    </section>
  );
}

function MetricRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  );
}
