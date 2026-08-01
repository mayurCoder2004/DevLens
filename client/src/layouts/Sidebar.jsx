import {
  LayoutDashboard,
  FolderGit2,
  X,
} from "lucide-react";

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

export default function Sidebar({ onClose }) {
  return (
    <aside className="flex h-screen w-[270px] flex-shrink-0 flex-col border-r border-slate-800/80 bg-slate-950">
      {/* Logo */}
      <div className="flex h-[68px] flex-shrink-0 items-center justify-between border-b border-slate-800/80 px-5">
        <div className="flex items-center gap-3">
          <img
            src="/favicon.png"
            alt="DevLens"
            className="h-9 w-9 object-contain"
          />

          <div className="leading-none">
            <h1 className="text-[20px] font-bold text-white">
              DevLens
            </h1>

            <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-slate-500">
              Engineering Intelligence
            </p>
          </div>
        </div>

        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3.5 py-6">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Overview
        </p>

        <div className="space-y-1">
          {overviewItems.map((item) => (
            <SidebarItem
              key={item.label}
              {...item}
              onClick={onClose}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}