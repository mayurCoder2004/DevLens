import {
  AlertTriangle,
  BadgeCheck,
  Brain,
  ListChecks,
  Sparkles,
} from "lucide-react";

export default function AIReviewHero({ review }) {
  if (!review) return null;

  const score = review.engineeringScore?.overall ?? "N/A";
  const strengths = review.strengths?.length ?? 0;
  const weaknesses = review.criticalIssues?.length ?? 0;
  const actions = review.actionPlan?.length ?? 0;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-400">
            <Brain className="h-3.5 w-3.5" />
            AI Generated Review
          </div>

          <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl">
            Repository AI Review
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            Consolidated AI assessment of engineering quality, strengths,
            weaknesses, action items, and repository improvement opportunities.
          </p>
        </div>

        <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-5 text-center">
          <p className="text-sm font-medium text-violet-300">Overall Score</p>
          <p className="mt-2 text-4xl font-bold text-white">
            {score}
            {score !== "N/A" && <span className="text-xl text-slate-400">/100</span>}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HeroStat
          icon={BadgeCheck}
          label="Strengths"
          value={strengths}
          tone="bg-emerald-500/10 text-emerald-400"
        />
        <HeroStat
          icon={AlertTriangle}
          label="Weaknesses"
          value={weaknesses}
          tone="bg-amber-500/10 text-amber-400"
        />
        <HeroStat
          icon={ListChecks}
          label="Action Items"
          value={actions}
          tone="bg-blue-500/10 text-blue-400"
        />
        <HeroStat
          icon={Sparkles}
          label="Recommendations"
          value={(review.architectureSuggestions?.length ?? 0) + actions}
          tone="bg-violet-500/10 text-violet-400"
        />
      </div>
    </section>
  );
}

function HeroStat({ icon: Icon, label, value, tone }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
