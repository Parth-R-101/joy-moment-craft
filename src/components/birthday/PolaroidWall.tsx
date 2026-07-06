import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "./PhotoMemories";

export function PolaroidWall({ images }: { images: string[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="mx-auto w-full max-w-md px-4 py-16">
      <SectionTitle overline="scrapbook" title="Polaroid Wall" />
      <div className="mt-10 grid grid-cols-2 gap-6">
        {images.map((src, i) => {
          const rot = (i % 2 === 0 ? -1 : 1) * (3 + (i % 4));
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: rot }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              onClick={() => setOpen(src)}
              className="rounded-sm bg-white p-2 pb-8 shadow-xl"
              style={{ boxShadow: "0 12px 30px -10px oklch(0.4 0.05 60 / 0.35)" }}
            >
              <div className="aspect-square w-full overflow-hidden bg-muted">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(e) => ((e.currentTarget.style.display = "none"))}
                />
              </div>
              <p
                className="mt-2 text-center text-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-hand)" }}
              >
                memory #{i + 1}
              </p>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={open}
              className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
