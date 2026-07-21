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

  const { risk, summary, classification } =
    pullRequestAnalysis;

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
          value={risk.score}
          subtitle={`${risk.level} Risk`}
          icon={ShieldCheck}
          iconBg="bg-red-500/10"
          iconColor="text-red-400"
        />

        <SummaryMetricCard
          title="Files Changed"
          value={summary.totalFiles}
          subtitle="Modified Files"
          icon={Files}
        />

        <SummaryMetricCard
          title="Total Changes"
          value={summary.totalChanges}
          subtitle="Lines Changed"
          icon={GitCompareArrows}
          iconBg="bg-violet-500/10"
          iconColor="text-violet-400"
        />

        <SummaryMetricCard
          title="Critical Files"
          value={classification.summary.criticalCount}
          subtitle="Sensitive Files"
          icon={ShieldAlert}
          iconBg="bg-orange-500/10"
          iconColor="text-orange-400"
        />

        <SummaryMetricCard
          title="Infrastructure"
          value={
            classification.summary.infrastructureCount
          }
          subtitle="Infrastructure Files"
          icon={ServerCog}
          iconBg="bg-cyan-500/10"
          iconColor="text-cyan-400"
        />

        <SummaryMetricCard
          title="Risk Level"
          value={risk.level}
          subtitle="Overall Classification"
          icon={ShieldCheck}
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-400"
        />
      </div>
    </section>
  );
}