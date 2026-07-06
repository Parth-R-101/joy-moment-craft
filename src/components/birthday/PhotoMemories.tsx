import { motion } from "framer-motion";
import { DecorativeLayer } from "./Decorations";
import { config } from "@/lib/birthday-config";

type Photo = (typeof config)["photos"][number];

export function PhotoMemories({ photos }: { photos: Photo[] }) {
  return (
    <section className="section-padding relative overflow-hidden">
      <DecorativeLayer density="subtle" showBalloons showHearts showPetals burstOnEnter className="z-0" />
      <div className="relative z-10">
        <SectionTitle overline={config.sections.photoMemories.overline} title={config.sections.photoMemories.title} />
        <div className="mt-10 flex flex-col gap-10 sm:mt-12 sm:gap-12">
          {photos.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="glass overflow-hidden rounded-[1.75rem] glow-soft"
          >
            <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-blush/40 to-lavender/30">
              <img
                src={p.src}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 ease-out hover:scale-[1.03]"
                onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
            </div>
            <div className="border-t border-rose-gold/10 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl leading-snug">{p.title}</h3>
                <span className="shrink-0 rounded-full bg-cream/80 px-3 py-1 text-[11px] tracking-wide text-muted-foreground">
                  {p.date}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.caption}</p>
            </div>
          </motion.article>
        ))}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ overline, title }: { overline: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-muted-foreground">{overline}</p>
      <h2 className="text-gold mt-3 text-3xl font-semibold sm:text-[2rem]">{title}</h2>
      <div className="divider-rose" />
    </motion.div>
  );
}
