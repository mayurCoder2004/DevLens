import {
  LayoutDashboard,
  FolderGit2,
  Network,
  Bug,
  Rocket,
  Activity,
  Sparkles,
  LogOut,
} from "lucide-react";

import DevLensLogo from "./DevLensLogo";
import SidebarItem from "./SidebarItem";

const overviewItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    label: "Repositories",
    icon: FolderGit2,
    to: "/repositories",
  },
];

const analysisItems = [
  {
    label: "Architecture",
    icon: Network,
    to: "/architecture",
  },
  {
    label: "Technical Debt",
    icon: Bug,
    to: "/technical-debt",
  },
  {
    label: "Deployment",
    icon: Rocket,
    to: "/deployment",
  },
  {
    label: "Engineering Health",
    icon: Activity,
    to: "/engineering-health",
  },
  {
    label: "AI Review",
    icon: Sparkles,
    to: "/ai-review",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex w-[270px] flex-col border-r border-slate-800/80 bg-slate-950">
      {/* Logo Section - Height matches Topbar (68px) */}
      <div className="flex h-[68px] items-center border-b border-slate-800/80 px-6">
        <DevLensLogo />
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4">
        {/* Overview section */}
        <div>
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Overview
          </p>

          <div className="space-y-0.5">
            {overviewItems.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </div>

        {/* Analysis section */}
        <div className="mt-5">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Analysis
          </p>

          <div className="space-y-0.5">
            {analysisItems.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="border-t border-slate-800/80 p-3">
        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-3.5
            py-2
            text-[13px]
            font-medium
            text-slate-400
            transition-all
            duration-200
            hover:bg-slate-900
            hover:translate-x-0.5
            hover:text-white
          "
        >
          <LogOut size={18} className="text-slate-400" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}