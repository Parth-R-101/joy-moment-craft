import { motion } from "framer-motion";
import type { config } from "@/lib/birthday-config";

type Photo = (typeof config)["photos"][number];

export function PhotoMemories({ photos }: { photos: Photo[] }) {
  return (
    <section className="mx-auto w-full max-w-md px-4 py-16">
      <SectionTitle overline="feed" title="Photo Memories" />
      <div className="mt-8 flex flex-col gap-8">
        {photos.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="glass overflow-hidden rounded-3xl"
          >
            <div className="aspect-square w-full overflow-hidden bg-muted">
              <img
                src={p.src}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
                onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg">{p.title}</h3>
                <span className="text-xs text-muted-foreground">{p.date}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.caption}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function SectionTitle({ overline, title }: { overline: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center"
    >
      <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{overline}</p>
      <h2 className="text-gold mt-2 text-3xl">{title}</h2>
    </motion.div>
  );
}
