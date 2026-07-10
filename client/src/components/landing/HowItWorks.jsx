import {
  FolderGit2,
  Cpu,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import Container from "../ui/Container";
import StepCard from "./StepCard";

const steps = [
  {
    step: "01",
    icon: FolderGit2,
    title: "Connect Repository",
    description:
      "Securely connect any GitHub repository using GitHub OAuth in just a few clicks.",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Analyze Repository",
    description:
      "DevLens analyzes architecture, technical debt, deployment readiness, engineering health, and repository quality.",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Receive AI Insights",
    description:
      "Receive AI-powered engineering recommendations, prioritized issues, and actionable improvements.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] py-20">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[160px]" />

      <Container className="relative z-10">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <span className="text-sm font-medium text-blue-400">
              Workflow
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white lg:text-5xl">
            How DevLens Works
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Connect any GitHub repository and receive
            AI-powered engineering intelligence in just
            a few minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative"
            >
              <StepCard {...step} />

              {index < steps.length - 1 && (
                <div className="absolute -right-7 top-1/2 hidden -translate-y-1/2 lg:block">
                  <ArrowRight
                    size={30}
                    className="text-slate-700"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}