import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

export default function ArchitectureInsights({ insights }) {
  if (!insights) {
    return null;
  }

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={20} className="text-emerald-400" />;

      case "warning":
        return <AlertTriangle size={20} className="text-amber-400" />;

      default:
        return <Info size={20} className="text-blue-400" />;
    }
  };

  const getBorder = (type) => {
    switch (type) {
      case "success":
        return "border-emerald-500/30";

      case "warning":
        return "border-amber-500/30";

      default:
        return "border-blue-500/30";
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold text-white">
        Architecture Insights
      </h2>

      <p className="mt-2 text-slate-400">
        Engineering observations generated from repository analysis.
      </p>

      <div className="mt-6 space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`rounded-xl border ${getBorder(
              insight.type,
            )} bg-slate-950 p-4`}
          >
            <div className="flex items-start gap-3">
              {getIcon(insight.type)}

              <div>
                <h3 className="font-semibold text-white">{insight.title}</h3>

                <p className="mt-1 text-sm leading-6 text-slate-400">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
