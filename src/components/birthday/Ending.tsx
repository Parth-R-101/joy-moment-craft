import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import confetti from "canvas-confetti";
import { DecorativeLayer } from "./Decorations";
import { config } from "@/lib/birthday-config";

const CONFETTI_COLORS = ["#E8D7A5", "#D9A5A5", "#F8E8EE", "#FFFDF8", "#EDE7F6"];

export function Ending({ message }: { message: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  useEffect(() => {
    if (!inView) return;
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 }, colors: CONFETTI_COLORS });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 }, colors: CONFETTI_COLORS });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [inView]);

  const hearts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        d: 6 + Math.random() * 6,
        delay: Math.random() * 4,
      })),
    [],
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 py-24 sm:px-8 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 600px at 50% 50%, rgba(248, 232, 238, 0.55), transparent 70%), radial-gradient(500px 450px at 20% 80%, rgba(237, 231, 246, 0.4), transparent 65%)",
        }}
      />

      <DecorativeLayer density="soft" showStars showSparkles showRibbons showFairyLights showBalloons showHearts burstOnEnter className="z-0" />

      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="pointer-events-none absolute text-2xl opacity-80"
          style={{ left: `${h.x}%`, bottom: -40 }}
          animate={{ y: [-40, -900], opacity: [0, 0.85, 0] }}
          transition={{ duration: h.d, repeat: Infinity, delay: h.delay, ease: "easeInOut" }}
        >
          💗
        </motion.span>
      ))}

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong mx-auto max-w-md rounded-[2rem] px-8 py-12 sm:px-10 sm:py-14 glow-soft"
        >
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-gold font-display text-5xl leading-[1.1] sm:text-6xl"
          >
            {config.sections.ending.title}
          </motion.h2>
          <div className="divider-rose" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-sm font-display text-lg italic leading-relaxed text-muted-foreground sm:text-xl"
          >
            {message}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="mt-10 text-[11px] font-medium uppercase tracking-[0.4em] text-muted-foreground"
          >
            — the end (and only the beginning) —
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
