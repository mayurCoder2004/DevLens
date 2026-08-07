import {
  ShieldAlert,
  ServerCog,
  Package,
  FileText,
  Files,
  AlertTriangle,
} from "lucide-react";

const getStatus = (score) => {
  if (score === 0)
    return {
      label: "No Risk",
      badge: "bg-slate-700/60 text-slate-400 border border-slate-600/30",
      bar: "bg-slate-500",
    };
  if (score <= 25)
    return {
      label: "Low",
      badge: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
      bar: "bg-emerald-500",
    };
  if (score <= 50)
    return {
      label: "Medium",
      badge: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
      bar: "bg-amber-500",
    };
  if (score <= 75)
    return {
      label: "High",
      badge: "bg-orange-500/15 text-orange-400 border border-orange-500/30",
      bar: "bg-orange-500",
    };
  return {
    label: "Critical",
    badge: "bg-red-500/15 text-red-400 border border-red-500/30",
    bar: "bg-red-500",
  };
};

export default function PullRequestRiskBreakdown({ pullRequestAnalysis }) {
  if (!pullRequestAnalysis) return null;

  const breakdown = pullRequestAnalysis.riskBreakdown || {};

  const breakdownItems = [
    {
      title: "Overall Risk",
      description: "Combined engineering risk for this pull request.",
      value: pullRequestAnalysis.riskScore,
      icon: AlertTriangle,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
    },
    {
      title: "Critical Files",
      description: "Risk from changes to sensitive or critical files.",
      value: breakdown.critical || 0,
      icon: ShieldAlert,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
    {
      title: "Infrastructure",
      description: "Risk from infrastructure and configuration changes.",
      value: breakdown.infrastructure || 0,
      icon: ServerCog,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      title: "Dependencies",
      description: "Risk introduced by dependency updates.",
      value: breakdown.dependency || 0,
      icon: Package,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
    {
      title: "Documentation",
      description: "Risk associated with documentation changes.",
      value: breakdown.documentation || 0,
      icon: FileText,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "File Count",
      description: "Risk based on total number of modified files.",
      value: breakdown.fileCount || 0,
      icon: Files,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-red-500/10 p-2">
          <AlertTriangle className="h-6 w-6 text-red-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">Risk Analysis</h2>
          <p className="mt-1 text-sm text-slate-400">
            Risk contribution per engineering dimension.
          </p>
        </div>
      </div>

      <div className="my-6 border-t border-slate-800" />

      <div className="space-y-5">
        {breakdownItems.map((item) => {
          const Icon = item.icon;
          const status = getStatus(item.value);

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg ${item.iconBg} p-2 shrink-0`}>
                  <Icon className={`h-4 w-4 ${item.iconColor}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-white">{item.title}</span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.badge}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">{item.description}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Score</span>
                  <span className="text-sm font-bold text-white">{item.value}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${status.bar}`}
                    style={{ width: `${item.value}%` }}
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
