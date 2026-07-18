import ProgressMetric from "../common/ProgressMetric";

export default function EngineeringScoreBreakdown({
  engineeringHealth,
}) {
  if (!engineeringHealth) return null;

  const { engineeringScore, status, scores } = engineeringHealth;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Engineering Score Breakdown
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Analyze the contribution of each engineering domain to
          the overall engineering health score.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <ProgressMetric
          title="Overall Engineering"
          value={engineeringScore}
          status={status}
          color="blue"
        />

        <ProgressMetric
          title="Repository Health"
          value={scores.repositoryHealth}
          status="Repository Health"
          color="emerald"
        />

        <ProgressMetric
          title="Architecture"
          value={scores.architecture}
          status="Architecture"
          color="violet"
        />

        <ProgressMetric
          title="Technical Debt"
          value={scores.technicalDebt}
          status="Technical Debt"
          color="amber"
        />

        <ProgressMetric
          title="Deployment"
          value={scores.deployment}
          status="Deployment Readiness"
          color="cyan"
        />

        <ProgressMetric
          title="Pull Request Risk"
          value={scores.pullRequest}
          status="Risk Analysis"
          color="red"
        />
      </div>
    </section>
  );
}