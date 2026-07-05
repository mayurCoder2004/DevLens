import MetricCard from "./MetricCard";

const ScoreBreakdown = ({ scores }) => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-slate-950">
        Engineering Score Breakdown
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          title="Repository Health"
          value={scores.repositoryHealth}
        />

        <MetricCard
          title="Architecture"
          value={scores.architecture}
        />

        <MetricCard
          title="Technical Debt"
          value={scores.technicalDebt}
        />

        <MetricCard
          title="Deployment"
          value={scores.deployment}
        />

        <MetricCard
          title="Pull Request"
          value={scores.pullRequest}
        />
      </div>
    </div>
  );
};

export default ScoreBreakdown;
