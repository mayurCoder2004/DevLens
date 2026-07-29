import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import { getPullRequestAnalysis } from "../services/pullRequest";
import RepositoryPullRequest from "../components/repository/workspace/RepositoryPullRequest";

export default function PullRequestsPage() {
  const { repository } = useOutletContext();
  const { repositoryId } = useParams();

  const [pullRequestAnalysis, setPullRequestAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPullRequestAnalysis();
  }, [repositoryId]);

  const fetchPullRequestAnalysis = async () => {
    try {
      const response = await getPullRequestAnalysis(repositoryId);

      setPullRequestAnalysis(response.data.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ??
          "Failed to load pull request analysis."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
        Loading pull request analysis...
      </div>
    );
  }

  if (!pullRequestAnalysis) {
    return (
      <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-red-300">
        {error || "Pull request analysis not found."}
      </div>
    );
  }

  return (
    <RepositoryPullRequest
      repository={repository}
      pullRequestAnalysis={pullRequestAnalysis}
    />
  );
}