import ProgressMetric from "../common/ProgressMetric";

export default function DeploymentAnalytics({ deployment }) {
  if (!deployment) return null;

  const metrics = [
    {
      title: "Deployment Score",
      value: deployment.deploymentScore,
      status:
        deployment.deploymentScore >= 80
          ? "Excellent"
          : deployment.deploymentScore >= 60
          ? "Good"
          : "Needs Improvement",
      color: "bg-blue-500",
    },
    {
      title: "Infrastructure",
      value: deployment.infrastructure.score,
      status:
        deployment.infrastructure.score === 100
          ? "Ready"
          : deployment.infrastructure.score > 0
          ? "Partial"
          : "Missing",
      color: "bg-red-500",
    },
    {
      title: "Configuration",
      value: deployment.configuration.score,
      status:
        deployment.configuration.score >= 80
          ? "Ready"
          : deployment.configuration.score >= 50
          ? "Partial"
          : "Missing",
      color: "bg-amber-500",
    },
    {
      title: "Build Readiness",
      value: deployment.buildReadiness.score,
      status:
        deployment.buildReadiness.score >= 80
          ? "Ready"
          : deployment.buildReadiness.score >= 50
          ? "Partial"
          : "Missing",
      color: "bg-emerald-500",
    },
    {
      title: "CI/CD",
      value: deployment.ciCd.score,
      status:
        deployment.ciCd.score === 100
          ? "Ready"
          : deployment.ciCd.score > 0
          ? "Partial"
          : "Missing",
      color: "bg-violet-500",
    },
  ];

  const health = [
    {
      title: "Infrastructure",
      status:
        deployment.infrastructure.score === 100
          ? "Ready"
          : deployment.infrastructure.score > 0
          ? "Partial"
          : "Missing",
    },
    {
      title: "Configuration",
      status:
        deployment.configuration.score >= 80
          ? "Ready"
          : deployment.configuration.score >= 50
          ? "Partial"
          : "Missing",
    },
    {
      title: "Build",
      status:
        deployment.buildReadiness.score >= 80
          ? "Ready"
          : deployment.buildReadiness.score >= 50
          ? "Partial"
          : "Missing",
    },
    {
      title: "CI/CD",
      status:
        deployment.ciCd.score === 100
          ? "Ready"
          : deployment.ciCd.score > 0
          ? "Partial"
          : "Missing",
    },
    {
      title: "Runtime",
      status:
        deployment.runtime.score === 100
          ? "Ready"
          : deployment.runtime.score > 0
          ? "Partial"
          : "Missing",
    },
  ];

  const getBadgeClasses = (status) => {
    switch (status) {
      case "Ready":
        return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
      case "Partial":
        return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
      default:
        return "bg-red-500/15 text-red-400 border border-red-500/30";
    }
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Deployment Analytics
        </h2>

        <p className="mt-2 text-slate-400">
          Deployment readiness across infrastructure and DevOps categories.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
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

        <div className="mt-10 border-t border-slate-800 pt-8">
          <h3 className="text-lg font-semibold text-white">
            Deployment Health
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {health.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <span className="text-sm font-medium text-slate-300">
                  {item.title}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClasses(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}