const RecommendationCard = ({ recommendations }) => {
  return (
    <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold">
        Recommendations
      </h3>

      {recommendations.length === 0 ? (
        <p className="text-gray-500">
          No recommendations available.
        </p>
      ) : (
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border border-green-100 bg-green-50 p-4"
            >
              <span className="text-lg text-green-600">
                ✓
              </span>

              <p className="text-gray-700">
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;