import { Clock3 } from "lucide-react";

export default function ActivityItem({
  title,
  repository,
  description,
  time,
  icon: Icon,
  iconColor = "text-blue-400",
}) {
  return (
    <article
      className="
        group
        flex
        gap-4
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-5
        transition-all
        duration-300
        hover:border-blue-500/30
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-slate-800
        "
      >
        <Icon size={20} className={iconColor} />
      </div>

      {/* Content */}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white">{title}</h3>

            <p className="mt-1 text-sm font-medium text-blue-400">
              {repository}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
            <Clock3 size={14} />

            {time}
          </div>
        </div>

        {description && (
          <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
        )}
      </div>
    </article>
  );
}
