import { motion } from "framer-motion";
import { useMotionVariants } from "../../utils/motion";

export default function PipelineNode({
  icon: Icon,
  title,
  variant = "default",
}) {
  const { staggerItem } = useMotionVariants();
  const variants = {
    default:
      "border-slate-800 bg-slate-900/60 hover:border-blue-500/30",

    primary:
      "border-blue-500/40 bg-blue-500/10 hover:border-blue-500/60",

    success:
      "border-green-500/40 bg-green-500/10 hover:border-green-500/60",
  };

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 28px -8px rgba(59, 130, 246, 0.15)",
        transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
      }}
      className={`
        group
        w-full
        max-w-[280px]
        rounded-2xl
        border
        p-5
        transition-colors
        duration-200
        sm:max-w-xs
        sm:p-6
        ${variants[variant]}
      `}
      style={{ willChange: "transform" }}
    >
      {/* Icon */}

      <motion.div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-slate-800
          transition-all
          duration-200
          group-hover:bg-slate-700
          sm:h-16
          sm:w-16
        "
        whileHover={{ scale: 1.08, rotate: 3, transition: { duration: 0.2 } }}
      >
        <Icon
          size={26}
          className="text-blue-400 sm:text-[28px]"
        />
      </motion.div>

      {/* Title */}

      <h3 className="mt-4 text-center text-base font-semibold text-white sm:mt-5 sm:text-lg">
        {title}
      </h3>
    </motion.div>
  );
}