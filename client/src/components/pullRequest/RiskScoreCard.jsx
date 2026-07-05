import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  FileCode2,
  GitBranch,
  GitPullRequest,
  Minus,
  Plus,
  ShieldAlert,
} from "lucide-react";

const riskStyles = {
  Critical: {
    text: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    bar: "bg-red-600",
    ring: "ring-red-100",
  },
  High: {
    text: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    bar: "bg-orange-500",
    ring: "ring-orange-100",
  },
  Medium: {
    text: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    bar: "bg-amber-500",
    ring: "ring-amber-100",
  },
  Low: {
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    bar: "bg-emerald-500",
    ring: "ring-emerald-100",
  },
};

const getRiskStyle = (level) => riskStyles[level] || riskStyles.Low;

const formatDate = (date) => {
  if (!date) return "Unknown";

  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const RiskScoreCard = ({ analysis }) => {
  const riskScore = analysis.risk?.score ?? 0;
  const riskLevel = analysis.risk?.level || "Low";
  const style = getRiskStyle(riskLevel);
  const progress = Math.min(Math.max(Number(riskScore) || 0, 0), 100);
  const pullRequest = analysis.pullRequest;

  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                <GitPullRequest className="h-3.5 w-3.5" aria-hidden="true" />
                PR #{pullRequest.number}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                {pullRequest.merged ? (
                  <CheckCircle2
                    className="h-3.5 w-3.5 text-violet-600"
                    aria-hidden="true"
                  />
                ) : (
                  <GitBranch
                    className="h-3.5 w-3.5 text-emerald-600"
                    aria-hidden="true"
                  />
                )}
                {pullRequest.merged ? "Merged" : pullRequest.state}
              </span>
            </div>

            <h3 className="max-w-4xl text-xl font-semibold leading-7 text-slate-950 sm:text-2xl">
              {pullRequest.title}
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="inline-flex items-center gap-2">
                <img
                  src={pullRequest.authorAvatar}
                  alt={`${pullRequest.author} avatar`}
                  className="h-8 w-8 rounded-full border border-white shadow-sm"
                />
                <span className="font-medium text-slate-800">
                  {pullRequest.author}
                </span>
              </div>

              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />

              <span className="inline-flex items-center gap-1.5">
                <GitBranch className="h-4 w-4" aria-hidden="true" />
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">
                  {pullRequest.baseBranch}
                </span>
                <span aria-hidden="true">from</span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">
                  {pullRequest.headBranch}
                </span>
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Created {formatDate(pullRequest.createdAt)}
              </span>
            </div>
          </div>

          <div
            className={`rounded-xl border ${style.border} ${style.bg} p-4 ring-4 ${style.ring} lg:min-w-56`}
          >
            <div className="flex items-center justify-between gap-4">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border ${style.border} bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide ${style.text}`}
              >
                <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                {riskLevel} Risk
              </span>

              <span
                className={`text-4xl font-black leading-none ${style.text}`}
              >
                {riskScore}
              </span>
            </div>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
              <div
                className={`h-full rounded-full ${style.bar} transition-all duration-500`}
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress}
                aria-label={`Risk score ${progress} out of 100`}
              />
            </div>

            <p className="mt-2 text-xs font-medium text-slate-600">
              Score out of 100 based on changed files, categories, and impact
              signals.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <FileCode2 className="h-4 w-4" aria-hidden="true" />
            Files Changed
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-950">
            {analysis.summary.totalFiles}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Plus className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            Additions
          </div>
          <p className="mt-3 text-3xl font-bold text-emerald-600">
            +{analysis.summary.additions}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Minus className="h-4 w-4 text-red-600" aria-hidden="true" />
            Deletions
          </div>
          <p className="mt-3 text-3xl font-bold text-red-600">
            -{analysis.summary.deletions}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            Total Changes
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-950">
            {analysis.summary.totalChanges}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
        <a
          href={pullRequest.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Pull Request on GitHub
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default RiskScoreCard;
