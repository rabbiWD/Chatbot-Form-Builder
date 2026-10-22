import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LiveDemoSection from "@/components/landing/LiveDemoSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "Chatbot Form Builder | Conversational Forms & Website Embed",
  description:
    "Transform traditional forms into engaging conversational chat experiences. Embed widgets on any website, collect responses, and analyze submissions effortlessly.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LiveDemoSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
}
