import { NavLink } from "react-router-dom";

export default function SidebarItem({
  to,
  icon: Icon,
  label,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
          group
          flex
          items-center
          gap-3
          rounded-lg
          px-3.5
          py-2
          text-[13px]
          font-medium
          transition-all
          duration-200
          ease-out
          hover:translate-x-0.5
          ${
            isActive
              ? "bg-blue-500/10 text-white border border-blue-500/20 shadow-[0_0_14px_-2px_rgba(59,130,246,0.22)]"
              : "text-slate-400 border border-transparent hover:bg-slate-900 hover:text-white"
          }
        `
      }
    >
      <Icon
        size={18}
        className="transition-colors duration-200 text-slate-400 group-hover:text-white"
      />

      <span className="truncate">{label}</span>
    </NavLink>
  );
}