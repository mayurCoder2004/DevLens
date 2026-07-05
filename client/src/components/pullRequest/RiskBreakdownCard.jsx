import {
  Boxes,
  FileText,
  FolderGit2,
  Package,
  ServerCog,
  TriangleAlert,
} from "lucide-react";

const items = [
  {
    label: "Critical Files",
    key: "critical",
    icon: TriangleAlert,
    color: "bg-red-500",
    text: "text-red-700",
    bg: "bg-red-50",
  },
  {
    label: "Infrastructure",
    key: "infrastructure",
    icon: ServerCog,
    color: "bg-orange-500",
    text: "text-orange-700",
    bg: "bg-orange-50",
  },
  {
    label: "Dependencies",
    key: "dependency",
    icon: Package,
    color: "bg-blue-500",
    text: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    label: "File Count",
    key: "fileCount",
    icon: FolderGit2,
    color: "bg-violet-500",
    text: "text-violet-700",
    bg: "bg-violet-50",
  },
  {
    label: "Documentation",
    key: "documentation",
    icon: FileText,
    color: "bg-emerald-500",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
  },
];

const RiskBreakdownCard = ({ breakdown = {} }) => {
  const values = items.map((item) => Number(breakdown[item.key]) || 0);
  const maxValue = Math.max(...values, 1);
  const topKey = items[values.indexOf(Math.max(...values))]?.key;

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">
            Risk Breakdown
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Weighted signals contributing to the overall pull request score.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          <Boxes className="h-3.5 w-3.5" aria-hidden="true" />
          {values.reduce((total, value) => total + value, 0)} total points
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-5">
        {items.map((item) => {
          const value = Number(breakdown[item.key]) || 0;
          const percentage = Math.round((value / maxValue) * 100);
          const Icon = item.icon;
          const isTopContributor = item.key === topKey && value > 0;

          return (
            <article
              key={item.key}
              className={`rounded-lg border p-4 transition hover:-translate-y-0.5 hover:shadow-sm ${
                isTopContributor
                  ? "border-slate-300 bg-slate-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`rounded-lg ${item.bg} p-2 ${item.text}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>

                {isTopContributor && (
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Top
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm font-medium text-slate-600">
                {item.label}
              </p>
              <p className={`mt-1 text-2xl font-bold ${item.text}`}>
                {value > 0 ? `+${value}` : value}
              </p>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                  aria-hidden="true"
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RiskBreakdownCard;
