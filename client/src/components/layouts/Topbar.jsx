import { Bell, ChevronDown, Search } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-[68px]
        flex-shrink-0
        items-center
        justify-between
        border-b
        border-slate-800/80
        bg-[#0B0F19]/95
        px-6
        backdrop-blur-xl
      "
    >
      {/* Left - Title */}
      <div className="flex flex-col justify-center">
        <p className="text-[10px] font-semibold uppercase leading-none tracking-wider text-slate-500">
          Dashboard
        </p>
        <h1 className="mt-1 text-base font-semibold leading-none text-white">
          Account Overview
        </h1>
      </div>

      {/* Right - Search, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Search Repositories */}
        <button
          className="
            hidden
            h-9
            w-[200px]
            items-center
            gap-2.5
            rounded-lg
            border
            border-slate-800
            bg-slate-900/40
            px-3
            py-2
            text-left
            transition-all
            duration-200
            hover:border-slate-700
            hover:bg-slate-900/60
            sm:flex
            lg:w-[240px]
          "
          aria-label="Search repositories"
        >
          <Search size={14} className="text-slate-400" />
          <span className="flex-1 text-xs font-medium text-slate-500">
            Search repositories...
          </span>
          <kbd
            className="
              hidden
              h-5
              select-none
              items-center
              gap-0.5
              rounded
              border
              border-slate-800
              bg-slate-950
              px-1.5
              font-mono
              text-[9px]
              font-semibold
              text-slate-500
              lg:inline-flex
            "
          >
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          className="
            relative
            flex
            h-9
            w-9
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
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/40
            focus:ring-offset-2
            focus:ring-offset-[#0B0F19]
          "
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-500 ring-2 ring-slate-950" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="
              flex
              items-center
              gap-2.5
              rounded-lg
              border
              border-slate-800
              bg-slate-900/40
              py-1.5
              pl-2
              pr-3
              transition-all
              duration-200
              hover:border-slate-700
              hover:bg-slate-900/60
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500/40
              focus:ring-offset-2
              focus:ring-offset-[#0B0F19]
            "
            aria-label="User menu"
            aria-expanded={showProfileMenu}
          >
            {/* Avatar */}
            <div
              className="
                flex
                h-7
                w-7
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

            {/* User Info */}
            <div className="hidden text-left leading-none sm:block">
              <p className="text-xs font-semibold text-white">Mayur Pawar</p>
              <div className="mt-1 flex items-center gap-1">
                <span className="h-1 w-1 animate-pulse rounded-full bg-green-500" />
                <span className="text-[9px] font-medium text-slate-400">
                  Connected
                </span>
              </div>
            </div>

            {/* Dropdown Arrow */}
            <ChevronDown
              size={14}
              className="hidden text-slate-400 sm:block"
            />
          </button>

          {/* Dropdown Menu (Placeholder) */}
          {showProfileMenu && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-2
                w-56
                rounded-lg
                border
                border-slate-800
                bg-slate-900
                py-2
                shadow-xl
              "
            >
              <button className="w-full px-4 py-2 text-left text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
                Settings
              </button>
              <div className="my-1 border-t border-slate-800/50" />
              <button className="w-full px-4 py-2 text-left text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}