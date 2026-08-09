const inlineCodeRegex = /`([^`]+)`/g;

export default function MarkdownText({ children, className = "" }) {
  const text = typeof children === "string" ? children : "";
  const blocks = text.split(/\n{2,}/).filter(Boolean);

  if (!blocks.length) {
    return null;
  }

  return (
    <div className={`min-w-0 space-y-4 ${className}`}>
      {blocks.map((block, index) => {
        const trimmed = block.trim();

        if (trimmed.startsWith("```")) {
          return (
            <pre
              key={index}
              className="max-w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-300"
            >
              {trimmed.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "")}
            </pre>
          );
        }

        const lines = trimmed.split("\n");
        const isList = lines.every((line) => /^[-*]\s+/.test(line.trim()));

        if (isList) {
          return (
            <ul key={index} className="space-y-2">
              {lines.map((line, lineIndex) => (
                <li
                  key={lineIndex}
                  className="flex min-w-0 gap-3 text-sm leading-7 text-slate-300"
                >
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                  <span className="min-w-0 break-words">
                    {renderInline(line.replace(/^[-*]\s+/, ""))}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        if (/^#{1,3}\s+/.test(trimmed)) {
          return (
            <h3 key={index} className="text-lg font-semibold text-white">
              {trimmed.replace(/^#{1,3}\s+/, "")}
            </h3>
          );
        }

        return (
          <p
            key={index}
            className="break-words text-sm leading-7 text-slate-300"
          >
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text) {
  const parts = text.split(inlineCodeRegex);

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <code
        key={index}
        className="break-all rounded-md border border-slate-800 bg-slate-950 px-1.5 py-0.5 font-mono text-xs text-violet-300"
      >
        {part}
      </code>
    ) : (
      part
    ),
  );
}
