import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import RepositoryLayout from "../layouts/RepositoryLayout";

import RepositoryHero from "../components/repository/RepositoryHero";

import RepositoryOverview from "../components/repository/overview/RepositoryOverview";
import RepositoryArchitecture from "../components/repository/architecture/RepositoryArchitecture";
import RepositoryTechnicalDebt from "../components/repository/workspace/RepositoryTechnicalDebt";
import RepositoryDeployment from "../components/repository/workspace/RepositoryDeployment";
import RepositoryEngineeringHealth from "../components/repository/workspace/RepositoryEngineeringHealth";
import RepositoryAIReview from "../components/repository/workspace/RepositoryAIReview";

export default function RepositoryWorkspace() {
  const { id } = useParams();

  const [repository, setRepository] = useState(null);
  const [architecture, setArchitecture] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [insights, setInsights] = useState(null);

  const [activeSection, setActiveSection] =
    useState("overview");

  useEffect(() => {
  fetchRepository();
  fetchArchitecture();
}, [id]);

  const fetchRepository = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/repositories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRepository(response.data.repository);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchArchitecture = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:5000/api/repositories/${id}/architecture`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setArchitecture(response.data.architecture);
setAnalytics(response.data.analytics);
setInsights(response.data.insights);
  } catch (error) {
    console.error(error);
  }
};

  const renderWorkspace = () => {
    switch (activeSection) {
      case "overview":
        return (
          <>
            <RepositoryHero repository={repository} />
            <div className="mt-8">
              <RepositoryOverview />
            </div>
          </>
        );

      case "architecture":
  return (
    <RepositoryArchitecture
  architecture={architecture}
  analytics={analytics}
  insights={insights}
/>
  );

      case "technical-debt":
        return <RepositoryTechnicalDebt />;

      case "deployment":
        return <RepositoryDeployment />;

      case "engineering-health":
        return <RepositoryEngineeringHealth />;

      case "ai-review":
        return <RepositoryAIReview />;

      default:
        return (
          <>
            <RepositoryHero repository={repository} />
            <div className="mt-8">
              <RepositoryOverview />
            </div>
          </>
        );
    }
  };

  if (!repository) {
    return (
      <RepositoryLayout
        repository={null}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      >
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          Loading repository...
        </div>
      </RepositoryLayout>
    );
  }

  return (
    <RepositoryLayout
      repository={repository}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderWorkspace()}
    </RepositoryLayout>
  );
}