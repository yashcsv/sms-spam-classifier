import { ParticleBackground } from "@/components/ParticleBackground";
import { HeroSection } from "@/components/HeroSection";
import { EmailClassifier } from "@/components/EmailClassifier";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Background image with overlay */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(224 71% 4% / 0.5) 0%, hsl(224 71% 4% / 0.85) 50%, hsl(224 71% 4% / 0.98) 100%)",
        }}
      />

      {/* Grid overlay */}
      <div className="fixed inset-0 z-0 grid-overlay opacity-30" />

      {/* Particles */}
      <ParticleBackground />

      {/* Ambient glow blobs */}
      <div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none z-0 animate-glow-pulse"
        style={{
          background:
            "radial-gradient(circle, hsl(186 100% 55% / 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none z-0 animate-glow-pulse"
        style={{
          background:
            "radial-gradient(circle, hsl(270 60% 60% / 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          animationDelay: "1.5s",
        }}
      />

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center">
        <HeroSection />
        <EmailClassifier />
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 text-center pb-8 px-4"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <div
          className="w-24 h-px mx-auto mb-4"
          style={{ background: "hsl(var(--glass-border))" }}
        />
        <p className="text-xs">
          SpamShield AI · Production-Grade ML Inference ·{" "}
          <span style={{ color: "hsl(var(--primary))" }}>
            Powered by Custom NLP Model
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Index;
