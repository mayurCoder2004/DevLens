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
    <Hero />
    <TrustSection />
    <HowItWorks />
    <RepositoryPipeline />
    <RepositoryWorkspace />
    <LandingCTA />
    <Footer />
    </>
  );
}