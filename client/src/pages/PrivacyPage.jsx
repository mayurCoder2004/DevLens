import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Minimal nav */}
      <nav className="border-b border-slate-800 bg-[#0B0F19] px-6 py-4">
        <Link
          to="/"
          className="flex w-fit items-center gap-3 text-white hover:opacity-80 transition-opacity"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
            DL
          </div>
          <span className="text-xl font-bold tracking-tight">DevLens</span>
        </Link>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-24">
        {/* Icon */}
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
          <ShieldCheck size={28} className="text-blue-400" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Privacy Policy
        </h1>

        <p className="mt-4 text-slate-400">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-12 space-y-10 text-slate-300 leading-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>
              DevLens collects only the information required to provide the service,
              including your GitHub username and repository metadata accessed through
              GitHub OAuth. We do not store your source code on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>
              Information is used exclusively to analyze repositories you explicitly
              connect and to generate engineering intelligence reports. We do not sell,
              rent, or share your information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. GitHub OAuth</h2>
            <p>
              Authentication is handled securely through GitHub OAuth. DevLens only
              requests the minimum permissions needed to read repository metadata and
              structure. You can revoke access from your GitHub settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Retention</h2>
            <p>
              Analysis results are retained only for the duration of your session unless
              you choose to save them. You may request deletion of your data at any time
              by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please reach out via
              the{" "}
              <a
                href="https://github.com/mayurCoder2004/devlens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
              >
                GitHub repository
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-8">
          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
