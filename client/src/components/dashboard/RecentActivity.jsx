import {
  Activity,
  Bug,
  FolderSync,
  Rocket,
  Sparkles,
} from "lucide-react";

import ActivityItem from "./ActivityItem";

const activities = [
  {
    id: 1,
    title: "AI Review Generated",
    repository: "ChefMate",
    description:
      "Generated a comprehensive AI engineering review for the repository.",
    time: "2 minutes ago",
    icon: Sparkles,
    iconColor: "text-violet-400",
  },
  {
    id: 2,
    title: "Repository Synced",
    repository: "Travel Planner",
    description:
      "Latest commits and repository metadata were synchronized.",
    time: "18 minutes ago",
    icon: FolderSync,
    iconColor: "text-blue-400",
  },
  {
    id: 3,
    title: "Technical Debt Updated",
    repository: "Expense Tracker",
    description:
      "Technical debt analysis detected new maintainability issues.",
    time: "1 hour ago",
    icon: Bug,
    iconColor: "text-orange-400",
  },
  {
    id: 4,
    title: "Deployment Analysis Completed",
    repository: "Portfolio",
    description:
      "Deployment readiness report has been successfully generated.",
    time: "Yesterday",
    icon: Rocket,
    iconColor: "text-emerald-400",
  },
];

export default function RecentActivity() {
  return (
    <section className="mt-12">
      {/* Section Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Recent Activity
        </h2>

        <p className="mt-2 text-slate-400">
          Track the latest engineering events across your repositories.
        </p>
      </div>

      {/* Activity Feed */}

      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            title={activity.title}
            repository={activity.repository}
            description={activity.description}
            time={activity.time}
            icon={activity.icon}
            iconColor={activity.iconColor}
          />
        ))}
      </div>
    </section>
  );
}