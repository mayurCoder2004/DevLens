import ProgressMetric from "../common/ProgressMetric";

export default function EngineeringScoreBreakdown({ engineeringHealth }) {
  if (!engineeringHealth) return null;

  const { engineeringScore, status, scores } = engineeringHealth;

  const metrics = [
    {
      title: "Overall Engineering",
      value: engineeringScore,
      status: status,
      color: "blue",
    },
    {
      title: "Repository Health",
      value: scores.repositoryHealth,
      status: "Repository Health",
      color: "emerald",
    },
    {
      title: "Architecture",
      value: scores.architecture,
      status: "Architecture",
      color: "violet",
    },
    {
      title: "Technical Debt",
      value: scores.technicalDebt,
      status: "Technical Debt",
      color: "amber",
    },
    {
      title: "Deployment",
      value: scores.deployment,
      status: "Deployment Readiness",
      color: "cyan",
    },
    {
      title: "Pull Request Risk",
      value: scores.pullRequest,
      status: "Risk Analysis",
      color: "rose",
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Engineering Health Analytics
        </h2>

        <p className="mt-2 text-slate-400">
          Score contribution of each engineering dimension to overall health.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 sm:p-8">
        <div className="space-y-6">
          {metrics.map((metric) => (
            <ProgressMetric
              key={metric.title}
              title={metric.title}
              value={metric.value}
              status={metric.status}
              color={metric.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
