import { motion } from "framer-motion";
import { useMemo } from "react";

const SPARKLE_PALETTE = ["#E8D7A5", "#D9A5A5", "#F8E8EE", "#FFFDF8"];

export function Sparkles({ count = 20, className = "" }: { count?: number; className?: string }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 5,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4,
        color: SPARKLE_PALETTE[i % SPARKLE_PALETTE.length],
      })),
    [count],
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            boxShadow: `0 0 10px ${b.color}99, 0 0 20px rgba(237, 231, 246, 0.4)`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5], y: [0, -24, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
