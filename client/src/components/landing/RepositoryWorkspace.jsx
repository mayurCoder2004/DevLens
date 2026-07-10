import Container from "../ui/Container";

import WorkspaceSidebar from "./WorkspaceSidebar";
import WorkspaceContent from "./WorkspaceContent";
import InsightPanel from "./InsightPanel";

export default function RepositoryWorkspace() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] py-16 sm:py-28">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[180px] sm:h-[700px] sm:w-[700px]" />

      <Container>
        {/* Heading */}
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <span className="text-sm font-medium text-blue-400">
              Product Preview
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Explore the DevLens Workspace
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-400 sm:mt-6 sm:text-lg">
            Analyze architecture, technical debt, deployment readiness,
            engineering health, and AI-powered repository insights from one
            intelligent engineering workspace.
          </p>
        </div>

        {/* Workspace Shell */}
        <div className="relative z-10 mx-auto mt-12 max-w-5xl sm:mt-20">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-blue-500/10 sm:rounded-3xl">

            {/* Browser Header */}
            <div className="flex h-12 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 sm:h-14 sm:px-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
                DevLens Workspace
              </div>
            </div>

            {/*
              Layout strategy:
              - Mobile/Tablet (<lg): show only WorkspaceContent — sidebar and insight
                panel are decorative chrome, so we hide them to keep the preview
                legible without forcing a tiny 3-col squeeze.
              - lg+: restore the original 3-column layout at full fidelity.
            */}

            {/* Mobile / Tablet – single column */}
            <div className="block lg:hidden">
              <WorkspaceContent />
            </div>

            {/* Desktop – original 3-column layout */}
            <div className="hidden h-[560px] grid-cols-[220px_1fr_260px] lg:grid xl:grid-cols-[230px_1fr_270px]">
              <WorkspaceSidebar />
              <WorkspaceContent />
              <InsightPanel />
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}