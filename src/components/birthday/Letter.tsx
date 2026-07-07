import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./PhotoMemories";
import { DecorativeLayer, SunflowerAccent } from "./Decorations";
import { config } from "@/lib/birthday-config";

export function Letter({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <section className="relative mx-auto w-full max-w-md overflow-hidden px-4 py-16">
      <DecorativeLayer density="subtle" showStars showSparkles showButterflies showHearts showSunflowers burstOnEnter className="z-0" />
      <SunflowerAccent className="left-2 top-3 h-10 w-10 opacity-70 sm:left-0 sm:top-0 sm:h-12 sm:w-12" />
      <SunflowerAccent className="right-2 bottom-3 h-10 w-10 opacity-70 sm:right-0 sm:bottom-0 sm:h-12 sm:w-12" />
      <div className="relative z-10">
        <SectionTitle overline={config.sections.letter.overline} title={config.sections.letter.title} />
        <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass mt-8 rounded-3xl p-6"
        style={{ backgroundImage: "linear-gradient(oklch(1 0 0 / 0.6), oklch(0.97 0.03 85 / 0.5))" }}
      >
          <pre
            className="whitespace-pre-wrap text-[19px] leading-relaxed"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            {shown}
            <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-foreground/60 align-middle" />
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
