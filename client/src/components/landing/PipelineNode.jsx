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
        w-full
        max-w-[280px]
        rounded-2xl
        border
        p-5
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
        hover:shadow-blue-500/10
        sm:max-w-xs
        sm:p-6
        ${variants[variant]}
      `}
    >
      {/* Icon */}

      <div
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
          duration-300
          group-hover:scale-110
          group-hover:bg-slate-700
          sm:h-16
          sm:w-16
        "
      >
        <Icon
          size={26}
          className="text-blue-400 transition-transform duration-300 group-hover:rotate-6 sm:text-[28px]"
        />
      </div>

      {/* Title */}

      <h3 className="mt-4 text-center text-base font-semibold text-white sm:mt-5 sm:text-lg">
        {title}
      </h3>
    </div>
  );
}