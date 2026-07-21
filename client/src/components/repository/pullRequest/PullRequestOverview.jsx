import {
  GitPullRequest,
  User,
  GitBranch,
  Calendar,
  Clock3,
  ExternalLink,
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function PullRequestOverview({
  pullRequestAnalysis,
}) {

    console.log(pullRequestAnalysis);
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
  createdAt,
  updatedAt,
} = pullRequestAnalysis;

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white">
          Pull Request Overview
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          High-level information about the selected pull request,
          including author, branches, lifecycle, and GitHub
          reference.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        {/* Left */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3">
              <GitPullRequest className="h-6 w-6 text-blue-400" />
            </div>

            <div className="flex-1">
              <p className="text-sm text-slate-400">
                Pull Request #{prNumber}
              </p>

              <h3 className="mt-1 text-xl font-semibold text-white">
                {title}
              </h3>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <InfoRow
                  icon={GitBranch}
                  label="Base Branch"
                  value={baseBranch}
                />

                <InfoRow
                  icon={GitBranch}
                  label="Head Branch"
                  value={headBranch}
                />

                <InfoRow
                  icon={Calendar}
                  label="Created"
                  value={formatDate(createdAt)}
                />

                <InfoRow
                  icon={Clock3}
                  label="Last Updated"
                  value={formatDate(updatedAt)}
                />
              </div>

              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
              >
                View on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <h3 className="mb-5 text-lg font-semibold text-white">
              Author
            </h3>

            <div className="flex items-center gap-4">
              <img
                src={authorAvatar}
                alt={author}
                className="h-14 w-14 rounded-full border border-slate-700"
              />

              <div>
                <p className="text-lg font-medium text-white">
                  {author}
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                  <User className="h-4 w-4" />
                  GitHub Contributor
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
            <h3 className="mb-5 text-lg font-semibold text-white">
              Status
            </h3>

            <div className="space-y-4">
              <StatusRow
                label="State"
                value={state}
                active={state === "open"}
              />

              <StatusRow
                label="Merged"
                value={merged ? "Yes" : "No"}
                active={merged}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-slate-800 p-2">
        <Icon className="h-4 w-4 text-slate-300" />
      </div>

      <div>
        <p className="text-sm text-slate-400">{label}</p>

        <p className="mt-1 font-medium text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatusRow({
  label,
  value,
  active,
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4">
      <span className="text-sm text-slate-400">
        {label}
      </span>

      <div className="flex items-center gap-2">
        {active ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        ) : (
          <Circle className="h-4 w-4 text-slate-500" />
        )}

        <span className="font-medium capitalize text-white">
          {value}
        </span>
      </div>
    </div>
  );
}