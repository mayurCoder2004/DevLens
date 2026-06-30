import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  AlertCircle,
  AlertTriangle,
  Boxes,
  Check,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Cpu,
  GitBranch,
  Hammer,
  Layers3,
  Lightbulb,
  Loader2,
  PackageCheck,
  RefreshCw,
  Rocket,
  Server,
  Settings,
  TerminalSquare,
  X,
  XCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const metricDescriptions = {
  Infrastructure: "Repository infrastructure signals and deployment assets.",
  Configuration: "Environment, config files, and production settings.",
  "Build Readiness": "Build scripts, dependency setup, and release readiness.",
  "CI/CD": "Automation coverage for delivery and validation.",
};

const dockerChecklist = [
  ["dockerfile", "Dockerfile Found"],
  ["baseImage", "Base Image"],
  ["workdir", "WORKDIR"],
  ["copy", "COPY"],
  ["expose", "EXPOSE"],
  ["cmd", "CMD"],
  ["multiStage", "Multi-stage Build"],
];

const workflowChecklist = [
  ["build", "Build Workflow"],
  ["test", "Test Workflow"],
  ["deploy", "Deployment Workflow"],
];

const runtimeChecklist = [
  ["nodeVersion", "Node"],
  ["pythonVersion", "Python"],
  ["javaVersion", "Java"],
  ["rubyVersion", "Ruby"],
  ["toolVersions", "Tool Versions"],
];

const lockFileChecklist = [
  ["packageLock", "package-lock.json"],
  ["yarnLock", "yarn.lock"],
  ["pnpmLock", "pnpm-lock.yaml"],
  ["bunLock", "bun.lockb"],
];

function clampScore(score) {
  const parsed = Number(score) || 0;
  return Math.max(0, Math.min(100, parsed));
}

function getScoreTone(score) {
  const value = clampScore(score);

  if (value >= 80) {
    return {
      bar: "bg-emerald-500",
      text: "text-emerald-700",
      badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      subtle: "from-emerald-50 to-white",
      label: "Healthy",
      icon: CheckCircle2,
    };
  }

  if (value >= 50) {
    return {
      bar: "bg-amber-500",
      text: "text-amber-700",
      badge: "bg-amber-50 text-amber-700 ring-amber-200",
      subtle: "from-amber-50 to-white",
      label: "Needs attention",
      icon: AlertTriangle,
    };
  }

  return {
    bar: "bg-rose-500",
    text: "text-rose-700",
    badge: "bg-rose-50 text-rose-700 ring-rose-200",
    subtle: "from-rose-50 to-white",
    label: "At risk",
    icon: XCircle,
  };
}

function formatDateTime(value) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function humanizeKey(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

function StatusBadge({ score, children }) {
  const tone = getScoreTone(score);
  const Icon = tone.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ring-1 ${tone.badge}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children || tone.label}
    </span>
  );
}

