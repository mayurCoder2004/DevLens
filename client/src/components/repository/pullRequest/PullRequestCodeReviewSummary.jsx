import {
  CheckCircle2,
  FileWarning,
  GitCompareArrows,
  Package,
  ServerCog,
} from "lucide-react";

export default function PullRequestCodeReviewSummary({ pullRequestAnalysis }) {
  if (!pullRequestAnalysis) return null;

  const {
    additions = 0,
    deletions = 0,
    totalChanges = 0,
    criticalFiles = [],
    hasDependencyChanges,
    hasConfigurationChanges,
    recommendations = [],
  } = pullRequestAnalysis;

  const reviewItems = [
    {
      label: "Change Volume",
      value: `${totalChanges} lines`,
      description: `${additions} additions and ${deletions} deletions.`,
      icon: GitCompareArrows,
      tone: "bg-cyan-500/10 text-cyan-400",
    },
    {
      label: "Critical Surface",
      value: `${criticalFiles.length} files`,
      description:
        criticalFiles.length > 0
          ? "Sensitive files need extra review attention."
          : "No critical files were detected.",
      icon: FileWarning,
      tone:
        criticalFiles.length > 0
          ? "bg-orange-500/10 text-orange-400"
          : "bg-emerald-500/10 text-emerald-400",
    },
    {
      label: "Dependency Changes",
      value: hasDependencyChanges ? "Detected" : "None",
      description: hasDependencyChanges
        ? "Review version changes and lockfiles carefully."
        : "No dependency updates were found.",
      icon: Package,
      tone: hasDependencyChanges
        ? "bg-violet-500/10 text-violet-400"
        : "bg-slate-500/10 text-slate-400",
    },
    {
      label: "Configuration Changes",
      value: hasConfigurationChanges ? "Detected" : "None",
      description: hasConfigurationChanges
        ? "Validate deployment, infrastructure, or CI settings."
        : "No infrastructure or configuration changes were found.",
      icon: ServerCog,
      tone: hasConfigurationChanges
        ? "bg-blue-500/10 text-blue-400"
        : "bg-slate-500/10 text-slate-400",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-emerald-500/10 p-2">
          <CheckCircle2 className="h-6 w-6 text-emerald-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Code Review Summary
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Reviewer-focused checklist generated from pull request metadata.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reviewItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${item.tone}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-slate-400">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-bold text-white">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm font-medium text-slate-400">Review Focus</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {recommendations.length > 0
            ? `Start with the ${recommendations.length} AI recommendation${
                recommendations.length === 1 ? "" : "s"
              }, then verify high-risk files and test coverage for the changed surface.`
            : "No AI recommendations were generated. Review the changed files and run the usual project checks before merging."}
        </p>
      </div>
    </section>
  );
}
