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
    if (score === "--" || score === null) return "Not analyzed yet";
    if (score >= 80) return "Excellent Health";
    if (score >= 60) return "Good Health";
    if (score >= 40) return "Needs Attention";
    return "Critical Issues";
  };

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
      <HeroStatCard
        label="Repositories"
        value={totalRepositories}
        icon={FolderGit2}
        subtitle={totalRepositories > 0 ? `+${Math.min(totalRepositories, 3)} synced this week` : "No repos yet"}
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
        subtitle={recentAnalyses > 0 ? "Last sync 2 hours ago" : "No analyses yet"}
      />
    </div>
  );
}