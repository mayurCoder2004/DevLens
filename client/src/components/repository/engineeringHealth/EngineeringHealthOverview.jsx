import {
  Activity,
  BadgeCheck,
  Clock3,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

export default function EngineeringHealthOverview({
  engineeringHealth,
}) {
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

  const overviewItems = [
    {
      title: "Overall Status",
      value: status,
      icon: ShieldCheck,
      color: "text-blue-400",
    },
    {
      title: "Engineering Score",
      value: `${engineeringScore}%`,
      icon: Activity,
      color: "text-emerald-400",
    },
    {
      title: "Strengths",
      value: strengths.length,
      icon: BadgeCheck,
      color: "text-violet-400",
    },
    {
      title: "Recommendations",
      value: priorityRecommendations.length,
      icon: Lightbulb,
      color: "text-amber-400",
    },
    {
      title: "Last Analysis",
      value: formattedDate,
      icon: Clock3,
      color: "text-cyan-400",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Engineering Health Overview
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Executive overview of the repository's current
          engineering health.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {overviewItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-950/60 p-6"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-lg bg-slate-800 p-2 ${item.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-sm font-medium text-slate-400">
                  {item.title}
                </h3>
              </div>

              <p className="mt-5 text-2xl font-bold text-white break-words">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}