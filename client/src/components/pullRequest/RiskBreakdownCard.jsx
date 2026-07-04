const RiskBreakdownCard = ({ breakdown }) => {
  const items = [
    {
      label: "Critical Files",
      key: "critical",
      color: "text-red-600",
    },
    {
      label: "Infrastructure",
      key: "infrastructure",
      color: "text-orange-600",
    },
    {
      label: "Dependencies",
      key: "dependency",
      color: "text-blue-600",
    },
    {
      label: "File Count",
      key: "fileCount",
      color: "text-purple-600",
    },
    {
      label: "Documentation",
      key: "documentation",
      color: "text-green-600",
    },
  ];

  return (
    <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold">
        Risk Breakdown
      </h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between border-b pb-3 last:border-none"
          >
            <span className="text-gray-700">
              {item.label}
            </span>

            <span
              className={`font-semibold ${item.color}`}
            >
              {breakdown[item.key] > 0
                ? `+${breakdown[item.key]}`
                : breakdown[item.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskBreakdownCard;