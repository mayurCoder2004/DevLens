import { motion } from "framer-motion";
import { useMotionVariants } from "../../utils/motion";

export default function StepCard({
  icon: Icon,
  step,
  title,
  description,
}) {
  const { staggerItem } = useMotionVariants();

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{
        y: -4,
        boxShadow: "0 16px 32px -8px rgba(59, 130, 246, 0.12)",
        borderColor: "rgba(59, 130, 246, 0.3)",
        transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
      }}
      className="
        group
        relative
        h-full
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/40
        p-8
        text-center
        transition-colors
        duration-200
        hover:bg-slate-900
      "
      style={{ willChange: "transform, box-shadow" }}
    >
      {/* Step Badge */}
      <div className="mb-8 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5">
        <span className="text-sm font-semibold tracking-wide text-blue-400">
          {step}
        </span>
      </div>

      {/* Icon */}
      <motion.div
        className="
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-2xl
          bg-blue-500/10
          transition-colors
          duration-200
          group-hover:bg-blue-500/20
        "
        whileHover={{ scale: 1.08, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } }}
      >
        <Icon size={34} className="text-blue-400" />
      </motion.div>

      {/* Title */}
      <h3 className="mt-8 text-xl font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 text-sm leading-7 text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}