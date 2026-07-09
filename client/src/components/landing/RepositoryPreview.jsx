import {
  BarChart3,
  Brain,
  Circle,
  GitBranch,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
} from "lucide-react";

const metrics = [
  {
    title: "Engineering",
    value: "91",
    trend: "+4%",
    trendIcon: TrendingUp,
    color: "text-green-400",
    icon: ShieldCheck,
  },
  {
    title: "Technical Debt",
    value: "72",
    trend: "-8%",
    trendIcon: TrendingDown,
    color: "text-yellow-400",
    icon: Brain,
  },
  {
    title: "Deployment",
    value: "94",
    trend: "+2%",
    trendIcon: TrendingUp,
    color: "text-blue-400",
    icon: GitBranch,
  },
  {
    title: "Architecture",
    value: "89",
    trend: "+3%",
    trendIcon: TrendingUp,
    color: "text-purple-400",
    icon: BarChart3,
  },
];

const recommendations = [
  "Refactor AuthService into smaller modules",
  "Increase API integration test coverage",
  "Reduce bundle size for faster builds",
];

export default function RepositoryPreview() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40">

      {/* Browser Header */}
      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-950 px-5 py-3">
        <div className="flex items-center gap-2">
          <Circle size={10} className="fill-red-400 text-red-400" />
          <Circle size={10} className="fill-yellow-400 text-yellow-400" />
          <Circle size={10} className="fill-green-400 text-green-400" />
        </div>

        <div className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-400">
          github.com/mayurpawar/devlens
        </div>
      </div>

      {/* Repository Header */}
      <div className="space-y-5 border-b border-slate-700 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              mayurpawar / devlens
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              AI Engineering Intelligence Platform
            </p>
          </div>

          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            Healthy
          </span>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-400">Engineering Score</span>
            <span className="text-2xl font-bold text-white">87</span>
          </div>

          <div className="h-2 rounded-full bg-slate-800">
            <div className="h-full w-[87%] rounded-full bg-blue-500"></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-700 px-6 py-3 text-sm">
        <span className="border-b-2 border-blue-500 pb-2 font-medium text-blue-400">
          Overview
        </span>
        <span className="text-slate-400">Analytics</span>
        <span className="text-slate-400">Architecture</span>
        <span className="text-slate-400">AI Review</span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 p-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const Trend = metric.trendIcon;

          return (
            <div
              key={metric.title}
              className="rounded-xl border border-slate-700 bg-slate-800 p-4 transition-colors hover:border-blue-500/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <Icon size={18} className={metric.color} />

                <div className="flex items-center gap-2">
                  <Trend size={14} className={metric.color} />
                  <span className={`text-xl font-bold ${metric.color}`}>
                    {metric.value}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{metric.title}</p>
                <span className={`text-xs ${metric.color}`}>
                  {metric.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Summary */}
      <div className="border-t border-slate-700 bg-slate-950 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles size={16} className="text-blue-400" />
          <h4 className="text-sm font-semibold text-white">AI Summary</h4>
        </div>

        <p className="text-sm leading-6 text-slate-400">
          Repository demonstrates strong architecture, healthy deployment
          readiness, and moderate technical debt. Priority improvements focus on
          maintainability and automated testing.
        </p>

        <div className="mt-5">
          <h5 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Recommended Actions
          </h5>

          <div className="space-y-2">
            {recommendations.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 size={16} className="text-green-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
