import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "./Sparkles";

export function Landing({ name, message, onOpen }: { name: string; message: string; onOpen: () => void }) {
  const [phase, setPhase] = useState<"loading" | "message">("loading");

  useEffect(() => {
    const t = setTimeout(() => setPhase("message"), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6">
      <Sparkles count={40} />

      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              className="relative h-16 w-16 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: "oklch(0.78 0.14 75)",
                borderRightColor: "oklch(0.88 0.09 85)",
                filter: "drop-shadow(0 0 12px oklch(0.85 0.15 80 / 0.6))",
              }}
            />
            <p className="font-display text-lg italic text-muted-foreground">Preparing your surprise…</p>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10 flex max-w-md flex-col items-center gap-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs uppercase tracking-[0.4em] text-muted-foreground"
            >
              For {name}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="text-gold text-5xl font-semibold leading-tight sm:text-6xl"
            >
              Happy<br />Birthday
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="font-display text-base italic text-muted-foreground"
            >
              {message}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpen}
              className="btn-gold btn-gold-hover mt-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide"
            >
              Open Your Birthday Gift 🎁
            </motion.button>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
            >
              scroll gently ↓
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
