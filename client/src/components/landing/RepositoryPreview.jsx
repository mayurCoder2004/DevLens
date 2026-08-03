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
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useMotionVariants } from "../../utils/motion";

const metrics = [
  {
    title: "Engineering",
    value: "91",
    trend: "+4%",
    trendIcon: TrendingUp,
    color: "text-green-400",
    icon: ShieldCheck,
    barColor: "bg-green-400",
    barWidth: "91%",
  },
  {
    title: "Technical Debt",
    value: "72",
    trend: "-8%",
    trendIcon: TrendingDown,
    color: "text-yellow-400",
    icon: Brain,
    barColor: "bg-yellow-400",
    barWidth: "72%",
  },
  {
    title: "Deployment",
    value: "94",
    trend: "+2%",
    trendIcon: TrendingUp,
    color: "text-blue-400",
    icon: GitBranch,
    barColor: "bg-blue-400",
    barWidth: "94%",
  },
  {
    title: "Architecture",
    value: "89",
    trend: "+3%",
    trendIcon: TrendingUp,
    color: "text-purple-400",
    icon: BarChart3,
    barColor: "bg-purple-400",
    barWidth: "89%",
  },
];

const recommendations = [
  "Refactor AuthService into smaller modules",
  "Increase API integration test coverage",
  "Reduce bundle size for faster builds",
];

export default function RepositoryPreview() {
  const { previewStagger, staggerItem, progressBar, CARD_HOVER } =
    useMotionVariants();

  // Counter animation for engineering score
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, 87, {
      duration: 2,
      ease: "easeOut",
    });

    return controls.stop;
  }, [count]);

  return (
    <motion.div
      className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl lg:max-w-2xl"
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      style={{
        boxShadow: "0 0 60px -15px rgba(59, 130, 246, 0.3), 0 20px 60px -15px rgba(0, 0, 0, 0.5)",
      }}
    >

      {/* Browser Header */}
      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-950 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <Circle size={10} className="fill-red-400 text-red-400" />
          <Circle size={10} className="fill-yellow-400 text-yellow-400" />
          <Circle size={10} className="fill-green-400 text-green-400" />
        </div>

        <div className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-400 truncate max-w-[160px] sm:max-w-none">
          github.com/mayurpawar/devlens
        </div>
      </div>

      {/* Repository Header */}
      <div className="space-y-4 border-b border-slate-700 p-4 sm:space-y-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white sm:text-lg">
              mayurpawar / devlens
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              AI Engineering Intelligence Platform
            </p>
          </div>

          <span className="flex-shrink-0 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            Healthy
          </span>
        </div>

        {/* Engineering Score progress bar — animates on reveal */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-400">Engineering Score</span>
            <motion.span className="text-xl font-bold text-white sm:text-2xl">
              {rounded}
            </motion.span>
          </div>

          <div className="h-2 rounded-full bg-slate-800">
            <motion.div
              className="h-full rounded-full bg-blue-500"
              variants={progressBar}
              custom="87%"
              initial="hidden"
              animate="visible"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 overflow-x-auto border-b border-slate-700 px-4 py-3 text-sm scrollbar-none sm:gap-6 sm:px-6">
        <span className="flex-shrink-0 border-b-2 border-blue-500 pb-2 font-medium text-blue-400">
          Overview
        </span>
        <span className="flex-shrink-0 text-slate-400">Analytics</span>
        <span className="flex-shrink-0 text-slate-400">Architecture</span>
        <span className="flex-shrink-0 text-slate-400">AI Review</span>
      </div>

      {/* Metrics — staggered reveal on mount */}
      <motion.div
        className="grid grid-cols-2 gap-3 p-4 sm:gap-4 sm:p-6"
        variants={previewStagger}
        initial="hidden"
        animate="visible"
      >
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const Trend = metric.trendIcon;

          return (
            <motion.div
              key={metric.title}
              variants={staggerItem}
              whileHover={CARD_HOVER}
              className="group rounded-xl border border-slate-700 bg-slate-800 p-3 sm:p-4"
              style={{ willChange: "transform, box-shadow" }}
            >
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
                >
                  <Icon size={18} className={metric.color} />
                </motion.div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <Trend size={14} className={metric.color} />
                  <span className={`text-lg font-bold sm:text-xl ${metric.color}`}>
                    {metric.value}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400 sm:text-sm">{metric.title}</p>
                <span className={`text-xs ${metric.color}`}>
                  {metric.trend}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* AI Summary */}
      <div className="border-t border-slate-700 bg-slate-950 p-4 sm:p-6">
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

          {/* Recommendations — stagger in */}
          <motion.div
            className="space-y-2"
            variants={previewStagger}
            initial="hidden"
            animate="visible"
          >
            {recommendations.map((item) => (
              <motion.div
                key={item}
                variants={staggerItem}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-green-400" />
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
