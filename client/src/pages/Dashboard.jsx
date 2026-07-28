import { useEffect, useState } from "react";
import axios from "axios";

import AttentionPanel from "../components/dashboard/AttentionPanel";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardLayout from "../layouts/DashboardLayout";
import EngineeringOverview from "../components/dashboard/EngineeringOverview";
import WorkspaceActions from "../components/dashboard/WorkspaceActions";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getRecentActivities } from "../api/activity.api";
import { getDashboardOverview } from "../api/dashboard.api";

const Dashboard = () => {
  const [repos, setRepos] = useState([]);
  const [syncLoading, setSyncLoading] = useState(false);

  const [activities, setActivities] = useState([]);
  const [activityLoading, setActivityLoading] = useState(true);

  const [overview, setOverview] = useState(null);
  const [overviewLoading, setOverviewLoading] =
    useState(true);

  useEffect(() => {
    fetchRepos();
    fetchActivities();
    fetchDashboardOverview();
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

  const fetchActivities = async () => {
    try {
      setActivityLoading(true);

      const response = await getRecentActivities();

      setActivities(response.data);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setActivityLoading(false);
    }
  };

  const fetchDashboardOverview = async () => {
    try {
      setOverviewLoading(true);

      const response = await getDashboardOverview();

      setOverview(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch dashboard overview:",
        error
      );
    } finally {
      setOverviewLoading(false);
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

      await Promise.all([
        fetchRepos(),
        fetchActivities(),
        fetchDashboardOverview(),
      ]);
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
        averageScore={
          overview?.engineeringHealth?.score ?? 0
        }
        recentAnalyses={
          overview?.analyzedRepositories ?? 0
        }
        onSync={handleSync}
        syncLoading={syncLoading}
      />

      <EngineeringOverview
        overview={overview}
        loading={overviewLoading}
      />

      <AttentionPanel />

      <WorkspaceActions />

      <RecentActivity
        activities={activities}
        loading={activityLoading}
      />
    </DashboardLayout>
  );
};

export default Dashboard;