import { useState, useEffect } from "react";
import EngineeringScoreCard from "./EngineeringScoreCard";
import QuickActions from "./WorkspaceActions";
import RepositoryMetricsGrid from "./RepositoryMetricsGrid";
import RepositoryOverviewSkeleton from "./RepositoryOverviewSkeleton";

export default function RepositoryOverview() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <RepositoryOverviewSkeleton />;
  }

  return (
    <div className="space-y-8">
      <EngineeringScoreCard />

      <RepositoryMetricsGrid />

      <QuickActions />
    </div>
  );
}