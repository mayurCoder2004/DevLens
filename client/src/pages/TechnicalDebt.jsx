import { useEffect, useState, useCallback } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  analyzeTechnicalDebt,
  getTechnicalDebt,
} from "../services/technicalDebt";

import RepositoryTechnicalDebt from "../components/repository/workspace/RepositoryTechnicalDebt";
import TechnicalDebtSkeleton from "../components/repository/technicalDebt/TechnicalDebtSkeleton";
import RepositoryPageHeader from "../components/repository/shared/RepositoryPageHeader";

export default function TechnicalDebt() {
  const { repository, refreshRepository } = useOutletContext();
  const { repositoryId } = useParams();

  const [technicalDebt, setTechnicalDebt] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTechnicalDebt = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getTechnicalDebt(repositoryId);

      setTechnicalDebt(data.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setTechnicalDebt(null);
      } else {
        console.error("Error fetching technical debt:", error.message);
        toast.error("Failed to load technical debt.");
      }
    } finally {
      setLoading(false);
    }
  }, [repositoryId]);

  useEffect(() => {
    loadTechnicalDebt();
  }, [loadTechnicalDebt]);

  const handleAnalyze = async () => {
    toast.promise(
      (async () => {
        setLoading(true);

        await analyzeTechnicalDebt(repositoryId);

        await loadTechnicalDebt();

        await refreshRepository();
      })(),
      {
        loading: "Analyzing technical debt...",
        success: "Technical debt analysis completed successfully!",
        error: (err) =>
          err.response?.data?.message ?? "Failed to analyze technical debt.",
      },
    );
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <TechnicalDebtSkeleton />
      </div>
    );
  }

  if (!technicalDebt) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <RepositoryPageHeader
          title="Technical Debt"
          description="Analyze code quality, maintainability issues, and receive AI-powered recommendations to reduce technical debt."
          actionLabel="Analyze Technical Debt"
          action={handleAnalyze}
          loading={loading}
        />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-10 text-center sm:px-10 sm:py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-4xl">
            ⚠️
          </div>

          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            No Technical Debt Analysis
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            This repository hasn't been analyzed yet. Run a technical debt
            analysis to identify maintainability issues, code smells, large
            files, dead code, and receive AI-powered refactoring
            recommendations.
          </p>

          <div className="mx-auto mt-8 grid max-w-xl gap-4 text-left sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ Code Quality</h4>
              <p className="mt-1 text-sm text-slate-400">
                Measure maintainability and technical debt scores.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ Problem Detection</h4>
              <p className="mt-1 text-sm text-slate-400">
                Identify large files, dead code, and circular dependencies.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ AI Insights</h4>
              <p className="mt-1 text-sm text-slate-400">
                Understand technical debt impact and priority areas.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="font-medium text-white">✓ Recommendations</h4>
              <p className="mt-1 text-sm text-slate-400">
                Receive actionable refactoring suggestions.
              </p>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            className="mt-10 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 sm:w-auto"
          >
            Analyze Technical Debt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <RepositoryPageHeader
        title="Technical Debt"
        description="Analyze code quality, maintainability issues, and receive AI-powered recommendations to reduce technical debt."
        actionLabel="Re-analyze"
        action={handleAnalyze}
        loading={loading}
      />

      <RepositoryTechnicalDebt
        repository={repository}
        technicalDebt={technicalDebt}
      />
    </div>
  );
}
