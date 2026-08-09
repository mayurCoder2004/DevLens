import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import EngineeringScoreCard from "./EngineeringScoreCard";
import QuickActions from "./WorkspaceActions";
import RepositoryMetricsGrid from "./RepositoryMetricsGrid";
import RepositoryOverviewSkeleton from "./RepositoryOverviewSkeleton";
import { analyzeRepository } from "../../../services/analysis";

export default function RepositoryOverview() {
  const { repository, refreshRepository } = useOutletContext();

  const [analyzing, setAnalyzing] = useState(false);

  if (!repository) {
    return <RepositoryOverviewSkeleton />;
  }

  const handleAnalyze = async () => {
    setAnalyzing(true);

    toast
      .promise(
        (async () => {
          await analyzeRepository(repository.id);
          await refreshRepository();
        })(),
        {
          loading: "Analyzing repository...",
          success: "Repository analysis completed successfully!",
          error: (err) =>
            err.response?.data?.message ?? "Failed to analyze repository.",
        },
      )
      .finally(() => {
        setAnalyzing(false);
      });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <EngineeringScoreCard
        score={repository.health?.healthScore ?? 0}
        status="Overall Engineering Health"
        analyzing={analyzing}
        onAnalyze={handleAnalyze}
      />

      <RepositoryMetricsGrid repository={repository} />

      <QuickActions
        repository={repository}
        refreshRepository={refreshRepository}
      />
    </div>
  );
}
