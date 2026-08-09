import { CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Container from "../ui/Container";
import RepositoryPreview from "./RepositoryPreview";
import { GITHUB_REPO_URL } from "../../constants/urls";
import { useMotionVariants } from "../../utils/motion";

export default function Hero() {
  const navigate = useNavigate();
  const {
    heroStagger,
    staggerItem,
    scaleIn,
    heroPreview,
    glowPulse,
    CARD_HOVER,
  } = useMotionVariants();

  return (
    <section id="hero" className="relative overflow-hidden bg-[#0B0F19] py-12 sm:py-16">

      {/* Background Glow — very slow opacity pulse, almost invisible */}
      <motion.div
        className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[180px] sm:h-[600px] sm:w-[600px]"
        initial={glowPulse.initial}
        animate={glowPulse.animate}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <Container className="relative z-10">

        <div className="grid items-center gap-12 lg:min-h-[700px] lg:grid-cols-2 lg:gap-20">

          {/* ================= LEFT — staggered sequence ================= */}

          <motion.div
            className="text-center lg:text-left"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >

            {/* Badge — scale + fade */}
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 sm:px-5"
            >
              <Sparkles size={16} />
              AI-Powered Engineering Intelligence
            </motion.div>

            {/* Heading — fade up */}
            <motion.h1
              variants={staggerItem}
              className="mx-auto mt-6 max-w-2xl text-3xl font-bold leading-[1.12] tracking-tight text-white sm:mt-8 sm:text-5xl lg:mx-0 lg:text-6xl"
            >
              Engineering Intelligence
              <br />
              for Modern
              <br />
              Development Teams
            </motion.h1>

            {/* Description — fade up after heading */}
            <motion.p
              variants={staggerItem}
              className="mx-auto mt-6 max-w-lg text-base leading-7 text-slate-400 sm:mt-8 sm:text-lg sm:leading-8 lg:mx-0"
            >
              Analyze repositories, detect technical debt,
              review architecture, evaluate deployment readiness,
              analyze pull request risk, and generate AI-powered
              engineering insights from one intelligent workspace.
            </motion.p>

            {/* CTA Buttons — fade up after description */}
            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth={false}
                  onClick={() => navigate("/login")}
                  className="w-full sm:w-auto"
                >
                  Get Started with GitHub
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } }}
                className="w-full sm:w-auto"
              >
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth={false}
                    className="w-full"
                  >
                    View Live Demo
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Trust Indicators — fade up last, subtle hover feedback */}
            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-10 sm:gap-6 lg:justify-start"
            >

              {[
                "Sign in with GitHub",
                "Free Repository Analysis",
                "No Credit Card Required",
              ].map((label) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-2 text-sm text-slate-400"
                  whileHover={{ color: "#cbd5e1", transition: { duration: 0.15 } }}
                >
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                  <span>{label}</span>
                </motion.div>
              ))}

            </motion.div>

          </motion.div>

          {/* ================= RIGHT — strongest entrance ================= */}

          <motion.div
            className="flex justify-center lg:justify-end"
            variants={heroPreview}
            initial="hidden"
            animate="visible"
          >
            <RepositoryPreview />
          </motion.div>

        </div>

      </Container>

    </section>
  );
}
