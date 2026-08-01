import { useOutletContext } from "react-router-dom";
import { useState } from "react";

import EngineeringScoreCard from "./EngineeringScoreCard";
import QuickActions from "./WorkspaceActions";
import RepositoryMetricsGrid from "./RepositoryMetricsGrid";
import RepositoryOverviewSkeleton from "./RepositoryOverviewSkeleton";
import { analyzeRepository } from "../../../services/analysis";

export default function RepositoryOverview() {
  const {
    repository,
    refreshRepository,
  } = useOutletContext();

  const [analyzing, setAnalyzing] =
    useState(false);

  if (!repository) {
    return <RepositoryOverviewSkeleton />;
  }

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);

      await analyzeRepository(repository.id);

      await refreshRepository();

      alert(
        "Repository analysis completed successfully."
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ??
          "Failed to analyze repository."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <EngineeringScoreCard
        score={repository.health?.healthScore ?? 0}
        status="Overall Engineering Health"
        analyzing={analyzing}
        onAnalyze={handleAnalyze}
      />

      <RepositoryMetricsGrid
        repository={repository}
      />

      <QuickActions
        repository={repository}
        refreshRepository={
          refreshRepository
        }
      />
    </div>
  );
}