function ProgressBar({ score, height = "h-2.5" }) {
  const value = clampScore(score);
  const tone = getScoreTone(value);

  return (
    <div className={`${height} overflow-hidden rounded-full bg-slate-200`}>
      <div
        className={`h-full rounded-full ${tone.bar} transition-all duration-1000 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function HeroSection({ deployment, onReanalyze, analyzing }) {
  const score = clampScore(deployment.deploymentScore);
  const tone = getScoreTone(score);
  const lastAnalyzed = formatDateTime(deployment.updatedAt);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className={`bg-gradient-to-br ${tone.subtle} p-6 sm:p-8 lg:p-10`}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
              <Server className="h-4 w-4" aria-hidden="true" />
              Deployment Intelligence
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Deployment Intelligence
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Production readiness, delivery quality, and deployment risk in one
              focused dashboard.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <StatusBadge score={score}>
                {deployment.deploymentStatus || tone.label}
              </StatusBadge>

              {lastAnalyzed && (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                  Last analyzed {lastAnalyzed}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm sm:min-w-72">
            <div className="flex w-full items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">
                  Deployment score
                </p>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-6xl font-bold tracking-tight text-slate-950">
                    {score}
                  </span>
                  <span className="mb-2 text-xl font-semibold text-slate-400">
                    /100
                  </span>
                </div>
              </div>

              <span className="rounded-2xl bg-slate-950 p-3 text-white shadow-sm">
                <Rocket className="h-7 w-7" aria-hidden="true" />
              </span>
            </div>

            <div className="w-full">
              <ProgressBar score={score} height="h-3" />
            </div>

            <button
              type="button"
              onClick={onReanalyze}
              disabled={analyzing}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {analyzing ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
              )}
              {analyzing ? "Reanalyzing..." : "Reanalyze Repository"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ icon: Icon, value, label, gradient }) {
  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${gradient} p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-xl bg-white/80 p-2.5 text-slate-700 ring-1 ring-slate-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-3xl font-bold tracking-tight text-slate-950">
          {value}
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-600">{label}</p>
    </article>
  );
}

function MetricCard({ title, score, icon: Icon, description }) {
  const value = clampScore(score);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-xl bg-slate-50 p-3 text-slate-800 ring-1 ring-slate-200">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <StatusBadge score={value} />
      </div>

      <div className="mt-6">
        <h3 className="text-base font-semibold text-slate-800">{title}</h3>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-5xl font-bold tracking-tight text-slate-950">
            {value}
          </span>
          <span className="mb-1.5 text-sm font-semibold text-slate-400">
            /100
          </span>
        </div>
      </div>

      <div className="mt-5">
        <ProgressBar score={value} />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}

function PlatformCard({ platforms }) {
  const items = Array.isArray(platforms) ? platforms : [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-sky-50 p-2.5 text-sky-700 ring-1 ring-sky-100">
            <Layers3 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Deployment Platforms
            </h2>
            <p className="text-sm text-slate-500">
              Hosting and release targets detected in this repository.
            </p>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={CircleDashed}
          title="No deployment platforms found."
          compact
        />
      ) : (
        <div className="mt-6 flex flex-wrap gap-3">
          {items.map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-200"
            >
              <Rocket className="h-4 w-4" aria-hidden="true" />
              {platform}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

function ChecklistIcon({ value }) {
  if (value === true) {
    return (
      <span className="rounded-full bg-emerald-50 p-1.5 text-emerald-700 ring-1 ring-emerald-200">
        <Check className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }

  if (value === "warning") {
    return (
      <span className="rounded-full bg-amber-50 p-1.5 text-amber-700 ring-1 ring-amber-200">
        <AlertCircle className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span className="rounded-full bg-slate-100 p-1.5 text-slate-500 ring-1 ring-slate-200">
      <X className="h-4 w-4" aria-hidden="true" />
    </span>
  );
}

function ChecklistCard({
  title,
  subtitle,
  score,
  checks,
  checklist,
  icon: Icon,
  strengths,
  warnings,
  criticalIssues,
}) {
  const safeChecks = checks || {};
  const primaryKeys = new Set(checklist.map(([key]) => key));
  const additionalChecks = Object.keys(safeChecks)
    .filter((key) => !primaryKeys.has(key))
    .map((key) => [key, humanizeKey(key)]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-slate-50 p-3 text-slate-800 ring-1 ring-slate-200">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-950">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>
          </div>
        </div>

        <div className="min-w-32">
          <div className="flex items-end justify-end gap-1">
            <span className="text-3xl font-bold tracking-tight text-slate-950">
              {clampScore(score)}
            </span>
            <span className="mb-1 text-sm font-semibold text-slate-400">
              /100
            </span>
          </div>
          <div className="mt-2">
            <ProgressBar score={score} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {checklist.map(([key, label]) => (
          <div
            key={key}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <span className="text-sm font-semibold text-slate-700">
              {label}
            </span>
            <ChecklistIcon value={Boolean(safeChecks[key])} />
          </div>
        ))}
      </div>

      {additionalChecks.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-bold text-slate-800">
            Additional Checks
          </h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {additionalChecks.map(([key, label]) => (
              <span
                key={key}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ${
                  safeChecks[key]
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : "bg-slate-100 text-slate-500 ring-slate-200"
                }`}
              >
                {safeChecks[key] ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <X className="h-4 w-4" aria-hidden="true" />
                )}
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      <MiniFindings
        strengths={strengths}
        warnings={warnings}
        criticalIssues={criticalIssues}
      />
    </section>
  );
}

function MiniFindings({ strengths, warnings, criticalIssues }) {
  const groups = [
    {
      title: "Strengths",
      items: strengths,
      icon: CheckCircle2,
      className: "text-emerald-700",
    },
    {
      title: "Warnings",
      items: warnings,
      icon: AlertTriangle,
      className: "text-amber-700",
    },
    {
      title: "Critical Issues",
      items: criticalIssues,
      icon: XCircle,
      className: "text-rose-700",
    },
  ].filter((group) => group.items?.length);

  if (groups.length === 0) return null;

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      {groups.map((group) => {
        const Icon = group.icon;

        return (
          <div key={group.title} className="rounded-xl bg-slate-50 p-4">
            <h3
              className={`mb-3 flex items-center gap-2 text-sm font-bold ${group.className}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-sm leading-6 text-slate-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function DetectionGrid({
  title,
  subtitle,
  icon: Icon,
  checks,
  items,
  strengths,
  warnings,
  criticalIssues,
}) {
  const safeChecks = checks || {};

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="rounded-xl bg-slate-50 p-3 text-slate-800 ring-1 ring-slate-200">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {items.map(([key, label]) => {
          const detected = Boolean(safeChecks[key]);

          return (
            <span
              key={key}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 ${
                detected
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                  : "bg-slate-100 text-slate-500 ring-slate-200"
              }`}
            >
              {detected ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <X className="h-4 w-4" aria-hidden="true" />
              )}
              {label}
            </span>
          );
        })}
      </div>

      <MiniFindings
        strengths={strengths}
        warnings={warnings}
        criticalIssues={criticalIssues}
      />
    </section>
  );
}

