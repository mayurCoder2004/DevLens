import { Sparkles, Activity, BadgeCheck, Lightbulb, Clock3 } from "lucide-react";

export default function EngineeringHealthOverview({ engineeringHealth }) {
  if (!engineeringHealth) return null;

  const {
    engineeringScore,
    status,
    strengths,
    priorityRecommendations,
    analysis,
  } = engineeringHealth;

  const formattedDate = analysis?.generatedAt
    ? new Date(analysis.generatedAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Not Available";

  const scoreLabel =
    engineeringScore >= 90
      ? "Excellent"
      : engineeringScore >= 75
      ? "Good"
      : engineeringScore >= 60
      ? "Fair"
      : "Needs Improvement";

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-yellow-500/10 p-3">
          <Sparkles className="h-6 w-6 text-yellow-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Engineering Health Overview
          </h2>

          <p className="mt-1 text-slate-400">
            High-level summary of your repository's engineering health status.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Score Card */}
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-6 min-h-[180px]">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">
              Engineering Score
            </h3>
            <div className="rounded-xl bg-slate-900/60 p-3">
              <Activity className="h-5 w-5 text-blue-400" />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-5xl font-bold text-blue-400">
              {engineeringScore}%
            </p>
            <p className="mt-3 text-sm text-slate-500">{scoreLabel}</p>
          </div>
        </div>

        {/* Status Card */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 min-h-[180px]">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">Status</h3>
            <Sparkles className="h-5 w-5 text-slate-400" />
          </div>

          <div className="mt-8">
            <p className="text-xl font-bold text-white">{status}</p>
            <p className="mt-3 text-sm text-slate-500">Overall assessment</p>
          </div>
        </div>

        {/* Strengths Count Card */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 min-h-[180px]">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">Strengths</h3>
            <div className="rounded-xl bg-slate-900/60 p-3">
              <BadgeCheck className="h-5 w-5 text-emerald-400" />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-5xl font-bold text-emerald-400">
              {strengths.length}
            </p>
            <p className="mt-3 text-sm text-slate-500">Detected strengths</p>
          </div>
        </div>

        {/* Recommendations Count Card */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 min-h-[180px]">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-400">
              Recommendations
            </h3>
            <div className="rounded-xl bg-slate-900/60 p-3">
              <Lightbulb className="h-5 w-5 text-amber-400" />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-5xl font-bold text-amber-400">
              {priorityRecommendations.length}
            </p>
            <p className="mt-3 text-sm text-slate-500">Priority actions</p>
          </div>
        </div>
      </div>

      {/* Last Analyzed */}
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-3">
        <Clock3 className="h-4 w-4 text-slate-500" />
        <span className="text-sm text-slate-500">Last analyzed:</span>
        <span className="text-sm font-medium text-slate-300">{formattedDate}</span>
      </div>
    </section>
  );
}
