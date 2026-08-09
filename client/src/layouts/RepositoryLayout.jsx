import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu } from "lucide-react";

import Topbar from "./Topbar";
import RepositorySidebar from "../components/repository/shared/RepositorySidebar";

export default function RepositoryLayout() {
  const { repositoryId } = useParams();

  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      console.error("Failed to load repository:", err.message);
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
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <div className={`
        w-[min(18rem,calc(100vw-1rem))]
        fixed inset-y-0 left-0 z-50 lg:static lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <RepositorySidebar repository={repository} onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar with Mobile Menu Button */}
        <div className="sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white sm:left-4 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <Topbar />
        </div>

        <main
          id="main-content"
          className="min-w-0 flex-1 overflow-y-auto"
        >
          <div className="mx-auto w-full min-w-0 max-w-[1700px] p-3 sm:p-4 md:p-6 lg:p-8">
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
