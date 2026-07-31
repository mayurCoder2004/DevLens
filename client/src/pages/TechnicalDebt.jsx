import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import { getTechnicalDebt } from "../services/technicalDebt";
import RepositoryTechnicalDebt from "../components/repository/workspace/RepositoryTechnicalDebt";
import TechnicalDebtSkeleton from "../components/repository/technicalDebt/TechnicalDebtSkeleton";

export default function TechnicalDebt() {
  const { repository } = useOutletContext();
  const { repositoryId } = useParams();

  const [technicalDebt, setTechnicalDebt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTechnicalDebt();
  }, [repositoryId]);

  const fetchTechnicalDebt = async () => {
    try {
      const response = await getTechnicalDebt(repositoryId);

      setTechnicalDebt(response.data);
    } catch (error) {
      console.error("Error fetching technical debt:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <TechnicalDebtSkeleton />;
  }

  if (!technicalDebt) {
    return (
      <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-red-300">
        Technical debt analysis not found.
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