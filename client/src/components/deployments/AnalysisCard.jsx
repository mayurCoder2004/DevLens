export default function AnalysisCard({
  title,
  score,
  checks,
  strengths,
  warnings,
  criticalIssues,
}) {
  function getScoreColor(score) {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>

        <span className="text-3xl font-bold">
          {score}/100
        </span>
      </div>

      <div className="h-3 rounded-full bg-gray-200 overflow-hidden mb-6">
        <div
          className={`h-full ${getScoreColor(score)}`}
          style={{
            width: `${score}%`,
          }}
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-3">
          Checks
        </h3>

        <div className="space-y-2">
          {Object.entries(checks).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between border-b pb-2"
            >
              <span className="capitalize">
                {key}
              </span>

              <span>
                {value ? "✅" : "❌"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {strengths.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-green-700 mb-2">
            Strengths
          </h3>

          <ul className="list-disc ml-6 space-y-1">
            {strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-yellow-700 mb-2">
            Warnings
          </h3>

          <ul className="list-disc ml-6 space-y-1">
            {warnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {criticalIssues.length > 0 && (
        <div>
          <h3 className="font-semibold text-red-700 mb-2">
            Critical Issues
          </h3>

          <ul className="list-disc ml-6 space-y-1">
            {criticalIssues.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}