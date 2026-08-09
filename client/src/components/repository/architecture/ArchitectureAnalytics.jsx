import {
  GitBranch,
  Network,
  GitMerge,
  FileCode,
  Award,
  BarChart3,
} from "lucide-react";

import ArchitectureAnalyticsCard from "./ArchitectureAnalyticsCard";

export default function ArchitectureAnalytics({ analytics }) {
  if (!analytics) {
    return null;
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Architecture Analytics
        </h2>

        <p className="mt-2 text-slate-400">
          Engineering intelligence generated from the repository dependency
          graph.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ArchitectureAnalyticsCard
          icon={<GitMerge size={22} />}
          title="Most Imported File"
          value={analytics.mostImportedFile.name}
          subtitle={`${analytics.mostImportedFile.count} imports`}
        />

        <ArchitectureAnalyticsCard
          icon={<Network size={22} />}
          title="Highest Fan-Out"
          value={analytics.highestFanOut.name}
          subtitle={`${analytics.highestFanOut.count} dependencies`}
        />

        <ArchitectureAnalyticsCard
          icon={<GitBranch size={22} />}
          title="Root Modules"
          value={analytics.rootModules}
          subtitle="Entry Points"
        />

        <ArchitectureAnalyticsCard
          icon={<FileCode size={22} />}
          title="Leaf Modules"
          value={analytics.leafModules}
          subtitle="Terminal Modules"
        />

        <ArchitectureAnalyticsCard
          icon={<BarChart3 size={22} />}
          title="Average Dependencies"
          value={analytics.averageDependencies}
          subtitle="Per Module"
        />

        <ArchitectureAnalyticsCard
          icon={<Award size={22} />}
          title="Architecture Grade"
          value={analytics.architectureGrade}
          subtitle="Overall Quality"
        />
      </div>
    </section>
  );
}
