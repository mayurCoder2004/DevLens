import {
  AlertTriangle,
  ArrowDownRight,
  CheckCircle2,
  GitBranch,
  Layers3,
  ShieldAlert,
  Target,
} from "lucide-react";

const LEVEL_CONFIG = {
  Low: {
    badge:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    icon: CheckCircle2,
  },
  Moderate: {
    badge:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
    icon: AlertTriangle,
  },
  High: {
    badge:
      "border-orange-500/20 bg-orange-500/10 text-orange-400",
    icon: AlertTriangle,
  },
  Critical: {
    badge:
      "border-red-500/20 bg-red-500/10 text-red-400",
    icon: ShieldAlert,
  },
};

const getLevelConfig = (level) =>
  LEVEL_CONFIG[level] ?? LEVEL_CONFIG.Low;

function MetricCard({ label, value, description, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>

          <p className="mt-2 text-2xl font-bold text-white">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-slate-500">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
            <Icon className="h-5 w-5 text-violet-400" />
          </div>
        )}
      </div>
    </div>
  );
}

function BreakdownItem({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
      <span className="text-sm text-slate-400">{label}</span>

      <span className="font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
        <Icon className="h-4 w-4 text-violet-400" />
      </div>

      <div>
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PullRequestChangeImpact({
  changeImpact,
}) {
  if (!changeImpact) {
    return null;
  }

  const {
    score = 0,
    level = "Low",
    breakdown = {},
    metrics = {},
    affectedFiles = [],
    criticalAffectedFiles = [],
    affectedAreas = [],
    recommendations = [],
    unresolvedFiles = [],
  } = changeImpact;

  const levelConfig = getLevelConfig(level);
  const LevelIcon = levelConfig.icon;

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                <GitBranch className="h-5 w-5 text-violet-400" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  Change Impact
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Understand how this pull request may propagate
                  through the repository.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Impact Score
              </p>

              <p className="mt-1 text-3xl font-bold text-white">
                {score}
              </p>
            </div>

            <div
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${levelConfig.badge}`}
            >
              <LevelIcon className="h-4 w-4" />
              {level}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Changed Files"
          value={metrics.changedFileCount ?? 0}
          description="Files directly changed"
          icon={Layers3}
        />

        <MetricCard
          label="Affected Files"
          value={metrics.affectedFileCount ?? 0}
          description="Files reached through dependencies"
          icon={GitBranch}
        />

        <MetricCard
          label="Dependency Depth"
          value={metrics.maxDependencyDepth ?? 0}
          description="Maximum propagation depth"
          icon={ArrowDownRight}
        />

        <MetricCard
          label="Unresolved Files"
          value={metrics.unresolvedFileCount ?? 0}
          description="Files not resolved in the graph"
          icon={Target}
        />
      </div>

      {/* Breakdown + Dependency Reach */}
      <div className="grid gap-8 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <SectionHeader
            icon={Target}
            title="Impact Breakdown"
            description="How the overall impact score was calculated."
          />

          <div className="space-y-3">
            <BreakdownItem
              label="Scope"
              value={breakdown.scope ?? 0}
            />

            <BreakdownItem
              label="Dependency Reach"
              value={breakdown.dependencyReach ?? 0}
            />

            <BreakdownItem
              label="Criticality"
              value={breakdown.criticality ?? 0}
            />

            <BreakdownItem
              label="Dependency Depth"
              value={breakdown.dependencyDepth ?? 0}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <SectionHeader
            icon={GitBranch}
            title="Dependency Impact"
            description="Files affected through the repository dependency graph."
          />

          {affectedFiles.length === 0 ? (
            <p className="text-sm text-slate-500">
              No dependent files were affected.
            </p>
          ) : (
            <div className="space-y-3">
              {affectedFiles.map((item, index) => (
                <div
                  key={`${item.file}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {item.file}
                    </p>
                  </div>

                  <span className="ml-4 shrink-0 rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                    Depth {item.depth}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Affected Areas */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <SectionHeader
          icon={Layers3}
          title="Affected Engineering Areas"
          description="Engineering areas detected from the impacted files."
        />

        {affectedAreas.length === 0 ? (
          <p className="text-sm text-slate-500">
            No engineering areas were detected.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {affectedAreas.map((area) => (
              <div
                key={area.name}
                className="rounded-xl border border-slate-800 bg-slate-950/40 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-medium text-white">
                    {area.name}
                  </h4>

                  <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs text-violet-400">
                    {area.fileCount} file
                    {area.fileCount === 1 ? "" : "s"}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Maximum depth: {area.maxDepth}
                </p>

                <div className="mt-4 space-y-2">
                  {(area.files ?? []).map((file) => (
                    <div
                      key={file}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-400"
                    >
                      {file}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Critical Files */}
      {criticalAffectedFiles.length > 0 && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <SectionHeader
            icon={ShieldAlert}
            title="Critical Affected Files"
            description="Critical files reached by this change."
          />

          <div className="space-y-2">
            {criticalAffectedFiles.map((file) => (
              <div
                key={file}
                className="rounded-xl border border-red-500/10 bg-slate-950/40 px-4 py-3 text-sm text-red-300"
              >
                {file}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <SectionHeader
          icon={CheckCircle2}
          title="Change Impact Recommendations"
          description="Actions based on the affected engineering areas."
        />

        {recommendations.length === 0 ? (
          <p className="text-sm text-slate-500">
            No additional recommendations were generated.
          </p>
        ) : (
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div
                key={`${recommendation.area}-${index}`}
                className="rounded-xl border border-slate-800 bg-slate-950/40 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="font-medium text-white">
                    {recommendation.area}
                  </h4>

                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400">
                    {recommendation.priority}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {recommendation.reason}
                </p>

                <div className="mt-4 space-y-3">
                  {(recommendation.actions ?? []).map(
                    (action) => (
                      <div
                        key={action.title}
                        className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
                      >
                        <p className="text-sm font-medium text-white">
                          {action.title}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          {action.description}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unresolved */}
      {unresolvedFiles.length > 0 && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
          <SectionHeader
            icon={AlertTriangle}
            title="Unresolved Files"
            description="Changed files that could not be resolved against the architecture graph."
          />

          <div className="space-y-2">
            {unresolvedFiles.map((file) => (
              <div
                key={file}
                className="rounded-xl border border-amber-500/10 bg-slate-950/40 px-4 py-3 text-sm text-amber-300"
              >
                {file}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}