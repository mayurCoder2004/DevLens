const InsightCard = ({
  title,
  items,
  icon,
  itemIcon,
  iconContainerClass = "bg-indigo-100 text-indigo-600",
  itemIconClass = "bg-indigo-50 text-indigo-600",
}) => {
  const hasItems = items && items.length > 0;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-6 flex items-center gap-3">
        <div
          className={`rounded-xl p-2 ${iconContainerClass}`}
        >
          {icon}
        </div>

        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      </div>

      {!hasItems ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          No insights available.
        </p>
      ) : (
        <ul className="flex-1 space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-colors duration-300 hover:bg-white"
            >
              <div
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${itemIconClass}`}
              >
                {itemIcon}
              </div>

              <span className="text-sm leading-6 text-slate-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InsightCard;
