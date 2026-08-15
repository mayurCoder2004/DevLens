import React from "react";

import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Minus,
  TrendingDown,
  TrendingUp,
  GitCompareArrows,
} from "lucide-react";

const getDirectionConfig = (direction) => {
  switch (direction) {
    case "improved":
      return {
        label: "Improved",
        icon: ArrowUp,
        iconClass: "text-emerald-400",
        badgeClass:
          "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        valueClass: "text-emerald-400",
        barClass: "bg-emerald-500",
      };

    case "declined":
      return {
        label: "Declined",
        icon: ArrowDown,
        iconClass: "text-red-400",
        badgeClass:
          "bg-red-500/10 text-red-400 border-red-500/20",
        valueClass: "text-red-400",
        barClass: "bg-red-500",
      };

    default:
      return {
        label: "Unchanged",
        icon: Minus,
        iconClass: "text-slate-400",
        badgeClass:
          "bg-slate-500/10 text-slate-400 border-slate-500/20",
        valueClass: "text-slate-400",
        barClass: "bg-slate-500",
      };
  }
};

const formatDate = (date) => {
  if (!date) return "Unknown";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown";
  }

  return parsedDate.toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const clampScore = (value) => {
  const numericValue = Number(value ?? 0);

  return Math.min(Math.max(numericValue, 0), 100);
};

export default function RepositoryChanges({ repositoryId }) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!repositoryId) {
      setLoading(false);
      return;
    }

    const fetchChanges = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/repositories/${repositoryId}/changes`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const body = await response.json();

        if (!response.ok) {
          throw new Error(
            body.message ||
              body.error ||
              "Failed to fetch repository changes.",
          );
        }

        setData(body);
      } catch (err) {
        console.error("Repository Changes Error:", err);

        setError(
          err.message ||
            "Failed to load repository changes.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChanges();
  }, [repositoryId]);

  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-800" />

          <div className="space-y-2">
            <div className="h-5 w-40 animate-pulse rounded bg-slate-800" />
            <div className="h-3 w-64 animate-pulse rounded bg-slate-800" />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-xl bg-slate-900"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-red-500/20 bg-slate-950/60 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-500/10 p-2">
            <GitCompareArrows className="h-6 w-6 text-red-400" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Repository Changes
            </h2>

            <p className="mt-1 text-sm text-red-400">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  const changes = data.changes || {};
  const changeItems = changes.changes || [];

  const summary = changes.summary || {
    improved: 0,
    declined: 0,
    unchanged: 0,
  };

  const hasPreviousSnapshot =
    changes.hasPreviousSnapshot;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/10 p-2">
            <GitCompareArrows className="h-6 w-6 text-violet-400" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Repository Changes
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              What changed since the previous engineering snapshot.
            </p>
          </div>
        </div>
      </div>

      <div className="my-6 border-t border-slate-800" />

      {!hasPreviousSnapshot ? (
        <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 py-14 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-slate-500" />

          <h3 className="mt-5 text-lg font-semibold text-white">
            No Previous Snapshot
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            This repository needs at least two engineering
            snapshots before DevLens can show what changed.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />

                <span className="text-sm text-slate-400">
                  Improved
                </span>
              </div>

              <p className="mt-2 text-2xl font-bold text-emerald-400">
                {summary.improved}
              </p>
            </div>

            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-400" />

                <span className="text-sm text-slate-400">
                  Declined
                </span>
              </div>

              <p className="mt-2 text-2xl font-bold text-red-400">
                {summary.declined}
              </p>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
              <div className="flex items-center gap-2">
                <Minus className="h-4 w-4 text-slate-400" />

                <span className="text-sm text-slate-400">
                  Unchanged
                </span>
              </div>

              <p className="mt-2 text-2xl font-bold text-slate-300">
                {summary.unchanged}
              </p>
            </div>
          </div>

          {changes.overallSummary && (
            <div className="mt-5 rounded-xl border border-violet-500/20 bg-violet-500/5 px-5 py-4">
              <p className="text-sm leading-6 text-slate-300">
                {changes.overallSummary}
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span>
              Previous:{" "}
              {formatDate(
                data.previousSnapshot?.createdAt,
              )}
            </span>

            <ArrowRight className="h-3.5 w-3.5" />

            <span>
              Current:{" "}
              {formatDate(
                data.currentSnapshot?.createdAt,
              )}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {changeItems.map((item) => {
              const config = getDirectionConfig(
                item.direction,
              );

              const Icon = config.icon;

              const previousScore = clampScore(
                item.previous,
              );

              const currentScore = clampScore(
                item.current,
              );

              return (
                <div
                  key={item.metric}
                  className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 transition-colors hover:border-slate-700"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`rounded-lg border p-2 ${config.badgeClass}`}
                      >
                        <Icon
                          className={`h-4 w-4 ${config.iconClass}`}
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-medium text-white">
                          {item.label}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {item.previous} → {item.current}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${config.badgeClass}`}
                      >
                        {config.label}
                      </span>

                      <span
                        className={`min-w-[42px] text-right text-sm font-bold ${config.valueClass}`}
                      >
                        {item.change > 0
                          ? `+${item.change}`
                          : item.change}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-slate-600 transition-all duration-500"
                        style={{
                          width: `${previousScore}%`,
                        }}
                      />

                      <div
                        className={`absolute left-0 top-0 h-full rounded-full transition-all duration-700 ${config.barClass}`}
                        style={{
                          width: `${currentScore}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}