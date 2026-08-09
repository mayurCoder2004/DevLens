import { Building2, Sparkles, CheckCircle2 } from "lucide-react";
import MarkdownText from "./MarkdownText";

export default function ArchitectureCard({
  title,
  priority,
  recommendation,
  benefits,
}) {
  const priorityStyles = {
    High: {
      badge: "bg-red-500/10 text-red-400 border border-red-500/20",
    },
    Medium: {
      badge: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    },
    Low: {
      badge: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    },
  };

  const style = priorityStyles[priority] || priorityStyles.Low;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-800/60">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-violet-500/10 p-3">
            <Building2 className="h-6 w-6 text-violet-400" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
            >
              {priority} Priority
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-violet-500/20 bg-violet-500/5 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 text-violet-400" />

          <div>
            <p className="text-sm font-medium text-violet-300">
              AI Recommendation
            </p>

            <MarkdownText className="mt-2">{recommendation}</MarkdownText>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-white">Expected Benefits</h4>

        <div className="mt-4 space-y-3">
          {(benefits || []).map((benefit) => (
            <div key={benefit} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />

              <p className="text-sm leading-6 text-slate-400">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
