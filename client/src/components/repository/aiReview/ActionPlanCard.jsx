import {
  Rocket,
  Clock3,
  Sparkles,
} from "lucide-react";

export default function ActionPlanCard({
  phase,
  priority,
  estimatedTime,
  title,
  description,
  reason,
}) {
  const priorityStyles = {
    High: {
      badge:
        "bg-red-500/10 text-red-400 border border-red-500/20",
      phase:
        "bg-red-500/10 text-red-300 border border-red-500/20",
    },
    Medium: {
      badge:
        "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
      phase:
        "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20",
    },
    Low: {
      badge:
        "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      phase:
        "bg-blue-500/10 text-blue-300 border border-blue-500/20",
    },
  };

  const style =
    priorityStyles[priority] || priorityStyles.Low;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-slate-700">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-violet-500/10 p-3">
            <Rocket className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${style.phase}`}
              >
                {phase}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
              >
                {priority} Priority
              </span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">
              {title}
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2">
          <Clock3 className="h-4 w-4 text-slate-400" />

          <span className="text-sm text-slate-300">
            {estimatedTime}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-violet-500/20 bg-violet-500/5 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 text-violet-400" />

          <div>
            <p className="text-sm font-medium text-violet-300">
              AI Recommendation
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}