import { Link } from "react-router-dom";
import { ScrollText } from "lucide-react";

export default function TermsPage() {
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
          <ScrollText size={28} className="text-blue-400" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Terms of Service
        </h1>

        <p className="mt-4 text-slate-400">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-12 space-y-10 text-slate-300 leading-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using DevLens, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Use of Service</h2>
            <p>
              DevLens is provided for legitimate software engineering and development purposes.
              You agree not to misuse the platform, attempt unauthorized access to any system,
              or violate GitHub's terms of service when using our GitHub integration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Intellectual Property</h2>
            <p>
              All DevLens brand assets, UI components, and generated engineering reports are the
              intellectual property of DevLens. Analysis results generated from your repositories
              belong to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Disclaimer of Warranties</h2>
            <p>
              DevLens is provided "as is" without warranty of any kind. AI-generated engineering
              insights are provided as guidance only and should not replace professional engineering
              judgment or code review.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Limitation of Liability</h2>
            <p>
              DevLens shall not be liable for any indirect, incidental, or consequential damages
              arising from the use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of DevLens
              after any changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Contact</h2>
            <p>
              For any questions regarding these Terms of Service, please open an issue on the{" "}
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
