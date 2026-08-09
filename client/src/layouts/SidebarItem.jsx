import { NavLink } from "react-router-dom";

export default function SidebarItem({ to, icon: Icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `
          group
          flex
          items-center
          gap-3
          rounded-lg
          px-3.5
          py-2.5
          text-[13px]
          font-medium
          transition-all
          duration-200
          ease-out
          hover:translate-x-0.5
          ${
            isActive
              ? "border-l-2 border-blue-500 bg-blue-500/10 pl-[13px] text-white shadow-[0_0_14px_-2px_rgba(59,130,246,0.2)]"
              : "border-l-2 border-transparent pl-[13px] text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-white"
          }
        `
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={18}
            className={`transition-colors duration-200 ${
              isActive
                ? "text-blue-400"
                : "text-slate-400 group-hover:text-white"
            }`}
          />
          <span className="truncate">{label}</span>
        </>
      )}
    </NavLink>
  );
}
