import {
  Boxes,
  Wrench,
  Rocket,
  Activity,
} from "lucide-react";

import MetricCard from "./MetricCard";

export default function RepositoryMetricsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Architecture"
        score={92}
        status="Healthy"
        icon={Boxes}
        color="blue"
      />

      <MetricCard
        title="Technical Debt"
        score={64}
        status="Needs Attention"
        icon={Wrench}
        color="yellow"
      />

      <MetricCard
        title="Deployment"
        score={88}
        status="Ready"
        icon={Rocket}
        color="emerald"
      />

      <MetricCard
        title="Engineering Health"
        score={90}
        status="Excellent"
        icon={Activity}
        color="blue"
      />
    </div>
  );
}