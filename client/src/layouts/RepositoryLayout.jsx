import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Topbar from "../components/layouts/Topbar";
import RepositorySidebar from "../components/repository/RepositorySidebar";

export default function RepositoryLayout() {
  const { repositoryId } = useParams();

  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRepository = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/repositories/${repositoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRepository(data.repository);
    } catch (err) {
      console.error("Failed to load repository:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshRepository = async () => {
    await fetchRepository();
  };

  useEffect(() => {
    setLoading(true);
    fetchRepository();
  }, [repositoryId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0F19] text-slate-300">
        Loading repository...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0B0F19]">
      <RepositorySidebar repository={repository} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1700px] p-8">
            <Outlet
              context={{
                repository,
                refreshRepository,
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}