import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  analyzeTechnicalDebt,
  getTechnicalDebt,
} from "../services/technicalDebt";

import RepositoryTechnicalDebt from "../components/repository/workspace/RepositoryTechnicalDebt";
import TechnicalDebtSkeleton from "../components/repository/technicalDebt/TechnicalDebtSkeleton";

export default function TechnicalDebt() {
  const {
    repository,
    refreshRepository,
  } = useOutletContext();

  const { repositoryId } = useParams();

  const [technicalDebt, setTechnicalDebt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTechnicalDebt();
  }, [repositoryId]);

  const loadTechnicalDebt = async () => {
    try {
      setLoading(true);

      const data = await getTechnicalDebt(repositoryId);

      setTechnicalDebt(data.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setTechnicalDebt(null);
      } else {
        console.error("Error fetching technical debt:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);

    toast.promise(
      (async () => {
        await analyzeTechnicalDebt(repositoryId);
        await loadTechnicalDebt();
        await refreshRepository();
      })(),
      {
        loading: 'Analyzing technical debt...',
        success: 'Technical debt analysis completed successfully!',
        error: (err) => err.response?.data?.message ?? 'Failed to analyze technical debt.',
      }
    ).finally(() => {
      setLoading(false);
    });
  };

  if (loading) {
    return <TechnicalDebtSkeleton />;
  }

  if (!technicalDebt) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Technical Debt Analysis
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
            : "Analyze Technical Debt"}
        </button>
      </div>
    );
  }

  return (
    <RepositoryTechnicalDebt
      repository={repository}
      technicalDebt={technicalDebt}
    />
  );
}