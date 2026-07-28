import AttentionCard from "./AttentionCard";

export default function AttentionPanel({
  repositories = [],
  loading,
}) {
  if (loading) {
    return (
      <section className="mt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            Repositories Needing Attention
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Prioritized repositories that require immediate engineering focus.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-2xl border border-slate-700 bg-slate-800"
            />
          ))}
        </div>
      </section>
    );
  }

  if (repositories.length === 0) {
    return (
      <section className="mt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            Repositories Needing Attention
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Prioritized repositories that require immediate engineering focus.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center">
          <h3 className="text-lg font-semibold text-emerald-400">
            🎉 Great Job!
          </h3>

          <p className="mt-2 text-slate-300">
            All analyzed repositories are healthy. No repositories require
            immediate attention.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Repositories Needing Attention
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Prioritized repositories that require immediate engineering focus.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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