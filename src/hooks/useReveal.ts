import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element scrolls into view, then stays true.
 * Used to drive scroll-triggered entrance animations consistently
 * across pages (mirrors the pattern already used on the Experience
 * timeline, generalized so every page can share it).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If the element is already on screen at mount (common on short
    // pages / desktop viewports), just show it — no need to wait on
    // a scroll event that may never come.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * (1 - threshold) && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
