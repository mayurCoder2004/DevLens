import { Lightbulb } from "lucide-react";

export default function ArchitectureRecommendations() {
  const recommendations = [
    "Reduce coupling between shared modules.",
    "Split large service files into smaller feature modules.",
    "Introduce feature-based folder organization where appropriate.",
    "Monitor dependency growth to avoid architectural complexity.",
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Recommendations
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Suggested improvements to strengthen your repository architecture.
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4"
          >
            <Lightbulb
              size={20}
              className="mt-0.5 text-yellow-400"
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