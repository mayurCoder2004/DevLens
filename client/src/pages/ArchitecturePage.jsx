import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import {
  analyzeArchitecture,
  getArchitecture,
} from "../services/architecture";

import RepositoryArchitecture from "../components/repository/architecture/RepositoryArchitecture";
import ArchitectureSkeleton from "../components/repository/architecture/ArchitectureSkeleton";

export default function ArchitecturePage() {
  const {
    repository,
    refreshRepository,
  } = useOutletContext();

  const { repositoryId } = useParams();

  const [architecture, setArchitecture] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [insights, setInsights] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArchitecture();
  }, [repositoryId]);

  const loadArchitecture = async () => {
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
        console.error("Error fetching architecture:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      setLoading(true);

      await analyzeArchitecture(repositoryId);

      await loadArchitecture();

      await refreshRepository();
    } catch (error) {
      console.error("Error analyzing architecture:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ArchitectureSkeleton />;
  }

  if (!architecture) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Architecture Analysis
        </h2>

        <p className="mt-3 text-slate-400">
          This repository hasn't been analyzed yet.
        </p>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 rounded-lg bg-violet-600 px-6 py-3 text-white transition hover:bg-violet-700 disabled:opacity-50"
        >
          {loading
            ? "Analyzing..."
            : "Analyze Architecture"}
        </button>
      </div>
    );
  }

  return (
    <RepositoryArchitecture
      repository={repository}
      architecture={architecture}
      analytics={analytics}
      insights={insights}
      recommendations={recommendations}
    />
  );
}