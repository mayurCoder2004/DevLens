const EngineeringSummaryCard = ({ summary }) => {
    return (
        <section className="rounded-xl border-l-4 border-blue-500 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-gray-950">
                Engineering Summary
            </h2>

            <p className="text-lg leading-9 text-gray-700">
                {summary}
            </p>
        </section>
    );
};

export default EngineeringSummaryCard;
