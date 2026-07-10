import {
  FolderGit2,
  BarChart3,
  Network,
  Bug,
  Rocket,
  Activity,
  Sparkles,
  FileText,
  ArrowDown,
} from "lucide-react";

import Container from "../ui/Container";
import PipelineNode from "./PipelineNode";

export default function RepositoryPipeline() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] py-24">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[180px]" />

      <Container className="relative z-10">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">

            <span className="text-sm font-medium text-blue-400">
              Engineering Pipeline
            </span>

          </div>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Repository Analysis Pipeline
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Every repository is processed through multiple
            engineering intelligence engines before
            generating a unified AI report.
          </p>

        </div>

        {/* Pipeline */}

        <div className="mt-24 flex flex-col items-center">

          {/* Stage 1 */}

          <PipelineNode
            icon={FolderGit2}
            title="GitHub Repository"
            variant="primary"
          />

          <ArrowDown
            size={26}
            className="my-5 text-slate-600"
          />

          <PipelineNode
            icon={BarChart3}
            title="Repository Analytics"
          />

          <ArrowDown
            size={26}
            className="my-8 text-slate-600"
          />

          {/* Parallel Stage */}

          <div className="flex flex-wrap justify-center gap-8">

            <PipelineNode
              icon={Network}
              title="Architecture Review"
            />

            <PipelineNode
              icon={Bug}
              title="Technical Debt"
            />

            <PipelineNode
              icon={Rocket}
              title="Deployment Intelligence"
            />

          </div>

          <ArrowDown
            size={26}
            className="my-8 text-slate-600"
          />

          {/* Stage 3 */}

          <PipelineNode
            icon={Activity}
            title="Engineering Health"
          />

          <ArrowDown
            size={26}
            className="my-5 text-slate-600"
          />

          <PipelineNode
            icon={Sparkles}
            title="AI Repository Review"
          />

          <ArrowDown
            size={26}
            className="my-5 text-slate-600"
          />

          <PipelineNode
            icon={FileText}
            title="Engineering Report"
            variant="success"
          />

        </div>

      </Container>

    </section>
  );
}