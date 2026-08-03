import {
  Activity,
  Bug,
  Rocket,
  Sparkles,
} from "lucide-react";

import OverviewMetricCard from "./OverviewMetricCard";

export default function EngineeringOverview({
  overview,
  loading,
}) {
  if (loading || !overview) {
    return (
      <section className="mt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">
            Engineering Health
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Loading engineering insights...
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-40
                animate-pulse
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
              "
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      {/* Section Header */}

      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Engineering Health
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Monitor engineering quality, maintainability,
            deployment readiness, and AI insights across
            all repositories.
          </p>
        </div>

        <div
          className="
            inline-flex
            w-fit
            rounded-full
            border
            border-blue-500/20
            bg-blue-500/10
            px-3
            py-1
            text-xs
            font-medium
            text-blue-400
          "
        >
          Live Overview
        </div>
      </div>

      {/* Metrics */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewMetricCard
          title="Engineering Health"
          value={overview.engineeringHealth.scoreText}
          subtitle={overview.engineeringHealth.status}
          icon={Activity}
          iconColor="text-emerald-400"
        />

        <OverviewMetricCard
          title="Maintainability"
          value={overview.technicalDebt.scoreText}
          subtitle={overview.technicalDebt.status}
          icon={Bug}
          iconColor="text-orange-400"
        />

        <OverviewMetricCard
          title="Deployment Ready"
          value={overview.deployment.scoreText}
          subtitle={overview.deployment.status}
          icon={Rocket}
          iconColor="text-sky-400"
        />

        <OverviewMetricCard
          title="AI Reviews"
          value={overview.aiReviews.countText}
          subtitle={`${overview.analyzedRepositories} repositories analyzed`}
          icon={Sparkles}
          iconColor="text-violet-400"
        />
      </div>
    </section>
  );
}