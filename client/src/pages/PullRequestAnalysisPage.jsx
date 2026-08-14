import { useEffect, useState, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { GitPullRequest, ShieldCheck, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import {
  analyzePullRequest,
  getPullRequestAnalysis,
} from "../services/pullRequest";

import {
  getChangeImpactAnalysis,
} from "../services/changeImpact";

import RepositoryPullRequest from "../components/repository/workspace/RepositoryPullRequest";
import PullRequestSkeleton from "../components/repository/pullRequest/PullRequestSkeleton";
import RepositoryPageHeader from "../components/repository/shared/RepositoryPageHeader";

export default function PullRequestAnalysisPage() {
  const { repository, refreshRepository } = useOutletContext();
  const { repositoryId, prNumber } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [changeImpact, setChangeImpact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const fetchAnalysis = useCallback(async () => {
  const response = await getPullRequestAnalysis(
    repositoryId,
    prNumber,
  );

  setAnalysis(response.data.data);

  try {
    const impactResponse =
      await getChangeImpactAnalysis(
        repositoryId,
        prNumber,
      );

    setChangeImpact(
      impactResponse.data.data.changeImpact,
    );
  } catch (err) {
    // Change Impact is an additional analysis.
    // The existing PR analysis should still render
    // if Change Impact is unavailable.
    setChangeImpact(null);

    console.warn(
      "Failed to load change impact analysis:",
      err.response?.data?.message ?? err.message,
    );
  }
}, [repositoryId, prNumber]);

  const runAnalysis = useCallback(async () => {
    await analyzePullRequest(repositoryId, prNumber);
    await fetchAnalysis();
    await refreshRepository();
  }, [fetchAnalysis, prNumber, refreshRepository, repositoryId]);

  const loadAnalysis = useCallback(async () => {
    try {
      setLoading(true);

      await fetchAnalysis();
    } catch (err) {
      if (err.response?.status === 404) {
        try {
          await runAnalysis();
        } catch (analysisError) {
          toast.error(
            analysisError.response?.data?.message ??
              "Failed to analyze pull request.",
          );
          setAnalysis(null);
        }
      } else {
        toast.error(
          err.response?.data?.message ??
            "Failed to load pull request analysis.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, [fetchAnalysis, runAnalysis]);

  useEffect(() => {
    Promise.resolve().then(() => loadAnalysis());
  }, [loadAnalysis]);

  const handleReanalyze = async () => {
    setAnalyzing(true);

    await toast
      .promise(runAnalysis(), {
        loading: "Analyzing pull request...",
        success: "Pull request analysis completed!",
        error: (err) =>
          err.response?.data?.message ?? "Failed to analyze pull request.",
      })
      .catch(() => {})
      .finally(() => setAnalyzing(false));
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <PullRequestSkeleton />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <RepositoryPageHeader
          title={`PR #${prNumber}`}
          description="Pull request risk analysis and AI-powered code review recommendations."
          actionLabel="Analyze Pull Request"
          action={handleReanalyze}
          loading={analyzing}
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-10 text-center sm:px-10 sm:py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10">
            <GitPullRequest className="h-8 w-8 text-violet-400" />
          </div>

          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            No Analysis Available
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            This pull request hasn't been analyzed yet. Run an analysis to
            assess risk, inspect changed files, and receive AI-powered code
            review recommendations.
          </p>

          <div className="mx-auto mt-8 grid max-w-xl gap-4 text-left sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">Risk Assessment</h4>
              <p className="mt-1 text-sm text-slate-400">
                Score changed files, infrastructure, and dependencies.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">AI Recommendations</h4>
              <p className="mt-1 text-sm text-slate-400">
                Generate reviewer-focused improvement suggestions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReanalyze}
            disabled={analyzing}
            className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {analyzing ? (
              <>
                <Sparkles className="h-4 w-4 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Analyze Pull Request
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <RepositoryPageHeader
        title={`PR #${prNumber} - ${analysis.title}`}
        description="Pull request risk analysis and AI-powered code review recommendations."
        actionLabel="Re-analyze"
        action={handleReanalyze}
        loading={analyzing}
      />

      <RepositoryPullRequest
        repository={repository}
        pullRequestAnalysis={analysis}
        changeImpact={changeImpact}
      />
    </div>
  );
}
