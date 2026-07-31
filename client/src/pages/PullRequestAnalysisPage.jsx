import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import {
  analyzePullRequest,
  getPullRequestAnalysis,
} from "../services/pullRequest";

import RepositoryPullRequest from "../components/repository/workspace/RepositoryPullRequest";
import PullRequestSkeleton from "../components/repository/pullRequest/PullRequestSkeleton";

export default function PullRequestAnalysisPage() {
  const { repository } = useOutletContext();

  const { repositoryId, prNumber } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalysis();
  }, [repositoryId, prNumber]);

  const loadAnalysis = async () => {
    try {
      setLoading(true);

      const response = await getPullRequestAnalysis(
        repositoryId,
        prNumber
      );

      setAnalysis(response.data.data);
    } catch (err) {
      if (err.response?.status === 404) {
        generateAnalysis();
        return;
      }

      setError(
        err.response?.data?.message ??
          "Failed to load pull request analysis."
      );
    } finally {
      setLoading(false);
    }
  };

  const generateAnalysis = async () => {
    try {
      setGenerating(true);

      await analyzePullRequest(repositoryId, prNumber);

      const response = await getPullRequestAnalysis(
        repositoryId,
        prNumber
      );

      setAnalysis(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ??
          "Failed to analyze pull request."
      );
    } finally {
      setGenerating(false);
      setLoading(false);
    }
  };

  if (loading || generating) {
    return <PullRequestSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-red-300">
        {error}
      </div>
    );
  }

  return (
    <RepositoryPullRequest
      repository={repository}
      pullRequestAnalysis={analysis}
    />
  );
}