import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { resumeData, slugify } from "../data/resume";
import { projectDetails } from "../data/projectDetails";
import { bandFor } from "../sections/Projects";
import { GithubIcon } from "../components/icons";
import { Reveal } from "../components/Reveal";

const NOTE_TAPES = ["var(--pink)", "var(--sage)", "var(--butter)", "var(--lavender)"];

export function ProjectPage() {
  const { slug } = useParams();
  const projects = resumeData.projects;
  const idx = projects.findIndex((p) => slugify(p.title) === slug);
  const project = projects[idx];
  const detail = project ? projectDetails[project.title] : undefined;
  const [step, setStep] = useState(0);
  const [notes, setNotes] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setStep(0);
    setNotes(false);
  }, [slug]);

  if (!project || !detail) {
    return (
      <main className="wrap" style={{ padding: "160px 0 120px" }}>
        <h1 className="display" style={{ fontSize: 80 }}>
          Not found
        </h1>
        <Link to="/#projects" className="cs-back">
          ← Back to projects
        </Link>
      </main>
    );
  }

  const band = bandFor(idx);
  const screen =
    detail.diagram === "dispatch" ? ["Dispatch / console", "Orders in motion"]
    : detail.diagram === "pipeline" ? ["ETL / monitor", "Quality checks"]
    : detail.diagram === "trail" ? ["Trail / tracker", "Route progress"]
    : detail.diagram === "ledger" ? ["Ledger / balances", "Group balances"]
    : ["System / workspace", "Workflow status"];
  const nextP = projects[(idx + 1) % projects.length];
  const prevP = projects[(idx - 1 + projects.length) % projects.length];
  const n = String(idx + 1).padStart(2, "0");

  return (
    <main className="cs">
      {/* ---------- hero ---------- */}
      <header className="cs-hero">
        <div className="wrap">
          <Link to="/#projects" className="cs-back mono">
            ← Back to the project deck
          </Link>
          <div className="cs-hero-grid">
            <div>
              <div className="label cs-kind">
                Project file / {n} — {detail.kind}
              </div>
              <h1 className="display cs-title">{project.title}</h1>
              <p className="cs-desc">{project.desc}</p>
              <div className="cs-chips">
                {project.stack.map((s) => (
                  <span key={s} className="mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="cs-art" aria-hidden="true">
              <div className="cs-device">
                <div className="cs-device-top">
                  <i /><i /><i />
                  <b className="mono">{screen[0]}</b>
                </div>
                <div className="cs-device-title">{screen[1]}</div>
                <div className="cs-bars">
                  {[46, 62, 38, 78, 55, 90, 48, 70].map((h, i) => (
                    <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
                  ))}
                </div>
                <div className="cs-device-foot mono">
                  <span>● active</span>
                  <span>reliability first ↗</span>
                </div>
              </div>
              <div className="cs-sticky hand">
                {project.metric}
                <small className="mono">project highlight</small>
              </div>
              <span className="cs-num display" style={{ background: band.bg, color: band.fg }}>
                {n}
              </span>
            </div>
          </div>
          <div className="cs-meta">
            <span className="label">In the workshop</span>
            <span>{detail.role}</span>
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="cs-cta">
                <GithubIcon size={15} /> View source ↗
              </a>
            ) : (
              <span className="cs-pending mono">{project.status} · no public repo yet</span>
            )}
          </div>
        </div>
      </header>

      {/* ---------- 01 brief ---------- */}
      <section className="wrap cs-sec">
        <Reveal className="cs-split">
          <div>
            <span className="label">01 / The brief</span>
            <h2 className="cs-h">What needed to work.</h2>
          </div>
          <div>
            <p className="cs-lead">{detail.overview}</p>
            <h3 className="cs-h3">Failure modes worth designing for</h3>
            <ul className="cs-fail">
              {detail.challenge.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ---------- 02 system map ---------- */}
      <section className="cs-console grain">
        <div className="wrap">
          <div className="cs-console-top">
            <div>
              <span className="label" style={{ color: "var(--muted-dark)" }}>
                02 / Interactive system map
              </span>
              <h2 className="cs-h" style={{ color: "#fff" }}>
                Trace one request through the system.
              </h2>
              <p className="cs-console-sub">Tap a station. This is an architectural walkthrough, not a connection to a live backend.</p>
            </div>
            <button className="cs-next" onClick={() => setStep((s) => (s + 1) % detail.stages.length)}>
              Next stage →
            </button>
          </div>

          <div className="cs-map" role="group" aria-label="System stages">
            <div className="cs-track" aria-hidden="true">
              <span style={{ width: `${(step / Math.max(1, detail.stages.length - 1)) * 100}%` }} />
            </div>
            {detail.stages.map((s, i) => (
              <button key={s} className={`cs-station ${i === step ? "on" : ""} ${i < step ? "done" : ""}`} onClick={() => setStep(i)} aria-pressed={i === step}>
                <span className="cs-pin">{i === detail.stages.length - 1 ? "✓" : String(i + 1).padStart(2, "0")}</span>
                <small className="mono">Step {String(i + 1).padStart(2, "0")}</small>
                <strong>{s}</strong>
              </button>
            ))}
          </div>

          <div className="cs-readout">
            <span className="cs-led" />
            <div>
              <small className="mono">Current step / {String(step + 1).padStart(2, "0")}</small>
              <strong>{detail.stages[step]}</strong>
            </div>
            <button className="cs-notes-btn mono" onClick={() => setNotes((v) => !v)} aria-expanded={notes}>
              {notes ? "Hide" : "Show"} engineering notes {notes ? "−" : "+"}
            </button>
          </div>
          {notes && (
            <div className="cs-notes">
              {detail.decisions.map((d, i) => (
                <p key={d.name}>
                  <b className="mono">
                    {String(i + 1).padStart(2, "0")} / {d.name}
                  </b>{" "}
                  {d.why}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- 03 decisions ---------- */}
      <section className="wrap cs-sec">
        <Reveal>
          <span className="label">03 / Design decisions</span>
          <h2 className="cs-h">Under the hood.</h2>
        </Reveal>
        <div className="cs-cards">
          {detail.decisions.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.07}>
              <div className="cs-card" style={{ transform: `rotate(${i % 2 ? 0.9 : -0.9}deg)` }}>
                <span className="cs-tape" style={{ background: NOTE_TAPES[i % NOTE_TAPES.length] }} />
                <span className="mono cs-card-k">{String(i + 1).padStart(2, "0")} / engineering note</span>
                <h3>{d.name}</h3>
                <p>{d.why}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- 04 results ---------- */}
      <section className="cs-results">
        <div className="wrap">
          <span className="label">04 / Results &amp; takeaways</span>
          <h2 className="cs-h">The numbers tell part of the story.</h2>
          <div className="cs-metrics">
            {detail.metrics.map((m) => (
              <div key={m.label}>
                <strong className="display">{m.number}</strong>
                <span className="mono">{m.label}</span>
              </div>
            ))}
          </div>
          <blockquote className="cs-lesson">
            <span className="label">What this project taught me</span>
            <p className="serif-i">“{detail.lesson}”</p>
          </blockquote>
        </div>
      </section>

      {/* ---------- pager ---------- */}
      <nav className="wrap cs-pager" aria-label="More projects">
        <Link to={`/projects/${slugify(prevP.title)}`} className="cs-pg">
          <span className="mono">← Previous</span>
          <b>{prevP.title}</b>
        </Link>
        <Link to="/#projects" className="cs-pg cs-pg-mid mono">
          All projects
        </Link>
        <Link to={`/projects/${slugify(nextP.title)}`} className="cs-pg right">
          <span className="mono">Next →</span>
          <b>{nextP.title}</b>
        </Link>
      </nav>

      <style>{`
        .cs { background-color: var(--paper); background-image: var(--fibre); }
        .cs-hero { padding: 110px 0 30px; }
        .cs-back { display: inline-block; font-size: 12.5px; color: var(--muted); margin-bottom: 34px; }
        .cs-back:hover { color: var(--plum); }
        .cs-hero-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 40px; align-items: center; }
        .cs-kind { color: var(--plum); }
        .cs-title { font-size: clamp(56px, 7.4vw, 118px); margin: 14px 0 22px; word-break: break-word; }
        .cs-desc { font-size: 19px; line-height: 1.6; max-width: 46ch; }
        .cs-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
        .cs-chips span { font-size: 12px; padding: 5px 12px; border-radius: 20px; background: var(--white); border: 1.5px solid var(--ink); }

        .cs-hero-grid { background: var(--lavender); border-radius: 28px; padding: 54px 50px; position: relative; overflow: hidden; }
        .cs-hero-grid::after { content: "✳"; position: absolute; top: 26px; right: 34px; font-size: 34px; color: var(--plum); opacity: .5; }
        .cs-art { position: relative; min-height: 300px; display: flex; align-items: center; justify-content: center; }
        .cs-device {
          position: relative; width: 100%; max-width: 360px; background: var(--ink); color: #fff; border-radius: 18px; padding: 16px 18px 14px;
          box-shadow: 18px 22px 0 -4px rgba(122,59,110,.22), 0 30px 50px -20px rgba(43,34,48,.6); transform: rotate(-4deg);
          border: 6px solid #3a3040;
        }
        .cs-device-top { display: flex; align-items: center; gap: 5px; }
        .cs-device-top i { width: 7px; height: 7px; border-radius: 50%; background: #f9e3e6; }
        .cs-device-top i:nth-child(2) { background: var(--gold); }
        .cs-device-top i:nth-child(3) { background: var(--sage); }
        .cs-device-top b { margin-left: auto; font-size: 9px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted-dark); font-weight: 400; }
        .cs-device-title { font-family: var(--font-serif); font-size: 20px; font-weight: 600; margin: 14px 0 10px; }
        .cs-bars { display: flex; align-items: flex-end; gap: 9px; height: 110px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,.15); }
        .cs-bars span { flex: 1; border-radius: 4px 4px 0 0; background: #a8679a; transform-origin: bottom; animation: barUp .8s cubic-bezier(.2,.8,.2,1) both; }
        .cs-bars span:nth-child(even) { background: #f9e3e6; }
        @keyframes barUp { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .cs-device-foot { display: flex; justify-content: space-between; font-size: 9.5px; color: var(--muted-dark); margin-top: 8px; text-transform: uppercase; letter-spacing: .08em; }
        .cs-device-foot span:first-child { color: var(--sage); }
        .cs-sticky { position: absolute; right: -6px; bottom: 6px; width: 190px; background: var(--butter); color: var(--ink); font-size: 23px; line-height: 1.1; padding: 14px 16px 12px; transform: rotate(5deg); box-shadow: 0 14px 24px -10px rgba(43,34,48,.5); }
        .cs-sticky small { display: block; font-size: 9.5px; letter-spacing: .12em; text-transform: uppercase; margin-top: 6px; color: var(--gold-ink); }
        .cs-num { position: absolute; top: -18px; left: -16px; z-index: 2; width: 66px; height: 66px; border-radius: 50%; display: grid; place-items: center; font-size: 28px; transform: rotate(-10deg); box-shadow: 0 8px 16px -8px rgba(43,34,48,.5); }
        .cs-meta { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; padding: 16px 4px; border-bottom: 2px solid var(--ink); font-size: 13.5px; font-weight: 600; }
        .cs-cta { display: inline-flex; align-items: center; gap: 8px; background: var(--plum); color: #fff; font-weight: 700; padding: 10px 18px; border-radius: 30px; }
        .cs-cta:hover { background: var(--plum-deep); }
        .cs-pending { font-size: 11px; color: var(--muted); background: #f9e3e6; border: 1px dashed #7a3b6e; color: #7a3b6e; padding: 6px 12px; border-radius: 8px; }

        .cs-sec { padding: 90px 32px; }
        .cs-split { display: grid; grid-template-columns: .8fr 1.2fr; gap: 56px; }
        .cs-h { font-family: var(--font-serif); font-weight: 600; font-size: clamp(30px, 3.4vw, 44px); line-height: 1.1; letter-spacing: -0.025em; margin-top: 10px; }
        .cs-lead { font-size: 17px; line-height: 1.75; }
        .cs-h3 { font-family: var(--font-serif); font-style: italic; font-weight: 600; font-size: 21px; color: var(--rose-ink); margin: 28px 0 12px; }
        .cs-fail { list-style: none; }
        .cs-fail li { position: relative; padding: 12px 0 12px 26px; border-bottom: 1px dashed var(--line); font-size: 15px; line-height: 1.6; }
        .cs-fail li::before { content: "✦"; position: absolute; left: 0; top: 12px; color: #7a3b6e; }

        .cs-console { background: var(--ink); color: #fff; padding: 90px 0; }
        .cs-console.grain::after { opacity: .5; mix-blend-mode: overlay; }
        .cs-console-top { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; margin-bottom: 44px; }
        .cs-console-sub { color: var(--muted-dark); margin-top: 10px; font-size: 14.5px; }
        .cs-next { background: var(--plum); color: #fff; border: none; font-weight: 700; padding: 12px 20px; border-radius: 30px; }
        .cs-next:hover { filter: brightness(1.05); transform: translateY(-1px); }
        .cs-map { position: relative; display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 14px; }
        .cs-track { position: absolute; left: 8%; right: 8%; top: 28px; height: 3px; background: rgba(255,255,255,.15); }
        .cs-track span { display: block; height: 100%; background: var(--pink); transition: width .45s cubic-bezier(.2,.8,.2,1); }
        .cs-station { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; background: none; border: none; color: var(--muted-dark); padding: 0 4px; }
        .cs-pin { width: 58px; height: 58px; border-radius: 50%; display: grid; place-items: center; background: var(--ink-2); border: 2px solid rgba(255,255,255,.25); font-family: var(--font-mono); font-size: 13px; color: #fff; transition: all .3s cubic-bezier(.34,1.56,.64,1); }
        .cs-station.done .cs-pin { border-color: var(--pink); color: var(--pink); }
        .cs-station.on .cs-pin { background: var(--pink); color: var(--ink); border-color: var(--pink); transform: scale(1.12); box-shadow: 0 0 0 8px rgba(249,227,230,.18); }
        .cs-station small { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; margin-top: 6px; }
        .cs-station strong { font-size: 14px; color: #fff; font-weight: 600; line-height: 1.3; }
        .cs-station:hover .cs-pin { border-color: #fff; }
        .cs-readout { display: flex; align-items: center; gap: 16px; margin-top: 44px; padding: 18px 22px; border: 1px solid rgba(255,255,255,.15); border-radius: 16px; background: rgba(255,255,255,.04); }
        .cs-led { width: 12px; height: 12px; border-radius: 50%; background: #f9e3e6; box-shadow: 0 0 12px #f9e3e6; flex-shrink: 0; }
        .cs-readout small { display: block; font-size: 10.5px; color: var(--muted-dark); letter-spacing: .1em; text-transform: uppercase; }
        .cs-readout strong { font-family: var(--font-serif); font-size: 22px; font-weight: 600; }
        .cs-notes-btn { margin-left: auto; background: none; border: 1px solid rgba(255,255,255,.35); color: #fff; padding: 8px 14px; border-radius: 20px; font-size: 11.5px; }
        .cs-notes-btn:hover { background: #fff; color: var(--ink); }
        .cs-notes { margin-top: 16px; display: grid; gap: 10px; }
        .cs-notes p { font-size: 14.5px; line-height: 1.65; color: rgba(255,255,255,.82); padding: 12px 16px; border-left: 3px solid var(--pink); background: rgba(255,255,255,.04); }
        .cs-notes b { color: var(--pink); font-weight: 500; font-size: 12px; }

        .cs-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 26px; margin-top: 34px; }
        .cs-card {
          position: relative; height: 100%; background-color: var(--white); padding: 30px 22px 22px; box-shadow: var(--shadow-paper);
          background-image: repeating-linear-gradient(transparent 0 27px, rgba(122,59,110,.08) 27px 28px); background-position: 0 58px;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1);
        }
        .cs-card:hover { transform: rotate(0) translateY(-4px) !important; }
        .cs-tape { position: absolute; top: -10px; left: 50%; width: 90px; height: 22px; margin-left: -45px; transform: rotate(-3deg); opacity: .9; }
        .cs-card-k { font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
        .cs-card h3 { font-family: var(--font-serif); font-weight: 600; font-size: 20px; line-height: 1.2; margin: 10px 0 8px; color: var(--plum-deep); }
        .cs-card p { font-size: 14px; line-height: 1.65; }

        .cs-results { background: var(--blush); padding: 90px 0; }
        .cs-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 18px; margin-top: 34px; }
        .cs-metrics div { background: var(--paper); border-radius: 16px; padding: 22px 22px 18px; box-shadow: var(--shadow-paper); }
        .cs-metrics strong { display: block; font-size: clamp(48px, 5vw, 72px); color: var(--plum); }
        .cs-metrics span { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }
        .cs-lesson { margin-top: 40px; max-width: 760px; }
        .cs-lesson p { font-size: clamp(22px, 2.4vw, 30px); line-height: 1.35; margin-top: 10px; color: var(--plum-deep); }

        .cs-pager { display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; padding: 60px 32px 90px; }
        .cs-pg { display: flex; flex-direction: column; gap: 4px; padding: 18px 20px; border-radius: 16px; background: var(--white); box-shadow: var(--shadow-paper); transition: transform .2s ease; }
        .cs-pg:hover { transform: translateY(-3px); }
        .cs-pg .mono { font-size: 11px; color: var(--muted); }
        .cs-pg b { font-family: var(--font-serif); font-size: 20px; font-weight: 600; }
        .cs-pg.right { text-align: right; }
        .cs-pg-mid { font-size: 12px; background: var(--plum); color: #fff; padding: 12px 18px; border-radius: 30px; }

        @media (max-width: 900px) {
          .cs-hero { padding: 100px 0 60px; }
          .cs-hero-grid, .cs-split { grid-template-columns: 1fr; gap: 36px; }
          .cs-hero-grid { padding: 34px 22px; border-radius: 20px; }
          .cs-art { min-height: 260px; }
          .cs-sticky { width: 160px; font-size: 19px; }
          .cs-sec { padding: 70px 18px; }
          .cs-map { grid-auto-flow: row; grid-auto-columns: auto; gap: 10px; }
          .cs-track { display: none; }
          .cs-station { flex-direction: row; text-align: left; gap: 14px; }
          .cs-station small { display: none; }
          .cs-pin { width: 44px; height: 44px; flex-shrink: 0; }
          .cs-readout { flex-wrap: wrap; }
          .cs-notes-btn { margin-left: 0; }
          .cs-pager { grid-template-columns: 1fr; padding: 40px 18px 70px; }
          .cs-pg.right { text-align: left; }
          .cs-pg-mid { justify-self: start; }
        }
      `}</style>
    </main>
  );
}
