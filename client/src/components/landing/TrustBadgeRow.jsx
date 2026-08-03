import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Container from "../ui/Container";
import { useMotionVariants, defaultViewport } from "../../utils/motion";

const badges = [
  "AI Powered",
  "GitHub Native",
  "OAuth Secure",
  "Repository Intelligence",
  "Production Ready",
];

export default function TrustBadgeRow() {
  const { fadeUp, staggerContainer, staggerItem } = useMotionVariants();

  return (
    <section className="border-b border-slate-800 bg-[#0B0F19] py-8 sm:py-10">
      <Container>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {badges.map((badge) => (
            <motion.div
              key={badge}
              variants={staggerItem}
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(59, 130, 246, 0.4)",
                transition: { duration: 0.2 },
              }}
              className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 transition-colors duration-200 hover:bg-slate-900"
              style={{ willChange: "transform" }}
            >
              <Check size={14} className="text-green-400" />
              <span className="text-xs font-medium text-slate-300 sm:text-sm">
                {badge}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
