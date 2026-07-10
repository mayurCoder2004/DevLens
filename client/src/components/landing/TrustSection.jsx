import {
  Sparkles,
  ShieldCheck,
  Boxes,
  Rocket,
  Bug,
  GitBranch,
} from "lucide-react";

import Container from "../ui/Container";
import TrustCard from "./TrustCard";
import { FaGithub } from "react-icons/fa";

const trustItems = [
    {
      icon: FaGithub,
      title: "GitHub Native",
      description:
        "Connect repositories securely in seconds.",
    },
    {
      icon: Sparkles,
      title: "AI Powered",
      description:
        "Generate intelligent engineering insights.",
    },
    {
      icon: ShieldCheck,
      title: "Secure",
      description:
        "OAuth authentication with secure access.",
    },
    {
      icon: Boxes,
      title: "Architecture Intelligence",
      description:
        "Visualize dependencies and project structure.",
    },
    {
      icon: Rocket,
      title: "Deployment Readiness",
      description:
        "Evaluate production readiness instantly.",
    },
    {
      icon: Bug,
      title: "Technical Debt",
      description:
        "Identify maintainability issues early.",
    },
  ];

export default function TrustSection() {

  return (
  <section className="bg-[#0B0F19] py-24">
    <Container>

      <div className="mx-auto max-w-3xl text-center">

        <h2 className="text-4xl font-bold tracking-tight text-white">
          Built for Modern Engineering Teams
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-400">
          AI-powered engineering intelligence across
          your entire software development lifecycle.
        </p>

      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {trustItems.map((item) => (
          <TrustCard
            key={item.title}
            {...item}
          />
        ))}

      </div>

    </Container>
  </section>
);
}