import { useEffect, useState, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getDeploymentReport,
  analyzeDeployment,
} from "../services/deployment";

import RepositoryDeployment from "../components/repository/workspace/RepositoryDeployment";
import DeploymentSkeleton from "../components/repository/deployment/DeploymentSkeleton";
import RepositoryPageHeader from "../components/repository/shared/RepositoryPageHeader";

export default function Deployment() {
  const { repository, refreshRepository } = useOutletContext();
  const { repositoryId } = useParams();

  const [deployment, setDeployment] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDeployment = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getDeploymentReport(repositoryId);

      setDeployment(response.data.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setDeployment(null);
      } else {
        console.error("Failed to load deployment analysis:", err.message);
        toast.error("Failed to load deployment analysis.");
      }
    } finally {
      setLoading(false);
    }
  }, [repositoryId]);

  useEffect(() => {
    loadDeployment();
  }, [loadDeployment]);

  const handleAnalyze = async () => {
    toast.promise(
      (async () => {
        setLoading(true);

        await analyzeDeployment(repositoryId);

        await loadDeployment();

        await refreshRepository();
      })(),
      {
        loading: "Analyzing deployment...",
        success: "Deployment analysis completed successfully!",
        error: (err) =>
          err.response?.data?.message ?? "Failed to analyze deployment.",
      }
    );
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <DeploymentSkeleton />
      </div>
    );
  }

  if (!deployment) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <RepositoryPageHeader
          title="Deployment"
          description="Analyze deployment readiness, infrastructure configuration, CI/CD pipelines, and receive AI-powered recommendations."
          actionLabel="Analyze Deployment"
          action={handleAnalyze}
          loading={loading}
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-10 text-center sm:px-10 sm:py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-4xl">
            🚀
          </div>

          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            No Deployment Analysis
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            This repository hasn't been analyzed yet. Run a deployment analysis
            to evaluate infrastructure configuration, CI/CD pipelines, build
            readiness, and receive AI-powered deployment recommendations.
          </p>

          <div className="mx-auto mt-8 grid max-w-xl gap-4 text-left sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ Infrastructure</h4>
              <p className="mt-1 text-sm text-slate-400">
                Docker, Kubernetes, and platform configuration.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ CI/CD Pipelines</h4>
              <p className="mt-1 text-sm text-slate-400">
                Continuous integration and deployment workflows.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ Build Readiness</h4>
              <p className="mt-1 text-sm text-slate-400">
                Dependencies, scripts, and build configuration.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ Recommendations</h4>
              <p className="mt-1 text-sm text-slate-400">
                AI-powered deployment improvement suggestions.
              </p>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            className="mt-10 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 sm:w-auto"
          >
            Analyze Deployment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <RepositoryPageHeader
        title="Deployment"
        description="Analyze deployment readiness, infrastructure configuration, CI/CD pipelines, and receive AI-powered recommendations."
        actionLabel="Re-analyze"
        action={handleAnalyze}
        loading={loading}
      />

      <RepositoryDeployment
        repository={repository}
        deployment={deployment}
      />
    </div>
  );
}
