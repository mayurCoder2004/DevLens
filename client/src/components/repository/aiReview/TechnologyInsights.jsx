import { Database, Box, Server, Cpu, Layers, Container } from "lucide-react";

import TechnologyCard from "./TechnologyCard";

const technologyIcons = {
  React: Layers,
  "Node.js": Server,
  Node: Server,
  Express: Server,
  MongoDB: Database,
  PostgreSQL: Database,
  MySQL: Database,
  Redis: Cpu,
  Docker: Container,
  Kubernetes: Box,
};

export default function TechnologyInsights({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Technology Insights
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          AI-generated observations about the technologies detected in the
          repository and opportunities for optimization.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {data.map((technology) => (
          <TechnologyCard
            key={technology.name}
            icon={technologyIcons[technology.name] || Layers}
            name={technology.name}
            category={technology.category}
            insight={technology.insight}
          />
        ))}
      </div>
    </section>
  );
}
