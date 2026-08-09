import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Network,
  Bug,
  Rocket,
  Activity,
  Sparkles,
} from "lucide-react";

export default function RepositoryNavigation({ repositoryId }) {
  const navigationItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      to: `/repository/${repositoryId}`,
      end: true,
    },
    {
      label: "Architecture",
      icon: Network,
      to: `/architecture/${repositoryId}`,
    },
    {
      label: "Technical Debt",
      icon: Bug,
      to: `/technical-debt/${repositoryId}`,
    },
    {
      label: "Deployment",
      icon: Rocket,
      to: `/repositories/${repositoryId}/deployment`,
    },
    {
      label: "Engineering Health",
      icon: Activity,
      to: `/repositories/${repositoryId}/engineering-health`,
    },
    {
      label: "AI Review",
      icon: Sparkles,
      to: `/repositories/${repositoryId}/ai-review`,
    },
  ];

  return (
    <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-2">
      <nav className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `
                inline-flex
                shrink-0
                items-center
                gap-2
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-medium
                transition-all
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
                `
              }
            >
              <Icon size={16} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
