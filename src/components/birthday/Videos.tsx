import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./PhotoMemories";
import { Volume2, VolumeX } from "lucide-react";
import { DecorativeLayer } from "./Decorations";
import { config } from "@/lib/birthday-config";

export function Videos({ videos }: { videos: { src: string; caption: string }[] }) {
  return (
    <section className="section-padding relative overflow-hidden">
      <DecorativeLayer density="subtle" showFairyLights showStars showSparkles showBalloons showHearts className="z-0" />
      <div className="relative z-10">
        <SectionTitle overline={config.sections.videos.overline} title={config.sections.videos.title} />
        <div className="mt-10 flex flex-col gap-12 sm:mt-12 sm:gap-14">
          {config.videos.map((v, i) => (
            <VideoCard key={i} src={v.src} caption={v.caption} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ src, caption }: { src: string; caption: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="glass relative overflow-hidden rounded-[1.75rem] glow-soft"
    >
      <div className="relative aspect-[9/16] w-full bg-black">
        <video
          ref={ref}
          src={src}
          muted={muted}
          playsInline
          loop
          preload="metadata"
          className="h-full w-full object-cover"
        />
        {visible && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4a3f47]/50 via-transparent to-[#f8e8ee]/10" />
        )}
        <button
          onClick={() => setMuted((m) => !m)}
          className="glass absolute right-4 top-4 rounded-full p-2.5 text-foreground transition hover:scale-105"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
      <p className="border-t border-rose-gold/10 px-6 py-5 text-center text-sm leading-relaxed text-muted-foreground">
        {caption}
      </p>
    </motion.div>
  );
}
