import { motion } from "framer-motion";
import { useMotionVariants } from "../../utils/motion";

export default function TrustCard({
  icon: Icon,
  title,
  description,
}) {
  const { staggerItem } = useMotionVariants();
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.12)",
        borderColor: "rgba(59, 130, 246, 0.35)",
        transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
      }}
      className="
        group
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/60
        p-6
        transition-colors
        duration-300
        hover:bg-slate-900
      "
    >
      {/* Icon */}
      <div
        className="
          mb-6
          inline-flex
          rounded-xl
          bg-blue-500/10
          p-3
          transition-colors
          duration-300
          group-hover:bg-blue-500/20
        "
      >
        <Icon
          size={24}
          className="text-blue-400"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-7 text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}