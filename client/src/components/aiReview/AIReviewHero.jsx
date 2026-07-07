const AIReviewHero = ({ repositoryName, modelUsed, createdAt }) => {
  const generatedDate = createdAt
    ? new Date(createdAt).toLocaleString()
    : "Unknown";

  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-700 p-8 text-white shadow-md transition-all duration-300 hover:shadow-xl sm:p-10">
      <div className="absolute right-0 top-0 h-40 w-40 -translate-y-16 translate-x-16 rounded-full bg-white/10" />
      <div className="absolute bottom-0 left-1/3 h-28 w-28 translate-y-14 rounded-full bg-indigo-300/20" />

      <div className="relative">
        <p className="text-sm font-semibold uppercase tracking-wider text-purple-100">
          DevLens AI Assessment
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          AI Engineering Review
        </h1>

        {repositoryName && (
          <p className="mt-3 text-lg font-medium text-purple-50 sm:text-xl">
            {repositoryName}
          </p>
        )}

        <p className="mt-4 max-w-3xl text-base leading-7 text-purple-100">
          AI-powered repository engineering assessment focused on
          maintainability, production readiness, and code quality.
        </p>

        <div className="mt-7 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-white/20 bg-white/15 px-4 py-2 font-medium text-white shadow-sm backdrop-blur">
            Model: {modelUsed || "Unknown"}
          </span>

          <span className="rounded-full border border-white/20 bg-white/15 px-4 py-2 font-medium text-white shadow-sm backdrop-blur">
            Generated: {generatedDate}
          </span>
        </div>
      </div>
    </section>
  );
};

export default AIReviewHero;
