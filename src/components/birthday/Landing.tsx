import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "./Sparkles";
import { DecorativeLayer } from "./Decorations";

export function Landing({ name, message, onOpen, copy }: { name: string; message: string; onOpen: () => void; copy?: { loadingText: string; giftButtonLabel: string; scrollHint: string } }) {
  const [phase, setPhase] = useState<"loading" | "message">("loading");

  useEffect(() => {
    const t = setTimeout(() => setPhase("message"), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 sm:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 500px at 50% 40%, rgba(248, 232, 238, 0.5), transparent 70%), radial-gradient(400px 400px at 20% 80%, rgba(237, 231, 246, 0.35), transparent 65%)",
        }}
      />
      <DecorativeLayer density="soft" showBalloons showHearts showPetals showFairyLights showStars className="z-0" />
      <Sparkles count={20} />

      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-8 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              className="relative h-[4.5rem] w-[4.5rem] rounded-full border-2 border-transparent"
              style={{
                borderTopColor: "#E8D7A5",
                borderRightColor: "#D9A5A5",
                filter: "drop-shadow(0 0 16px rgba(217, 165, 165, 0.5))",
              }}
            />
            <p className="font-display text-lg italic tracking-wide text-muted-foreground">{copy?.loadingText ?? "Preparing your surprise…"}</p>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-w-md flex-col items-center gap-7 text-center sm:gap-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="glass-strong rounded-[2rem] px-8 py-10 sm:px-10 sm:py-12 glow-soft"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-[11px] font-medium uppercase tracking-[0.45em] text-muted-foreground"
              >
                For {name}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 1 }}
                className="text-gold mt-4 text-5xl font-semibold leading-[1.1] sm:text-6xl"
              >
                Happy<br />Birthday
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15 }}
                className="font-display mt-5 text-base italic leading-relaxed text-muted-foreground sm:text-lg"
              >
                {message}
              </motion.p>
              <motion.button
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.55, type: "spring", stiffness: 180, damping: 16 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpen}
                className="btn-gold btn-gold-hover mt-8 rounded-full px-9 py-4 text-sm font-semibold tracking-wide"
              >
                {copy?.giftButtonLabel ?? "Open Your Birthday Gift 🎁"}
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
              className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground"
            >
              {copy?.scrollHint ?? "scroll gently ↓"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
