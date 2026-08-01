import { useEffect, useState } from "react";
import {
  useOutletContext,
  useParams,
} from "react-router-dom";

import RepositoryAIReview from "../components/repository/workspace/RepositoryAIReview";
import AIReviewSkeleton from "../components/repository/aiReview/AIReviewSkeleton";

import {
  getRepositoryAIReview,
  refreshRepositoryAIReview,
} from "../services/aiReview";

export default function AIReview() {
  const { repository } = useOutletContext();

  const { repositoryId } = useParams();

  const [review, setReview] = useState(null);

  const [loading, setLoading] = useState(true);

  const [generating, setGenerating] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    loadReview();
  }, [repositoryId]);

  const loadReview = async () => {
  try {
    setLoading(true);
    setError("");

    const response =
      await getRepositoryAIReview(repositoryId);

    setReview(response.data.data);
  } catch (err) {
    if (err.response?.status === 404) {
      setReview(null);
    } else {
      setError(
        err.response?.data?.message ??
          "Failed to load AI review."
      );
    }
  } finally {
    setLoading(false);
  }
};

  const refreshReview = async () => {
  try {
    setGenerating(true);
    setError("");

    await refreshRepositoryAIReview(repositoryId);

    await loadReview();
  } catch (err) {
    setError(
      err.response?.data?.message ??
        "Failed to refresh AI review."
    );
  } finally {
    setGenerating(false);
  }
};

  if (loading) {
    return <AIReviewSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-900 bg-red-950/30 p-6 text-red-300">
        {error}
      </div>
    );
  }

  if (!review) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h2 className="text-xl font-semibold text-white">
          No AI Review Available
        </h2>

        <p className="mt-2 text-slate-400">
          Generate an AI-powered engineering
          review for this repository.
        </p>

        <button
          onClick={refreshReview}
          disabled={generating}
          className="mt-6 rounded-lg bg-violet-600 px-5 py-2 text-white transition hover:bg-violet-700 disabled:opacity-50"
        >
          {generating
            ? "Generating..."
            : "Generate AI Review"}
        </button>
      </div>
    );
  }

  return (
    <RepositoryAIReview
      repository={repository}
      review={review}
      generating={generating}
      onRefresh={refreshReview}
    />
  );
}