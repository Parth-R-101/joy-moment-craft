import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { config } from "@/lib/birthday-config";
import { PasswordGate } from "@/components/birthday/PasswordGate";
import { Landing } from "@/components/birthday/Landing";
import { CakeScene } from "@/components/birthday/CakeScene";
import { PhotoMemories } from "@/components/birthday/PhotoMemories";
import { Videos } from "@/components/birthday/Videos";
import { Letter } from "@/components/birthday/Letter";
import { Gallery } from "@/components/birthday/Gallery";
import { PolaroidWall } from "@/components/birthday/PolaroidWall";
import { Ending } from "@/components/birthday/Ending";
import { MusicButton } from "@/components/birthday/MusicButton";
import { CursorGlow } from "@/components/birthday/CursorGlow";

export const Route = createFileRoute("/")({ component: Index });

type Phase = "gate" | "landing" | "cake" | "story";

function Index() {
  const [phase, setPhase] = useState<Phase>(config.password ? "gate" : "landing");
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "story" && storyRef.current) {
      storyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [phase]);

  return (
    <main className="relative min-h-[100dvh]">
      <CursorGlow />

      <AnimatePresence mode="wait">
        {phase === "gate" && (
          <motion.div key="gate" exit={{ opacity: 0 }}>
            <PasswordGate password={config.password} onUnlock={() => setPhase("landing")} />
          </motion.div>
        )}

        {phase === "landing" && (
          <motion.div key="landing" exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6 }}>
            <Landing name={config.name} message={config.landingMessage} onOpen={() => setPhase("cake")} copy={config.opening} />
          </motion.div>
        )}

        {(phase === "cake" || phase === "story") && (
          <motion.div key="rest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <MusicButton src={config.musicFile} autoStart={phase === "cake" || phase === "story"} />
            <CakeScene onDone={() => setPhase("story")} />

            <div ref={storyRef}>
              <PhotoMemories photos={config.photos} />
              <Videos videos={config.videos} />
              <Letter text={config.letter} />
              <Gallery images={config.gallery} />
              <PolaroidWall images={config.polaroids} />
              <Ending message={config.endingMessage} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
