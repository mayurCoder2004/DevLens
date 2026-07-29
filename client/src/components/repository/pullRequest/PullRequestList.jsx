import { ArrowRight, GitPullRequest } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PullRequestList({
  repositoryId,
  pullRequests,
}) {
  const navigate = useNavigate();

  if (!pullRequests.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center text-slate-400">
        No pull requests found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pullRequests.map((pr) => (
        <div
          key={pr.number}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <GitPullRequest className="h-5 w-5 text-violet-400" />

                <h3 className="font-semibold text-white">
                  #{pr.number} {pr.title}
                </h3>
              </div>

              <p className="mt-2 text-sm text-slate-400">
                {pr.author}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {pr.state}
              </span>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/repository/${repositoryId}/pull-requests/${pr.number}`
                )
              }
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Analyze

              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}