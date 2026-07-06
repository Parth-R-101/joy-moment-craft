import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "./PhotoMemories";
import { DecorativeLayer } from "./Decorations";
import { config } from "@/lib/birthday-config";

export function PolaroidWall({ images }: { images: string[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="section-padding relative overflow-hidden">
      <DecorativeLayer density="subtle" showHearts showStars showSparkles showBalloons burstOnEnter className="z-0" />
      <div className="relative z-10">
        <SectionTitle overline={config.sections.polaroids.overline} title={config.sections.polaroids.title} />
        <div className="mt-12 grid grid-cols-2 gap-6 sm:mt-14 sm:gap-8">
          {config.polaroids.map((item, i) => {
          const rot = (i % 2 === 0 ? -1 : 1) * (3 + (i % 4));
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 48, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: rot }}
              whileHover={{ rotate: 0, scale: 1.04 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(item.src)}
              className="rounded-xl p-2.5 pb-9 sm:p-3 sm:pb-10"
              style={{
                background: "linear-gradient(160deg, #FFFDF8, #F9F3EA)",
                border: "1px solid rgba(217, 165, 165, 0.25)",
                boxShadow:
                  "0 16px 40px -12px rgba(217, 165, 165, 0.3), 0 4px 16px -4px rgba(232, 215, 165, 0.2), inset 0 1px 0 rgba(255, 253, 248, 0.8)",
              }}
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-blush/30 to-lavender/20">
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(e) => ((e.currentTarget.style.display = "none"))}
                />
              </div>
              <p
                className="mt-3 text-center text-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-hand)" }}
              >
                {item.caption}
              </p>
            </motion.button>
          );
        })}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpen(null)}
            className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-6"
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={open}
              className="max-h-[90vh] max-w-full rounded-[1.5rem] object-contain"
              style={{
                boxShadow:
                  "0 24px 64px -16px rgba(74, 63, 71, 0.5), 0 0 48px rgba(217, 165, 165, 0.25)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
