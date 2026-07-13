export default function HeroStatCard({
  label,
  value,
  icon: Icon,
  iconColor = "text-blue-400",
  subtitle,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-4
        transition-all
        duration-300
        hover:border-blue-500/30
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {label}
        </p>

        <Icon
          size={20}
          className={iconColor}
        />
      </div>

      <h3 className="mt-3 text-3xl font-bold text-white">
        {value}
      </h3>

      {subtitle && (
        <p className="mt-1.5 text-xs text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}