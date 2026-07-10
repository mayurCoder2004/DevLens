import {
  Cpu,
  Sparkles,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { motion } from "framer-motion";

import Container from "../ui/Container";
import StepCard from "./StepCard";
import { FaGithub } from "react-icons/fa";
import {
  useMotionVariants,
  defaultViewport,
} from "../../utils/motion";

const steps = [
  {
    step: "01",
    icon: FaGithub,
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
  const { fadeUp, staggerContainer, staggerItem } = useMotionVariants();
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] py-16 sm:py-20">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[160px] sm:h-[500px] sm:w-[500px]" />

      <Container className="relative z-10">

        {/* Heading — fades up on scroll */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <span className="text-sm font-medium text-blue-400">
              Workflow
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How DevLens Works
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-400 sm:mt-6 sm:text-lg">
            Connect any GitHub repository and receive
            AI-powered engineering intelligence in just
            a few minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-14 sm:mt-20">

          {/* Mobile: vertical stack with stagger + down arrows */}
          <motion.div
            className="flex flex-col items-center gap-0 lg:hidden"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={staggerItem}
                className="flex w-full max-w-lg flex-col items-center"
              >
                <StepCard {...step} />
                {index < steps.length - 1 && (
                  <ArrowDown size={28} className="my-4 text-slate-700" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop: 3-column grid with stagger + right arrows */}
          <motion.div
            className="hidden lg:grid lg:grid-cols-3 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
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
          </motion.div>

        </div>
      </Container>
    </section>
  );
}