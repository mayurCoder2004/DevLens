export default function PipelineNode({
  icon: Icon,
  title,
  variant = "default",
}) {
  const variants = {
    default:
      "border-slate-800 bg-slate-900/60 hover:border-blue-500/40",

    primary:
      "border-blue-500/40 bg-blue-500/10",

    success:
      "border-green-500/40 bg-green-500/10",
  };

  return (
    <div
      className={`
        group
        w-72
        rounded-2xl
        border
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
        hover:shadow-blue-500/10
        ${variants[variant]}
      `}
    >
      {/* Icon */}

      <div
        className="
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-slate-800
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:bg-slate-700
        "
      >
        <Icon
          size={28}
          className="text-blue-400 transition-transform duration-300 group-hover:rotate-6"
        />
      </div>

      {/* Title */}

      <h3 className="mt-5 text-center text-lg font-semibold text-white">
        {title}
      </h3>
    </div>
  );
}