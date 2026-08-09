import {
  Calendar,
  ExternalLink,
  GitBranch,
  GitPullRequest,
  Shield,
  User,
} from "lucide-react";

const getRiskBadge = (riskLevel) => {
  switch (riskLevel?.toLowerCase()) {
    case "critical":
      return "bg-red-500/15 text-red-400 border border-red-500/30";
    case "high":
      return "bg-orange-500/15 text-orange-400 border border-orange-500/30";
    case "medium":
      return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
    default:
      return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
  }
};

const formatDate = (date) => {
  if (!date) return "Unknown";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function PullRequestHero({ pullRequestAnalysis }) {
  if (!pullRequestAnalysis) return null;

  const {
    prNumber,
    title,
    state,
    author,
    authorAvatar,
    baseBranch,
    headBranch,
    merged,
    url,
    updatedAt,
    riskLevel,
    riskScore,
  } = pullRequestAnalysis;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-400">
              <GitPullRequest className="h-3.5 w-3.5" />
              PR #{prNumber}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getRiskBadge(
                riskLevel,
              )}`}
            >
              <Shield className="h-3.5 w-3.5" />
              {riskLevel} Risk
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold capitalize text-slate-300">
              {merged ? "Merged" : state}
            </span>
          </div>

          <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
            {title}
          </h2>

          <div className="mt-5 grid gap-3 text-sm text-slate-400 sm:grid-cols-2 xl:grid-cols-4">
            <InfoItem icon={GitBranch} label="Base" value={baseBranch} />
            <InfoItem icon={GitBranch} label="Head" value={headBranch} />
            <InfoItem
              icon={Calendar}
              label="Updated"
              value={formatDate(updatedAt)}
            />
            <InfoItem
              icon={Shield}
              label="Risk Score"
              value={`${riskScore}%`}
            />
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 sm:flex-row sm:items-center lg:w-auto lg:flex-col lg:items-stretch">
          <div className="flex items-center gap-3">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={author}
                className="h-10 w-10 rounded-full border border-slate-700"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
                <User className="h-5 w-5 text-slate-400" />
              </div>
            )}

            <div className="min-w-0">
              <p className="text-xs text-slate-500">Author</p>
              <p className="break-words font-medium text-white">
                {author || "Unknown"}
              </p>
            </div>
          </div>

          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-blue-500/40 hover:text-white"
            >
              View on GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
      <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="break-words font-medium text-slate-200">
        {value || "Unknown"}
      </p>
    </div>
  );
}
