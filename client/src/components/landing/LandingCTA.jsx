import {
  ArrowRight,
  Check,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import Container from "../ui/Container";

export default function LandingCTA() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] py-28">
      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[180px]" />

      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 px-10 py-20 text-center shadow-2xl">
          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <FaGithub
              size={16}
              className="text-blue-400"
            />

            <span className="text-sm font-medium text-blue-400">
              Connect Your GitHub Repository
            </span>
          </div>

          {/* Heading */}

          <h2 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-tight text-white lg:text-6xl">
            Transform Your Repository
            <br />
            Into Engineering Insights
          </h2>

          {/* Description */}

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            Analyze architecture, detect technical debt, evaluate deployment
            readiness, and receive AI-powered engineering recommendations in
            minutes.
          </p>

          {/* CTA */}

          <div className="mt-12 flex justify-center">
            <Button variant="primary" onClick={() => navigate("/login")}>
              <div className="flex items-center gap-3">
                <FaGithub size={18} />

                <span>Get Started with GitHub</span>

                <ArrowRight size={18} />
              </div>
            </Button>
          </div>

          {/* Trust Indicators */}

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {[
              "Free Repository Analysis",
              "Secure GitHub OAuth",
              "No Credit Card Required",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2"
              >
                <Check
                  size={18}
                  className="text-green-400"
                />

                <span className="text-sm text-slate-400">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}