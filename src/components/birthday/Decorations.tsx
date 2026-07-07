import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useMemo, useRef } from "react";

type DecorativeLayerProps = {
  density?: "subtle" | "soft" | "rich";
  showBalloons?: boolean;
  showHearts?: boolean;
  showPetals?: boolean;
  showSparkles?: boolean;
  showFairyLights?: boolean;
  showButterflies?: boolean;
  showStars?: boolean;
  showRibbons?: boolean;
  showSunflowers?: boolean;
  burstOnEnter?: boolean;
  className?: string;
};

const PALETTE = ["#E8D7A5", "#D9A5A5", "#F8E8EE", "#EDE7F6", "#FFFDF8"];

export function SunflowerAccent({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-10 ${className}`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: [0.7, 0.95, 0.7], scale: [0.96, 1, 0.96], y: [0, -3, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
        <path d="M32 10c-2 8-8 14-16 16 7 2 13 8 16 16 3-8 9-14 16-16-8-2-14-8-16-16Z" fill="#F5C95A" />
        <path d="M32 10c-2 8-8 14-16 16 7 2 13 8 16 16 3-8 9-14 16-16-8-2-14-8-16-16Z" fill="#F7DF8D" opacity="0.7" />
        <circle cx="32" cy="32" r="8" fill="#C27A20" />
        <circle cx="32" cy="32" r="5" fill="#F7D96A" />
        <path d="M32 40v18" stroke="#6D8F42" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M26 48c2-3 6-5 6-5s4 2 6 5" stroke="#6D8F42" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

export function DecorativeLayer({
  density = "soft",
  showBalloons = false,
  showHearts = false,
  showPetals = false,
  showSparkles = false,
  showFairyLights = false,
  showButterflies = false,
  showStars = false,
  showRibbons = false,
  showSunflowers = false,
  burstOnEnter = false,
  className = "",
}: DecorativeLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25, once: true });

  useEffect(() => {
    if (!burstOnEnter || !inView) return;

    const end = Date.now() + 1400;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 50, origin: { x: 0 }, colors: PALETTE });
      confetti({ particleCount: 4, angle: 120, spread: 50, origin: { x: 1 }, colors: PALETTE });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [burstOnEnter, inView]);

  const config = useMemo(() => {
    const base = density === "rich" ? 4 : density === "soft" ? 3 : 2;
    return {
      balloons: showBalloons ? base + 2 : 0,
      hearts: showHearts ? base + 2 : 0,
      petals: showPetals ? base + 2 : 0,
      sparkles: showSparkles ? base + 2 : 0,
      stars: showStars ? base + 1 : 0,
      ribbons: showRibbons ? base : 0,
      butterflies: showButterflies ? base : 0,
      fairyLights: showFairyLights ? 1 : 0,
      sunflowers: showSunflowers ? (density === "rich" ? 3 : density === "soft" ? 2 : 1) : 0,
      sunflowerPetals: showSunflowers ? (density === "rich" ? 3 : density === "soft" ? 2 : 1) : 0,
    };
  }, [density, showBalloons, showHearts, showPetals, showSparkles, showStars, showRibbons, showButterflies, showFairyLights, showSunflowers]);

  const balloons = useMemo(
    () =>
      Array.from({ length: config.balloons }, (_, id) => ({
        id,
        left: 6 + Math.random() * 88,
        top: 8 + Math.random() * 70,
        size: 24 + Math.random() * 28,
        delay: Math.random() * 2.4,
        duration: 8 + Math.random() * 5,
        color: PALETTE[id % PALETTE.length],
      })),
    [config.balloons],
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: config.hearts }, (_, id) => ({
        id: `heart-${id}`,
        left: 8 + Math.random() * 84,
        top: 8 + Math.random() * 78,
        size: 12 + Math.random() * 10,
        delay: Math.random() * 3,
        duration: 8 + Math.random() * 4,
        rotate: -12 + Math.random() * 24,
      })),
    [config.hearts],
  );

  const petals = useMemo(
    () =>
      Array.from({ length: config.petals }, (_, id) => ({
        id: `petal-${id}`,
        left: Math.random() * 100,
        top: -8 - Math.random() * 16,
        size: 7 + Math.random() * 8,
        delay: Math.random() * 4,
        duration: 10 + Math.random() * 4,
        rotate: Math.random() * 360,
        color: PALETTE[(id + 1) % PALETTE.length],
      })),
    [config.petals],
  );

  const sunflowers = useMemo(
    () =>
      Array.from({ length: config.sunflowers }, (_, id) => ({
        id: `sunflower-${id}`,
        left: 10 + Math.random() * 80,
        top: 10 + Math.random() * 78,
        size: 34 + Math.random() * 18,
        delay: Math.random() * 3,
        duration: 5 + Math.random() * 3,
        rotate: -8 + Math.random() * 16,
      })),
    [config.sunflowers],
  );

  const sunflowerPetals = useMemo(
    () =>
      Array.from({ length: config.sunflowerPetals }, (_, id) => ({
        id: `sunflower-petal-${id}`,
        left: Math.random() * 100,
        top: -8 - Math.random() * 16,
        size: 8 + Math.random() * 6,
        delay: Math.random() * 4,
        duration: 12 + Math.random() * 4,
        rotate: Math.random() * 360,
      })),
    [config.sunflowerPetals],
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: config.sparkles }, (_, id) => ({
        id: `sparkle-${id}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 3,
        color: PALETTE[id % PALETTE.length],
      })),
    [config.sparkles],
  );

  const stars = useMemo(
    () =>
      Array.from({ length: config.stars }, (_, id) => ({
        id: `star-${id}`,
        left: 10 + Math.random() * 80,
        top: 20 + Math.random() * 60,
        size: 10 + Math.random() * 8,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
      })),
    [config.stars],
  );

  const ribbons = useMemo(
    () =>
      Array.from({ length: config.ribbons }, (_, id) => ({
        id: `ribbon-${id}`,
        left: 10 + Math.random() * 80,
        top: 20 + Math.random() * 65,
        size: 48 + Math.random() * 20,
        delay: Math.random() * 2.6,
        duration: 7 + Math.random() * 4,
        rotate: -16 + Math.random() * 32,
      })),
    [config.ribbons],
  );

  const butterflies = useMemo(
    () =>
      Array.from({ length: config.butterflies }, (_, id) => ({
        id: `butterfly-${id}`,
        left: 8 + Math.random() * 84,
        top: 12 + Math.random() * 72,
        size: 16 + Math.random() * 10,
        delay: Math.random() * 2.8,
        duration: 8 + Math.random() * 4,
        rotate: -8 + Math.random() * 16,
      })),
    [config.butterflies],
  );

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {showFairyLights && config.fairyLights > 0 && (
        <div className="absolute inset-x-0 top-2 mx-auto flex h-10 w-full max-w-sm justify-between px-4 sm:px-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={index}
              className="relative h-8 w-0.5 rounded-full"
              style={{ background: "linear-gradient(180deg, rgba(232, 215, 165, 0.95), rgba(217, 165, 165, 0.1))" }}
              animate={{ opacity: [0.35, 0.9, 0.35], y: [0, 1.2, 0] }}
              transition={{ duration: 2.2 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span
                className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                style={{ background: index % 2 ? "#E8D7A5" : "#D9A5A5" }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.8 + index * 0.15, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute rounded-full"
          style={{
            left: `${balloon.left}%`,
            top: `${balloon.top}%`,
            width: balloon.size,
            height: balloon.size * 1.12,
            background: `radial-gradient(circle at 35% 30%, rgba(255, 253, 248, 0.7), ${balloon.color})`,
            boxShadow: "0 10px 24px rgba(217, 165, 165, 0.16)",
          }}
          animate={{ y: [0, 10, 0], x: [0, 8, 0, -6, 0], rotate: [-1, 2, -1, 1, 0] }}
          transition={{ duration: balloon.duration, delay: balloon.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute left-1/2 top-full h-8 w-px -translate-x-1/2 bg-rose-gold/25" />
        </motion.div>
      ))}

      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: `${heart.left}%`, top: `${heart.top}%`, opacity: 0.7, rotate: heart.rotate }}
          animate={{ y: [0, 18, 0], x: [0, -6, 0, 6, 0], scale: [0.9, 1.03, 0.9] }}
          transition={{ duration: heart.duration, delay: heart.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 20s-6.5-4.35-8.4-8.1C2.2 8.85 3.8 5.5 7.1 5.5c1.8 0 3.1 1.1 4.1 2.2 1-1.1 2.3-2.2 4.1-2.2 3.3 0 4.9 3.35 3.5 6.4C18.5 15.65 12 20 12 20Z"
              fill="url(#heart-gradient)"
              stroke="rgba(255, 253, 248, 0.8)"
              strokeWidth="0.75"
            />
            <defs>
              <linearGradient id="heart-gradient" x1="3" y1="4" x2="19" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F8E8EE" />
                <stop offset="0.55" stopColor="#D9A5A5" />
                <stop offset="1" stopColor="#E8D7A5" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}

      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-[70%_30%_70%_30%]"
          style={{ left: `${petal.left}%`, top: `${petal.top}%`, width: petal.size, height: petal.size * 1.2, background: petal.color, opacity: 0.75 }}
          animate={{ y: [0, 120, 140], x: [0, 10, -12, 0], rotate: [petal.rotate, petal.rotate + 180, petal.rotate + 360] }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {sunflowerPetals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full"
          style={{ left: `${petal.left}%`, top: `${petal.top}%`, width: petal.size, height: petal.size * 1.12, background: "linear-gradient(135deg, #f6d97d 0%, #e8b44b 55%, #a96d1f 100%)", opacity: 0.72, boxShadow: "0 0 10px rgba(232, 215, 165, 0.16)" }}
          animate={{ y: [0, 120, 140], x: [0, 8, -10, 0], rotate: [petal.rotate, petal.rotate + 180, petal.rotate + 360] }}
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {sunflowers.map((sunflower) => (
        <motion.div
          key={sunflower.id}
          className="absolute"
          style={{ left: `${sunflower.left}%`, top: `${sunflower.top}%`, rotate: sunflower.rotate, opacity: 0.85 }}
          animate={{ y: [0, 6, 0], rotate: [sunflower.rotate - 2, sunflower.rotate + 2, sunflower.rotate], scale: [0.98, 1.01, 0.98] }}
          transition={{ duration: sunflower.duration, delay: sunflower.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width={sunflower.size} height={sunflower.size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path d="M32 12c-2 8-8 14-16 16 7 2 13 8 16 16 3-8 9-14 16-16-8-2-14-8-16-16Z" fill="#F4D48A" />
            <path d="M32 12c-2 8-8 14-16 16 7 2 13 8 16 16 3-8 9-14 16-16-8-2-14-8-16-16Z" fill="#F8E8EE" opacity="0.55" />
            <circle cx="32" cy="32" r="8" fill="#B87A3A" />
            <circle cx="32" cy="32" r="5" fill="#F9E8B6" />
            <path d="M32 40v18" stroke="#7D8F5C" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M26 48c2-3 6-5 6-5s4 2 6 5" stroke="#8DA16B" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </motion.div>
      ))}

      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute rounded-full"
          style={{ left: `${sparkle.left}%`, top: `${sparkle.top}%`, width: sparkle.size, height: sparkle.size, background: sparkle.color, boxShadow: `0 0 12px ${sparkle.color}55` }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.75, 1.2, 0.75] }}
          transition={{ duration: sparkle.duration, delay: sparkle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute text-lg text-white/80"
          style={{ left: `${star.left}%`, top: `${star.top}%`, fontSize: `${star.size}px` }}
          animate={{ opacity: [0.35, 0.9, 0.35], rotate: [0, 20, 0], scale: [0.85, 1.05, 0.85] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
      ))}

      {ribbons.map((ribbon) => (
        <motion.div
          key={ribbon.id}
          className="absolute h-3 rounded-full"
          style={{ left: `${ribbon.left}%`, top: `${ribbon.top}%`, width: ribbon.size, rotate: ribbon.rotate, background: "linear-gradient(90deg, rgba(232, 215, 165, 0.95), rgba(217, 165, 165, 0.9), rgba(248, 232, 238, 0.9))" }}
          animate={{ y: [0, 6, 0], x: [0, 8, 0, -6, 0], opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: ribbon.duration, delay: ribbon.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {butterflies.map((butterfly) => (
        <motion.div
          key={butterfly.id}
          className="absolute"
          style={{ left: `${butterfly.left}%`, top: `${butterfly.top}%`, rotate: butterfly.rotate, opacity: 0.8 }}
          animate={{ y: [0, 10, 0], x: [0, 10, 0, -8, 0] }}
          transition={{ duration: butterfly.duration, delay: butterfly.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width={butterfly.size} height={butterfly.size * 0.7} viewBox="0 0 40 24" fill="none" aria-hidden="true">
            <path d="M10 12c4-6 9-8 14-8 3 0 8 1.3 10 5-2 4-7 6-10 6-5 0-10-3-14-3Z" fill="#D9A5A5" opacity="0.85" />
            <path d="M10 12c4 6 9 8 14 8 3 0 8-1.3 10-5-2-4-7-6-10-6-5 0-10 3-14 3Z" fill="#F8E8EE" opacity="0.9" />
            <circle cx="20" cy="12" r="2.3" fill="#4A3F47" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
