// app/page.tsx

import Navbar from "@/components/home/navbar";

import HeroSection from "@/components/home/hero-section";

import StatsSection from "@/components/home/stats-section";

import FeaturesSection from "@/components/home/features-section";

import FeaturedAIs from "@/components/home/featured-ais";

import VisionSection from "@/components/home/vision-section";

import CTASection from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#081018] text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#06b6d420,transparent_35%)]" />

      <div className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10">

        <Navbar />

        <HeroSection />

        <StatsSection />

        <FeaturesSection />

        <FeaturedAIs />

        <VisionSection />

        <CTASection />
      </div>
    </main>
  );
}