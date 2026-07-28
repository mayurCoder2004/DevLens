import { useEffect, useState } from "react";
import axios from "axios";

import AttentionPanel from "../components/dashboard/AttentionPanel";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardLayout from "../layouts/DashboardLayout";
import EngineeringOverview from "../components/dashboard/EngineeringOverview";
import WorkspaceActions from "../components/dashboard/WorkspaceActions";
import RecentActivity from "../components/dashboard/RecentActivity";

const Dashboard = () => {
  const [repos, setRepos] = useState([]);
  const [syncLoading, setSyncLoading] = useState(false);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/repositories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRepos(response.data.repositories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSync = async () => {
    try {
      setSyncLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/repositories/sync",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchRepos();
    } catch (error) {
      console.error("Repository sync failed:", error);
      alert("Failed to synchronize GitHub repositories.");
    } finally {
      setSyncLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardHero
        totalRepositories={repos.length}
        averageScore={84}
        recentAnalyses={repos.length}
        onSync={handleSync}
        syncLoading={syncLoading}
      />

      <EngineeringOverview />

      <AttentionPanel />

      <WorkspaceActions />

      <RecentActivity />
    </DashboardLayout>
  );
};

export default Dashboard;