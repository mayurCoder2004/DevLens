import { useState } from "react";

const PullRequestAnalysisCard = ({ repositoryId }) => {
  const [prNumber, setPrNumber] = useState("");

  const handleAnalyze = () => {
    console.log("Repository:", repositoryId);
    console.log("PR Number:", prNumber);
  };

  return (
    <div className="mt-8 rounded-xl border bg-white shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-2">
        Pull Request Risk Analysis
      </h2>

      <p className="text-gray-600 mb-6">
        Analyze the risk associated with a GitHub Pull Request.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="number"
          min="1"
          placeholder="Enter Pull Request Number"
          value={prNumber}
          onChange={(e) => setPrNumber(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          onClick={handleAnalyze}
          disabled={!prNumber}
          className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg"
        >
          Analyze Pull Request
        </button>
      </div>
    </div>
  );
};

export default PullRequestAnalysisCard;