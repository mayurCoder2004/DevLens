import { useState } from "react";
import axios from "axios";

import RiskScoreCard from "./RiskScoreCard";
import RiskBreakdownCard from "./RiskBreakdownCard";
import RecommendationCard from "./RecommendationCard";
import ChangedFilesCard from "./ChangedFilesCard";

const PullRequestAnalysisCard = ({ repositoryId }) => {
  const [prNumber, setPrNumber] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!prNumber) return;

    try {
      setLoading(true);
      setError("");
      setAnalysis(null);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:5000/api/pull-requests/analyze/${repositoryId}/${prNumber}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(response.data.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to analyze pull request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold">
        Pull Request Risk Analysis
      </h2>

      <p className="mb-6 text-gray-600">
        Analyze the risk associated with a GitHub Pull Request.
      </p>

      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="number"
          min="1"
          placeholder="Enter Pull Request Number"
          value={prNumber}
          onChange={(e) => setPrNumber(e.target.value)}
          className="flex-1 rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          onClick={handleAnalyze}
          disabled={!prNumber || loading}
          className="rounded-lg bg-orange-600 px-6 py-2 text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Pull Request"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-8 rounded-xl border bg-orange-50 p-6">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>

            <div>
              <p className="font-semibold text-orange-700">
                Analyzing Pull Request...
              </p>

              <p className="text-sm text-orange-600">
                Fetching files, calculating risk score and generating
                recommendations.
              </p>
            </div>
          </div>
        </div>
      )}

      {!analysis && !loading && (
        <div className="mt-8 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            No Pull Request Analysis Yet
          </h3>

          <p className="mt-2 text-gray-500">
            Enter a pull request number above and click{" "}
            <span className="font-medium">
              Analyze Pull Request
            </span>{" "}
            to generate a detailed risk report.
          </p>
        </div>
      )}

      {analysis && (
        <>
          <RiskScoreCard analysis={analysis} />

          <RiskBreakdownCard
  breakdown={analysis.risk.breakdown}
/>

          <RecommendationCard
            recommendations={analysis.recommendations}
          />

          <ChangedFilesCard
            files={analysis.files}
          />
        </>
      )}
    </div>
  );
};

export default PullRequestAnalysisCard;