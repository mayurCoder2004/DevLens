import { RefreshCw } from "lucide-react";

import Button from "../ui/Button";
import DashboardHeroStats from "./DashboardHeroStats";

export default function DashboardHero({
  totalRepositories = 0,
  averageScore = 84,
  recentAnalyses = 12,
  onSync,
  syncLoading,
}) {
  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  return (
    <section className="mb-8">
      <div
        className="
          mx-auto
          max-w-7xl
          grid
          gap-6
          rounded-3xl
          border
          border-slate-800
          bg-slate-900
          p-6
          lg:grid-cols-[1.7fr_1fr]
          lg:items-center
          lg:p-8
        "
      >
        {/* Left */}

        <div>
          <p className="text-sm font-medium text-blue-400">
            {greeting()}, Mayur 👋
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
            Engineering Intelligence Dashboard
          </h1>

          <p className="mt-3 max-w-[650px] text-base leading-7 text-slate-400">
            Monitor your repositories, identify technical debt,
            review engineering health, and track AI-powered
            engineering insights from one workspace.
          </p>

          <div className="mt-5">
            <Button
              variant="primary"
              onClick={onSync}
              disabled={syncLoading}
            >
              <div className="flex items-center gap-2">
                <RefreshCw
                  size={18}
                  className={syncLoading ? "animate-spin" : ""}
                />

                <span>
                  {syncLoading
                    ? "Syncing GitHub..."
                    : "Sync GitHub"}
                </span>
              </div>
            </Button>
          </div>
        </div>

        {/* Right */}

        <DashboardHeroStats
          totalRepositories={totalRepositories}
          averageScore={averageScore}
          recentAnalyses={recentAnalyses}
        />
      </div>
    </section>
  );
}