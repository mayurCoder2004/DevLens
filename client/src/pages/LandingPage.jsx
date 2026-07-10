import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import LandingCTA from "../components/landing/LandingCTA";
import Navbar from "../components/landing/Navbar";
import RepositoryPipeline from "../components/landing/RepositoryPipeline";
import RepositoryWorkspace from "../components/landing/RepositoryWorkspace";
import TrustSection from "../components/landing/TrustSection";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* Hero section */}
      <div id="hero">
        <Hero />
      </div>

      {/* Trust / Features section */}
      <div id="features">
        <TrustSection />
      </div>

      {/* How It Works section */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Repository Pipeline section */}
      <div id="pipeline">
        <RepositoryPipeline />
      </div>

      {/* Repository Workspace section */}
      <div id="workspace">
        <RepositoryWorkspace />
      </div>

      {/* CTA section */}
      <div id="cta">
        <LandingCTA />
      </div>

      {/* Footer section */}
      <div id="footer">
        <Footer />
      </div>
    </>
  );
}