function EmptyState({ icon: Icon, title, compact = false }) {
  return (
    <div
      className={`mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center ${
        compact ? "px-4 py-6" : "px-6 py-10"
      }`}
    >
      <Icon className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
      <p className="mt-3 text-sm font-semibold text-slate-600">{title}</p>
    </div>
  );
}

function ListCard({ title, items, icon: Icon, tone, emptyText }) {
  const safeItems = Array.isArray(items) ? items : [];
  const toneClasses = {
    green: {
      icon: "bg-emerald-50 text-emerald-700 ring-emerald-100",
      card: "hover:border-emerald-200",
      marker: "text-emerald-600",
    },
    amber: {
      icon: "bg-amber-50 text-amber-700 ring-amber-100",
      card: "hover:border-amber-200",
      marker: "text-amber-600",
    },
    red: {
      icon: "bg-rose-50 text-rose-700 ring-rose-100",
      card: "hover:border-rose-200",
      marker: "text-rose-600",
    },
    blue: {
      icon: "bg-sky-50 text-sky-700 ring-sky-100",
      card: "hover:border-sky-200",
      marker: "text-sky-600",
    },
  }[tone];

  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${toneClasses.card}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`rounded-xl p-2.5 ring-1 ${toneClasses.icon}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
          {safeItems.length}
        </span>
      </div>

      {safeItems.length === 0 ? (
        <EmptyState icon={CheckCircle2} title={emptyText} />
      ) : (
        <ul className="mt-6 space-y-3">
          {safeItems.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:bg-white hover:shadow-sm"
            >
              <Icon
                className={`mt-0.5 h-4 w-4 shrink-0 ${toneClasses.marker}`}
                aria-hidden="true"
              />
              <span className="text-sm leading-6 text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="animate-pulse space-y-8">
            <div className="h-9 w-56 rounded-full bg-slate-200" />
            <div className="h-12 max-w-xl rounded-2xl bg-slate-200" />
            <div className="h-5 max-w-2xl rounded-full bg-slate-200" />
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="h-4 rounded-full bg-slate-200" />
              <div className="h-40 rounded-2xl bg-slate-200" />
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-200" />
              <div className="mt-5 h-4 w-28 rounded-full bg-slate-200" />
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="h-8 w-44 rounded-full bg-slate-200" />
              <div className="mt-8 space-y-3">
                <div className="h-4 rounded-full bg-slate-200" />
                <div className="h-4 rounded-full bg-slate-200" />
                <div className="h-4 w-2/3 rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <section className="max-w-lg rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
          <AlertTriangle className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-slate-950">
          Deployment report unavailable
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {message || "The deployment report could not be loaded."}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Retry
        </button>
      </section>
    </div>
  );
}

export default function Deployment() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [deployment, setDeployment] = useState(null);
  const [error, setError] = useState("");

  const fetchReport = useCallback(async () => {
    const response = await axios.get(`${API_URL}/deployment/${id}`, {
      headers: getAuthHeaders(),
    });

    setDeployment(response.data.data);
  }, [id]);

  const analyzeAndFetch = useCallback(async () => {
    setAnalyzing(true);
    setError("");

    try {
      await axios.post(
        `${API_URL}/deployment/${id}/analyze`,
        {},
        {
          headers: getAuthHeaders(),
        },
      );

      await fetchReport();
    } catch (analysisError) {
      console.error(analysisError);
      setError(
        analysisError.response?.data?.message ||
          "Deployment analysis failed. Please try again.",
      );
    } finally {
      setAnalyzing(false);
    }
  }, [fetchReport, id]);

  const loadDeployment = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      await fetchReport();
    } catch (fetchError) {
      if (fetchError.response?.status === 404) {
        await analyzeAndFetch();
      } else {
        console.error(fetchError);
        setError(
          fetchError.response?.data?.message ||
            "Failed to fetch deployment report.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, [analyzeAndFetch, fetchReport]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDeployment();
  }, [loadDeployment]);

  const summary = useMemo(() => {
    const platforms = deployment?.platforms?.platforms || [];

    return [
      {
        icon: CheckCircle2,
        value: deployment?.strengths?.length || 0,
        label: "Strengths Count",
        gradient: "from-emerald-50 to-white",
      },
      {
        icon: AlertTriangle,
        value: deployment?.warnings?.length || 0,
        label: "Warnings Count",
        gradient: "from-amber-50 to-white",
      },
      {
        icon: XCircle,
        value: deployment?.criticalIssues?.length || 0,
        label: "Critical Issues Count",
        gradient: "from-rose-50 to-white",
      },
      {
        icon: Layers3,
        value: platforms.length,
        label: "Deployment Platforms Count",
        gradient: "from-sky-50 to-white",
      },
    ];
  }, [deployment]);

  if (loading) {
    return <LoadingState />;
  }

  if (error && !deployment) {
    return <ErrorState message={error} onRetry={loadDeployment} />;
  }

  if (!deployment) {
    return (
      <ErrorState
        message="This repository does not have deployment intelligence available yet."
        onRetry={analyzeAndFetch}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {error}
          </div>
        )}

        <HeroSection
          deployment={deployment}
          onReanalyze={analyzeAndFetch}
          analyzing={analyzing}
        />

        <section
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4"
          aria-label="Deployment summary"
        >
          {summary.map((item) => (
            <SummaryCard key={item.label} {...item} />
          ))}
        </section>

        <section
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
          aria-label="Deployment score metrics"
        >
          <MetricCard
            title="Infrastructure"
            score={deployment.infrastructureScore}
            icon={Server}
            description={metricDescriptions.Infrastructure}
          />
          <MetricCard
            title="Configuration"
            score={deployment.configurationScore}
            icon={Settings}
            description={metricDescriptions.Configuration}
          />
          <MetricCard
            title="Build Readiness"
            score={deployment.buildReadinessScore}
            icon={Hammer}
            description={metricDescriptions["Build Readiness"]}
          />
          <MetricCard
            title="CI/CD"
            score={deployment.ciCdScore}
            icon={Cpu}
            description={metricDescriptions["CI/CD"]}
          />
        </section>

        <PlatformCard platforms={deployment.platforms?.platforms} />

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ChecklistCard
            title="Docker Quality"
            subtitle="Dockerfile structure and container production readiness."
            score={deployment.dockerQuality?.score}
            checks={deployment.dockerQuality?.checks}
            checklist={dockerChecklist}
            icon={Boxes}
            strengths={deployment.dockerQuality?.strengths}
            warnings={deployment.dockerQuality?.warnings}
            criticalIssues={deployment.dockerQuality?.criticalIssues}
          />
          <ChecklistCard
            title="Workflow Quality"
            subtitle="Build, test, and deployment automation coverage."
            score={deployment.workflowQuality?.score}
            checks={deployment.workflowQuality?.checks}
            checklist={workflowChecklist}
            icon={GitBranch}
            strengths={deployment.workflowQuality?.strengths}
            warnings={deployment.workflowQuality?.warnings}
            criticalIssues={deployment.workflowQuality?.criticalIssues}
          />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <DetectionGrid
            title="Runtime Configuration"
            subtitle="Pinned runtime and toolchain version files."
            icon={TerminalSquare}
            checks={deployment.runtime?.checks}
            items={runtimeChecklist}
            strengths={deployment.runtime?.strengths}
            warnings={deployment.runtime?.warnings}
            criticalIssues={deployment.runtime?.criticalIssues}
          />
          <DetectionGrid
            title="Lock Files"
            subtitle="Dependency lock files found at repository level."
            icon={PackageCheck}
            checks={deployment.lockFiles?.checks}
            items={lockFileChecklist}
            strengths={deployment.lockFiles?.strengths}
            warnings={deployment.lockFiles?.warnings}
            criticalIssues={deployment.lockFiles?.criticalIssues}
          />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ListCard
            title="Strengths"
            items={deployment.strengths}
            icon={CheckCircle2}
            tone="green"
            emptyText="No strengths found."
          />
          <ListCard
            title="Warnings"
            items={deployment.warnings}
            icon={AlertTriangle}
            tone="amber"
            emptyText="No warnings found."
          />
          <ListCard
            title="Critical Issues"
            items={deployment.criticalIssues}
            icon={XCircle}
            tone="red"
            emptyText="No critical issues found."
          />
          <ListCard
            title="Recommendations"
            items={deployment.recommendations}
            icon={Lightbulb}
            tone="blue"
            emptyText="No recommendations found."
          />
        </section>

      </main>
    </div>
  );
}
