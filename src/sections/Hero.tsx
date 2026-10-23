import { useEffect, useRef, useState } from "react";
import { resumeData } from "../data/resume";

export function Hero() {
  const { basics } = resumeData;
  const heroRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState(0);
  const [dropped, setDropped] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDropped(true), 1700);
    return () => clearTimeout(t);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!dropped || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    setTilt(x * 10);
  };

  return (
    <section className="hero" ref={heroRef} onMouseMove={onMove} onMouseLeave={() => setTilt(0)}>
        <div className="badge-anchor">
        <div className={`badge-drop ${dropped ? "settled" : ""}`}>
          <div className="badge-swing" style={{ transform: `rotate(${tilt}deg)` }}>
            <div className="strap">
              <span>AAYUSHI WAGHELA · ENGINEER · AAYUSHI WAGHELA · ENGINEER · AAYUSHI WAGHELA · ENGINEER ·</span>
            </div>
            <div className="clip" />
            <button
              type="button"
              className={`badge-flip ${flipped ? "is-flipped" : ""}`}
              onClick={() => setFlipped((v) => !v)}
              aria-pressed={flipped}
              aria-label={flipped ? "Show the front of the badge" : "Flip the badge"}
              data-cursor={flipped ? "Flip back" : "Click to flip"}
            >
            <div className="badge badge-front">
                <div className="badge-slot" />
                <div className="badge-head">
                  <div>
                    <div className="badge-title">Engineer</div>
                    <div className="badge-sub mono">Access pass · 2026</div>
                  </div>
                  <span className="badge-dot" />
                </div>
                <div className="badge-photo">
                  <img src="/profile.jpg" alt="Aayushi Waghela" />
                </div>
                <dl className="badge-rows">
                  <div>
                    <dt>Name</dt>
                    <dd>{basics.name}</dd>
                  </div>
                  <div>
                    <dt>Role</dt>
                    <dd>Software Engineer</dd>
                  </div>
                  <div>
                    <dt>Based</dt>
                    <dd>{basics.location}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd className="badge-open">● Open to work</dd>
                  </div>
                </dl>
                <div className="barcode" />
              </div>
              <div className="badge badge-back" aria-hidden={!flipped}>
              <div className="badge-back-title">Let's connect.</div>

              <div className="badge-qr">
                <img
                  src="/linkedin-qr.png"
                  alt="LinkedIn QR code"
                  className="badge-qr-img"
                />
              </div>

              <p className="badge-qr-caption">
                Scan to connect on LinkedIn
              </p>
                <div className="badge-back-foot mono">
                  <span>{basics.email.split("@")[0]}</span>
                  <span>↻ flip</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="wrap hero-inner">
        <div className="hero-small">
          <span className="hand hero-hi">Hi, I'm Aayushi</span>
          <span>and this</span>
          <span>is my</span>
          <span>portfolio.</span>
        </div>
        <h1 className="display hero-big" aria-label="Software Engineer">
          <span>Soft</span>
          <span>ware</span>
          <span>Engi</span>
          <span className="hero-accent">neer</span>
        </h1>

      </div>

      <nav className="hero-tabs" aria-label="Sections">
        <a href="#about" style={{ background: "var(--lavender)" }}>01 · About</a>
        <a href="#experience" style={{ background: "#dfeadd" }}>02 · Experience</a>
        <a href="#projects" style={{ background: "#dce7f3" }}>03 · Projects</a>
        <a href="#research" style={{ background: "#fce4d4" }}>04 · Research</a>
      </nav>

      <div className="wrap hero-foot">
        <span className="mono">MS CS @ CU Boulder · ex-SDE Intern @ AWS · {basics.location}</span>
        <span className="hero-foot-right">
          <a href="/resume.pdf" download className="mono hero-cv">
            Résumé ↓
          </a>
          <a href="#about" className="mono hero-scroll">
            Scroll <span>↓</span>
          </a>
        </span>
      </div>

      <style>{`
        .badge-flip { all: unset; display: block; position: relative; cursor: pointer; perspective: 1200px; transform-style: preserve-3d; transition: transform .7s cubic-bezier(.3,1.3,.5,1); }
        .badge-flip:focus-visible { outline: 2px dashed var(--plum); outline-offset: 6px; border-radius: 16px; }
        .badge-flip.is-flipped { transform: rotateY(180deg); }
        .badge-front, .badge-back { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .badge-back { position: absolute !important; inset: 0; margin-top: 0 !important; transform: rotateY(180deg); background: var(--ink) !important; color: var(--paper) !important; display: flex; flex-direction: column; gap: 12px; }
        .badge-back-title { font-family: var(--font-serif); font-style: italic; font-size: 19px; }
        .badge-qr {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          border-radius: 8px;
          padding: 8px;
          flex: 1;
          min-height: 0;
        }

        .badge-qr-img {
          display: block;
          width: 100%;
          max-height: 145px;
          object-fit: contain;
        }

        .badge-qr-caption {
          font-family: var(--font-mono);
          font-size: 10px;
          text-align: center;
          color: var(--paper);
          margin: 0;
        }
          background-image: linear-gradient(90deg, var(--ink) 50%, transparent 50%), linear-gradient(var(--ink) 50%, transparent 50%), linear-gradient(45deg, var(--ink) 25%, transparent 25%);
          background-size: 14px 14px, 22px 22px, 9px 9px; border-radius: 4px; }
        .badge-skills { display: flex; flex-wrap: wrap; gap: 5px; }
        .badge-skills span { font-size: 10px; background: var(--plum); padding: 3px 8px; border-radius: 10px; }
        .badge-back-foot { display: flex; justify-content: space-between; font-size: 9.5px; color: var(--muted-dark); }
        .trace-start { margin: 14px 0 0 40px; width: fit-content; font-size: 11px; line-height: 1.5; background: #fff; border: 1.5px solid var(--ink); border-radius: 8px; padding: 7px 11px; box-shadow: 3px 3px 0 var(--ink); pointer-events: none; }
        .trace-start b { color: var(--plum); font-weight: 500; }
        .trace-start span { display: block; color: var(--muted); }
        .hero-tabs { position: relative; z-index: 2; display: flex; align-items: flex-end; gap: 8px; width: 100%; max-width: 1180px; margin: 26px auto -28px; padding: 0 32px; box-sizing: border-box; }
        .hero-tabs a { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase; border: 2px solid var(--ink); border-bottom: none; border-radius: 14px 14px 0 0; padding: 12px 16px 10px; transition: padding .2s ease, transform .2s ease; }
        .hero-tabs a:hover { padding-bottom: 18px; }
        @media (max-width: 760px) { .hero-tabs { display: none; } .trace-start { display: none; } }
        .hero {
          position: relative; min-height: max(100vh, 680px); display: flex; flex-direction: column; justify-content: flex-end;
          background-color: var(--paper);
          background-image: radial-gradient(circle, rgba(122,59,110,.16) 1px, transparent 1.3px), var(--fibre);
          background-size: 22px 22px, 240px 240px; overflow: hidden; padding-bottom: 28px;
        }
        .hero-inner { position: relative; width: 100%; display: grid; grid-template-columns: auto auto; justify-content: center; align-items: end; gap: 3vw; padding-top: 120px; }
        .hero-small {
          display: flex; flex-direction: column; align-items: flex-end; font-weight: 800; font-size: clamp(22px, 2.6vw, 34px);
          line-height: 1.02; letter-spacing: -0.02em; padding-bottom: 1.2vw;
          animation: heroIn .8s cubic-bezier(.2,.8,.2,1) .15s both;
        }
        .hero-hi { font-size: 1.15em; color: var(--plum); font-weight: 600; letter-spacing: 0; margin-bottom: 6px; transform: rotate(-4deg); }
        .hero-big { display: flex; flex-direction: column; font-size: max(88px, min(15.5vw, calc((100vh - 260px) / 3.55), 230px)); color: var(--ink); }
        .hero-big .hero-accent { color: var(--plum); }
        .hero-big span { display: block; animation: heroIn .9s cubic-bezier(.2,.8,.2,1) both; }
        .hero-big span:nth-child(1) { animation-delay: .05s; }
        .hero-big span:nth-child(2) { animation-delay: .12s; }
        .hero-big span:nth-child(3) { animation-delay: .19s; }
        .hero-big span:nth-child(4) { animation-delay: .26s; }
        @keyframes heroIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }

        /* ---- lanyard badge ---- */
        
        .badge-anchor {
          position: absolute;
          top: 0;
          right: 150px;
          left: auto;
          z-index: 5;
          width: 255px;
          margin-left: 0;
          pointer-events: none;
        }
          @media (min-width: 761px) and (max-width: 1100px) {
          .badge-anchor {
            right: 15px;
            width: 220px;
          }
        }

        .badge-drop { animation: badgeDrop 1.6s cubic-bezier(.3,1.25,.4,1) .35s both; transform-origin: top center; }
        @keyframes badgeDrop {
          0% { transform: translateY(-110%) rotate(0deg); }
          55% { transform: translateY(0) rotate(5deg); }
          72% { transform: translateY(0) rotate(-3deg); }
          86% { transform: translateY(0) rotate(1.5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .badge-swing { transform-origin: top center; transition: transform .8s cubic-bezier(.3,1.6,.5,1); pointer-events: auto; }
        .strap {
          margin: 0 auto; width: 34px; height: clamp(150px, 26vh, 260px); background: var(--plum); border-radius: 0 0 4px 4px;
          display: flex; justify-content: center; overflow: hidden; box-shadow: inset 0 0 0 2px rgba(255,255,255,.12);
        }
        .strap span {
          writing-mode: vertical-rl; font-family: var(--font-mono); font-size: 10px; letter-spacing: .2em; color: rgba(255,255,255,.75);
          white-space: nowrap; padding-top: 10px;
        }
        .clip { width: 46px; height: 26px; margin: -2px auto 0; border-radius: 6px 6px 10px 10px; background: linear-gradient(180deg, #d9d9d9, #8f8f8f); box-shadow: inset 0 -3px 0 rgba(0,0,0,.2); }
        .badge {
          position: relative; margin-top: -6px; background: var(--white); border-radius: 14px; padding: 22px 16px 14px;
          box-shadow: var(--shadow-lift); border: 1px solid rgba(0,0,0,.06);
          background-image: linear-gradient(135deg, rgba(255,255,255,0) 40%, rgba(255,255,255,.7) 50%, rgba(255,255,255,0) 60%);
        }
        .badge-slot { position: absolute; top: 8px; left: 50%; width: 44px; height: 7px; margin-left: -22px; border-radius: 6px; background: var(--paper-2); box-shadow: inset 0 1px 2px rgba(0,0,0,.2); }
        .badge-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .badge-title { font-family: var(--font-serif); font-style: italic; font-weight: 600; font-size: 19px; letter-spacing: -0.02em; line-height: 1; }
        .badge-sub { font-size: 9.5px; color: var(--muted); letter-spacing: .08em; text-transform: uppercase; margin-top: 3px; }
        .badge-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--gold); border: 2px solid var(--gold-ink); }
        .badge-photo { border-radius: 10px; overflow: hidden; aspect-ratio: 4 / 4.2; background: var(--paper-2); }
        .badge-photo img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 18%; filter: grayscale(1) contrast(1.05); }
        .badge-rows { margin-top: 10px; }
        .badge-rows div { display: flex; justify-content: space-between; gap: 10px; padding: 5px 0; border-bottom: 1px dashed var(--line); font-size: 11px; }
        .badge-rows dt { color: var(--muted); }
        .badge-rows dd { font-weight: 700; text-align: right; }
        .badge-open { color: var(--ink); background: var(--sage); padding: 1px 8px; border-radius: 10px; }
        .barcode { height: 22px; margin-top: 10px; background: repeating-linear-gradient(90deg, var(--ink) 0 2px, transparent 2px 4px, var(--ink) 4px 5px, transparent 5px 8px, var(--ink) 8px 11px, transparent 11px 12px); opacity: .85; }

        .hero-foot { position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 34px; padding-top: 16px; border-top: 1px solid var(--line); font-size: 12px; color: var(--muted); width: 100%; }
        .hero-foot-right { display: flex; gap: 20px; }
        .hero-cv, .hero-scroll { color: var(--ink); }
        .hero-cv:hover { color: var(--plum); }
        .hero-scroll span { display: inline-block; animation: bob 1.6s ease-in-out infinite; }
        @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }

        @media (max-width: 860px) {
          .hero-inner { grid-template-columns: 1fr; gap: 12px; padding-top: 110px; }
          .hero-small { align-items: flex-start; padding: 0; font-size: 22px; }
          .hero-big { font-size: clamp(88px, 27vw, 170px); }
          .badge-anchor { left: auto; right: 4px; margin: 0; width: 150px; }
          .strap { height: 120px; width: 26px; }
          .badge { padding: 18px 10px 10px; }
          .badge-title { font-size: 14px; }
          .badge-rows div { font-size: 8.5px; padding: 3px 0; }
          .barcode { height: 14px; }
          .hero-foot { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `}</style>
    </section>
  );
}
