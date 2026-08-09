import { CheckCircle, XCircle } from "lucide-react";

function CheckRow({ label, value }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
      <span className="min-w-0 text-sm text-slate-300">{label}</span>

      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
          value
            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
            : "bg-red-500/15 text-red-400 border border-red-500/30"
        }`}
      >
        {value ? (
          <>
            <CheckCircle className="h-3 w-3" />
            Present
          </>
        ) : (
          <>
            <XCircle className="h-3 w-3" />
            Missing
          </>
        )}
      </span>
    </div>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        {Icon && (
          <div className="rounded-lg bg-blue-500/10 p-2">
            <Icon className="h-5 w-5 text-blue-400" />
          </div>
        )}
        <h3 className="min-w-0 text-lg font-semibold text-white">{title}</h3>
      </div>

      <div className="space-y-1">{children}</div>
    </div>
  );
}

const formatLabel = (key) =>
  key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());

export default function DeploymentConfigurationBreakdown({ deployment }) {
  if (!deployment) return null;

  const platform =
    deployment.platforms?.platforms?.join(", ") || "None detected";

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Configuration Breakdown
        </h2>

        <p className="mt-2 text-slate-400">
          Detailed deployment configuration detected in the repository.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Docker Quality */}
        <Section title="Docker Quality">
          {Object.entries(deployment.dockerQuality?.checks || {}).map(
            ([key, value]) => (
              <CheckRow key={key} label={formatLabel(key)} value={value} />
            ),
          )}
        </Section>

        {/* Workflow Quality */}
        <Section title="Workflow Quality">
          {Object.entries(deployment.workflowQuality?.checks || {}).map(
            ([key, value]) => (
              <CheckRow key={key} label={formatLabel(key)} value={value} />
            ),
          )}
        </Section>

        {/* Runtime Configuration */}
        <Section title="Runtime Configuration">
          {Object.entries(deployment.runtime?.checks || {}).map(
            ([key, value]) => (
              <CheckRow key={key} label={formatLabel(key)} value={value} />
            ),
          )}
        </Section>

        {/* Lock Files */}
        <Section title="Lock Files">
          {Object.entries(deployment.lockFiles?.checks || {}).map(
            ([key, value]) => (
              <CheckRow key={key} label={formatLabel(key)} value={value} />
            ),
          )}
        </Section>

        {/* Detected Platforms */}
        <Section title="Detected Platforms">
          <div className="flex flex-wrap gap-3 py-2">
            {(deployment.platforms?.platforms || []).length > 0 ? (
              deployment.platforms.platforms.map((platformItem) => (
                <span
                  key={platformItem}
                  className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400"
                >
                  {platformItem}
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
