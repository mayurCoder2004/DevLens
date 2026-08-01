import { ArrowRight } from "lucide-react";

export default function WorkspaceActionCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-blue-400",
  loading = false,
  onClick,
}) {
  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-500/30
      "
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-slate-800
        "
      >
        <Icon
          size={22}
          className={iconColor}
        />
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={onClick}
          disabled={loading}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-blue-400
            transition-all
            duration-200
            group-hover:gap-3
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Refreshing..."
            : "Run Action"}

          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}