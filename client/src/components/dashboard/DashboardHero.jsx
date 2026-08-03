import { RefreshCw } from "lucide-react";

import Button from "../ui/Button";
import DashboardHeroStats from "./DashboardHeroStats";

export default function DashboardHero({
  totalRepositories = 0,
  averageScore = 84,
  recentAnalyses = 12,
  onSync,
  syncLoading,
  user,
}) {
  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 17) return "Good Afternoon 🌤️";

    return "Good Evening 🌙";
  };

  const userName =
    user?.firstName ||
    user?.name?.split(" ")[0] ||
    "Developer";

  return (
    <section className="mb-6 sm:mb-8">
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-4
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          p-4
          sm:gap-6
          sm:rounded-3xl
          sm:p-6
          lg:grid-cols-[1.7fr_1fr]
          lg:items-center
          lg:p-8
        "
      >
        {/* Left */}

        <div className="animate-in fade-in duration-500">
          <p className="text-sm font-medium text-blue-400">
            {greeting()}, {userName} 👋
          </p>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Engineering Intelligence
            </span>
            <br />
            Dashboard
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            {totalRepositories > 0
              ? "Monitor your repositories, identify technical debt, review engineering health, and track AI-powered engineering insights from one intelligent workspace."
              : "Connect your GitHub account to start analyzing repositories and unlock AI-powered engineering insights."}
          </p>

          <div className="mt-6">
            <Button
              variant="primary"
              onClick={onSync}
              disabled={syncLoading}
            >
              <div className="flex items-center gap-2">
                <RefreshCw
                  size={18}
                  className={
                    syncLoading
                      ? "animate-spin"
                      : ""
                  }
                />

                <span>
                  {syncLoading
                    ? "Synchronizing Repositories..."
                    : "Synchronize GitHub"}
                </span>
              </div>
            </Button>
          </div>
        </div>

        {/* Right */}

        <div className="animate-in fade-in slide-in-from-right-4 duration-700">
          <DashboardHeroStats
            totalRepositories={totalRepositories}
            averageScore={averageScore}
            recentAnalyses={recentAnalyses}
          />
        </div>
      </div>
    </section>
  );
}