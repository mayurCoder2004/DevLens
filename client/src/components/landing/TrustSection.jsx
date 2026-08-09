import {
  Sparkles,
  ShieldCheck,
  Boxes,
  Rocket,
  Bug,
  GitBranch,
} from "lucide-react";
import { motion } from "framer-motion";

import Container from "../ui/Container";
import TrustCard from "./TrustCard";
import { FaGithub } from "react-icons/fa";
import { useMotionVariants, defaultViewport } from "../../utils/motion";

const trustItems = [
  {
    icon: FaGithub,
    title: "GitHub Native",
    description: "Connect repositories securely in seconds.",
  },
  {
    icon: Sparkles,
    title: "AI Powered",
    description: "Generate intelligent engineering insights.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "OAuth authentication with secure access.",
  },
  {
    icon: Boxes,
    title: "Architecture Intelligence",
    description: "Visualize dependencies and project structure.",
  },
  {
    icon: Rocket,
    title: "Deployment Readiness",
    description: "Evaluate production readiness instantly.",
  },
  {
    icon: Bug,
    title: "Technical Debt",
    description: "Identify maintainability issues early.",
  },
];

export default function TrustSection() {
  const { fadeUp, staggerContainer } = useMotionVariants();

  return (
    <section className="bg-[#0B0F19] py-16 sm:py-24">
      <Container>
        {/* Heading — fades up on scroll */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for Modern Engineering Teams
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-400 sm:mt-6 sm:text-lg">
            AI-powered engineering intelligence across your entire software
            development lifecycle.
          </p>
        </motion.div>

        {/* Cards — stagger upward on scroll */}
        <motion.div
          className="mt-12 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {trustItems.map((item) => (
            <TrustCard key={item.title} {...item} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
