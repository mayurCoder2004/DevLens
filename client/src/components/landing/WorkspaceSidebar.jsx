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
            <FolderGit2
              size={22}
              className="text-blue-400"
            />
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

        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    item.active
                      ? "bg-blue-500/10 text-blue-400 shadow-inner"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Icon size={18} />

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-4">
        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-3
            text-sm
            text-slate-400
            transition-all
            duration-200
            hover:bg-slate-800
            hover:text-white
          "
        >
          <Settings size={18} />

          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}