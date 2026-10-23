import { useEffect, useRef, useState } from "react";

/** A small plum dot that follows the pointer and shows a label (data-cursor) over interactive things. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setEnabled(true);
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
    const update = (el: Element | null) => {
      const t = (el as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a[target='_blank']");
      setLabel(t ? t.dataset.cursor ?? "Open ↗" : "");
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      update(e.target as Element);
    };
    const onScroll = () => update(document.elementFromPoint(x, y));
    const tick = () => {
      cx += (x - cx) * 0.25;
      cy += (y - cy) * 0.25;
      if (dot.current) dot.current.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div ref={dot} className={`cursor ${label ? "has-label" : ""}`} aria-hidden="true">
      <span className="cursor-dot" />
      {label && <span className="cursor-label mono">{label}</span>}
    </div>
  );
}
