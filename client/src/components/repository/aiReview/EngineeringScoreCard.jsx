import { ArrowUpRight } from "lucide-react";

export default function EngineeringScoreCard({ title, score, description }) {
  const getScoreColor = (score) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 75) return "text-yellow-400";
    return "text-red-400";
  };

  const getProgressColor = (score) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800/70">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-300">{title}</h3>

        <ArrowUpRight className="h-4 w-4 text-slate-500" />
      </div>

      <div className="mt-4 flex items-end gap-2">
        <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>

        <span className="pb-1 text-sm text-slate-500">/100</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${getProgressColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
