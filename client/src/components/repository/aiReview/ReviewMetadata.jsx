import { Brain, GitBranch, Layers3, ListChecks, ShieldCheck } from "lucide-react";

export default function ReviewMetadata({ repository, review }) {
  if (!review) return null;

  const metadata = [
    {
      label: "Repository",
      value: repository?.fullName || repository?.name || "Current repository",
      icon: GitBranch,
    },
    {
      label: "Prompt Version",
      value: "v2",
      icon: Brain,
    },
    {
      label: "Score Dimensions",
      value: Object.keys(review.engineeringScore || {}).length,
      icon: ShieldCheck,
    },
    {
      label: "Review Sections",
      value: [
        review.strengths,
        review.criticalIssues,
        review.actionPlan,
        review.technologyInsights,
        review.architectureSuggestions,
      ].filter((section) => section?.length > 0).length,
      icon: Layers3,
    },
    {
      label: "Action Items",
      value: review.actionPlan?.length ?? 0,
      icon: ListChecks,
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Review Metadata</h2>
        <p className="mt-2 text-slate-400">
          Generated review context and coverage details.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {metadata.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                <Icon className="h-5 w-5 text-violet-400" />
              </div>
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 break-words font-semibold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
