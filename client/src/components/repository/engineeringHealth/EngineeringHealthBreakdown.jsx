import {
  Boxes,
  GitPullRequest,
  GitBranch,
  Layers3,
  ShieldCheck,
} from "lucide-react";

const getStatus = (score) => {
  if (score === null || score === undefined) {
    return {
      label: "Not Analyzed",
      badge: "bg-slate-700/60 text-slate-400 border border-slate-600/30",
      bar: "bg-slate-600",
    };
  }
  if (score >= 90) {
    return {
      label: "Excellent",
      badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
      bar: "bg-emerald-500",
    };
  }
  if (score >= 75) {
    return {
      label: "Good",
      badge: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
      bar: "bg-blue-500",
    };
  }
  if (score >= 60) {
    return {
      label: "Fair",
      badge: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
      bar: "bg-amber-500",
    };
  }
  if (score >= 40) {
    return {
      label: "Needs Improvement",
      badge: "bg-orange-500/15 text-orange-400 border border-orange-500/30",
      bar: "bg-orange-500",
    };
  }
  return {
    label: "Critical",
    badge: "bg-red-500/15 text-red-400 border border-red-500/30",
    bar: "bg-red-500",
  };
};

export default function EngineeringHealthBreakdown({ engineeringHealth }) {
  if (!engineeringHealth) return null;

  const { scores } = engineeringHealth;

  const breakdownItems = [
    {
      title: "Repository Health",
      description: "Overall repository quality and maintainability.",
      score: scores.repositoryHealth,
      icon: ShieldCheck,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Architecture",
      description: "System design and architectural best practices.",
      score: scores.architecture,
      icon: Layers3,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      title: "Technical Debt",
      description: "Code quality, maintainability, and debt analysis.",
      score: scores.technicalDebt,
      icon: Boxes,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
    {
      title: "Deployment",
      description: "CI/CD, workflows, and deployment readiness.",
      score: scores.deployment,
      icon: GitBranch,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      title: "Pull Request Quality",
      description: "Review quality and pull request risk analysis.",
      score: scores.pullRequest,
      icon: GitPullRequest,
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-400",
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Engineering Score Breakdown
        </h2>

        <p className="mt-2 text-slate-400">
          Detailed performance of every engineering dimension contributing to
          the overall health score.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {breakdownItems.map((item) => {
          const Icon = item.icon;
          const status = getStatus(item.score);
          const scoreValue =
            item.score !== null && item.score !== undefined ? item.score : 0;

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-slate-700"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className={`rounded-xl ${item.iconBg} p-3`}>
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${status.badge}`}
                >
                  {status.label}
                </span>
              </div>

              {/* Title and Description */}
              <h3 className="mt-5 text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {item.description}
              </p>

              {/* Score Bar */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Score
                  </span>

                  <span className="text-lg font-bold text-white">
                    {item.score !== null && item.score !== undefined
                      ? `${item.score}%`
                      : "N/A"}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${status.bar}`}
                    style={{ width: `${scoreValue}%` }}
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
