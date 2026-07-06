import { motion, useInView } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import confetti from "canvas-confetti";

export function Ending({ message }: { message: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  useEffect(() => {
    if (!inView) return;
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 }, colors: ["#f6c56b", "#ffb4a2", "#fff2d1"] });
      confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 }, colors: ["#f6c56b", "#ffb4a2", "#fff2d1"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [inView]);

  const hearts = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({ id: i, x: Math.random() * 100, d: 6 + Math.random() * 6, delay: Math.random() * 4 })),
    [],
  );

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 py-20">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="pointer-events-none absolute text-2xl"
          style={{ left: `${h.x}%`, bottom: -40 }}
          animate={{ y: [-40, -900], opacity: [0, 1, 0] }}
          transition={{ duration: h.d, repeat: Infinity, delay: h.delay, ease: "easeInOut" }}
        >
          ❤️
        </motion.span>
      ))}

      <div className="relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-gold font-display text-5xl leading-tight sm:text-6xl"
        >
          Happy Birthday
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="mx-auto mt-6 max-w-sm font-display text-lg italic text-muted-foreground"
        >
          {message}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-10 text-xs uppercase tracking-[0.4em] text-muted-foreground"
        >
          — the end (and only the beginning) —
        </motion.div>
      </div>
    </section>
  );
}
