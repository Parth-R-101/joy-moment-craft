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
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="glass fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full"
        style={{ boxShadow: "0 10px 30px -8px oklch(0.6 0.14 65 / 0.4)" }}
      >
        {playing ? <Pause className="h-5 w-5 text-foreground" /> : <Music className="h-5 w-5 text-foreground" />}
        {playing && (
          <span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow: "0 0 0 2px oklch(0.78 0.14 75 / 0.5)",
              animation: "pulse 2s ease-out infinite",
            }}
          />
        )}
      </motion.button>
    </>
  );
}
