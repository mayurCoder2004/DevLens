import {
  BrainCircuit,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

import WorkspaceActionCard from "../../dashboard/WorkspaceActionCard";

import { analyzeRepository } from "../../../services/analysis";
import { refreshRepositoryAIReview } from "../../../services/aiReview";

const actions = [
  {
    id: 1,
    title: "Analyze Repository",
    description:
      "Run the complete engineering analysis pipeline for this repository.",
    icon: BrainCircuit,
    iconColor: "text-violet-400",
    action: "analyze",
  },
  {
    id: 2,
    title: "Refresh Repository",
    description:
      "Reload the latest repository information and analysis results.",
    icon: RefreshCw,
    iconColor: "text-emerald-400",
    action: "refresh",
  },
  {
    id: 3,
    title: "Generate AI Review",
    description:
      "Generate an AI-powered engineering review for this repository.",
    icon: Sparkles,
    iconColor: "text-sky-400",
    action: "ai-review",
  },
  {
    id: 4,
    title: "Open on GitHub",
    description:
      "Open this repository directly on GitHub.",
    icon: FaGithub,
    iconColor: "text-slate-200",
    action: "github",
  },
];

export default function WorkspaceActions({
  repository,
  refreshRepository,
}) {
  const [loadingAction, setLoadingAction] =
    useState(null);

  const handleAction = async (action) => {
    try {
      setLoadingAction(action);

      switch (action) {
        case "refresh":
          await toast.promise(
            refreshRepository(),
            {
              loading: 'Refreshing repository...',
              success: 'Repository refreshed successfully!',
              error: 'Failed to refresh repository.',
            }
          );
          break;

        case "analyze":
          await toast.promise(
            (async () => {
              await analyzeRepository(repository.id);
              await refreshRepository();
            })(),
            {
              loading: 'Analyzing repository...',
              success: 'Repository analysis completed successfully!',
              error: 'Failed to analyze repository.',
            }
          );
          break;

        case "ai-review":
          await toast.promise(
            (async () => {
              await refreshRepositoryAIReview(repository.id);
              await refreshRepository();
            })(),
            {
              loading: 'Generating AI review...',
              success: 'AI Review generated successfully!',
              error: 'Failed to generate AI review.',
            }
          );
          break;

        case "github":
          window.open(
            repository.repoUrl,
            "_blank",
            "noopener,noreferrer"
          );
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);

      const errorMessage = error.response?.data?.message ?? "Failed to perform the requested action.";
      
      // Only show toast if it's not already shown by toast.promise
      if (action === "github") {
        toast.error(errorMessage);
      }
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <section className="mt-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Workspace Actions
        </h2>

        <p className="mt-2 text-slate-400">
          Perform common engineering operations for this repository.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <WorkspaceActionCard
            key={action.id}
            title={action.title}
            description={action.description}
            icon={action.icon}
            iconColor={action.iconColor}
            loading={
              loadingAction === action.action
            }
            onClick={() =>
              handleAction(action.action)
            }
            buttonText="Run Action"
            loadingText={
              action.action === "refresh"
                ? "Refreshing..."
                : action.action === "analyze"
                ? "Analyzing..."
                : action.action === "ai-review"
                ? "Generating..."
                : action.action === "github"
                ? "Opening..."
                : "Processing..."
            }
          />
        ))}
      </div>
    </section>
  );
}