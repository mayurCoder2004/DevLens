import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MetricCard({
  title,
  score,
  status,
  icon: Icon,
  color = "blue",
  to,
}) {
  const navigate = useNavigate();

  const colors = {
    blue: {
      badge:
        "bg-blue-500/10 text-blue-400 border-blue-500/20",
      icon: "text-blue-400",
    },
    emerald: {
      badge:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      icon: "text-emerald-400",
    },
    yellow: {
      badge:
        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      icon: "text-yellow-400",
    },
    red: {
      badge:
        "bg-red-500/10 text-red-400 border-red-500/20",
      icon: "text-red-400",
    },
  };

  const theme =
    status === "Not Analyzed"
      ? {
          badge:
            "bg-slate-700/50 text-slate-400 border-slate-600",
          icon: "text-slate-400",
        }
      : colors[color];

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        transition-all
        duration-200
        hover:border-blue-500/30
        hover:-translate-y-1
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h3 className="mt-4 text-4xl font-bold text-white">
            {status === "Not Analyzed" ? "--" : score}
          </h3>

          <span
            className={`
              mt-4
              inline-flex
              rounded-full
              border
              px-3
              py-1
              text-xs
              font-medium
              ${theme.badge}
            `}
          >
            {status}
          </span>
        </div>

        <div className="rounded-xl bg-slate-800 p-3">
          <Icon
            size={24}
            className={theme.icon}
          />
        </div>
      </div>

      <button
        onClick={() => navigate(to)}
        className="
          mt-6
          flex
          items-center
          text-sm
          text-slate-500
          transition
          hover:text-blue-400
        "
      >
        View Details

        <ArrowUpRight
          size={16}
          className="ml-2"
        />
      </button>
    </div>
  );
}