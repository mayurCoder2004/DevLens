import {
  Activity,
  AlertTriangle,
  Braces,
  CheckCircle2,
  Database,
  FileCode2,
  FileText,
  GitBranch,
  Globe,
  KeyRound,
  Layers3,
  Package,
  ServerCog,
  ShieldCheck,
  TestTube2,
  Users,
  Wrench,
} from "lucide-react";

const CHANGE_TYPE_CONFIG = {
  Frontend: {
    icon: FileCode2,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    badge:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
  },

  "State Management": {
    icon: Activity,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    badge:
      "border-violet-500/20 bg-violet-500/10 text-violet-400",
  },

  "API Interaction": {
    icon: Globe,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    badge:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  },

  "User Interaction": {
    icon: Users,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    badge:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },

  Authentication: {
    icon: KeyRound,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
    badge:
      "border-orange-500/20 bg-orange-500/10 text-orange-400",
  },

  Database: {
    icon: Database,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    badge:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },

  Dependencies: {
    icon: Package,
    iconBg: "bg-fuchsia-500/10",
    iconColor: "text-fuchsia-400",
    badge:
      "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400",
  },

  Infrastructure: {
    icon: ServerCog,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    badge:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  },

  Testing: {
    icon: TestTube2,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    badge:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },

  Documentation: {
    icon: FileText,
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-400",
    badge:
      "border-slate-500/20 bg-slate-500/10 text-slate-400",
  },

  Refactoring: {
    icon: Wrench,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    badge:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },
};

const DEFAULT_CHANGE_TYPE = {
  icon: Braces,
  iconBg: "bg-slate-500/10",
  iconColor: "text-slate-400",
  badge:
    "border-slate-700 bg-slate-800 text-slate-300",
};

const getChangeTypeConfig = (type) =>
  CHANGE_TYPE_CONFIG[type] ?? DEFAULT_CHANGE_TYPE;

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <p className="mt-2 text-2xl font-bold text-white">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div className={`rounded-xl ${iconBg} p-2.5`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl bg-violet-500/10 p-2">
        <GitBranch className="h-6 w-6 text-violet-400" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white">
          Diff Intelligence
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Understand what this pull request actually changed
          across the codebase.
        </p>
      </div>
    </div>
  );
}

function ChangeTypeBadge({ type }) {
  const config = getChangeTypeConfig(type);
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${config.badge}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {type}
    </div>
  );
}

function FileChangeCard({ file }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <div className="shrink-0 rounded-lg bg-blue-500/10 p-2">
              <FileCode2 className="h-4 w-4 text-blue-400" />
            </div>

            <div className="min-w-0">
              <p className="break-all text-sm font-semibold text-white">
                {file.filename}
              </p>

              <p className="mt-1 text-xs capitalize text-slate-500">
                {file.status}
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
            +{file.additions}
          </span>

          <span className="rounded-lg bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400">
            -{file.deletions}
          </span>

          <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300">
            {file.changes}
          </span>
        </div>
      </div>

      {file.changeTypes?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {file.changeTypes.map((type) => (
            <ChangeTypeBadge key={type} type={type} />
          ))}
        </div>
      )}

      {file.observations?.length > 0 && (
        <div className="mt-5 space-y-2">
          {file.observations.map((observation) => (
            <div
              key={observation}
              className="flex items-start gap-2.5 rounded-lg bg-slate-950/50 px-3 py-2.5"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

              <p className="text-xs leading-5 text-slate-400">
                {observation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PullRequestDiffIntelligence({
  pullRequestAnalysis,
}) {
  if (!pullRequestAnalysis) return null;

  const diffIntelligence =
    pullRequestAnalysis.diffIntelligence;

  if (!diffIntelligence) {
    return null;
  }

  const {
    changeTypes = [],
    observations = [],
    statistics = {},
    files = [],
  } = diffIntelligence;

  const metrics = [
    {
      title: "Files Analyzed",
      value: statistics.filesAnalyzed ?? 0,
      description: "Changed files inspected",
      icon: FileCode2,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Frontend Changes",
      value: statistics.filesWithFrontendChanges ?? 0,
      description: "Files affecting frontend code",
      icon: Layers3,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      title: "API Changes",
      value: statistics.filesWithApiChanges ?? 0,
      description: "Files with network interaction",
      icon: Globe,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      title: "State Changes",
      value: statistics.filesWithStateChanges ?? 0,
      description: "Files affecting application state",
      icon: Activity,
      iconBg: "bg-fuchsia-500/10",
      iconColor: "text-fuchsia-400",
    },
    {
      title: "Auth Changes",
      value: statistics.filesWithAuthenticationChanges ?? 0,
      description: "Files touching authentication",
      icon: ShieldCheck,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
    {
      title: "Testing Changes",
      value: statistics.filesWithTestingChanges ?? 0,
      description: "Files related to testing",
      icon: TestTube2,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur-sm">
      <SectionHeader />

      <div className="my-6 border-t border-slate-800" />

      {/* Change Types */}
      {changeTypes.length > 0 && (
        <div>
          <div className="mb-4">
            <h3 className="font-semibold text-white">
              Detected Change Types
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Engineering areas touched by this pull request.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {changeTypes.map((type) => (
              <ChangeTypeBadge key={type} type={type} />
            ))}
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-8">
        <div className="mb-4">
          <h3 className="font-semibold text-white">
            Change Statistics
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Files grouped by the type of engineering change detected.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              {...metric}
            />
          ))}
        </div>
      </div>

      {/* Observations */}
      {observations.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />

            <div>
              <h3 className="font-semibold text-white">
                Key Observations
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Signals detected from the pull request diff.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {observations.map((observation) => (
              <div
                key={observation}
                className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4"
              >
                <div className="mt-0.5 rounded-lg bg-amber-500/10 p-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                </div>

                <p className="text-sm leading-6 text-slate-300">
                  {observation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Intelligence */}
      {files.length > 0 && (
        <div className="mt-8">
          <div className="mb-4">
            <h3 className="font-semibold text-white">
              File-Level Intelligence
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Detailed change signals detected for each modified file.
            </p>
          </div>

          <div className="space-y-4">
            {files.map((file) => (
              <FileChangeCard
                key={`${file.filename}-${file.status}`}
                file={file}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
