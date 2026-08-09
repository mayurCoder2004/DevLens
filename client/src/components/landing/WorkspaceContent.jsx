import {
  Activity,
  BarChart3,
  GitCommitHorizontal,
  Star,
  GitFork,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMotionVariants, defaultViewport } from "../../utils/motion";

const activity = [35, 55, 78, 62, 90, 70, 95, 75, 88, 60];

const findings = [
  {
    icon: CheckCircle2,
    title: "Docker configuration detected",
    color: "text-green-400",
  },
  {
    icon: ShieldCheck,
    title: "CI/CD pipeline configured",
    color: "text-blue-400",
  },
  {
    icon: AlertTriangle,
    title: "Large AuthService detected",
    color: "text-yellow-400",
  },
];

export default function WorkspaceContent() {
  const { progressBar, previewStagger, staggerItem, CARD_HOVER } =
    useMotionVariants();

  return (
    <main className="flex flex-col bg-slate-900">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-6 sm:py-4">
        {/* Tabs */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none sm:gap-6">
          <span className="flex-shrink-0 text-sm font-medium text-blue-400">
            Overview
          </span>
          <span className="flex-shrink-0 text-sm text-slate-400">Commits</span>
          <span className="flex-shrink-0 text-sm text-slate-400">
            Pull Requests
          </span>
          <span className="flex-shrink-0 text-sm text-slate-400">
            AI Review
          </span>
        </div>

        <div className="ml-4 flex-shrink-0 rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-400 sm:px-3">
          Last Scan • 2 min ago
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:space-y-6 sm:p-6">
        {/* Repository Header Card */}
        <motion.div
          className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6"
          whileHover={CARD_HOVER}
          style={{ willChange: "transform, box-shadow" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-white sm:text-xl">
                mayurpawar / devlens
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                AI Engineering Intelligence Platform
              </p>
            </div>

            <span className="flex-shrink-0 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 sm:text-sm">
              Healthy
            </span>
          </div>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400 sm:mt-5 sm:gap-6">
            <div className="flex items-center gap-2">
              <Star size={16} />
              342 Stars
            </div>
            <div className="flex items-center gap-2">
              <GitFork size={16} />
              58 Forks
            </div>
            <div className="flex items-center gap-2">
              <GitCommitHorizontal size={16} />
              1.2K Commits
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Engineering Score — animated progress bar */}
          <motion.div
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5"
            whileHover={CARD_HOVER}
            style={{ willChange: "transform, box-shadow" }}
          >
            <p className="text-sm text-slate-400">Engineering Score</p>
            <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              91
            </h3>
            <div className="mt-3 h-2 rounded-full bg-slate-800 sm:mt-4">
              <motion.div
                className="h-full rounded-full bg-green-400"
                variants={progressBar}
                custom="91%"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </div>
          </motion.div>

          {/* Deployment Readiness */}
          <motion.div
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5"
            whileHover={CARD_HOVER}
            style={{ willChange: "transform, box-shadow" }}
          >
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-400" />
              <span className="text-xs text-slate-400 sm:text-sm">
                Deployment Readiness
              </span>
            </div>

            <h3 className="mt-2 text-2xl font-bold text-blue-400 sm:text-3xl">
              Ready
            </h3>

            <p className="mt-2 text-xs text-slate-500 sm:mt-3 sm:text-sm">
              CI/CD and Docker configuration verified.
            </p>
          </motion.div>
        </div>

        {/* Activity */}
        <motion.div
          className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6"
          whileHover={CARD_HOVER}
          style={{ willChange: "transform, box-shadow" }}
        >
          <div className="mb-4 flex items-center gap-2 sm:mb-6">
            <Activity size={18} className="text-blue-400" />
            <h3 className="font-semibold text-white">Repository Activity</h3>
          </div>

          <div className="flex h-28 items-end gap-1.5 sm:h-36 sm:gap-2">
            {activity.map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-lg bg-blue-500 opacity-80 transition-opacity duration-200 hover:opacity-100"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </motion.div>

        {/* Findings */}
        <motion.div
          className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6"
          whileHover={CARD_HOVER}
          style={{ willChange: "transform, box-shadow" }}
        >
          <h3 className="mb-4 font-semibold text-white sm:mb-5">
            Recent Findings
          </h3>

          <motion.div
            className="space-y-3 sm:space-y-4"
            variants={previewStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {findings.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="flex items-start gap-3"
                >
                  <Icon
                    size={18}
                    className={`mt-0.5 flex-shrink-0 ${item.color}`}
                  />
                  <span className="text-sm text-slate-300">{item.title}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
