import CriticalIssueCard from "./CriticalIssueCard";

const issues = [
  {
    title: "Missing Readiness Probes",
    severity: "High",
    description:
      "Deployments should expose readiness probes to improve production reliability and reduce downtime during rollouts.",
  },
  {
    title: "Limited Automated Testing",
    severity: "Medium",
    description:
      "Increase automated test coverage to detect regressions before deployment.",
  },
  {
    title: "Docker Image Optimization",
    severity: "Low",
    description:
      "Adopt multi-stage builds and lightweight base images to reduce container size.",
  },
];

export default function CriticalIssues() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Critical Issues
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          High-priority engineering concerns identified
          during repository analysis.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {issues.map((issue) => (
          <CriticalIssueCard
            key={issue.title}
            {...issue}
          />
        ))}
      </div>
    </section>
  );
}