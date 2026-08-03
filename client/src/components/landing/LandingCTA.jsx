import {
  ArrowRight,
  Check,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../ui/Button";
import Container from "../ui/Container";
import {
  useMotionVariants,
  defaultViewport,
} from "../../utils/motion";

export default function LandingCTA() {
  const navigate = useNavigate();
  const { heroStagger, staggerItem, scaleIn, glowPulse } = useMotionVariants();

  return (
    <section className="relative overflow-hidden bg-[#0B0F19] py-16 sm:py-28">

      {/* Background Glow — slow opacity pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[180px] sm:h-[550px] sm:w-[550px]"
        initial={glowPulse.initial}
        animate={glowPulse.animate}
      />

      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 px-6 py-16 text-center shadow-2xl sm:rounded-3xl sm:px-10 sm:py-20">

          {/* Sequential stagger: Badge → Heading → Description → Button → Trust */}
          <motion.div
            variants={heroStagger}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >

            {/* Badge — scale + fade */}
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2"
            >
              <FaGithub size={16} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-400">
                Connect Your GitHub Repository
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={staggerItem}
              className="mx-auto mt-6 max-w-4xl text-3xl font-bold leading-tight text-white sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Transform Your Repository
              <br />
              Into Engineering Insights
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:mt-8 sm:text-lg"
            >
              Analyze architecture, detect technical debt, evaluate deployment
              readiness, and receive AI-powered engineering recommendations in
              minutes.
            </motion.p>

            {/* CTA Button — scale + stronger shadow + arrow nudge */}
            <motion.div
              variants={staggerItem}
              className="mt-10 flex justify-center sm:mt-12"
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                variants={{
                  rest: {
                    scale: 1,
                    boxShadow: "0 0px 0px 0px rgba(59, 130, 246, 0)",
                    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
                  },
                  hover: {
                    scale: 1.03,
                    y: -2,
                    boxShadow: "0 16px 40px -8px rgba(59, 130, 246, 0.45)",
                    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
                className="relative overflow-hidden"
                style={{ willChange: "transform" }}
              >
                {/* Shine animation */}
                <motion.div
                  className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  style={{ pointerEvents: "none" }}
                />
                <Button variant="primary" onClick={() => navigate("/login")}>
                  <div className="flex items-center gap-3">
                    <FaGithub size={18} />

                    <span>Get Started with GitHub</span>

                    {/* Arrow inherits hover variant from parent — nudges right */}
                    <motion.span
                      className="inline-flex"
                      variants={{
                        rest: { x: 0, transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] } },
                        hover: { x: 4, transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] } },
                      }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </div>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators — subtle hover feedback */}
            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-12 sm:gap-x-8 sm:gap-y-4"
            >
              {[
                "Free Repository Analysis",
                "Secure GitHub OAuth",
                "No Credit Card Required",
              ].map((item) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2"
                  whileHover={{
                    color: "#cbd5e1",
                    transition: { duration: 0.15 },
                  }}
                >
                  <Check size={18} className="flex-shrink-0 text-green-400" />
                  <span className="text-sm text-slate-400">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

        </div>
      </Container>
    </section>
  );
}