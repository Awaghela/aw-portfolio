import { useEffect, useState } from "react";

const STOPS = [
  { id: "top", label: "trace start" },
  { id: "about", label: "GET /about" },
  { id: "experience", label: "POST /experience" },
  { id: "projects", label: "PUT /projects" },
  { id: "research", label: "GET /research" },
  { id: "contact", label: "200 · delivered" },
];

/** Fixed thread on the left edge: fills as you scroll, one node per section. */
export function TraceRail() {
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      let r = 0;
      STOPS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.55) r = i;
      });
      setReached(r);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="trace" aria-label="Request trace">
      <span className="trace-line" aria-hidden="true">
        <span className="trace-fill" style={{ height: `${progress * 100}%` }} />
      </span>
      <ol>
        {STOPS.map((s, i) => (
          <li key={s.id} style={{ top: `${(i / (STOPS.length - 1)) * 100}%` }}>
            <a
              href={`#${s.id}`}
              className={`trace-node ${i <= reached ? "on" : ""} ${i === reached ? "here" : ""}`}
              aria-label={s.label}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="trace-tip mono">{s.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
