import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

import EngineeringScoreCard from "./EngineeringScoreCard";
import QuickActions from "./WorkspaceActions";
import RepositoryMetricsGrid from "./RepositoryMetricsGrid";
import RepositoryOverviewSkeleton from "./RepositoryOverviewSkeleton";

export default function RepositoryOverview() {
  const { repository, refreshRepository } = useOutletContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (repository) {
      setIsLoading(false);
    }
  }, [repository]);

  if (isLoading) {
    return <RepositoryOverviewSkeleton />;
  }

  return (
    <div className="space-y-8">
      <EngineeringScoreCard
        title="Repository Health"
        score={repository.health?.healthScore ?? 0}
        description="Overall engineering health based on repository analysis."
      />

      <RepositoryMetricsGrid repository={repository} />

      <QuickActions
  repository={repository}
  refreshRepository={refreshRepository}
/>
    </div>
  );
}