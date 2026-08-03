import {
  Activity,
  FolderGit2,
  Sparkles,
} from "lucide-react";

import HeroStatCard from "./HeroStatCard";

export default function DashboardHeroStats({
  totalRepositories = 0,
  averageScore = "--",
  recentAnalyses = 0,
}) {
  const getScoreSubtitle = (score) => {
    if (score === "--" || score === null) {
      return "Not analyzed yet";
    }

    if (score >= 90) {
      return "Excellent Repository Health";
    }

    if (score >= 75) {
      return "Healthy Engineering";
    }

    if (score >= 60) {
      return "Good Overall Health";
    }

    if (score >= 40) {
      return "Needs Attention";
    }

    return "Critical Issues";
  };

  const getRepositorySubtitle = () => {
    if (totalRepositories === 0) {
      return "Connect GitHub to begin";
    }

    if (totalRepositories === 1) {
      return "1 repository connected";
    }

    return `${totalRepositories} repositories connected`;
  };

  const getAnalysisSubtitle = () => {
    if (recentAnalyses === 0) {
      return "No analyses completed";
    }

    if (recentAnalyses === 1) {
      return "1 repository analyzed";
    }

    return `${recentAnalyses} analyses completed`;
  };

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
      <HeroStatCard
        label="Repositories"
        value={totalRepositories}
        icon={FolderGit2}
        iconColor="text-blue-400"
        subtitle={getRepositorySubtitle()}
      />

      <HeroStatCard
        label="Engineering Score"
        value={averageScore}
        icon={Activity}
        iconColor="text-emerald-400"
        subtitle={getScoreSubtitle(averageScore)}
      />

      <HeroStatCard
        label="Recent Analyses"
        value={recentAnalyses}
        icon={Sparkles}
        iconColor="text-violet-400"
        subtitle={getAnalysisSubtitle()}
      />
    </div>
  );
}