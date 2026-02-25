import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Send, RotateCcw, Mail } from "lucide-react";
import { ResultCard } from "./ResultCard";

const MAX_CHARS = 5000;

interface PredictionResult {
  label: string;
  confidence: number;
}

export const EmailClassifier = () => {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const charCount = emailText.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isEmpty = emailText.trim().length === 0;

  const handleSubmit = async () => {
    if (isEmpty || isOverLimit || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await axios.post(`${apiUrl}/predict`, {
        email_text: emailText.trim(),
      });
      setResult(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          setError("Invalid input. Please provide valid email text.");
        } else if (err.response?.data?.detail) {
          setError(err.response.data.detail);
        } else if (err.code === "ERR_NETWORK") {
          setError(
            "Cannot reach the API server. Make sure your backend is running and VITE_API_URL is configured."
          );
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmailText("");
    setResult(null);
    setError(null);
  };

  return (
    <section className="relative z-10 w-full max-w-2xl mx-auto px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        {/* Card header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "hsl(186 100% 55% / 0.12)" }}
          >
            <Mail className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Email Analysis
            </h2>
            <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
              Paste any email content to classify
            </p>
          </div>
        </div>

        {/* Textarea */}
        <div className="relative mb-2">
          <textarea
            className="input-glow w-full rounded-xl px-4 py-4 text-sm leading-relaxed min-h-[180px] font-mono"
            placeholder="Paste the email content here...&#10;&#10;e.g. Congratulations! You've been selected for a special prize. Click here to claim..."
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            maxLength={MAX_CHARS + 200}
            disabled={loading}
          />
        </div>

        {/* Character counter */}
        <div className="flex justify-between items-center mb-5">
          <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            {isEmpty
              ? "Enter email text to classify"
              : `${charCount.toLocaleString()} characters`}
          </span>
          <span
            className="text-xs font-medium tabular-nums"
            style={{
              color: isOverLimit
                ? "hsl(var(--glow-red))"
                : charCount > MAX_CHARS * 0.8
                ? "hsl(40 95% 60%)"
                : "hsl(var(--muted-foreground))",
            }}
          >
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
          </span>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 px-4 py-3 rounded-xl text-sm"
              style={{
                background: "hsl(0 85% 60% / 0.08)",
                border: "1px solid hsl(0 85% 60% / 0.3)",
                color: "hsl(var(--glow-red))",
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={isEmpty || isOverLimit || loading}
            className="btn-glow flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="30"
                    strokeDashoffset="10"
                    strokeLinecap="round"
                  />
                </svg>
                Classifying...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Classify Email
              </>
            )}
          </button>

          {(result || emailText) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleReset}
              disabled={loading}
              className="py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-200"
              style={{
                background: "hsl(var(--surface-3))",
                border: "1px solid hsl(var(--glass-border))",
                color: "hsl(var(--muted-foreground))",
              }}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6"
          >
            <ResultCard result={result as { label: string; confidence: number }} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
