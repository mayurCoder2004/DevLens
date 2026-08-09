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
import { motion } from "framer-motion";

import Container from "../ui/Container";
import PipelineNode from "./PipelineNode";
import { useMotionVariants, defaultViewport } from "../../utils/motion";

export default function RepositoryPipeline() {
  const { fadeUp, staggerContainer, staggerItem } = useMotionVariants();
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] py-16 sm:py-24">
      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[180px] sm:h-[650px] sm:w-[650px]" />

      <Container className="relative z-10">
        {/* Heading — fades up on scroll */}

        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          <div className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <span className="text-sm font-medium text-blue-400">
              Engineering Pipeline
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Repository Analysis Pipeline
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-400 sm:mt-6 sm:text-lg">
            Every repository is processed through multiple engineering
            intelligence engines before generating a unified AI report.
          </p>
        </motion.div>

        {/* Pipeline — nodes stagger upward on scroll */}

        <motion.div
          className="mt-16 flex flex-col items-center sm:mt-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {/* Stage 1 */}

          <PipelineNode
            icon={FolderGit2}
            title="GitHub Repository"
            variant="primary"
          />

          <motion.div
            variants={staggerItem}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <ArrowDown size={26} className="my-3 text-slate-600 sm:my-4" />
          </motion.div>

          <PipelineNode icon={BarChart3} title="Repository Analytics" />

          <motion.div
            variants={staggerItem}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.3,
            }}
          >
            <ArrowDown size={26} className="my-4 text-slate-600 sm:my-5" />
          </motion.div>

          {/* Parallel Stage */}

          <div className="flex w-full max-w-2xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6 lg:gap-8">
            <PipelineNode icon={Network} title="Architecture Review" />

            <PipelineNode icon={Bug} title="Technical Debt" />

            <PipelineNode icon={Rocket} title="Deployment Intelligence" />
          </div>

          <motion.div
            variants={staggerItem}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.6,
            }}
          >
            <ArrowDown size={26} className="my-4 text-slate-600 sm:my-5" />
          </motion.div>

          {/* Stage 3 */}

          <PipelineNode icon={Activity} title="Engineering Health" />

          <motion.div
            variants={staggerItem}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.9,
            }}
          >
            <ArrowDown size={26} className="my-3 text-slate-600 sm:my-4" />
          </motion.div>

          <PipelineNode icon={Sparkles} title="AI Repository Review" />

          <motion.div
            variants={staggerItem}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1.2,
            }}
          >
            <ArrowDown size={26} className="my-3 text-slate-600 sm:my-4" />
          </motion.div>

          <PipelineNode
            icon={FileText}
            title="Engineering Report"
            variant="success"
          />
        </motion.div>
      </Container>
    </section>
  );
}
