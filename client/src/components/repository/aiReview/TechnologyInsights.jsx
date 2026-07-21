import {
  Database,
  Box,
  Server,
  Cpu,
  Layers,
  Container,
} from "lucide-react";

import TechnologyCard from "./TechnologyCard";

const technologies = [
  {
    name: "React",
    category: "Frontend Framework",
    icon: Layers,
    insight:
      "The frontend follows a component-based architecture with clear separation of reusable UI elements, improving maintainability and scalability.",
  },
  {
    name: "Node.js",
    category: "Backend Runtime",
    icon: Server,
    insight:
      "The backend is modular and organized into services and controllers, making the application easier to extend as new features are added.",
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: Database,
    insight:
      "The document-based data model provides flexibility, though indexing and query optimization should be monitored as the dataset grows.",
  },
  {
    name: "Redis",
    category: "Caching",
    icon: Cpu,
    insight:
      "Redis improves application responsiveness through caching and background job processing, reducing unnecessary workload on the database.",
  },
  {
    name: "Docker",
    category: "Containerization",
    icon: Container,
    insight:
      "Containerization provides deployment consistency. Multi-stage builds and slimmer base images can further optimize image size.",
  },
  {
    name: "Kubernetes",
    category: "Orchestration",
    icon: Box,
    insight:
      "Kubernetes manifests follow a clean deployment structure. Adding readiness probes and resource limits would improve production resilience.",
  },
];

export default function TechnologyInsights() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Technology Insights
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          AI-generated observations about the technologies
          detected in the repository and opportunities for
          optimization.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {technologies.map((technology) => (
          <TechnologyCard
            key={technology.name}
            {...technology}
          />
        ))}
      </div>
    </section>
  );
}