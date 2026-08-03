import {
  Activity,
  Bug,
  FolderSync,
  GitPullRequest,
  HeartPulse,
  Network,
  Rocket,
  Sparkles,
} from "lucide-react";

import ActivityItem from "./ActivityItem";

const activityIcons = {
  REPOSITORY_SYNC: {
    icon: FolderSync,
    iconColor: "text-blue-400",
  },
  AI_REVIEW: {
    icon: Sparkles,
    iconColor: "text-violet-400",
  },
  ARCHITECTURE: {
    icon: Network,
    iconColor: "text-cyan-400",
  },
  TECHNICAL_DEBT: {
    icon: Bug,
    iconColor: "text-orange-400",
  },
  ENGINEERING_HEALTH: {
    icon: HeartPulse,
    iconColor: "text-green-400",
  },
  DEPLOYMENT: {
    icon: Rocket,
    iconColor: "text-emerald-400",
  },
  PULL_REQUEST: {
    icon: GitPullRequest,
    iconColor: "text-pink-400",
  },
};

const formatTime = (date) => {
  const now = new Date();
  const created = new Date(date);

  const diff = Math.floor((now - created) / 1000);

  if (diff < 60) {
    return "Just now";
  }

  const minutes = Math.floor(diff / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "Yesterday";
  }

  return `${days} days ago`;
};

export default function RecentActivity({
  activities,
  loading,
}) {
  return (
    <section className="mt-10">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Activity
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Track the latest engineering events across your repositories.
          </p>
        </div>

        <span
          className="
            inline-flex
            w-fit
            rounded-full
            border
            border-violet-500/20
            bg-violet-500/10
            px-3
            py-1
            text-xs
            font-medium
            text-violet-400
          "
        >
          {activities.length} Recent Event
          {activities.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                h-24
                animate-pulse
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
              "
            />
          ))}
        </div>
      ) : activities.length === 0 ? (
        /* Empty State */

        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-10 text-center">
          <Activity className="mx-auto mb-4 h-12 w-12 text-slate-500" />

          <h3 className="text-xl font-semibold text-white">
            No Activity Yet
          </h3>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
            Repository activity will appear here after you
            synchronize repositories and run engineering
            analyses.
          </p>
        </div>
      ) : (
        /* Timeline */

        <div className="space-y-5">
          {activities.map((activity) => {
            const config =
              activityIcons[activity.type] ?? {
                icon: Activity,
                iconColor: "text-slate-400",
              };

            return (
              <ActivityItem
                key={activity.id}
                title={activity.title}
                repository={
                  activity.repository?.name ??
                  "Unknown Repository"
                }
                description={activity.description}
                time={formatTime(activity.createdAt)}
                icon={config.icon}
                iconColor={config.iconColor}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}