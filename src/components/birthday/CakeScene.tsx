import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export function CakeScene({ onDone }: { onDone: () => void }) {
  const [lit, setLit] = useState([false, false, false]);
  const [taps, setTaps] = useState(0);
  const [easterEgg, setEasterEgg] = useState(false);

  // Auto-light candles one by one
  useEffect(() => {
    const timers = [0, 1, 2].map((i) =>
      setTimeout(() => setLit((s) => s.map((v, idx) => (idx === i ? true : v))), 600 + i * 500),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const allOut = lit.every((v) => v === false) && taps > 0;

  useEffect(() => {
    if (allOut) {
      // fireworks
      const end = Date.now() + 1400;
      const frame = () => {
        confetti({ particleCount: 6, angle: 60, spread: 70, origin: { x: 0 }, colors: ["#f6c56b", "#f4e3c4", "#ffb4a2"] });
        confetti({ particleCount: 6, angle: 120, spread: 70, origin: { x: 1 }, colors: ["#f6c56b", "#f4e3c4", "#ffb4a2"] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 }, colors: ["#f6c56b", "#f4e3c4", "#fff2d1", "#ffb4a2"] });
      const t = setTimeout(onDone, 2400);
      return () => clearTimeout(t);
    }
  }, [allOut, onDone]);

  const blowCandle = (idx: number) => {
    setLit((s) => s.map((v, i) => (i === idx ? false : v)));
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.45 }, colors: ["#fff2d1", "#f6c56b"] });
  };

  const tapCake = () => {
    setTaps((t) => {
      const nt = t + 1;
      if (nt >= 5 && !easterEgg) setEasterEgg(true);
      return nt;
    });
    confetti({ particleCount: 20, spread: 60, origin: { y: 0.7 }, scalar: 0.7 });
  };

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-2xl italic text-muted-foreground"
      >
        Make a wish...
      </motion.p>
      <p className="mt-1 text-xs text-muted-foreground">tap the candles to blow them out</p>

      {/* Floating balloons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {["#ffb4a2", "#f6c56b", "#f4e3c4", "#e8c3b9", "#f8e0b0"].map((c, i) => (
          <motion.div
            key={i}
            className="absolute h-16 w-12 rounded-full"
            style={{
              left: `${8 + i * 20}%`,
              bottom: -80,
              background: `radial-gradient(circle at 35% 30%, oklch(1 0 0 / 0.7), ${c})`,
              boxShadow: "0 8px 20px oklch(0.5 0.05 60 / 0.15)",
            }}
            animate={{ y: [-100, -900], x: [0, 10, -10, 0] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
          >
            <div className="absolute left-1/2 top-full h-16 w-px -translate-x-1/2 bg-foreground/20" />
          </motion.div>
        ))}
      </div>

      {/* Cake */}
      <motion.div
        onClick={tapCake}
        initial={{ scale: 0.7, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative z-10 mt-10 flex cursor-pointer flex-col items-center select-none"
      >
        {/* Candles */}
        <div className="mb-2 flex gap-6">
          {lit.map((on, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); if (on) blowCandle(i); }}
              className="relative flex flex-col items-center"
              aria-label={`Candle ${i + 1}`}
            >
              <AnimatePresence>
                {on && (
                  <motion.span
                    key="flame"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
                    className="h-5 w-3 rounded-full"
                    style={{
                      background: "radial-gradient(circle at 50% 60%, #fff2c1 0%, #ffb84d 45%, #ff7043 90%)",
                      filter: "drop-shadow(0 0 12px #ffb84d)",
                    }}
                  />
                )}
              </AnimatePresence>
              <div className="mt-1 h-10 w-2 rounded-sm" style={{ background: i === 1 ? "#e8c3b9" : "#f6c56b" }} />
            </button>
          ))}
        </div>

        {/* Cake tiers */}
        <div className="relative">
          <div className="mx-auto h-16 w-40 rounded-t-3xl"
            style={{ background: "linear-gradient(180deg, #fff4e0, #f2d9a8)", boxShadow: "inset 0 -6px 0 #e8c78a" }} />
          <div className="mx-auto -mt-2 h-3 w-40 rounded-full"
            style={{ background: "repeating-linear-gradient(90deg, #f8b4a2 0 8px, transparent 8px 16px)" }} />
          <div className="mx-auto h-20 w-56 rounded-t-3xl"
            style={{ background: "linear-gradient(180deg, #ffe6c2, #eec489)", boxShadow: "inset 0 -8px 0 #d9a35f" }} />
          <div className="mx-auto -mt-2 h-4 w-56 rounded-full"
            style={{ background: "repeating-linear-gradient(90deg, #ffb4a2 0 10px, transparent 10px 20px)" }} />
          <div className="mx-auto h-6 w-64 rounded-b-2xl"
            style={{ background: "linear-gradient(180deg, #f7d9a1, #c88a4a)" }} />
          <div className="mx-auto -mt-1 h-3 w-64 rounded-full opacity-40 blur-md" style={{ background: "#000" }} />
        </div>
      </motion.div>

      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass mt-6 rounded-2xl px-4 py-2 text-xs italic text-muted-foreground"
          >
            🐣 You found the easter egg — you deserve extra cake.
          </motion.div>
        )}
      </AnimatePresence>

      {allOut && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gold mt-8 font-display text-2xl"
        >
          Wish made ✨
        </motion.p>
      )}
    </section>
  );
}
