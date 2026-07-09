import { CheckCircle, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import RepositoryPreview from "./RepositoryPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] py-16">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[180px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <Container className="relative z-10">

        <div className="grid min-h-[700px] items-center gap-20 lg:grid-cols-2">

          {/* ================= LEFT ================= */}

          <div>

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">

              <Sparkles size={16} />

              AI-Powered Engineering Intelligence

            </div>

            {/* Heading */}

            <h1 className="mt-8 max-w-2xl text-6xl font-bold leading-[1.1] tracking-tight text-white">

              Engineering Intelligence

              <br />

              for Modern

              <br />

              Development Teams

            </h1>

            {/* Description */}

            <p className="mt-8 max-w-lg text-lg leading-8 text-slate-400">

              Analyze repositories, detect technical debt,
              review architecture, evaluate deployment readiness,
              analyze pull request risk, and generate AI-powered
              engineering insights from one intelligent workspace.

            </p>

            {/* CTA */}

            <div className="mt-10 flex flex-wrap gap-4">

              <Button
                variant="primary"
                size="lg"
              >
                Get Started with GitHub
              </Button>

              <Button
                variant="secondary"
                size="lg"
              >
                View Live Demo
              </Button>

            </div>

            {/* Trust */}

            <div className="mt-10 flex flex-wrap gap-6">

              <div className="flex items-center gap-2 text-sm text-slate-400">

                <CheckCircle
                  size={18}
                  className="text-green-400"
                />

                <span>Sign in with GitHub</span>

              </div>

              <div className="flex items-center gap-2 text-sm text-slate-400">

                <CheckCircle
                  size={18}
                  className="text-green-400"
                />

                <span>Free Repository Analysis</span>

              </div>

              <div className="flex items-center gap-2 text-sm text-slate-400">

                <CheckCircle
                  size={18}
                  className="text-green-400"
                />

                <span>No Credit Card Required</span>

              </div>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="flex justify-end">

            <RepositoryPreview />

          </div>

        </div>

      </Container>

    </section>
  );
}