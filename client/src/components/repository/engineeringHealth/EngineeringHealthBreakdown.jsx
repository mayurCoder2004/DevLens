import {
  Boxes,
  GitPullRequest,
  GitBranch,
  Layers3,
  ShieldCheck,
} from "lucide-react";

export default function EngineeringHealthBreakdown({
  engineeringHealth,
}) {
  if (!engineeringHealth) return null;

  const { scores } = engineeringHealth;

  const getStatus = (score) => {
    if (score === null || score === undefined)
      return {
        label: "Not Analyzed",
        color: "bg-slate-700 text-slate-300",
      };

    if (score >= 90)
      return {
        label: "Excellent",
        color: "bg-emerald-500/15 text-emerald-400",
      };

    if (score >= 75)
      return {
        label: "Good",
        color: "bg-blue-500/15 text-blue-400",
      };

    if (score >= 60)
      return {
        label: "Fair",
        color: "bg-amber-500/15 text-amber-400",
      };

    if (score >= 40)
      return {
        label: "Needs Improvement",
        color: "bg-orange-500/15 text-orange-400",
      };

    return {
      label: "Critical",
      color: "bg-red-500/15 text-red-400",
    };
  };

  const breakdownItems = [
    {
      title: "Repository Health",
      description:
        "Overall repository quality and maintainability.",
      score: scores.repositoryHealth,
      icon: ShieldCheck,
      iconColor: "text-emerald-400",
    },
    {
      title: "Architecture",
      description:
        "System design and architectural best practices.",
      score: scores.architecture,
      icon: Layers3,
      iconColor: "text-violet-400",
    },
    {
      title: "Technical Debt",
      description:
        "Code quality, maintainability and debt analysis.",
      score: scores.technicalDebt,
      icon: Boxes,
      iconColor: "text-amber-400",
    },
    {
      title: "Deployment",
      description:
        "CI/CD, workflows and deployment readiness.",
      score: scores.deployment,
      icon: GitBranch,
      iconColor: "text-cyan-400",
    },
    {
      title: "Pull Request Quality",
      description:
        "Review quality and pull request risk analysis.",
      score: scores.pullRequest,
      icon: GitPullRequest,
      iconColor: "text-pink-400",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Engineering Health Breakdown
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Detailed performance of every engineering dimension
          contributing to the overall health score.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {breakdownItems.map((item) => {
          const Icon = item.icon;
          const status = getStatus(item.score);

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 transition-all hover:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`rounded-lg bg-slate-800 p-3 ${item.iconColor}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${status.color}`}
                >
                  {status.label}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {item.description}
              </p>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Score
                  </span>

                  <span className="font-semibold text-white">
                    {item.score !== null &&
                    item.score !== undefined
                      ? `${item.score}%`
                      : "N/A"}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-700"
                    style={{
                      width: `${
                        item.score !== null &&
                        item.score !== undefined
                          ? item.score
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}