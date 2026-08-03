import { ShieldCheck } from "lucide-react";

import AttentionCard from "./AttentionCard";

export default function AttentionPanel({
  repositories = [],
  loading,
}) {
  if (loading) {
    return (
      <section className="mt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            Repositories Needing Attention
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Prioritized repositories that require immediate engineering focus.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                h-72
                animate-pulse
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
              "
            />
          ))}
        </div>
      </section>
    );
  }

  if (repositories.length === 0) {
    return (
      <section className="mt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            Repositories Needing Attention
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Prioritized repositories that require immediate engineering focus.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
            <ShieldCheck
              size={28}
              className="text-emerald-400"
            />
          </div>

          <h3 className="text-xl font-semibold text-white">
            Everything Looks Healthy 🎉
          </h3>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-300">
            All analyzed repositories are currently healthy.
            No repositories require immediate engineering
            attention.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Repositories Needing Attention
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Prioritized repositories that require immediate engineering focus.
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
          {repositories.length} Repository
          {repositories.length > 1 ? "ies" : ""} Requiring Attention
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {repositories.map((repo) => (
          <AttentionCard
            key={repo.repositoryId}
            repository={repo.name}
            owner={repo.owner}
            severity={repo.severity}
            riskScore={repo.riskScore}
            healthScore={repo.healthScore}
            deploymentScore={repo.deploymentScore}
            maintainabilityScore={repo.maintainabilityScore}
            issues={repo.issues}
            link={`/repository/${repo.repositoryId}`}
          />
        ))}
      </div>
    </section>
  );
}