import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "./Sparkles";
import { config } from "@/lib/birthday-config";

export function PasswordGate({ password, onUnlock }: { password: string; onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === password.toLowerCase()) {
      setIsUnlocked(true);
      setTimeout(() => onUnlock(), 1400);
    } else {
      setError(true);
      setTimeout(() => setError(false), 700);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 py-10 sm:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 500px at 50% 18%, rgba(248, 232, 238, 0.6), transparent 70%), radial-gradient(500px 450px at 20% 80%, rgba(237, 231, 246, 0.4), transparent 65%)",
        }}
      />
      <Sparkles count={32} />

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative z-10 w-full max-w-md rounded-[2rem] p-7 text-center shadow-[0_24px_70px_-20px_rgba(217,165,165,0.35)] sm:p-9"
      >
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-[11px] font-semibold uppercase tracking-[0.45em] text-muted-foreground"
              >
                {config.opening.introLine}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.7, type: "spring", stiffness: 120, damping: 16 }}
                className="mx-auto mt-5 flex h-48 w-48 items-center justify-center sm:h-52 sm:w-52"
              >
                <div className="relative h-40 w-40 sm:h-44 sm:w-44">
                  <motion.div
                    className="absolute inset-x-0 top-0 mx-auto h-16 w-28 rounded-t-[1.2rem] rounded-b-[0.5rem]"
                    style={{
                      background: "linear-gradient(135deg, #FFFDF8 0%, #F8E8EE 70%, #E8D7A5 100%)",
                      boxShadow: "0 16px 28px rgba(217, 165, 165, 0.18)",
                    }}
                    animate={isUnlocked ? { rotate: -18, y: -8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div
                    className="absolute inset-x-0 bottom-0 mx-auto h-28 w-40 rounded-[1.3rem]"
                    style={{
                      background: "linear-gradient(180deg, #FFFDF8 0%, #F8E8EE 65%, #E8D7A5 100%)",
                      boxShadow: "inset 0 -8px 0 rgba(217, 165, 165, 0.2), 0 14px 32px rgba(217, 165, 165, 0.2)",
                    }}
                    animate={isUnlocked ? { scale: 1.02, y: 4 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-0 h-12 w-3 -translate-x-1/2 rounded-full"
                    style={{ background: "linear-gradient(180deg, #D9A5A5, #E8D7A5)" }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-6 h-5 w-16 -translate-x-1/2 rounded-full"
                    style={{ background: "linear-gradient(90deg, #D9A5A5, #F8E8EE, #E8D7A5)" }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(255, 253, 248, 0.95) 0%, rgba(248, 232, 238, 0.8) 60%, rgba(232, 215, 165, 0.15) 100%)" }}
                    animate={isUnlocked ? { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] } : { scale: 1, opacity: 0.92 }}
                    transition={{ duration: 1.1, repeat: isUnlocked ? Infinity : 0, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xl"
                    animate={isUnlocked ? { opacity: 1, scale: 1.05 } : { opacity: 0.95, scale: 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    💝
                  </motion.div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="font-display text-xl italic leading-relaxed text-muted-foreground"
              >
                {config.opening.message}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-6"
              >
                <motion.input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="password"
                  placeholder={config.opening.inputPlaceholder}
                  animate={error ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                  className="w-full rounded-full border border-border/70 bg-white/70 px-5 py-3 text-center text-base outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
                />
                {error && <p className="mt-2 text-xs text-rose">Not quite. Try again 💫</p>}
                <button type="submit" className="btn-gold btn-gold-hover mt-4 w-full rounded-full px-6 py-3 text-sm font-semibold">
                  {config.opening.buttonLabel}
                </button>
                <p className="mt-4 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">{config.opening.hint}</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="unlock"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-4 py-3"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl"
              >
                🌷
              </motion.div>
              <p className="font-display text-2xl italic text-muted-foreground">{config.opening.revealTitle}</p>
              <p className="text-sm text-muted-foreground">{config.opening.revealText}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
}
