import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "./PhotoMemories";
import { DecorativeLayer } from "./Decorations";
import { config } from "@/lib/birthday-config";

export function Gallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const galleryItems = config.gallery;

  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-24">
      <DecorativeLayer density="subtle" showFairyLights showStars showSparkles showRibbons showBalloons showHearts burstOnEnter className="z-0" />
      <div className="relative z-10">
        <div className="mx-auto max-w-md px-5 sm:px-6">
          <SectionTitle overline={config.sections.gallery.overline} title={config.sections.gallery.title} />
        </div>
        <div className="mt-10 overflow-x-auto pb-6 [scrollbar-width:none] [-ms-overflow-style:none] sm:mt-12 [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-5 px-6 snap-x snap-mandatory sm:gap-6 sm:px-8">
          {config.gallery.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(item.src)}
              className="glass relative aspect-[3/4] w-64 shrink-0 snap-center overflow-hidden rounded-[1.75rem] glow-soft transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={item.src}
                loading="lazy"
                alt={item.alt}
                className="h-full w-full object-cover"
                onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
            </motion.button>
          ))}
          </div>
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
              layout
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
