import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "./Sparkles";

export function PasswordGate({ password, onUnlock }: { password: string; onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === password.toLowerCase()) onUnlock();
    else {
      setError(true);
      setTimeout(() => setError(false), 700);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center px-6">
      <Sparkles count={30} />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass w-full max-w-sm rounded-3xl p-8 text-center"
      >
        <div className="mx-auto mb-4 text-5xl">🎁</div>
        <h1 className="font-display text-3xl">Come closer...</h1>
        <p className="mt-2 text-sm text-muted-foreground">A surprise awaits. Enter the secret word.</p>
        <motion.input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="password"
          placeholder="secret word"
          animate={error ? { x: [0, -8, 8, -6, 6, 0] } : {}}
          className="mt-6 w-full rounded-full border border-border bg-white/70 px-5 py-3 text-center text-base outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
        />
        {error && <p className="mt-2 text-xs text-rose">Not quite. Try again 💫</p>}
        <button type="submit" className="btn-gold btn-gold-hover mt-5 w-full rounded-full px-6 py-3 text-sm font-semibold">
          Unlock
        </button>
        <p className="mt-4 text-[11px] text-muted-foreground">Hint: it's about today ✨</p>
      </motion.form>
    </div>
  );
}
