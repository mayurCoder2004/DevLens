import {
  Activity,
  Bug,
  Rocket,
  Sparkles,
} from "lucide-react";
import OverviewMetricCard from "./OverviewMetricCard";

export default function EngineeringOverview() {
  return (
    <section className="mt-8">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Engineering Health
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Monitor engineering quality across your repositories.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <OverviewMetricCard
          title="Engineering Health"
          value="84%"
          subtitle="Excellent Health"
          trend="+4%"
          icon={Activity}
          iconColor="text-emerald-400"
        />

        <OverviewMetricCard
          title="Technical Debt"
          value="14"
          subtitle="Open Issues"
          trend="-3"
          trendColor="text-red-400"
          icon={Bug}
          iconColor="text-orange-400"
        />

        <OverviewMetricCard
          title="Deployment Ready"
          value="91%"
          subtitle="Production Ready"
          trend="+2%"
          icon={Rocket}
          iconColor="text-sky-400"
        />

        <OverviewMetricCard
          title="AI Reviews"
          value="79"
          subtitle="Generated"
          trend="+12"
          icon={Sparkles}
          iconColor="text-violet-400"
        />
      </div>
    </section>
  );
}