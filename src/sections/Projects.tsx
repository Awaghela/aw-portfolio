import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { resumeData, slugify, type Project } from "../data/resume";
import { GithubIcon } from "../components/icons";
import { Reveal } from "../components/Reveal";

// one header colour per card, cycling through the palette
export const CARD_COLORS: { bg: string; fg: string }[] = [
  { bg: "#7a3b6e", fg: "#f8f4f0" },
  { bg: "#f9e3e6", fg: "#2b2230" },
  { bg: "#2b2230", fg: "#f8f4f0" },
  { bg: "#f0e2ec", fg: "#7a3b6e" },
]
export const bandFor = (i: number) => CARD_COLORS[i % CARD_COLORS.length];

const SWIPE = 110;

export function Projects() {
  const projects = resumeData.projects;
  const n = projects.length;
  // The sixth card links to the full GitHub profile.
  const totalCards = n + 1;
  // order[0] is the front card.
  const [order, setOrder] = useState<number[]>(
    () => Array.from({ length: totalCards }, (_, i) => i)
  );
  const [fly, setFly] = useState<0 | 1 | -1>(0);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);

  const next = useCallback(
    (dir: 1 | -1 = 1) => {
      if (fly) return;
      setFly(dir);
      window.setTimeout(() => {
        setOrder((o) => [...o.slice(1), o[0]]);
        setFly(0);
        setDx(0);
      }, 320);
    },
    [fly]
  );
  const prev = useCallback(() => {
    if (fly) return;
    setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  }, [fly]);
  const jump = (i: number) => {
    const idx = Array.from({ length: totalCards }, (_, k) => k);
    setOrder([...idx.slice(i), ...idx.slice(0, i)]);
  };

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    startX.current = e.clientX;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (dragging) setDx(e.clientX - startX.current);
  };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (Math.abs(dx) > SWIPE) next(dx > 0 ? 1 : -1);
    else setDx(0);
  };

  const deckRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next(1);
      if (e.key === "ArrowLeft") prev();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const front = order[0];

  return (
    <section id="projects" className="proj fsec">
      <div className="wrap fwrap pj-grid" data-tab="03 · Projects" style={{ ["--f" as string]: "var(--folder-blue)", ["--tabw" as string]: "180px" }}>
        <div className="pj-side">
          <div className="label">
            03 — Selected builds
          </div>
          <Reveal y={60}>
            <h2 className="display pj-title">
              <span>Pro</span>
              <span className="pj-accent">jec</span>
              <span>ts</span>
            </h2>
          </Reveal>
          <p className="pj-sub">
            <span className="serif-i">Swipe the deck</span>, then hit <b>Explore</b> for the full case study.
          </p>

          <ol className="pj-index">
            {projects.map((p, i) => (
              <li key={p.title}>
                <button className={front === i ? "on" : ""} onClick={() => jump(i)}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <span>{p.title}</span>
                  <i style={{ background: bandFor(i).bg }} />
                </button>
              </li>
            ))}
            <li key="github">
              <button
                className={front === n ? "on" : ""}
                onClick={() => jump(n)}
              >
                <span className="mono">{String(totalCards).padStart(2, "0")}</span>
                <span>More on GitHub ↗</span>
                <i style={{ background: "#7A3B6E" }} />
              </button>
            </li>
          </ol>
        </div>

        <div className="pj-stage">
          <div
            ref={deckRef}
            className="pj-deck"
            tabIndex={0}
            aria-roledescription="carousel"
            aria-label="Project cards. Use the left and right arrow keys to move through them."
          >
            {order.slice(0, 4).map((pi, depth) => {
              const isFront = depth === 0;
              const style: React.CSSProperties = isFront
                ? {
                    transform: fly ? `translateX(${fly * 130}%) rotate(${fly * 18}deg)` : `translateX(${dx}px) rotate(${dx * 0.05}deg)`,
                    opacity: fly ? 0 : 1,
                    transition: dragging ? "none" : undefined,
                    zIndex: 10,
                  }
                : {
                    transform: `translateY(${depth * 16}px) scale(${1 - depth * 0.045}) rotate(${(depth % 2 ? -1 : 1) * depth * 2.2}deg)`,
                    zIndex: 10 - depth,
                    opacity: depth === 3 ? 0 : 1,
                  };
              return pi === n ? (
                <GitHubEndCard
                  key="github-end-card"
                  front={isFront}
                  style={style}
                  onPointerDown={isFront ? onDown : undefined}
                  onPointerMove={isFront ? onMove : undefined}
                  onPointerUp={isFront ? onUp : undefined}
                  onPointerCancel={isFront ? onUp : undefined}
                />
              ) : (
                <Card
                  key={projects[pi].title}
                  p={projects[pi]}
                  num={pi + 1}
                  total={totalCards}
                  front={isFront}
                  style={style}
                  onPointerDown={isFront ? onDown : undefined}
                  onPointerMove={isFront ? onMove : undefined}
                  onPointerUp={isFront ? onUp : undefined}
                  onPointerCancel={isFront ? onUp : undefined}
                />
              );
            })}
          </div>

          <div className="pj-ctrl">
            <button className="pj-btn" onClick={prev} aria-label="Previous project">
              ←
            </button>
            <span className="mono pj-count">
              {String(front + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
            </span>
            <button className="pj-btn" onClick={() => next(1)} aria-label="Next project">
              →
            </button>
          </div>
          <p className="mono pj-hint">drag · swipe · ← → keys</p>
        </div>
      </div>

      <style>{`
        .proj { position: relative; }
        .pj-grid { display: grid; grid-template-columns: minmax(0,.9fr) minmax(0,1.1fr); gap: 56px; align-items: center; }
        .pj-grid > * { min-width: 0; }
        .pj-title { display: flex; flex-direction: column; font-size: clamp(90px, 10.5vw, 160px); color: var(--ink); margin-top: 10px; }
        .pj-accent { color: var(--plum); }
        .pj-sub { font-size: 15px; color: var(--muted); margin-top: 16px; max-width: 34ch; }
        .pj-sub .serif-i { color: var(--plum); font-size: 21px; }
        .pj-sub b { color: var(--ink); }

        .pj-index { list-style: none; margin-top: 30px; border-top: 1.5px solid var(--ink); }
        .pj-index button {
          width: 100%; display: grid; grid-template-columns: 34px 1fr 10px; align-items: center; gap: 10px; padding: 10px 4px;
          background: none; border: none; border-bottom: 1px solid rgba(43,34,48,.18); color: var(--muted); text-align: left; font-size: 14.5px;
          transition: color .2s ease, padding .2s ease;
        }
        .pj-index button .mono { font-size: 11px; }
        .pj-index button i { width: 9px; height: 9px; border-radius: 50%; opacity: .7; }
        .pj-index button:hover { color: var(--plum); }
        .pj-index button.on { color: #fff; padding-left: 12px; font-weight: 700; background: var(--plum); border-radius: 8px; }
        .pj-index button.on i { opacity: 1; box-shadow: 0 0 0 2px #fff; }

        .pj-stage { display: flex; flex-direction: column; align-items: center; }
        .pj-deck { position: relative; width: min(420px, 100%); height: 580px; outline: none; touch-action: pan-y; }
        .pj-deck:focus-visible { outline: 2px dashed var(--plum); outline-offset: 14px; border-radius: 20px; }
        .pcard {
          position: absolute; inset: 0; display: flex; flex-direction: column; background-color: var(--white);
          color: var(--ink); border-radius: 20px; overflow: hidden; user-select: none; transform-origin: 50% 85%; touch-action: pan-y;
          border: 2.5px solid var(--ink); box-shadow: 6px 6px 0 var(--ink);
          transition: transform .4s cubic-bezier(.2,.8,.2,1), opacity .3s ease;
        }
        .pcard.front { cursor: grab; }
        .pcard.front:active { cursor: grabbing; }
        .pc-band { display: flex; justify-content: space-between; align-items: center; padding: 16px 22px; }
        .pc-tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; }
        .pc-num { font-family: var(--font-display); font-size: 34px; line-height: 1; }
        .pc-body { position: relative; flex: 1; display: flex; flex-direction: column; padding: 22px 24px 20px; min-height: 0; }
        .pc-title { font-family: var(--font-serif); font-weight: 600; font-size: 32px; line-height: 1.08; letter-spacing: -0.025em; margin-bottom: 10px; }
        .pc-desc { font-size: 14.5px; line-height: 1.6; opacity: .85; }
        .pc-metric {
          align-self: flex-start; margin-top: 18px; background: var(--gold-soft); color: var(--gold-ink); font-family: var(--font-hand);
          font-weight: 600; font-size: 21px; line-height: 1.1; padding: 10px 14px 12px; transform: rotate(-2.5deg);
          box-shadow: 0 8px 16px -8px rgba(43,34,48,.45); border-top: 10px solid rgba(122,59,110,.22);
        }
        .pc-prob { margin-top: 18px; }
        .pc-prob p { font-size: 13px; line-height: 1.55; color: var(--muted); margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .pc-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 18px; }
        .pc-chip { font-family: var(--font-mono); font-size: 11px; padding: 3px 9px; border-radius: 20px; border: 1px solid var(--line); background: var(--white); }
        .pc-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 24px 18px; border-top: 1px dashed var(--line); }
        .pc-explore {
          display: inline-flex; align-items: center; gap: 8px; background: var(--plum); color: #fff; font-weight: 700; font-size: 14px;
          padding: 11px 18px; border-radius: 30px; transition: background .2s ease, transform .2s ease;
        }
        .pc-explore:hover { background: var(--plum-deep); transform: translateX(2px); }
        .pc-gh { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11.5px; color: var(--ink); }
        .pc-gh:hover { color: var(--plum); }
        .pc-status { font-family: var(--font-mono); font-size: 10.5px; color: var(--muted); text-align: right; }

        .pj-ctrl { display: flex; align-items: center; gap: 18px; margin-top: 30px; }
        .pj-btn { width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--ink); background: var(--plum); color: #fff; box-shadow: 3px 3px 0 var(--ink); font-size: 18px; transition: background .2s ease, color .2s ease, transform .2s ease; }
        .pj-btn:hover { background: var(--plum-deep); transform: translate(-2px,-2px); box-shadow: 5px 5px 0 var(--ink); }
        .pj-count { font-size: 13px; color: var(--ink); letter-spacing: .1em; }
        .pj-hint { font-size: 11px; color: var(--muted); margin-top: 10px; }

        /* Final GitHub card: desktop and mobile */

        .github-end-card {
          background: #F8F4F0;
          border: 2.5px solid #2B2230;
        }

        .github-end-band {
          background: #7A3B6E;
          color: #FFFFFF;
        }

        .github-end-body {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 16px 24px 10px;
        }

        .github-end-icon {
          width: 78px;
          height: 78px;
          border-radius: 50%;
          background: #F0E2EC;
          color: #7A3B6E;
          display: grid;
          place-items: center;
          margin-bottom: 12px;
          flex-shrink: 0;
          transition: transform .3s ease;
        }

        .github-end-card:hover .github-end-icon {
          transform: rotate(-8deg) scale(1.05);
        }

        .github-end-label {
          font-size: 10px;
          letter-spacing: .15em;
          color: #7A3B6E;
        }

        .github-end-title {
          font-family: var(--font-serif);
          font-size: clamp(34px, 3vw, 42px);
          line-height: 1.1;
          font-weight: 600;
          margin: 8px 0;
          letter-spacing: -.03em;
        }

        .github-end-title em {
          color: #7A3B6E;
        }

        .github-end-desc {
          font-size: 12px;
          line-height: 1.5;
          color: #6B6070;
          max-width: 300px;
          margin-bottom: 14px;
        }

        .github-end-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 18px;
          background: #7A3B6E;
          color: #FFFFFF;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 700;
          flex-shrink: 0;
          transition: transform .2s ease, background .2s ease;
        }

        .github-end-link:hover {
          background: #5C2952;
          transform: translateY(-3px);
        }

        .github-end-footer {
          display: flex;
          justify-content: space-between;
          padding: 10px 20px 12px;
          border-top: none;
          flex-shrink: 0;
          font-size: 11px;
          color: #6B6070;
        }
        @media (max-width: 900px) {
          
          .pj-grid { grid-template-columns: minmax(0,1fr); gap: 36px; }
          .pj-title { flex-direction: row; font-size: clamp(64px, 19vw, 110px); }
          .pj-index { display: flex; gap: 8px; overflow-x: auto; border: none; margin-top: 22px; padding-bottom: 6px; scrollbar-width: none; }
          .pj-index li { flex-shrink: 0; }
          .pj-index button { width: auto; grid-template-columns: auto auto; border: 1.5px solid var(--ink); background: var(--white); border-radius: 20px; padding: 7px 12px; font-size: 13px; }
          .pj-index button i { display: none; }
          .pj-index button.on { padding-left: 12px; background: var(--plum); color: #fff; }
          .pj-deck { height: 600px; }
          .pc-desc { font-size: 13.5px; }
          .pc-title { font-size: 27px; }
        }
      `}</style>
    </section>
  );
}

function Card({
  p,
  num,
  total,
  front,
  style,
  ...handlers
}: {
  p: Project;
  num: number;
  total: number;
  front: boolean;
  style: React.CSSProperties;
  onPointerDown?: (e: React.PointerEvent) => void;
  onPointerMove?: (e: React.PointerEvent) => void;
  onPointerUp?: (e: React.PointerEvent) => void;
  onPointerCancel?: (e: React.PointerEvent) => void;
}) {
  const band = bandFor(num - 1);
  return (
    <article className={`pcard ${front ? "front" : ""}`} style={style} aria-hidden={!front} data-cursor={front ? "Drag" : undefined} {...handlers}>
      <div className="pc-band" style={{ background: band.bg, color: band.fg }}>
        <span className="pc-tag">{p.tag}</span>
        <span className="pc-num">
          {String(num).padStart(2, "0")}
          <small style={{ fontSize: 14, opacity: 0.7 }}>/{String(total).padStart(2, "0")}</small>
        </span>
      </div>
      <div className="pc-body">
        <h3 className="pc-title">{p.title}</h3>
        <p className="pc-desc">{p.desc}</p>
        <div className="pc-metric">{p.metric}</div>
        <div className="pc-prob">
          <span className="label">The challenge</span>
          <p>{p.problem}</p>
        </div>
        <div className="pc-stack">
          {p.stack.map((s) => (
            <span key={s} className="pc-chip">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="pc-foot">
        <Link to={`/projects/${slugify(p.title)}`} className="pc-explore" tabIndex={front ? 0 : -1}>
          Explore case study →
        </Link>
        {p.url ? (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="pc-gh" tabIndex={front ? 0 : -1}>
            {p.status === "Live Demo" ? "Live Demo ↗" : (
              <><GithubIcon size={15} /> Code</>
            )}
          </a>
        ) : (
          <span className="pc-status">{p.status}</span>
        )}
      </div>
    </article>
  );
}


function GitHubEndCard({
  front,
  style,
  ...handlers
}: {
  front: boolean;
  style: React.CSSProperties;
  onPointerDown?: (e: React.PointerEvent) => void;
  onPointerMove?: (e: React.PointerEvent) => void;
  onPointerUp?: (e: React.PointerEvent) => void;
  onPointerCancel?: (e: React.PointerEvent) => void;
}) {
  return (
    <article
      className={`pcard github-end-card ${front ? "front" : ""}`}
      style={style}
      aria-hidden={!front}
      data-cursor={front ? "Drag" : undefined}
      {...handlers}
    >
      <div className="pc-band github-end-band">
        <span className="pc-tag">THE REST OF MY WORK</span>
        <span className="pc-num">06/06</span>
      </div>

      <div className="github-end-body">
        <div className="github-end-icon">
          <GithubIcon size={64} />
        </div>
        <span className="mono github-end-label">THERE'S MORE TO EXPLORE</span>
        <h3 className="github-end-title">
          Curious for <em>more?</em>
        </h3>
        <p className="github-end-desc">
          More experiments, side projects, and things I've built along the way.
          Explore my GitHub to see what else I've been working on.
        </p>
        <a
          href="https://github.com/Awaghela"
          target="_blank"
          rel="noopener noreferrer"
          className="github-end-link"
          tabIndex={front ? 0 : -1}
        >
          <GithubIcon size={19} />
          Explore my GitHub ↗
        </a>
      </div>

      <div className="github-end-footer mono">
        <span>github.com/Awaghela</span>
        <span>↗</span>
      </div>
    </article>
  );
}
