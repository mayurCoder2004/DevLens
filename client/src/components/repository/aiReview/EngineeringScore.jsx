import EngineeringScoreCard from "./EngineeringScoreCard";

const engineeringScores = [
  {
    title: "Maintainability",
    score: 92,
    description:
      "Repository structure and code organization are easy to maintain.",
  },
  {
    title: "Security",
    score: 84,
    description:
      "Security practices are good, with opportunities for further hardening.",
  },
  {
    title: "Architecture",
    score: 91,
    description:
      "Project follows a scalable and modular architecture.",
  },
  {
    title: "Testing",
    score: 76,
    description:
      "Testing exists but coverage can be significantly improved.",
  },
  {
    title: "Documentation",
    score: 82,
    description:
      "Documentation is sufficient but can be expanded for contributors.",
  },
  {
    title: "Scalability",
    score: 88,
    description:
      "Current design supports growth with a few optimization opportunities.",
  },
];

export default function EngineeringScore() {
  const overallScore = 89;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Engineering Score
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            AI-generated evaluation across the key engineering
            dimensions of the repository.
          </p>
        </div>

        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-6 py-4 text-center">
          <p className="text-sm text-violet-300">
            Overall Score
          </p>

          <h3 className="mt-1 text-4xl font-bold text-white">
            {overallScore}
            <span className="text-xl text-slate-400">
              /100
            </span>
          </h3>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {engineeringScores.map((metric) => (
          <EngineeringScoreCard
            key={metric.title}
            {...metric}
          />
        ))}
      </div>
    </section>
  );
}