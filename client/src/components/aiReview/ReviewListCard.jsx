const ReviewListCard = ({ title, icon, items }) => {
    const isStrengths = title === "Strengths";
    const isWeaknesses = title === "Weaknesses";
    const isRecommendations = title === "Recommendations";

    const accentClass = isStrengths
        ? "border-green-500"
        : isWeaknesses
          ? "border-amber-500"
          : isRecommendations
            ? "border-blue-500"
            : "border-slate-300";

    const indicatorClass = isStrengths
        ? "bg-green-100 text-green-700 ring-green-200"
        : isWeaknesses
          ? "bg-amber-100 text-amber-700 ring-amber-200"
          : isRecommendations
            ? "bg-blue-100 text-blue-700 ring-blue-200"
            : "bg-slate-100 text-slate-700 ring-slate-200";

    return (
        <section
            className={`h-full rounded-xl border-l-4 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${accentClass}`}
        >
            <h2 className="mb-5 flex items-center gap-3 text-2xl font-semibold tracking-tight text-gray-950">
                {icon && (
                    <span className="text-xl leading-none" aria-hidden="true">
                        {icon}
                    </span>
                )}
                <span>{title}</span>
            </h2>

            <ul className="space-y-5">
                {items?.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-4 text-base leading-7 text-gray-700"
                    >
                        <span
                            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-1 ${indicatorClass}`}
                            aria-hidden="true"
                        >
                            {isRecommendations
                                ? index + 1
                                : isStrengths
                                  ? "\u2713"
                                  : isWeaknesses
                                    ? "!"
                                    : "\u2022"}
                        </span>

                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ReviewListCard;
