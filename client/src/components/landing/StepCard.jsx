export default function StepCard({
  icon: Icon,
  step,
  title,
  description,
}) {
  return (
    <div
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
        transition-all
        duration-300
        hover:-translate-y-3
        hover:border-blue-500/40
        hover:bg-slate-900
        hover:shadow-xl
        hover:shadow-blue-500/10
      "
    >
      {/* Step Badge */}
      <div className="mb-8 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5">
        <span className="text-sm font-semibold tracking-wide text-blue-400">
          {step}
        </span>
      </div>

      {/* Icon */}
      <div
        className="
          mx-auto
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-2xl
          bg-blue-500/10
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:bg-blue-500/20
        "
      >
        <Icon
          size={34}
          className="
            text-blue-400
            transition-transform
            duration-300
            group-hover:rotate-3
          "
        />
      </div>

      {/* Title */}
      <h3 className="mt-8 text-xl font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 text-sm leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}