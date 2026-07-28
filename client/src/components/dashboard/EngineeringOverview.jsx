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
      <section className="mt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            Engineering Health
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Loading dashboard overview...
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-2xl bg-slate-900 border border-slate-800"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Engineering Health
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Monitor engineering quality across your repositories.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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