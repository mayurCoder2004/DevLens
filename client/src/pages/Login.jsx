import { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  GitBranch,
  Loader2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { loginWithGithub } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleGithubLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await loginWithGithub();

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative flex flex-col justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950 p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_45%)]" />

          <div className="relative z-10">
            <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1 text-sm font-medium text-violet-300">
              AI-Powered Engineering Intelligence
            </span>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-white">
              DevLens
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
              Analyze repositories, detect technical debt, visualize
              architecture, evaluate engineering health, and generate
              AI-powered engineering reviews—all from one platform.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-violet-500/10 p-3">
                  <BrainCircuit className="h-6 w-6 text-violet-400" />
                </div>

                <div>
                  <p className="font-medium text-white">
                    AI Repository Reviews
                  </p>

                  <p className="text-sm text-slate-400">
                    Get engineering insights powered by Gemini AI.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-violet-500/10 p-3">
                  <GitBranch className="h-6 w-6 text-violet-400" />
                </div>

                <div>
                  <p className="font-medium text-white">
                    Complete Repository Intelligence
                  </p>

                  <p className="text-sm text-slate-400">
                    Architecture, deployment, health, technical debt,
                    pull request analysis and much more.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-violet-500/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-violet-400" />
                </div>

                <div>
                  <p className="font-medium text-white">
                    Secure GitHub Authentication
                  </p>

                  <p className="text-sm text-slate-400">
                    Sign in safely using your GitHub account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center bg-slate-950 p-12">
          <div className="w-full max-w-md">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Welcome Back
              </h2>

              <p className="mt-3 text-slate-400">
                Continue with GitHub to access your engineering
                workspace.
              </p>
            </div>

            <button
              onClick={handleGithubLogin}
              disabled={loading}
              className="mt-10 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-base font-semibold text-slate-900 transition-all duration-200 hover:scale-[1.02] hover:bg-slate-100 active:scale-100 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connecting to GitHub...
                </>
              ) : (
                <>
                  <FaGithub className="h-5 w-5" />
                  Continue with GitHub
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm leading-7 text-slate-400">
                By continuing, you authorize DevLens to securely access
                your GitHub repositories for analysis. Your data is only
                used to generate engineering insights and is never shared
                with third parties.
              </p>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              © {new Date().getFullYear()} DevLens · Engineering
              Intelligence Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}