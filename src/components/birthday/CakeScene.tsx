import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { DecorativeLayer } from "./Decorations";

const CONFETTI_COLORS = ["#E8D7A5", "#D9A5A5", "#F8E8EE", "#FFFDF8", "#EDE7F6"];
const BALLOON_COLORS = ["#F8E8EE", "#E8D7A5", "#D9A5A5", "#EDE7F6", "#F9F3EA"];

export function CakeScene({ onDone }: { onDone: () => void }) {
  const [lit, setLit] = useState([false, false, false]);
  const [isBlowing, setIsBlowing] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [celebration, setCelebration] = useState(false);

  useEffect(() => {
    const timers = [0, 1, 2].map((i) =>
      setTimeout(() => setLit((s) => s.map((v, idx) => (idx === i ? true : v))), 600 + i * 500),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const allOut = lit.every((v) => v === false) && isBlowing;

  useEffect(() => {
    if (!allOut) return;

    setTimeout(() => setShowSmoke(false), 2200);

    const launchCelebration = () => {
      setCelebration(true);
      confetti({ particleCount: 90, spread: 92, origin: { y: 0.55 }, colors: CONFETTI_COLORS, scalar: 0.92 });
      confetti({ particleCount: 40, angle: 120, spread: 50, origin: { x: 0.1, y: 0.45 }, colors: CONFETTI_COLORS, scalar: 0.75 });
      confetti({ particleCount: 40, angle: 60, spread: 50, origin: { x: 0.9, y: 0.45 }, colors: CONFETTI_COLORS, scalar: 0.75 });

      const end = Date.now() + 1400;
      const frame = () => {
        confetti({ particleCount: 5, angle: 70, spread: 40, origin: { x: 0.2, y: 0.25 }, colors: CONFETTI_COLORS, scalar: 0.6 });
        confetti({ particleCount: 5, angle: 110, spread: 40, origin: { x: 0.8, y: 0.25 }, colors: CONFETTI_COLORS, scalar: 0.6 });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    };

    const celebrationTimer = setTimeout(launchCelebration, 900);
    const doneTimer = setTimeout(onDone, 3600);
    return () => {
      clearTimeout(celebrationTimer);
      clearTimeout(doneTimer);
    };
  }, [allOut, onDone]);

  const blowOutCandles = () => {
    if (isBlowing || allOut) return;
    setIsBlowing(true);
    setShowSmoke(true);
    setCelebration(true);

    [0, 1, 2].forEach((idx) => {
      setTimeout(
        () => setLit((s) => s.map((v, i) => (i === idx ? false : v))),
        900 + idx * 520,
      );
    });
  };

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(500px 400px at 50% 30%, rgba(248, 232, 238, 0.45), transparent 70%), radial-gradient(400px 350px at 80% 70%, rgba(237, 231, 246, 0.3), transparent 65%)",
        }}
      />

      <DecorativeLayer
        density="soft"
        showBalloons={celebration}
        showHearts={celebration}
        showPetals
        showSparkles
        showFairyLights
        showStars
        className="z-0"
      />

      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 font-display text-2xl italic text-muted-foreground sm:text-3xl"
      >
        Make a wish...
      </motion.p>
      <p className="relative z-10 mt-2 text-xs tracking-wide text-muted-foreground sm:text-sm">
        Press the elegant button below and watch the candles glow one last time.
      </p>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {BALLOON_COLORS.map((c, i) => (
          <motion.div
            key={i}
            className="absolute h-16 w-12 rounded-full sm:h-[4.5rem] sm:w-14"
            style={{
              left: `${8 + i * 20}%`,
              bottom: -80,
              background: `radial-gradient(circle at 35% 30%, rgba(255, 253, 248, 0.75), ${c})`,
              boxShadow: "0 10px 28px rgba(217, 165, 165, 0.2), 0 0 20px rgba(232, 215, 165, 0.15)",
            }}
            animate={{ y: [-100, -900], x: [0, 10, -10, 0] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
          >
            <div className="absolute left-1/2 top-full h-16 w-px -translate-x-1/2 bg-rose-gold/25" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 36 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 110, damping: 14 }}
        className="relative z-10 mt-12 flex flex-col items-center sm:mt-14"
      >
        <div className="mb-4 flex gap-6 sm:gap-8">
          {lit.map((on, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {on ? (
                <motion.span
                  className="h-5 w-3 rounded-full"
                  style={{
                    background: "radial-gradient(circle at 50% 60%, #FFFDF8 0%, #E8D7A5 45%, #D9A5A5 90%)",
                    filter: "drop-shadow(0 0 18px rgba(232, 215, 165, 0.9))",
                  }}
                  animate={{
                    opacity: [0.8, 1, 0.8],
                    y: [0, -4, 0],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : (
                <motion.span
                  className="h-2.5 w-2.5 rounded-full bg-[#E8D7A5]"
                  animate={{ opacity: [0.5, 0.2, 0.5], scale: [1, 0.85, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <div className="mt-1 h-10 w-2 rounded-sm" style={{ background: i === 1 ? "#D9A5A5" : "#E8D7A5" }} />

              {showSmoke && !on && (
                <motion.span
                  className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full bg-white/70"
                  initial={{ opacity: 0, y: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.45, 0], y: [-8, -32, -60], scale: [0.8, 1.1, 1.4] }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="relative">
          <motion.div
            className="mx-auto h-16 w-40 rounded-t-3xl sm:w-44"
            style={{
              background: "linear-gradient(180deg, #FFFDF8, #F8E8EE)",
              boxShadow: "inset 0 -6px 0 rgba(217, 165, 165, 0.35), 0 8px 24px rgba(217, 165, 165, 0.15)",
            }}
            animate={allOut ? { boxShadow: "inset 0 -6px 0 rgba(217, 165, 165, 0.35), 0 16px 44px rgba(217, 165, 165, 0.25)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <div
            className="mx-auto -mt-2 h-3 w-40 rounded-full sm:w-44"
            style={{
              background: "repeating-linear-gradient(90deg, #D9A5A5 0 8px, transparent 8px 16px)",
            }}
          />
          <motion.div
            className="mx-auto -mt-2 h-20 w-56 rounded-t-3xl sm:w-60"
            style={{
              background: "linear-gradient(180deg, #F9F3EA, #E8D7A5)",
            }}
            animate={allOut ? { boxShadow: "inset 0 -8px 0 rgba(217, 165, 165, 0.4), 0 20px 60px rgba(232, 215, 165, 0.24)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <div
            className="mx-auto -mt-2 h-4 w-56 rounded-full sm:w-60"
            style={{
              background: "repeating-linear-gradient(90deg, #F8E8EE 0 10px, transparent 10px 20px)",
            }}
          />
          <motion.div
            className="mx-auto h-6 w-64 rounded-b-2xl sm:w-72"
            style={{ background: "linear-gradient(180deg, #E8D7A5, #D9A5A5)" }}
            animate={allOut ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <div
            className="mx-auto -mt-1 h-3 w-64 rounded-full opacity-30 blur-md sm:w-72"
            style={{ background: "#D9A5A5" }}
          />
        </div>
      </motion.div>

      <motion.button
        onClick={blowOutCandles}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        disabled={isBlowing || allOut}
        className="btn-gold btn-gold-hover relative z-10 mt-8 rounded-full px-9 py-4 text-sm font-semibold tracking-wide disabled:cursor-not-allowed disabled:opacity-60"
      >
        {allOut ? "Candles are out" : isBlowing ? "Blowing out..." : "Blow Out Candles"}
      </motion.button>

      {allOut && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-gold mt-8 font-display text-2xl sm:text-3xl"
        >
          Wish made ✨
        </motion.p>
      )}
    </section>
  );
}
