import { motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "./PhotoMemories";

export function Reasons({ items }: { items: { title: string; text: string }[] }) {
  return (
    <section className="mx-auto w-full max-w-md px-4 py-16">
      <SectionTitle overline="because..." title="10 Reasons You're Amazing" />
      <div className="mt-10 grid grid-cols-2 gap-4">
        {items.map((it, i) => (
          <FlipCard key={i} front={it.title} back={it.text} delay={i * 0.04} />
        ))}
      </div>
    </section>
  );
}

function FlipCard({ front, back, delay }: { front: string; back: string; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={() => setFlipped((f) => !f)}
      className="relative aspect-square w-full"
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="glass absolute inset-0 flex items-center justify-center rounded-2xl p-4 text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-gold font-display text-lg">{front}</span>
        </div>
        <div
          className="glass absolute inset-0 flex items-center justify-center rounded-2xl p-4 text-center text-sm"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </motion.button>
  );
}
