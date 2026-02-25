import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Activity } from "lucide-react";

interface PredictionResult {
  label: "spam" | "ham" | string;
  confidence: number;
}

interface ResultCardProps {
  result: PredictionResult;
}

export const ResultCard = ({ result }: ResultCardProps) => {
  const isSpam = result.label.toLowerCase() === "spam";
  const confidence = Math.round(result.confidence * 100);
  const displayLabel = isSpam ? "Spam Detected" : "Safe Email";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-card rounded-2xl p-6 ${isSpam ? "result-spam" : "result-safe"}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: "hsl(var(--muted-foreground))" }}>
            Classification Result
          </p>
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl font-bold tracking-tight"
            style={{ color: isSpam ? "hsl(var(--glow-red))" : "hsl(var(--glow-green))" }}
          >
            {displayLabel}
          </motion.h3>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: isSpam
              ? "hsl(0 85% 60% / 0.12)"
              : "hsl(142 76% 48% / 0.12)",
          }}
        >
          {isSpam ? (
            <AlertTriangle className="w-7 h-7" style={{ color: "hsl(var(--glow-red))" }} />
          ) : (
            <CheckCircle2 className="w-7 h-7" style={{ color: "hsl(var(--glow-green))" }} />
          )}
        </motion.div>
      </div>

      {/* Badge */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-5 ${
          isSpam ? "badge-spam" : "badge-safe"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ background: isSpam ? "hsl(var(--glow-red))" : "hsl(var(--glow-green))" }} />
        {result.label.toUpperCase()}
      </motion.span>

      {/* Confidence section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" style={{ color: "hsl(var(--muted-foreground))" }} />
            <span className="text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
              Confidence Score
            </span>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-black"
            style={{ color: isSpam ? "hsl(var(--glow-red))" : "hsl(var(--glow-green))" }}
          >
            {confidence}%
          </motion.span>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-track h-3 w-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full rounded-full ${isSpam ? "progress-bar-spam" : "progress-bar-safe"}`}
          />
        </div>

        <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
          {isSpam
            ? "High probability this email contains spam or phishing content."
            : "This email appears to be legitimate and safe to open."}
        </p>
      </div>
    </motion.div>
  );
};
