import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-[68px]
        items-center
        justify-between
        border-b
        border-slate-800/80
        bg-[#0B0F19]/90
        px-6
        backdrop-blur-xl
      "
    >
      {/* Left Title / Breadcrumb */}
      <div className="flex flex-col justify-center">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold leading-none">
          Dashboard
        </p>
        <h1 className="mt-1 text-base font-semibold text-white leading-none">
          Overview
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">

        {/* Search Bar Placeholder */}
        <button
          className="
            hidden
            sm:flex
            items-center
            gap-2.5
            h-8.5
            w-[170px]
            lg:w-[210px]
            rounded-lg
            border
            border-slate-800
            bg-slate-900/40
            px-3
            py-1.5
            text-left
            transition-all
            duration-200
            hover:border-slate-700
            hover:bg-slate-900/60
          "
        >
          <Search size={13} className="text-slate-400" />
          <span className="flex-1 text-[11px] text-slate-500 font-medium">Search repositories...</span>
          <kbd className="hidden lg:inline-flex h-4.5 select-none items-center gap-0.5 rounded border border-slate-850 bg-slate-950 px-1.5 font-mono text-[8px] font-semibold text-slate-500">
            ⌘K
          </kbd>
        </button>

        {/* Repository Switcher */}
        <button
          className="
            flex
            items-center
            gap-3
            rounded-lg
            border
            border-slate-800
            bg-slate-900/40
            px-3
            py-1.5
            text-left
            transition-all
            duration-200
            hover:border-slate-700
            hover:bg-slate-900/60
          "
        >
          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold leading-none">
              Current Repository
            </span>
            <span className="mt-0.5 text-xs font-semibold text-white truncate max-w-[110px]">
              devlens
            </span>
          </div>
          <ChevronDown size={13} className="text-slate-400 flex-shrink-0" />
        </button>

        {/* Notifications */}
        <button
          className="
            relative
            flex
            h-8.5
            w-8.5
            items-center
            justify-center
            rounded-lg
            border
            border-slate-800
            bg-slate-900/40
            text-slate-400
            transition-all
            duration-200
            hover:border-slate-700
            hover:bg-slate-900/60
            hover:text-white
          "
        >
          <Bell size={15} />
          {/* Subtle unread indicator dot */}
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-blue-500 ring-2 ring-slate-950" />
        </button>

        {/* User profile */}
        <div
          className="
            flex
            items-center
            gap-2.5
            rounded-lg
            border
            border-slate-800
            bg-slate-900/40
            pl-2
            pr-3
            py-1
          "
        >
          <div
            className="
              flex
              h-7.5
              w-7.5
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-[10px]
              font-bold
              text-white
            "
          >
            MP
          </div>

          <div className="text-left leading-none">
            <p className="text-[11px] font-semibold text-white">
              Mayur Pawar
            </p>
            <div className="mt-0.5 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] text-slate-400 font-medium">
                Connected
              </span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}