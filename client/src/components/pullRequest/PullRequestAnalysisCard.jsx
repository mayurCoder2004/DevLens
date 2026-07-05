import { useState } from "react";
import axios from "axios";
import {
  AlertCircle,
  BarChart3,
  GitPullRequest,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
        },
      );

      setAnalysis(response.data.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || "Failed to analyze pull request.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAnalyze();
  };

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Pull Request Intelligence
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Pull Request Risk Analysis
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Analyze changed files, risk signals, and review recommendations
              before merging.
            </p>
          </div>

          <div className="hidden rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-600 lg:block">
            <BarChart3 className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]"
        >
          <label htmlFor="pull-request-number" className="sr-only">
            Pull request number
          </label>

          <div className="relative">
            <GitPullRequest
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="pull-request-number"
              type="number"
              min="1"
              placeholder="Enter pull request number"
              value={prNumber}
              onChange={(event) => setPrNumber(event.target.value)}
              className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={!prNumber || loading}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-300"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Search className="h-4 w-4" aria-hidden="true" />
            )}
            {loading ? "Analyzing" : "Analyze Pull Request"}
          </button>
        </form>
      </div>

      <div className="px-5 pb-6 sm:px-6">
        {error && (
          <div
            className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4"
            role="alert"
          >
            <div className="flex items-start gap-3">
              <AlertCircle
                className="mt-0.5 h-5 w-5 flex-none text-red-600"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-red-900">Analysis failed</p>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/80 p-5">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white p-2 text-blue-600 shadow-sm">
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-blue-950">
                  Analyzing pull request
                </p>
                <p className="mt-1 text-sm leading-6 text-blue-700">
                  Fetching files, calculating the risk score, and generating
                  review guidance.
                </p>

                <div
                  className="mt-4 grid gap-2 sm:grid-cols-3"
                  aria-hidden="true"
                >
                  <div className="h-2 rounded-full bg-blue-200" />
                  <div className="h-2 rounded-full bg-blue-200/70" />
                  <div className="h-2 rounded-full bg-blue-200/40" />
                </div>
              </div>
            </div>
          </div>
        )}

        {!analysis && !loading && (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center sm:p-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-950">
              No pull request analysis yet
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
              Enter a pull request number to generate a risk score, breakdown,
              recommendations, and a changed-files review.
            </p>
          </div>
        )}

        {analysis && (
          <>
            <RiskScoreCard analysis={analysis} />

            <RiskBreakdownCard breakdown={analysis.risk.breakdown} />

            <RecommendationCard recommendations={analysis.recommendations} />

            <ChangedFilesCard files={analysis.files} />
          </>
        )}
      </div>
    </section>
  );
};

export default PullRequestAnalysisCard;
