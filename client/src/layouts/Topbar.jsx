import { ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowProfileMenu(false);
    navigate("/", { replace: true });
  };

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
        bg-[#0B0F19]/95
        px-4
        sm:px-6
        backdrop-blur-xl
      "
    >
      {/* Left - Add padding for mobile menu button */}
      <div className="flex flex-col justify-center lg:pl-0 pl-12">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Dashboard
        </p>

        <h1 className="mt-1 text-sm sm:text-base font-semibold text-white truncate max-w-[200px] sm:max-w-none">
          Account Overview
        </h1>
      </div>

      {/* Right */}
      <div className="relative">
        <button
          onClick={() => setShowProfileMenu((prev) => !prev)}
          className="
            flex
            items-center
            gap-2
            sm:gap-3
            rounded-lg
            border
            border-slate-800
            bg-slate-900/40
            py-1.5
            pl-2
            pr-2
            sm:pr-3
            transition-all
            duration-200
            hover:border-slate-700
            hover:bg-slate-900/60
          "
        >
          {/* Avatar */}
          <div
            className="
              flex
              h-7
              w-7
              sm:h-8
              sm:w-8
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-xs
              font-bold
              text-white
            "
          >
            MP
          </div>

          {/* User */}
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-white">Mayur Pawar</p>

            <p className="text-[11px] text-slate-400">Connected</p>
          </div>

          <ChevronDown
            size={16}
            className={`hidden text-slate-400 transition-transform sm:block ${
              showProfileMenu ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {showProfileMenu && (
          <div
            className="
              absolute
              right-0
              top-full
              mt-2
              w-52
              overflow-hidden
              rounded-xl
              border
              border-slate-800
              bg-slate-900
              shadow-2xl
            "
          >
            <button
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                gap-3
                px-4
                py-3
                text-sm
                text-red-400
                transition-colors
                hover:bg-red-500/10
              "
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
