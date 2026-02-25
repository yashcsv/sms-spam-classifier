import { motion } from "framer-motion";
import { Shield, Zap, Brain } from "lucide-react";

const stats = [
  { icon: Brain, label: "ML-Powered", value: "NLP Model" },
  { icon: Zap, label: "Inference", value: "< 200ms" },
  { icon: Shield, label: "Accuracy", value: "Production-Grade" },
];

export const HeroSection = () => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center text-center pt-20 pb-12 px-4">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
          style={{
            background: "hsl(186 100% 55% / 0.1)",
            border: "1px solid hsl(186 100% 55% / 0.3)",
            color: "hsl(var(--primary))",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-glow-pulse inline-block" />
          Production-Ready ML System
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6 max-w-4xl"
      >
        <span className="glow-text-gradient">AI-Powered</span>
        <br />
        <span className="text-foreground">Email Spam</span>
        <br />
        <span className="glow-text-cyan">Detection</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        Production-grade ML classification system built for reliability and
        performance. Powered by a custom NLP pipeline — classify any email
        instantly.
      </motion.p>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="flex flex-wrap justify-center gap-6 mb-2"
      >
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-5 py-3 rounded-xl glass-card"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "hsl(186 100% 55% / 0.12)" }}
            >
              <Icon className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div className="text-left">
              <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                {label}
              </div>
              <div className="text-sm font-semibold text-foreground">{value}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
