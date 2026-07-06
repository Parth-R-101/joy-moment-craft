import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "./PhotoMemories";

export function Gallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-md px-4">
        <SectionTitle overline="album" title="Gallery" />
      </div>
      <div className="mt-8 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-4 px-6 snap-x snap-mandatory">
          {images.map((src, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setOpen(src)}
              className="glass relative aspect-[3/4] w-64 shrink-0 snap-center overflow-hidden rounded-3xl"
            >
              <img
                src={src}
                loading="lazy"
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
            </motion.button>
          ))}
        </div>
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
              layout
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
