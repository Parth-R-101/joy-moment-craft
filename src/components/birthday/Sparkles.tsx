import { motion } from "framer-motion";
import { useMemo } from "react";

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
            background: "radial-gradient(circle, oklch(0.95 0.12 85) 0%, transparent 70%)",
            boxShadow: "0 0 8px oklch(0.85 0.15 80 / 0.8)",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], y: [0, -20, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
