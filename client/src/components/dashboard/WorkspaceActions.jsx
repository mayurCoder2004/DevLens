import {
  Activity,
  Rocket,
  Sparkles,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import WorkspaceActionCard from "./WorkspaceActionCard";

const actions = [
  {
    id: 1,
    title: "Sync GitHub",
    description:
      "Synchronize repositories and fetch the latest commits and metadata.",
    icon: FaGithub,
    iconColor: "text-slate-200",
    to: "/repositories",
  },
  {
    id: 2,
    title: "Generate AI Review",
    description:
      "Run an AI-powered engineering review for a selected repository.",
    icon: Sparkles,
    iconColor: "text-violet-400",
    to: "/ai-review",
  },
  {
    id: 3,
    title: "Engineering Health",
    description:
      "Review engineering quality metrics across your repositories.",
    icon: Activity,
    iconColor: "text-emerald-400",
    to: "/engineering-health",
  },
  {
    id: 4,
    title: "Deployment Report",
    description:
      "Analyze deployment readiness and infrastructure quality.",
    icon: Rocket,
    iconColor: "text-sky-400",
    to: "/deployment",
  },
];

export default function WorkspaceActions() {
  return (
    <section className="mt-12">
      {/* Section Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Workspace Actions
        </h2>

        <p className="mt-2 text-slate-400">
          Launch common engineering workflows from one place.
        </p>
      </div>

      {/* Actions Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <WorkspaceActionCard
            key={action.id}
            title={action.title}
            description={action.description}
            icon={action.icon}
            iconColor={action.iconColor}
            to={action.to}
          />
        ))}
      </div>
    </section>
  );
}