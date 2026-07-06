import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./PhotoMemories";

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
    <section className="mx-auto w-full max-w-md px-4 py-16">
      <SectionTitle overline="from me to you" title="A Letter" />
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
    </section>
  );
}
