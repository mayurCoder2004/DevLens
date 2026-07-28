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

  if (diff < 60) return "Just now";

  const minutes = Math.floor(diff / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) return "Yesterday";

  return `${days} days ago`;
};

export default function RecentActivity({
  activities,
  loading,
}) {
  return (
    <section className="mt-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Recent Activity
        </h2>

        <p className="mt-2 text-slate-400">
          Track the latest engineering events across your repositories.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-slate-400">
          Loading activities...
        </div>
      ) : activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-8 text-center">
          <Activity className="mx-auto mb-4 h-10 w-10 text-slate-500" />

          <h3 className="text-lg font-semibold text-white">
            No Activity Yet
          </h3>

          <p className="mt-2 text-slate-400">
            Start analyzing repositories to build your activity timeline.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const config =
              activityIcons[activity.type] || {
                icon: Activity,
                iconColor: "text-slate-400",
              };

            return (
              <ActivityItem
                key={activity.id}
                title={activity.title}
                repository={
                  activity.repository?.name ?? "Unknown Repository"
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