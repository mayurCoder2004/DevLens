import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Navbar from "../components/landing/Navbar";
import TrustSection from "../components/landing/TrustSection";

export default function LandingPage() {
  return (
    <>
    <Navbar />
    <Hero />
    <TrustSection />
    <HowItWorks />
    </>
  );
}