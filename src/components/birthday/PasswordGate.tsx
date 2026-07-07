import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "./Sparkles";
import { DecorativeLayer, SunflowerAccent } from "./Decorations";
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
      <DecorativeLayer density="subtle" showSunflowers className="z-0" />
      <SunflowerAccent className="left-2 top-3 h-10 w-10 opacity-70 sm:left-5 sm:top-5 sm:h-12 sm:w-12" />
      <SunflowerAccent className="right-2 top-3 h-10 w-10 opacity-70 sm:right-5 sm:top-5 sm:h-12 sm:w-12" />
      <SunflowerAccent className="bottom-3 left-2 h-9 w-9 opacity-70 sm:bottom-5 sm:left-5 sm:h-11 sm:w-11" />
      <SunflowerAccent className="bottom-3 right-2 h-9 w-9 opacity-70 sm:bottom-5 sm:right-5 sm:h-11 sm:w-11" />

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
                className="mx-auto mt-5 flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56"
              >
                <div className="relative h-40 w-40 sm:h-48 sm:w-48">
                  <div className="absolute inset-x-[6%] top-[18%] h-[18%] rounded-[1.2rem] border border-[#f8e8ee]/80 bg-[linear-gradient(180deg,#fffdf8_0%,#fef8f9_45%,#f3e2e4_100%)] shadow-[0_16px_28px_rgba(217,165,165,0.16)]" />
                  <div className="absolute inset-x-[11%] top-[34%] h-[16%] rounded-[1.05rem] border border-[#f8e8ee]/80 bg-[linear-gradient(180deg,#fffdf8_0%,#fef8f9_45%,#e8d7a5_100%)] shadow-[0_12px_24px_rgba(217,165,165,0.14)]" />
                  <div className="absolute inset-x-[4%] bottom-[4%] h-[28%] rounded-[1.35rem] border border-[#f8e8ee]/80 bg-[linear-gradient(180deg,#fffdf8_0%,#fdf9f6_50%,#f5e2e8_100%)] shadow-[0_16px_30px_rgba(217,165,165,0.2)]" />

                  <div className="absolute inset-x-[15%] top-[14%] h-[6%] rounded-full bg-[linear-gradient(90deg,#f6d9df_0%,#f8ebee_45%,#e9cfa7_100%)] opacity-90" />
                  <div className="absolute inset-x-[9%] top-[26%] h-[4%] rounded-full bg-[linear-gradient(90deg,#f6d9df_0%,#f8ebee_50%,#e9cfa7_100%)] opacity-80" />
                  <div className="absolute inset-x-[14%] top-[45%] h-[4%] rounded-full bg-[linear-gradient(90deg,#f6d9df_0%,#f8ebee_50%,#e9cfa7_100%)] opacity-70" />

                  <div className="absolute left-[22%] top-[8%] h-[7%] w-[10%] rounded-full bg-[linear-gradient(180deg,#f5d8dd_0%,#e1b0bc_100%)]" />
                  <div className="absolute right-[22%] top-[7%] h-[7%] w-[10%] rounded-full bg-[linear-gradient(180deg,#f5d8dd_0%,#e1b0bc_100%)]" />
                  <div className="absolute left-[18%] top-[1%] h-[8%] w-[12%] rounded-full bg-[linear-gradient(180deg,#f5d8dd_0%,#e1b0bc_100%)]" />
                  <div className="absolute right-[18%] top-[1%] h-[8%] w-[12%] rounded-full bg-[linear-gradient(180deg,#f5d8dd_0%,#e1b0bc_100%)]" />

                  <div className="absolute left-[18%] top-[70%] h-4 w-4 rounded-full bg-[#d9a5a5] shadow-[0_0_10px_rgba(217,165,165,0.25)]" />
                  <div className="absolute right-[18%] top-[71%] h-4 w-4 rounded-full bg-[#d9a5a5] shadow-[0_0_10px_rgba(217,165,165,0.25)]" />
                  <div className="absolute left-[50%] top-[72%] h-4 w-4 -translate-x-1/2 rounded-full bg-[#d9a5a5] shadow-[0_0_10px_rgba(217,165,165,0.25)]" />

                  <div className="absolute left-1/2 top-[3%] h-[10%] w-[22%] -translate-x-1/2 rounded-[999px] bg-[linear-gradient(90deg,#f8e8ee_0%,#e8d7a5_100%)] shadow-[0_10px_20px_rgba(217,165,165,0.16)]" />
                  <div className="absolute left-1/2 top-[16%] h-[8%] w-[18%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,#f8e8ee_0%,#e8d7a5_100%)] opacity-70" />

                  <div className="absolute bottom-[12%] left-[8%] h-3 w-3 rounded-full bg-[#d9a5a5] opacity-80" />
                  <div className="absolute bottom-[14%] right-[8%] h-3 w-3 rounded-full bg-[#e8d7a5] opacity-80" />
                  <div className="absolute bottom-[19%] left-[50%] h-3 w-3 -translate-x-1/2 rounded-full bg-[#f8e8ee] opacity-80" />

                  <div className="absolute inset-x-[5%] bottom-[3%] h-[4%] rounded-full bg-[#d9a5a5]/25 blur-md" />

                  <div className="absolute left-[50%] top-[2%] flex h-[16%] w-[20%] -translate-x-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(255,253,248,0.95)_0%,rgba(248,232,238,0.85)_55%,rgba(232,215,165,0.2)_100%)] shadow-[0_10px_26px_rgba(217,165,165,0.16)]">
                    <div className="absolute left-1/2 top-[4%] h-5 w-1.5 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#d9a5a5_0%,#e8d7a5_100%)]" />
                    <div className="absolute left-1/2 top-[13%] h-2.5 w-8 -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,#d9a5a5_0%,#f8e8ee_45%,#e8d7a5_100%)]" />
                  </div>

                  <div className="absolute left-[50%] top-[5%] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-[1.1rem]">
                    🕯️
                  </div>

                  <div className="absolute left-[50%] top-[8%] h-7 w-7 -translate-x-1/2 rounded-full border border-white/60 bg-[radial-gradient(circle,rgba(255,248,205,0.95)_0%,rgba(247,208,115,0.72)_60%,rgba(232,171,92,0.25)_100%)] shadow-[0_0_16px_rgba(247,208,115,0.34)]" />
                  <div className="absolute left-[50%] top-[7.5%] h-4.5 w-4.5 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,248,205,0.9)_0%,rgba(243,178,95,0.6)_45%,rgba(255,255,255,0.15)_100%)]" />

                  <div className="absolute left-[48%] top-[36%] h-3 w-3 -translate-x-1/2 rounded-full bg-[#d9a5a5] shadow-[0_0_10px_rgba(217,165,165,0.2)]" />
                  <div className="absolute left-[52%] top-[36%] h-3 w-3 -translate-x-1/2 rounded-full bg-[#e8d7a5] shadow-[0_0_10px_rgba(232,215,165,0.2)]" />
                  <div className="absolute left-[50%] top-[36%] h-4 w-4 -translate-x-1/2 rounded-full bg-[#f8e8ee] shadow-[0_0_10px_rgba(248,232,238,0.2)]" />

                  <div className="absolute inset-x-[16%] bottom-[3%] h-[8%] rounded-full bg-[#f5e2e8]/20 blur-lg" />
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
