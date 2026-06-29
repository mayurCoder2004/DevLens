import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Hammer,
  Lightbulb,
  Rocket,
  Server,
  Settings,
  ShieldCheck,
  XCircle,
} from "lucide-react";

function getStatusColor(score) {
  if (score >= 80) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
}

function getStatusTextColor(score) {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

function getStatusIcon(score) {
  if (score >= 80) return "\u{1F7E2}";
  if (score >= 50) return "\u{1F7E1}";
  return "\u{1F534}";
}

function getStatusBadgeColor(score) {
  if (score >= 80) return "bg-green-50 text-green-700 ring-green-200";
  if (score >= 50) return "bg-yellow-50 text-yellow-700 ring-yellow-200";
  return "bg-red-50 text-red-700 ring-red-200";
}

function ListCard({ title, items, icon: Icon, borderColor, bgColor }) {
  return (
    <div
      className={`rounded-2xl border border-l-4 ${borderColor} ${bgColor} p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-xl bg-white/80 p-2 shadow-sm">
          <Icon className="h-6 w-6 text-gray-800" aria-hidden="true" />
        </span>

        <h2 className="text-2xl font-bold text-gray-950">{title}</h2>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl bg-white/70 px-4 py-3 text-sm font-medium text-gray-600">
          No issues found.
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Icon
                className="mt-0.5 h-5 w-5 shrink-0 text-gray-700"
                aria-hidden="true"
              />

              <span className="leading-relaxed text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ScoreCard({ title, score, icon: Icon }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-gray-700">{title}</h3>

        <span className="rounded-2xl bg-gray-50 p-3 text-gray-800 ring-1 ring-gray-100">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-7">
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold tracking-tight text-gray-950">
            {score}
          </span>

          <span className="mb-1 text-sm font-semibold text-gray-500">/100</span>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full ${getStatusColor(score)}`}
            style={{
              width: `${score}%`,
            }}
          />
        </div>
      </div>
    </article>
  );
}

function PlatformCard({ platforms }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-5">
        Deployment Platforms
      </h2>

      {platforms.length === 0 ? (
        <p className="text-gray-500">
          No deployment platform detected.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {platforms.map((platform) => (
            <span
              key={platform}
              className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium"
            >
              {platform}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Deployment() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [deployment, setDeployment] = useState(null);

  const fetchDeployment = useCallback(async () => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    // Try to fetch an existing deployment report
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/deployment/${id}`,
      {
        headers,
      },
    );

    setDeployment(response.data.data);
  } catch (error) {
    // If no report exists, generate it automatically
    if (error.response?.status === 404) {
      try {
        setLoading(true);

        await axios.post(
  `${import.meta.env.VITE_API_URL}/deployment/${id}/analyze`,
  {},
  {
    headers,
  },
);

        // Fetch the newly generated report
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/deployment/${id}`,
          {
            headers,
          },
        );

        setDeployment(response.data.data);
      } catch (analysisError) {
        console.error(analysisError);
      }
    } else {
      console.error(error);
    }
  } finally {
    setLoading(false);
  }
}, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDeployment();
  }, [fetchDeployment]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 px-6">
        <h1 className="animate-pulse text-3xl font-bold text-gray-700">
          Analyzing repository...

This may take a few seconds for the first time.
        </h1>
      </div>
    );
  }

  if (!deployment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 px-6">
        <section className="max-w-lg rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-gray-950">
            No deployment report found
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-600">
            This repository does not have deployment intelligence available yet.
            Run an analysis and return here to review production readiness.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <main className="mx-auto max-w-7xl p-6 md:p-8">
        <section className="mb-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-200">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Production Readiness
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
                Deployment Intelligence
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
                Analyze production readiness and deployment quality
              </p>
            </div>

            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold ring-1 ${getStatusBadgeColor(
                deployment.deploymentScore,
              )}`}
            >
              <span aria-hidden="true">
                {getStatusIcon(deployment.deploymentScore)}
              </span>
              {deployment.deploymentStatus}
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-end gap-3">
                  <span className="text-7xl font-bold tracking-tight text-gray-950">
                    {deployment.deploymentScore}
                  </span>

                  <span className="mb-3 text-3xl font-semibold text-gray-400">
                    /100
                  </span>
                </div>

                <p
                  className={`mt-3 text-lg font-bold ${getStatusTextColor(
                    deployment.deploymentScore,
                  )}`}
                >
                  Overall Deployment Readiness
                </p>
              </div>

              <Rocket className="hidden h-16 w-16 text-gray-300 md:block" />
            </div>

            <div className="mt-7 h-4 overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full ${getStatusColor(
                  deployment.deploymentScore,
                )} transition-all duration-700 ease-out`}
                style={{
                  width: `${deployment.deploymentScore}%`,
                }}
              />
            </div>
          </div>
        </section>

        <section
          className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
          aria-label="Deployment score metrics"
        >
          <ScoreCard
            title="Infrastructure"
            score={deployment.infrastructureScore}
            icon={Server}
          />

          <ScoreCard
            title="Configuration"
            score={deployment.configurationScore}
            icon={Settings}
          />

          <ScoreCard
            title="Build Readiness"
            score={deployment.buildReadinessScore}
            icon={Hammer}
          />

          <ScoreCard title="CI/CD" score={deployment.ciCdScore} icon={Cpu} />
        </section>

        <section className="mb-12">
  <PlatformCard
    platforms={deployment.platforms.platforms}
  />
</section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ListCard
            title="Strengths"
            items={deployment.strengths}
            icon={CheckCircle2}
            borderColor="border-green-500"
            bgColor="bg-green-50"
          />

          <ListCard
            title="Warnings"
            items={deployment.warnings}
            icon={AlertTriangle}
            borderColor="border-yellow-500"
            bgColor="bg-yellow-50"
          />

          <ListCard
            title="Critical Issues"
            items={deployment.criticalIssues}
            icon={XCircle}
            borderColor="border-red-500"
            bgColor="bg-red-50"
          />

          <ListCard
            title="Recommendations"
            items={deployment.recommendations}
            icon={Lightbulb}
            borderColor="border-blue-500"
            bgColor="bg-blue-50"
          />
        </section>
      </main>
    </div>
  );
}
