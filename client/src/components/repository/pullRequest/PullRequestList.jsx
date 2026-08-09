import { useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Circle,
  GitPullRequest,
  Search,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATE_CONFIG = {
  open: {
    label: "Open",
    badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    icon: GitPullRequest,
  },
  closed: {
    label: "Closed",
    badge: "bg-slate-700/60 text-slate-400 border border-slate-600/30",
    icon: Circle,
  },
  draft: {
    label: "Draft",
    badge: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    icon: Circle,
  },
};

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Draft", value: "draft" },
  { label: "Closed", value: "closed" },
];

const formatDate = (date) => {
  if (!date) return "Unknown";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function PullRequestList({ repositoryId, pullRequests }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPullRequests = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return pullRequests.filter((pr) => {
      const stateKey = pr.draft ? "draft" : pr.state;
      const matchesFilter =
        statusFilter === "all" || statusFilter === stateKey;
      const matchesQuery =
        !normalizedQuery ||
        pr.title?.toLowerCase().includes(normalizedQuery) ||
        pr.author?.toLowerCase().includes(normalizedQuery) ||
        String(pr.number).includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [pullRequests, query, statusFilter]);

  if (!pullRequests.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-10 text-center sm:px-10 sm:py-16">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10">
          <GitPullRequest className="h-8 w-8 text-violet-400" />
        </div>

        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          No Pull Requests Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-slate-400">
          There are no pull requests in this repository yet, or they haven't
          been synced. Try refreshing to check for new pull requests.
        </p>

        <div className="mx-auto mt-8 grid max-w-xl gap-4 text-left sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h4 className="font-medium text-white">Open Reviews</h4>
            <p className="mt-1 text-sm text-slate-400">
              Track active pull requests awaiting review.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h4 className="font-medium text-white">Risk Analysis</h4>
            <p className="mt-1 text-sm text-slate-400">
              Analyze changed files, risk, and recommendations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search pull requests by title, author, or number..."
              className="h-12 w-full rounded-xl border border-slate-800 bg-slate-900 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10"
            />
          </label>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex items-center gap-2 pr-1 text-sm text-slate-400">
              <SlidersHorizontal className="h-4 w-4" />
              Status
            </div>

            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setStatusFilter(filter.value)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  statusFilter === filter.value
                    ? "bg-violet-600 text-white"
                    : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredPullRequests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-8 py-14 text-center">
          <Search className="mx-auto h-10 w-10 text-slate-500" />
          <h3 className="mt-5 text-xl font-semibold text-white">
            No Matching Pull Requests
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            Adjust the search text or status filter to see more pull requests.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPullRequests.map((pr) => {
            const stateKey = pr.draft ? "draft" : pr.state;
            const stateConfig = STATE_CONFIG[stateKey] ?? STATE_CONFIG.closed;
            const StateIcon = stateConfig.icon;

            return (
              <div
                key={pr.number}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800/60 sm:p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                      <GitPullRequest className="h-5 w-5 text-violet-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-slate-500">
                          #{pr.number}
                        </span>

                        <h3 className="min-w-0 break-words font-semibold text-white">
                          {pr.title}
                        </h3>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${stateConfig.badge}`}
                        >
                          <StateIcon className="h-3 w-3" />
                          {stateConfig.label}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-400">
                          <User className="h-3.5 w-3.5 text-slate-500" />
                          {pr.author}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                          <Calendar className="h-3.5 w-3.5" />
                          Updated {formatDate(pr.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/repository/${repositoryId}/pull-requests/${pr.number}`
                      )
                    }
                    className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 sm:w-auto"
                  >
                    Analyze
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
