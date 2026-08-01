import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getDeploymentReport,
  analyzeDeployment,
} from "../services/deployment";

import RepositoryDeployment from "../components/repository/workspace/RepositoryDeployment";
import DeploymentSkeleton from "../components/repository/deployment/DeploymentSkeleton";

export default function Deployment() {
  const {
    repository,
    refreshRepository,
  } = useOutletContext();

  const { repositoryId } = useParams();

  const [deployment, setDeployment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDeployment();
  }, [repositoryId]);

  const fetchDeployment = async () => {
    const response = await getDeploymentReport(repositoryId);

    setDeployment(response.data.data);
  };

  const analyzeAndFetch = async () => {
    setAnalyzing(true);

    toast.promise(
      (async () => {
        await analyzeDeployment(repositoryId);
        await fetchDeployment();
        await refreshRepository();
      })(),
      {
        loading: 'Analyzing deployment...',
        success: 'Deployment analysis completed successfully!',
        error: (err) => err.response?.data?.message ?? 'Failed to analyze deployment.',
      }
    ).finally(() => {
      setAnalyzing(false);
    });
  };

  const loadDeployment = async () => {
    try {
      setLoading(true);
      setError("");

      await fetchDeployment();
    } catch (err) {
      if (err.response?.status === 404) {
        setDeployment(null);
      } else {
        console.error(err);

        setError(
          err.response?.data?.message ??
            "Failed to load deployment report."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DeploymentSkeleton />;
  }

  if (!deployment) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Deployment Analysis
        </h2>

        <p className="mt-3 text-slate-400">
          This repository hasn't been analyzed yet.
        </p>

        <button
          onClick={analyzeAndFetch}
          disabled={analyzing}
          className="mt-6 rounded-lg bg-violet-600 px-6 py-3 text-white transition hover:bg-violet-700 disabled:opacity-50"
        >
          {analyzing
            ? "Analyzing..."
            : "Analyze Deployment"}
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <RepositoryDeployment
      repository={repository}
      deployment={deployment}
      analyzing={analyzing}
      error={error}
      onReanalyze={analyzeAndFetch}
    />
  );
}