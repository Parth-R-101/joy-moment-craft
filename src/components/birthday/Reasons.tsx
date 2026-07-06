import { motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "./PhotoMemories";
import { DecorativeLayer } from "./Decorations";
import { config } from "@/lib/birthday-config";

export function Reasons({ items }: { items: { title: string; text: string }[] }) {
  return (
    <section className="section-padding relative overflow-hidden">
      <DecorativeLayer density="subtle" showHearts showSparkles showRibbons burstOnEnter className="z-0" />
      <div className="relative z-10">
        <SectionTitle overline={config.sections.reasons.overline} title={config.sections.reasons.title} />
        <div className="mt-12 grid grid-cols-2 gap-5 sm:mt-14 sm:gap-6">
          {config.reasons.map((it, i) => (
            <FlipCard key={i} front={it.title} back={it.text} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ front, back, delay }: { front: string; back: string; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setFlipped((f) => !f)}
      className="relative aspect-square w-full"
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="glass absolute inset-0 flex items-center justify-center rounded-[1.25rem] p-5 text-center glow-soft"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-gold font-display text-base leading-snug sm:text-lg">{front}</span>
        </div>
        <div
          className="glass-strong absolute inset-0 flex items-center justify-center rounded-[1.25rem] p-5 text-center text-sm leading-relaxed text-muted-foreground"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </motion.button>
  );
}
