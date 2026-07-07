import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AIReviewHero from "../components/aiReview/AIReviewHero";
import axios from "axios";
import EngineeringSummaryCard from "../components/aiReview/EngineeringSummaryCard";
import ReviewListCard from "../components/aiReview/ReviewListCard";
import SummaryCard from "../components/aiReview/SummaryCard";

const AIReviewSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="animate-pulse rounded-xl bg-gradient-to-r from-purple-200 to-indigo-200 p-8 shadow-md sm:p-10">
          <div className="h-4 w-44 rounded bg-white/70" />
          <div className="mt-5 h-10 w-full max-w-md rounded bg-white/80" />
          <div className="mt-4 h-5 w-full max-w-2xl rounded bg-white/60" />
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="h-10 w-36 rounded-full bg-white/70" />
            <div className="h-10 w-48 rounded-full bg-white/70" />
          </div>
        </div>

        <div className="animate-pulse rounded-xl border-l-4 border-purple-200 bg-white p-6 shadow-md">
          <div className="h-7 w-48 rounded bg-gray-200" />
          <div className="mt-6 space-y-3">
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 w-4/5 rounded bg-gray-200" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-xl border-l-4 border-gray-200 bg-white p-6 shadow-md"
            >
              <div className="h-7 w-40 rounded bg-gray-200" />
              <div className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <div className="h-7 w-7 rounded-full bg-gray-200" />
                  <div className="h-4 flex-1 rounded bg-gray-200" />
                </div>
                <div className="flex gap-4">
                  <div className="h-7 w-7 rounded-full bg-gray-200" />
                  <div className="h-4 flex-1 rounded bg-gray-200" />
                </div>
                <div className="flex gap-4">
                  <div className="h-7 w-7 rounded-full bg-gray-200" />
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {[0, 1].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-xl border-l-4 border-blue-200 bg-white p-6 shadow-md"
          >
            <div className="h-7 w-56 rounded bg-gray-200" />
            <div className="mt-6 space-y-4">
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIReview = () => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  const fetchReview = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      setError("");

      const response = await axios.get(
        `http://localhost:5000/api/repositories/${id}/ai-review`,
      );

      setReview(response.data.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setReview(null);
      } else {
        setError("Failed to load AI review.");
      }
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  const refreshReview = async () => {
    try {
      setGenerating(true);
      setError("");

      await axios.put(`http://localhost:5000/api/repositories/${id}/ai-review`);

      await fetchReview(false);
    } catch (error) {
      setError("Failed to refresh AI review.");
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <AIReviewSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="rounded-xl border-l-4 border-red-500 bg-white p-6 text-center shadow-md">
          <h2 className="text-xl font-semibold text-gray-950">{error}</h2>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
        <section className="w-full max-w-xl rounded-xl border-l-4 border-indigo-500 bg-white p-8 text-center shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-indigo-50">
            <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md">
              <div className="absolute left-4 top-5 h-3 w-12 rounded-full bg-white/80" />
              <div className="absolute left-4 top-10 h-2 w-9 rounded-full bg-white/60" />
              <div className="absolute bottom-4 right-4 h-5 w-5 rounded-full border-4 border-white/80" />
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-950">
            No AI Engineering Review Available
          </h2>

          <p className="mt-3 text-base leading-7 text-gray-600">
            Generate an AI-powered engineering assessment for this repository.
          </p>

          <button
            type="button"
            onClick={refreshReview}
            disabled={generating}
            className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {generating ? "Generating..." : "Generate AI Review"}
          </button>
        </section>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <AIReviewHero
          repositoryName={
            review.repository?.name || review.repositoryName || review.name
          }
          modelUsed={review.modelUsed}
          createdAt={review.createdAt}
        />

        <div className="flex justify-end">
          <button
            onClick={refreshReview}
            disabled={generating}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {generating ? "Refreshing..." : "Refresh AI Review"}
          </button>
        </div>

        <SummaryCard summary={review.overallSummary} />

        <div className="grid gap-6 md:grid-cols-2">
          <ReviewListCard title="Strengths" items={review.strengths} />

          <ReviewListCard title="Weaknesses" items={review.weaknesses} />
        </div>

        <ReviewListCard
          title="Recommendations"
          items={review.recommendations}
        />

        <EngineeringSummaryCard summary={review.engineeringSummary} />
      </div>
    </main>
  );
};

export default AIReview;
