export default function TrustCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/60
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-500/40
        hover:bg-slate-900
        hover:shadow-xl
        hover:shadow-blue-500/10
      "
    >
      {/* Icon */}
      <div
        className="
          mb-6
          inline-flex
          rounded-xl
          bg-blue-500/10
          p-3
          transition-colors
          duration-300
          group-hover:bg-blue-500/20
        "
      >
        <Icon
          size={24}
          className="text-blue-400"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}