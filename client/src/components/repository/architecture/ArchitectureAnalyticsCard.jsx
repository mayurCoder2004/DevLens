export default function ArchitectureAnalyticsCard({
  icon,
  title,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-400">
          {title}
        </p>

        <div className="text-blue-400">
          {icon}
        </div>
      </div>

      <h3 className="mt-5 break-words text-2xl font-bold text-white">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}
