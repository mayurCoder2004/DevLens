import { useEffect, useState, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Brain, ListChecks, ShieldCheck, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import RepositoryAIReview from "../components/repository/workspace/RepositoryAIReview";
import AIReviewSkeleton from "../components/repository/aiReview/AIReviewSkeleton";
import RepositoryPageHeader from "../components/repository/shared/RepositoryPageHeader";

import {
  getRepositoryAIReview,
  refreshRepositoryAIReview,
} from "../services/aiReview";

export default function AIReview() {
  const { repository, refreshRepository } = useOutletContext();
  const { repositoryId } = useParams();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const loadReview = useCallback(async ({
    silent = false,
    rethrow = false,
  } = {}) => {
    try {
      if (!silent) {
        setLoading(true);
      }

      const response = await getRepositoryAIReview(repositoryId);

      setReview(response.data.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setReview(null);
      } else if (!rethrow) {
        toast.error(err.response?.data?.message ?? "Failed to load AI review.");
      }

      if (rethrow) {
        throw err;
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, [repositoryId]);

  useEffect(() => {
    Promise.resolve().then(() => loadReview());
  }, [loadReview]);

  const refreshReview = async () => {
    setGenerating(true);

    await toast.promise(
      (async () => {
        const response = await refreshRepositoryAIReview(repositoryId);
        setReview(response.data.data);
        await loadReview({ silent: true, rethrow: true });
        await refreshRepository();
      })(),
      {
        loading: review ? "Regenerating AI review..." : "Generating AI review...",
        success: review
          ? "AI review regenerated successfully!"
          : "AI review generated successfully!",
        error: (err) =>
          err.response?.data?.message ?? "Failed to generate AI review.",
      }
    )
      .catch(() => {})
      .finally(() => setGenerating(false));
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <AIReviewSkeleton />
      </div>
    );
  }

  if (!review) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <RepositoryPageHeader
          title="AI Review"
          description="Generate an AI-powered repository review across architecture, engineering quality, risks, strengths, and recommendations."
          actionLabel="Generate AI Review"
          action={refreshReview}
          loading={generating}
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-10 py-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10">
            <Brain className="h-8 w-8 text-violet-400" />
          </div>

          <h2 className="text-2xl font-semibold text-white">
            No AI Review Available
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Generate a comprehensive AI review that summarizes repository
            quality, identifies engineering concerns, highlights strengths, and
            recommends actionable improvements.
          </p>

          <div className="mx-auto mt-8 grid max-w-xl gap-4 text-left sm:grid-cols-2">
            <EmptyFeature
              icon={ShieldCheck}
              iconColor="text-emerald-400"
              title="Executive Summary"
              description="Review repository quality and engineering posture."
            />
            <EmptyFeature
              icon={ListChecks}
              iconColor="text-blue-400"
              title="Action Items"
              description="Prioritize concrete improvements for the team."
            />
          </div>

          <button
            type="button"
            onClick={refreshReview}
            disabled={generating}
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {generating ? (
              <>
                <Sparkles className="h-4 w-4 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Generate AI Review
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
        title="AI Review"
        description="AI-powered repository review across architecture, engineering quality, risks, strengths, and recommendations."
        actionLabel="Regenerate AI Review"
        action={refreshReview}
        loading={generating}
      />

      <RepositoryAIReview repository={repository} review={review} />
    </div>
  );
}

function EmptyFeature({ icon: Icon, iconColor, title, description }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="mb-2 flex items-center gap-2 text-white">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
