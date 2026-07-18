function CheckRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-300">{label}</span>

      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          value
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-red-500/10 text-red-400"
        }`}
      >
        {value ? "Present" : "Missing"}
      </span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
      <h3 className="mb-5 text-lg font-semibold text-white">
        {title}
      </h3>

      <div className="space-y-2">{children}</div>
    </div>
  );
}

const formatLabel = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());

export default function DeploymentConfigurationBreakdown({
  deployment,
}) {
  if (!deployment) return null;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Deployment Configuration Breakdown
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Detailed deployment configuration detected in the repository.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {/* Docker Quality */}

        <Section title="Docker Quality">
          {Object.entries(deployment.dockerQuality?.checks || {}).map(
            ([key, value]) => (
              <CheckRow
                key={key}
                label={formatLabel(key)}
                value={value}
              />
            )
          )}
        </Section>

        {/* Workflow Quality */}

        <Section title="Workflow Quality">
          {Object.entries(
            deployment.workflowQuality?.checks || {}
          ).map(([key, value]) => (
            <CheckRow
              key={key}
              label={formatLabel(key)}
              value={value}
            />
          ))}
        </Section>

        {/* Runtime Configuration */}

        <Section title="Runtime Configuration">
          {Object.entries(deployment.runtime?.checks || {}).map(
            ([key, value]) => (
              <CheckRow
                key={key}
                label={formatLabel(key)}
                value={value}
              />
            )
          )}
        </Section>

        {/* Lock Files */}

        <Section title="Lock Files">
          {Object.entries(deployment.lockFiles?.checks || {}).map(
            ([key, value]) => (
              <CheckRow
                key={key}
                label={formatLabel(key)}
                value={value}
              />
            )
          )}
        </Section>

        {/* Detected Platforms */}

        <Section title="Detected Platforms">
          <div className="flex flex-wrap gap-3">
            {(deployment.platforms?.platforms || []).length ? (
              deployment.platforms.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400"
                >
                  {platform}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-400">
                No deployment platform detected.
              </p>
            )}
          </div>
        </Section>
      </div>
    </section>
  );
}