import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, Pause } from "lucide-react";

export function MusicButton({ src, autoStart }: { src: string; autoStart: boolean }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!autoStart || !ref.current) return;
    ref.current.volume = 0.5;
    ref.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [autoStart]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={ref} src={src} loop preload="none" />
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="glass fixed bottom-5 right-5 z-40 grid h-13 w-13 place-items-center rounded-full sm:bottom-6 sm:right-6"
        style={{
          width: "3.25rem",
          height: "3.25rem",
          boxShadow: playing
            ? "0 12px 32px -8px rgba(217, 165, 165, 0.45), 0 0 24px rgba(232, 215, 165, 0.3)"
            : "0 10px 28px -8px rgba(217, 165, 165, 0.3)",
        }}
      >
        {playing ? (
          <Pause className="h-5 w-5 text-rose-gold" />
        ) : (
          <Music className="h-5 w-5 text-rose-gold" />
        )}
        {playing && (
          <span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow: "0 0 0 2px rgba(217, 165, 165, 0.45)",
              animation: "soft-pulse 2.2s ease-out infinite",
            }}
          />
        )}
      </motion.button>
    </>
  );
}
