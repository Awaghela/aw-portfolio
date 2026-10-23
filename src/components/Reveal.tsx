import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

/** Fades + lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={`reveal-box ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.6s ease ${delay}s, transform 0.65s cubic-bezier(.2,.8,.2,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
