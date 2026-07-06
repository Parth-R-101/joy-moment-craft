import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const isTouch = matchMedia("(hover: none)").matches;
    if (isTouch) { setTouch(true); return; }
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (touch) return null;

  return (
    <div
      className="pointer-events-none fixed z-[60] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply transition-transform duration-300 ease-out"
      style={{
        left: pos.x,
        top: pos.y,
        background: "radial-gradient(circle, oklch(0.9 0.12 80 / 0.35), transparent 65%)",
        filter: "blur(20px)",
      }}
    />
  );
}
