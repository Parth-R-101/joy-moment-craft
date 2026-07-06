import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "./PhotoMemories";
import { Volume2, VolumeX } from "lucide-react";

export function Videos({ videos }: { videos: { src: string; caption: string }[] }) {
  return (
    <section className="mx-auto w-full max-w-md px-4 py-16">
      <SectionTitle overline="reels" title="Little Moments" />
      <div className="mt-8 flex flex-col gap-10">
        {videos.map((v, i) => (
          <VideoCard key={i} src={v.src} caption={v.caption} />
        ))}
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="glass relative overflow-hidden rounded-3xl"
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        )}
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute right-3 top-3 rounded-full bg-black/40 p-2 text-white backdrop-blur-md transition hover:bg-black/60"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
      <p className="p-4 text-center text-sm text-muted-foreground">{caption}</p>
    </motion.div>
  );
}
