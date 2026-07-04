const RiskScoreCard = ({ analysis }) => {
  const getBadgeColor = (level) => {
    switch (level) {
      case "Critical":
        return "bg-red-100 text-red-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
  <div>
    <h3 className="text-xl font-semibold">
      {analysis.pullRequest.title}
    </h3>

    <p className="mt-1 text-sm text-gray-500">
      PR #{analysis.pullRequest.number} • {analysis.pullRequest.state}
    </p>

    <p className="mt-1 text-sm text-gray-500">
      {analysis.pullRequest.baseBranch} ← {analysis.pullRequest.headBranch}
    </p>

    <div className="mt-3 flex items-center gap-3">
  <img
    src={analysis.pullRequest.authorAvatar}
    alt={analysis.pullRequest.author}
    className="h-8 w-8 rounded-full"
  />

  <div>
    <p className="text-sm font-medium">
      {analysis.pullRequest.author}
    </p>

    <p className="text-xs text-gray-500">
      Created {new Date(analysis.pullRequest.createdAt).toLocaleDateString()}
    </p>
  </div>
</div>

<a
  href={analysis.pullRequest.url}
  target="_blank"
  rel="noreferrer"
  className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
>
  View Pull Request on GitHub →
</a>
  </div>

  <span
    className={`rounded-full px-4 py-1 text-sm font-medium ${getBadgeColor(analysis.risk.level)}`}
  >
    {analysis.risk.level}
  </span>
</div>

      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
        <div>
          <p className="text-sm text-gray-500">Risk Score</p>
          <p className="text-3xl font-bold">
            {analysis.riskScore}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Files Changed</p>
          <p className="text-3xl font-bold">
            {analysis.summary.totalFiles}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Additions</p>
          <p className="text-3xl font-bold text-green-600">
            +{analysis.summary.additions}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Deletions</p>
          <p className="text-3xl font-bold text-red-600">
            -{analysis.summary.deletions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskScoreCard;