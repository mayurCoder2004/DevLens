import { useCallback, useEffect, useState } from "react";
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

  console.log(id);

  const [repository, setRepository] = useState(null);
const [architecture, setArchitecture] = useState(null);
const [analytics, setAnalytics] = useState(null);
const [insights, setInsights] = useState(null);
const [recommendations, setRecommendations] = useState([]);
const [technicalDebt, setTechnicalDebt] = useState(null);
const [deployment, setDeployment] = useState(null);
const [engineeringHealth, setEngineeringHealth] = useState(null);

  const [activeSection, setActiveSection] =
    useState("overview");

    const fetchTechnicalDebt = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:5000/api/technical-debt/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Technical Debt API Response:", response.data);

    setTechnicalDebt(response.data.data);
  } catch (error) {
    console.error("Technical Debt Error:", error);
  }
};

const fetchEngineeringHealth = useCallback(async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/engineering-health/${id}`
    );

    console.log("Engineering Health:", response.data);

    setEngineeringHealth(response.data.data);
  } catch (error) {
    console.error("Error fetching engineering health:", error);
  }
}, [id]);

const fetchDeployment = useCallback(async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/deployment/${id}`
    );

    setDeployment(response.data.data);
  } catch (error) {
    console.error("Error fetching deployment analysis:", error);
  }
}, [id]);

  useEffect(() => {
  fetchRepository();
  fetchArchitecture();
  fetchTechnicalDebt();
  fetchDeployment();
  fetchEngineeringHealth();
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

console.log("Architecture API Response:", response.data);

    setArchitecture(response.data.architecture);
setAnalytics(response.data.analytics);
setInsights(response.data.insights);
setRecommendations(response.data.recommendations);
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
  recommendations={recommendations}
/>
  );

      case "technical-debt":
  return (
    <RepositoryTechnicalDebt
      technicalDebt={technicalDebt}
    />
  );

      case "deployment":
  return <RepositoryDeployment deployment={deployment} />;

      case "engineering-health":
  return (
    <RepositoryEngineeringHealth
      engineeringHealth={engineeringHealth}
    />
  );

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