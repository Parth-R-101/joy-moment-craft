import { motion } from "framer-motion";
import { SectionTitle } from "./PhotoMemories";

export function Timeline({ items }: { items: { title: string; text: string }[] }) {
  return (
    <section className="mx-auto w-full max-w-md px-4 py-16">
      <SectionTitle overline="our story" title="Timeline" />
      <div className="relative mt-10 pl-8">
        <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-gold via-gold-soft to-transparent" />
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="relative mb-8"
          >
            <span
              className="absolute -left-[22px] top-2 h-3 w-3 rounded-full"
              style={{ background: "oklch(0.78 0.14 75)", boxShadow: "0 0 12px oklch(0.78 0.14 75 / 0.7)" }}
            />
            <div className="glass rounded-2xl p-4">
              <h3 className="font-display text-lg">{it.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{it.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
