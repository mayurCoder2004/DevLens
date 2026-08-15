import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Minus,
  TrendingUp,
} from "lucide-react";

const METRICS = {
  engineeringScore: {
    label: "Engineering",
    description: "Overall engineering quality",
    color: "#60a5fa",
  },

  technicalDebtScore: {
    label: "Technical Debt",
    description: "Technical debt quality score",
    color: "#a78bfa",
  },

  architectureScore: {
    label: "Architecture",
    description: "Architecture health score",
    color: "#34d399",
  },

  deploymentScore: {
    label: "Deployment",
    description: "Deployment readiness score",
    color: "#fbbf24",
  },

  maintainabilityScore: {
    label: "Maintainability",
    description: "Code maintainability score",
    color: "#22d3ee",
  },

  prRiskScore: {
    label: "PR Risk",
    description: "Pull request risk score",
    color: "#fb7185",
    inverse: true,
  },
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatTooltipDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTrend(current, previous) {
  if (previous === null || previous === undefined) {
    return "neutral";
  }

  if (current > previous) {
    return "up";
  }

  if (current < previous) {
    return "down";
  }

  return "neutral";
}

function TrendIndicator({ current, previous, inverse = false }) {
  const trend = getTrend(current, previous);

  if (trend === "neutral") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
        <Minus className="h-3.5 w-3.5" />
        No change
      </span>
    );
  }

  const improved = inverse ? trend === "down" : trend === "up";

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs ${
        improved ? "text-emerald-400" : "text-rose-400"
      }`}
    >
      {trend === "up" ? (
        <ArrowUp className="h-3.5 w-3.5" />
      ) : (
        <ArrowDown className="h-3.5 w-3.5" />
      )}

      {Math.abs(current - previous)} pts
    </span>
  );
}

function MetricCard({ snapshot, previous, metricKey }) {
  const metric = METRICS[metricKey];

  const current = snapshot?.[metricKey] ?? 0;
  const previousValue = previous?.[metricKey] ?? null;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-slate-400">
          {metric.label}
        </span>

        <TrendIndicator
          current={current}
          previous={previousValue}
          inverse={metric.inverse}
        />
      </div>

      <div className="mt-3 flex items-end justify-between">
        <span className="text-2xl font-semibold text-white">
          {current}
        </span>

        <span className="text-xs text-slate-500">
          / 100
        </span>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const snapshot = payload[0]?.payload;

  if (!snapshot) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 shadow-xl">
      <p className="text-xs font-medium text-slate-400">
        {formatTooltipDate(snapshot.createdAt)}
      </p>

      <p className="mt-1 text-lg font-semibold text-white">
        {snapshot.value}

        <span className="ml-1 text-xs font-normal text-slate-500">
          / 100
        </span>
      </p>
    </div>
  );
}

export default function EngineeringHealthTrend({
  snapshots = [],
}) {
  const [selectedMetric, setSelectedMetric] =
    useState("engineeringScore");

  const sortedSnapshots = useMemo(() => {
    return [...snapshots].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime(),
    );
  }, [snapshots]);

  const latest = sortedSnapshots.at(-1);
  const previous = sortedSnapshots.at(-2);

  const chartData = useMemo(() => {
    return sortedSnapshots.map((snapshot) => ({
      ...snapshot,
      value: snapshot[selectedMetric] ?? 0,
    }));
  }, [sortedSnapshots, selectedMetric]);

  const selectedMetricConfig = METRICS[selectedMetric];

  if (!sortedSnapshots.length) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
            <Activity className="h-5 w-5 text-blue-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Engineering Health Trend
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Historical engineering health will appear here
              after repository analyses are recorded.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Engineering Health Trend
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Track how repository quality changes over time.
            </p>
          </div>
        </div>

        <span className="text-sm text-slate-500">
          {sortedSnapshots.length} snapshot
          {sortedSnapshots.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Metric selector */}
      <div className="mt-6 flex flex-wrap gap-2">
        {Object.entries(METRICS).map(([key, metric]) => {
          const active = selectedMetric === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedMetric(key)}
              className={`rounded-lg border px-3 py-2 text-sm transition ${
                active
                  ? "border-blue-500/40 bg-blue-500/10 text-white"
                  : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {metric.label}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-white">
            {selectedMetricConfig.label}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {selectedMetricConfig.description}
          </p>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
              />

              <XAxis
                dataKey="createdAt"
                tickFormatter={formatDate}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#334155",
                }}
                tickLine={false}
              />

              <YAxis
                domain={[0, 100]}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#475569",
                  strokeDasharray: "4 4",
                }}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke={selectedMetricConfig.color}
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: selectedMetricConfig.color,
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest snapshot cards */}
      {latest && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.keys(METRICS).map((metricKey) => (
            <MetricCard
              key={metricKey}
              snapshot={latest}
              previous={previous}
              metricKey={metricKey}
            />
          ))}
        </div>
      )}
    </section>
  );
}