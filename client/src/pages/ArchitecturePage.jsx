import { useEffect, useState, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  analyzeArchitecture,
  getArchitecture,
} from "../services/architecture";

import RepositoryArchitecture from "../components/repository/architecture/RepositoryArchitecture";
import ArchitectureSkeleton from "../components/repository/architecture/ArchitectureSkeleton";
import RepositoryPageHeader from "../components/repository/shared/RepositoryPageHeader";

export default function ArchitecturePage() {
  const { repository, refreshRepository } = useOutletContext();
  const { repositoryId } = useParams();

  const [architecture, setArchitecture] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [insights, setInsights] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadArchitecture = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getArchitecture(repositoryId);

      setArchitecture(data.architecture);
      setAnalytics(data.analytics);
      setInsights(data.insights);
      setRecommendations(data.recommendations || []);
    } catch (error) {
      if (error.response?.status === 404) {
        setArchitecture(null);
      } else {
        console.error("Failed to load architecture:", error.message);
        toast.error("Failed to load architecture.");
      }
    } finally {
      setLoading(false);
    }
  }, [repositoryId]);

  useEffect(() => {
    loadArchitecture();
  }, [loadArchitecture]);

  const handleAnalyze = async () => {
    toast.promise(
      (async () => {
        setLoading(true);

        await analyzeArchitecture(repositoryId);

        await loadArchitecture();

        await refreshRepository();
      })(),
      {
        loading: "Analyzing repository architecture...",
        success: "Architecture analysis completed successfully!",
        error: (err) =>
          err.response?.data?.message ??
          "Failed to analyze repository architecture.",
      }
    );
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <ArchitectureSkeleton />
      </div>
    );
  }

  if (!architecture) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <RepositoryPageHeader
          title="Architecture"
          description="Explore your repository structure, dependency graph, architectural insights, and AI-powered recommendations."
          actionLabel="Analyze Architecture"
          action={handleAnalyze}
          loading={loading}
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-10 py-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10 text-4xl">
            📐
          </div>

          <h2 className="text-2xl font-semibold text-white">
            No Architecture Analysis
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            This repository hasn't been analyzed yet. Run an architecture
            analysis to generate dependency graphs, architecture metrics,
            engineering insights, and AI-powered recommendations.
          </p>

          <div className="mx-auto mt-8 grid max-w-xl gap-4 text-left sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">
                ✓ Dependency Graph
              </h4>
              <p className="mt-1 text-sm text-slate-400">
                Visualize relationships between modules.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">
                ✓ Architecture Metrics
              </h4>
              <p className="mt-1 text-sm text-slate-400">
                Complexity, nodes, edges and dependencies.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">
                ✓ AI Insights
              </h4>
              <p className="mt-1 text-sm text-slate-400">
                Understand architectural strengths and weaknesses.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">
                ✓ Recommendations
              </h4>
              <p className="mt-1 text-sm text-slate-400">
                Receive actionable improvement suggestions.
              </p>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            className="mt-10 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            Analyze Architecture
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <RepositoryPageHeader
        title="Architecture"
        description="Explore your repository structure, dependency graph, architectural insights, and AI-powered recommendations."
        actionLabel="Re-analyze"
        action={handleAnalyze}
        loading={loading}
      />

      <RepositoryArchitecture
        repository={repository}
        architecture={architecture}
        analytics={analytics}
        insights={insights}
        recommendations={recommendations}
      />
    </div>
  );
}
