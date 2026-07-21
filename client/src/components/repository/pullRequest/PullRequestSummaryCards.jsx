import {
  ShieldCheck,
  ShieldAlert,
  GitCompareArrows,
  Files,
  ServerCog,
} from "lucide-react";

import SummaryMetricCard from "../common/SummaryMetricCard";

export default function PullRequestSummaryCards({
  pullRequestAnalysis,
}) {
  if (!pullRequestAnalysis) return null;

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white">
          Pull Request Summary
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Overview of repository pull request activity,
          change volume and calculated engineering risk.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <SummaryMetricCard
          title="Risk Score"
          value={pullRequestAnalysis.riskScore}
          subtitle={`${pullRequestAnalysis.riskLevel} Risk`}
          icon={ShieldCheck}
          iconBg="bg-red-500/10"
          iconColor="text-red-400"
        />

        <SummaryMetricCard
          title="Files Changed"
          value={pullRequestAnalysis.totalFiles}
          subtitle="Modified Files"
          icon={Files}
        />

        <SummaryMetricCard
          title="Total Changes"
          value={pullRequestAnalysis.totalChanges}
          subtitle="Lines Changed"
          icon={GitCompareArrows}
          iconBg="bg-violet-500/10"
          iconColor="text-violet-400"
        />

        <SummaryMetricCard
          title="Critical Files"
          value={pullRequestAnalysis.criticalFiles.length}
          subtitle="Sensitive Files"
          icon={ShieldAlert}
          iconBg="bg-orange-500/10"
          iconColor="text-orange-400"
        />

        <SummaryMetricCard
          title="Infrastructure"
          value={
            pullRequestAnalysis.hasConfigurationChanges
              ? 1
              : 0
          }
          subtitle="Infrastructure Changes"
          icon={ServerCog}
          iconBg="bg-cyan-500/10"
          iconColor="text-cyan-400"
        />

        <SummaryMetricCard
          title="Risk Level"
          value={pullRequestAnalysis.riskLevel}
          subtitle="Overall Classification"
          icon={ShieldCheck}
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-400"
        />
      </div>
    </section>
  );
}