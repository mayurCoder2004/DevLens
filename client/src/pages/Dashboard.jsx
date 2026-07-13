import { useEffect, useState } from "react";
import axios from "axios";

import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {
  const [repos, setRepos] = useState([]);

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
        },
      );

      setRepos(response.data.repositories);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      {/* Hero Section */}

      <DashboardHero
        totalRepositories={repos.length}
        averageScore={84}
        recentAnalyses={repos.length}
      />

      {/* Temporary Content */}

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Your Repositories
        </h2>

        {repos.length === 0 ? (
          <p className="text-slate-400">
            No repositories found.
          </p>
        ) : (
          <div className="space-y-4">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition-colors hover:border-blue-500/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {repo.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {repo.language || "Unknown Language"}
                    </p>
                  </div>

                  <a
                    href={`/repository/${repo.id}`}
                    className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/20"
                  >
                    Open Workspace
                  </a>
                </div>

                <div className="mt-4 flex gap-6 text-sm text-slate-400">
                  <span>⭐ {repo.stars}</span>

                  <span>
                    Updated{" "}
                    {new Date(repo.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;