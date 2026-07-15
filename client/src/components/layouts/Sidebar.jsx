import {
  LayoutDashboard,
  FolderGit2,
  Settings,
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

const accountItems = [
  {
    label: "Settings",
    icon: Settings,
    to: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[270px] flex-shrink-0 flex-col border-r border-slate-800/80 bg-slate-950">
      {/* Logo */}

      <div className="flex h-[68px] flex-shrink-0 items-center border-b border-slate-800/80 px-6">
        <DevLensLogo />
      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto px-3.5 py-6">
        {/* Overview */}

        <div>
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Overview
          </p>

          <div className="space-y-1">
            {overviewItems.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </div>

        {/* Section Separator */}

        <div className="my-6 border-t border-slate-800/50" />

        {/* Account */}

        <div>
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Account
          </p>

          <div className="space-y-1">
            {accountItems.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Logout */}

      <div className="flex-shrink-0 border-t border-slate-800/80 p-3">
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
            hover:translate-x-0.5
            hover:bg-slate-900
            hover:text-white
          "
          aria-label="Logout"
        >
          <LogOut
            size={18}
            className="text-slate-400"
          />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}