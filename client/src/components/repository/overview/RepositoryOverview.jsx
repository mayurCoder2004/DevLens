import EngineeringScoreCard from "./EngineeringScoreCard";
import QuickActions from "./WorkspaceActions";
import RepositoryMetricsGrid from "./RepositoryMetricsGrid";

export default function RepositoryOverview() {
  return (
    <div className="space-y-8">
      <EngineeringScoreCard />

      <RepositoryMetricsGrid />

      <QuickActions />
    </div>
  );
}