import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RepositorySummaryCard from "../components/engineeringHealth/RepositorySummaryCard";
import HeroSection from "../components/engineeringHealth/HeroSection";
import ScoreBreakdown from "../components/engineeringHealth/ScoreBreakdown";
import InsightCard from "../components/engineeringHealth/InsightCard";

import { ArrowLeft, CheckCircle, TriangleAlert } from "lucide-react";

const EngineeringHealthPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [engineeringHealth, setEngineeringHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEngineeringHealth = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/engineering-health/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEngineeringHealth(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load engineering health.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEngineeringHealth();
  }, [fetchEngineeringHealth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
            Loading engineering health...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-white p-6 text-red-600 shadow-sm">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <button
          onClick={() => navigate(`/repository/${id}`)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950 hover:shadow-md"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <HeroSection
          engineeringScore={engineeringHealth.engineeringScore}
          status={engineeringHealth.status}
          generatedAt={engineeringHealth.analysis.generatedAt}
        />

        <RepositorySummaryCard
          repository={engineeringHealth.repository}
          generatedAt={engineeringHealth.analysis.generatedAt}
        />

        <ScoreBreakdown scores={engineeringHealth.scores} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <InsightCard
            title="Strengths"
            items={engineeringHealth.strengths}
            icon={<CheckCircle size={22} />}
            itemIcon={<CheckCircle size={16} />}
            iconContainerClass="bg-green-100 text-green-600"
            itemIconClass="bg-green-50 text-green-600"
          />

          <InsightCard
            title="Priority Recommendations"
            items={engineeringHealth.priorityRecommendations}
            icon={<TriangleAlert size={22} />}
            itemIcon={<TriangleAlert size={16} />}
            iconContainerClass="bg-amber-100 text-amber-600"
            itemIconClass="bg-amber-50 text-amber-600"
          />
        </div>
      </div>
    </div>
  );
};

export default EngineeringHealthPage;
