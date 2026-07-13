import AttentionCard from "./AttentionCard";

const attentionRepositories = [
  {
    id: 1,
    repository: "ChefMate",
    score: 58,
    severity: "High",
    issue: "High technical debt and missing Dockerfile.",
    link: "/repository/1",
  },
  {
    id: 2,
    repository: "Travel Planner",
    score: 64,
    severity: "Medium",
    issue: "Low test coverage and inconsistent CI workflow.",
    link: "/repository/2",
  },
  {
    id: 3,
    repository: "Expense Tracker",
    score: 71,
    severity: "Low",
    issue: "Deployment configuration needs improvement.",
    link: "/repository/3",
  },
];

export default function AttentionPanel() {
  return (
    <section className="mt-8">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Repositories Needing Attention
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Prioritized repositories that require immediate engineering focus.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {attentionRepositories.map((repo) => (
          <AttentionCard
            key={repo.id}
            repository={repo.repository}
            score={repo.score}
            severity={repo.severity}
            issue={repo.issue}
            link={repo.link}
          />
        ))}
      </div>
    </section>
  );
}