import {
  LayoutDashboard,
  Network,
  Bug,
  Rocket,
  HeartPulse,
  Sparkles,
  FolderGit2,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";

const navigationItems = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    active: true,
  },
  {
    icon: Network,
    label: "Architecture",
  },
  {
    icon: Bug,
    label: "Technical Debt",
  },
  {
    icon: Rocket,
    label: "Deployment",
  },
  {
    icon: HeartPulse,
    label: "Engineering Health",
  },
  {
    icon: Sparkles,
    label: "AI Review",
  },
];

export default function WorkspaceSidebar() {
  return (
    <aside className="flex flex-col border-r border-slate-800 bg-slate-950/40">

      {/* Repository Header */}
      <div className="border-b border-slate-800 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
            <FolderGit2 size={22} className="text-blue-400" />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              DevLens
            </h3>
            <p className="text-xs text-slate-500">
              Engineering Workspace
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Navigation
        </p>

        <div className="space-y-0.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.label}
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  transition-colors
                  duration-200

                  ${
                    item.active
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
                  }
                `}
                whileHover={
                  !item.active
                    ? {
                        x: 2,
                        transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] },
                      }
                    : undefined
                }
              >
                <motion.span
                  whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
                  className="inline-flex"
                >
                  <Icon size={18} />
                </motion.span>

                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <motion.button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-sm
            text-slate-400
            transition-colors
            duration-200
            hover:bg-slate-800/70
            hover:text-slate-200
          "
          whileHover={{
            x: 2,
            transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] },
          }}
        >
          <motion.span
            whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
            className="inline-flex"
          >
            <Settings size={18} />
          </motion.span>

          <span>Settings</span>
        </motion.button>
      </div>
    </aside>
  );
}