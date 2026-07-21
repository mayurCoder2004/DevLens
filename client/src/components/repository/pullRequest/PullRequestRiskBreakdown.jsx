import {
  ShieldAlert,
  ServerCog,
  Package,
  FileText,
  Files,
  AlertTriangle,
} from "lucide-react";

export default function PullRequestRiskBreakdown({
  pullRequestAnalysis,
}) {
  if (!pullRequestAnalysis) return null;

  const breakdown = pullRequestAnalysis.riskBreakdown;

  const breakdownItems = [
    {
      title: "Overall Risk",
      description:
        "Combined engineering risk calculated for this pull request.",
      value: pullRequestAnalysis.riskScore,
      icon: AlertTriangle,
      iconColor: "text-red-400",
    },
    {
      title: "Critical Files",
      description:
        "Risk introduced by changes to sensitive files.",
      value: breakdown.critical,
      icon: ShieldAlert,
      iconColor: "text-orange-400",
    },
    {
      title: "Infrastructure",
      description:
        "Risk introduced by infrastructure changes.",
      value: breakdown.infrastructure,
      icon: ServerCog,
      iconColor: "text-cyan-400",
    },
    {
      title: "Dependencies",
      description:
        "Risk caused by dependency updates.",
      value: breakdown.dependency,
      icon: Package,
      iconColor: "text-violet-400",
    },
    {
      title: "Documentation",
      description:
        "Risk associated with documentation changes.",
      value: breakdown.documentation,
      icon: FileText,
      iconColor: "text-emerald-400",
    },
    {
      title: "File Count",
      description:
        "Risk based on the total number of modified files.",
      value: breakdown.fileCount,
      icon: Files,
      iconColor: "text-blue-400",
    },
  ];

  const getStatus = (score) => {
    if (score === 0) {
      return {
        label: "No Risk",
        color: "bg-slate-700 text-slate-300",
      };
    }

    if (score <= 25) {
      return {
        label: "Low",
        color: "bg-emerald-500/15 text-emerald-400",
      };
    }

    if (score <= 50) {
      return {
        label: "Medium",
        color: "bg-amber-500/15 text-amber-400",
      };
    }

    if (score <= 75) {
      return {
        label: "High",
        color: "bg-orange-500/15 text-orange-400",
      };
    }

    return {
      label: "Critical",
      color: "bg-red-500/15 text-red-400",
    };
  };

  const getProgressColor = (score) => {
    if (score === 0) return "bg-slate-500";
    if (score <= 25) return "bg-emerald-500";
    if (score <= 50) return "bg-amber-500";
    if (score <= 75) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Pull Request Risk Breakdown
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Understand how the overall pull request risk score is
          calculated across different engineering dimensions.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {breakdownItems.map((item) => {
          const Icon = item.icon;
          const status = getStatus(item.value);

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
                    Risk
                  </span>

                  <span className="font-semibold text-white">
                    {item.value}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getProgressColor(
                      item.value
                    )}`}
                    style={{
                      width: `${item.value}%`,
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