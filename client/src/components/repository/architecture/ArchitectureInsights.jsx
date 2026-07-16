import { CheckCircle2 } from "lucide-react";

export default function ArchitectureInsights() {
  const insights = [
    "Project follows a modular folder structure.",
    "Business logic is separated from presentation.",
    "No circular dependencies detected.",
    "Repository has a manageable complexity score.",
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Architecture Insights
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Highlights identified from the repository structure.
        </p>
      </div>

      <div className="space-y-4">
        {insights.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4"
          >
            <CheckCircle2
              className="mt-0.5 text-emerald-400"
              size={20}
            />

            <p className="text-sm text-slate-300">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}