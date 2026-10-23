import { useState } from "react";
import { resumeData } from "../data/resume";
import { Reveal } from "../components/Reveal";

type Tab = "experience" | "education" | "skills";

const TABS: { id: Tab; label: string; color: string; ink: string; head: string }[] = [
  { id: "experience", label: "Experience", color: "var(--plum)", ink: "#fff", head: "var(--plum)" },
  { id: "education", label: "Education", color: "#f9e3e6", ink: "#2b2230", head: "#7a3b6e" },
  { id: "skills", label: "Skills", color: "#f0e2ec", ink: "#7a3b6e", head: "#2b2230" },
];

// label-maker tape colours, cycling per skill group
const TAPES = [
  { bg: "var(--plum-deep)", fg: "#fff" },
  { bg: "var(--sage)", fg: "var(--ink)" },
  { bg: "var(--rose-ink)", fg: "#fff" },
  { bg: "var(--gold)", fg: "var(--ink)" },
  { bg: "var(--ink)", fg: "#fff" },
  { bg: "var(--lavender)", fg: "var(--plum-deep)" },
];


const MONO: Record<string, string> = {
  "Prepify": "PR",
  "Running Up for Air": "RA",
  "University of Colorado Boulder": "CU",
  "Amazon Web Services (AWS)": "AWS",
  "BinaryDots Technologies": "BD",
};


export function Binder() {
  const [tab, setTab] = useState<Tab>("experience");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <section id="experience" className="bsec fsec">
      <div className="wrap fwrap" data-tab="02 · Experience" style={{ ["--f" as string]: "var(--folder-sage)", ["--tabw" as string]: "200px" }}>
        <div className="bsec-head">
          <div>
            <div className="label">02 — Education, skills &amp; experience</div>
            <h2 className="bsec-title">
              <span className="display">On file</span> <span className="serif-i">pick a tab</span>
            </h2>
          </div>
          <div className="mobile-tabs" role="tablist" aria-label="Binder sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={`mtab ${tab === t.id ? "on" : ""}`}
                style={{ ["--tab" as string]: t.color, ["--tab-ink" as string]: t.ink }}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <Reveal y={40}>
          <div className="bnd" style={{ ["--accent" as string]: active.color, ["--head" as string]: active.head }}>
            <div className="dividers" role="tablist" aria-label="Binder sections">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  className={`divider ${tab === t.id ? "on" : ""}`}
                  style={{ background: t.color, color: t.ink, top: 46 + i * 72 }}
                  onClick={() => setTab(t.id)}
                >
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span> {t.label}
                </button>
              ))}
            </div>

            <div className="spread" key={tab}>
              {tab === "experience" && <ExperienceSpread />}
              {tab === "education" && <EducationSpread />}
              {tab === "skills" && <SkillsSpread />}
            </div>

            <div className="rings" aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className="ring" />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .bsec .bsec-head .label { color: var(--muted); }
        .bsec-title .display { color: var(--ink); }
        .bsec-title .serif-i { color: var(--plum); }
        .bsec-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; margin-bottom: 34px; }
        .bsec-title { display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; margin-top: 10px; }
        .bsec-title .display { font-size: clamp(56px, 7vw, 96px); }
        .bsec-title .serif-i { font-size: clamp(22px, 2.4vw, 30px); }
        .mobile-tabs { display: none; }

        /* leather cover */
        .bnd {
          color: var(--ink); position: relative; margin-right: 120px; border-radius: 26px; padding: 18px;
          background-color: var(--plum); background-image: var(--grain);
          border: 2.5px solid var(--ink); box-shadow: 6px 6px 0 var(--ink), inset 0 1px 0 rgba(255,255,255,.2);
        }
        .bnd::before { content: ""; position: absolute; inset: 9px; border: 1.5px dashed rgba(255,255,255,.22); border-radius: 20px; pointer-events: none; }

        .dividers { position: absolute; top: 0; right: -118px; width: 140px; height: 100%; }
        .divider {
          position: absolute; right: 0; width: 132px; height: 60px; border: none; border-radius: 0 14px 14px 0; text-align: left;
          padding: 0 14px 0 30px; font-size: 14px; font-weight: 700; display: flex; flex-direction: column; justify-content: center; gap: 1px;
          border: 2px solid var(--ink); border-left: none; box-shadow: 4px 4px 0 var(--ink); transform: translateX(-12px); filter: saturate(.8) brightness(.97);
          transition: transform .3s cubic-bezier(.34,1.56,.64,1), filter .2s ease;
        }
        .divider .mono { font-size: 10px; opacity: .8; font-weight: 400; }
        .divider:hover { transform: translateX(-4px); filter: none; }
        .divider.on { transform: translateX(6px); filter: none; z-index: 2; }

        .spread { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 0; animation: pageIn .45s cubic-bezier(.2,.8,.2,1); }
        @keyframes pageIn { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
        .pg {
          position: relative; min-height: 630px; padding: 42px 46px 44px 58px; background-color: var(--paper);
          background-image: linear-gradient(90deg, transparent 38px, rgba(122,59,110,.22) 38px 40px, transparent 40px),
            repeating-linear-gradient(transparent 0 31px, rgba(122,59,110,.08) 31px 32px), var(--fibre);
        }
        .pg.l { border-radius: 12px 4px 4px 12px; box-shadow: inset -18px 0 24px -20px rgba(43,34,48,.35); }
        .pg.r { border-radius: 4px 12px 12px 4px; box-shadow: inset 18px 0 24px -20px rgba(43,34,48,.35); background-image: repeating-linear-gradient(transparent 0 31px, rgba(122,59,110,.08) 31px 32px), var(--fibre); padding-left: 46px; }
        .pg::after { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: var(--accent); opacity: .9; border-radius: inherit; border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
        .pg-h { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 22px; }
        .pg-h h3 { font-family: var(--font-serif); font-style: italic; font-weight: 600; font-size: 30px; color: var(--head); letter-spacing: -0.02em; }
        .pg-h .mono { font-size: 11px; color: var(--muted); }

        .rings { position: absolute; left: 50%; top: 48px; bottom: 48px; transform: translateX(-50%); display: flex; flex-direction: column; justify-content: space-between; z-index: 3; pointer-events: none; }
        .ring { display: block; width: 60px; height: 13px; border-radius: 8px; background: linear-gradient(180deg, #ffffff 0%, #d9cfd6 40%, #897e8a 58%, #f0e2ec 100%); box-shadow: 0 3px 6px rgba(43,34,48,.45); }

        /* ---------- experience: commit log ---------- */
        .pg.l.log { background: var(--ink) !important; background-image: none !important; color: var(--paper); padding-left: 34px; }
        .pg.l.log .pg-h h3 { color: #f9e3e6; }
        .pg.l.log .pg-h .mono { color: var(--muted-dark); }
        .gl { list-style: none; position: relative; padding-left: 34px; margin: 6px 0 0; display: flex; flex-direction: column; gap: 10px; }
        .gl::before { content: ""; position: absolute; left: 9px; top: 10px; bottom: 10px; width: 3px; border-radius: 3px; background: rgba(240,226,236,.45); }
        .gl-i { position: relative; }
        .gl-i.br::before { content: ""; position: absolute; left: -12px; top: -18px; bottom: -18px; width: 3px; border-radius: 3px; background: #d9707e; opacity: .8; }
        .gl-i button { position: relative; width: 100%; display: flex; flex-direction: column; gap: 3px; text-align: left; background: transparent; border: 1.5px solid transparent; border-radius: 10px; padding: 10px 12px; color: var(--paper); font-family: var(--font-mono); transition: background .2s, border-color .2s; }
        .gl-i button:hover { background: rgba(255,255,255,.05); }
        .gl-i button.on { background: rgba(249,227,230,.1); border-color: #f9e3e6; }
        .gl-node { position: absolute; left: -32px; top: 13px; width: 16px; height: 16px; border-radius: 50%; background: #e0a83e; border: 3px solid var(--ink); }
        .gl-i:first-child .gl-node { background: #f9e3e6; }
        .gl-i.br .gl-node { left: -17px; width: 13px; height: 13px; background: #d9707e; }
        .gl-i button.on .gl-node { box-shadow: 0 0 0 3px rgba(249,227,230,.35); }
        .gl-top { font-size: 11.5px; }
        .gl-hash { color: #e0a83e; margin-right: 6px; }
        .gl-ref { color: #dfeadd; }
        .gl-i.br .gl-ref { color: #f9e3e6; }
        .gl-msg { font-size: 13.5px; color: #fff; line-height: 1.35; }
        .gl-meta { font-size: 10.5px; color: var(--muted-dark); }
        .gl-legend { margin-top: 18px; padding-top: 12px; border-top: 1px dashed rgba(255,255,255,.2); font-size: 11px; color: var(--muted-dark); }

        /* ---------- experience ---------- */
        .xl { list-style: none; }
        .xl button { width: 100%; display: grid; grid-template-columns: 94px 1fr auto; gap: 12px; align-items: start; text-align: left; background: none; border: none; padding: 14px 10px; border-radius: 10px; transition: background .2s ease; }
        .xl button:hover { background: rgba(122,59,110,.06); }
        .xl button.on { background: #f9e3e6; box-shadow: inset 4px 0 0 var(--plum); }
        .xl-date { font-family: var(--font-mono); font-size: 11px; color: var(--muted); padding-top: 3px; line-height: 1.4; }
        .xl-role { font-weight: 700; font-size: 15.5px; line-height: 1.3; letter-spacing: -0.01em; }
        .xl-co { font-size: 13px; color: var(--muted); }
        .xl-now { width: 10px; height: 10px; border-radius: 50%; background: var(--sage); border: 1.5px solid var(--ink); margin-top: 6px; }

        .xd-top { display: flex; gap: 16px; align-items: center; margin-bottom: 18px; }
        .xd-mono { flex-shrink: 0; width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; font-family: var(--font-serif); font-weight: 600; font-size: 20px; color: var(--plum); border: 2px solid var(--plum); background: var(--lavender); transform: rotate(-8deg); box-shadow: 0 0 0 5px var(--paper), 0 0 0 6.5px rgba(122,59,110,.35); }
        .xd-role { font-family: var(--font-serif); font-weight: 600; font-size: clamp(22px, 2.3vw, 28px); line-height: 1.15; letter-spacing: -0.02em; }
        .xd-co { font-size: 14px; color: var(--plum); font-weight: 700; margin-top: 4px; }
        .xd-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .pill { font-family: var(--font-mono); font-size: 11px; padding: 5px 11px; border-radius: 20px; }
        .pill.date { background: var(--plum-deep); color: #fff; }
        .pill.loc { background: var(--white); border: 1px solid var(--line); }
        .pill.now { background: var(--sage); color: var(--ink); }
        .xd-b { list-style: none; display: grid; gap: 10px; }
        .xd-b li { position: relative; padding-left: 22px; font-size: 14.5px; line-height: 1.6; animation: pageIn .4s ease both; }
        .xd-b li::before { content: "→"; position: absolute; left: 0; color: var(--plum); font-weight: 700; }
        .xd-stack { margin-top: 24px; padding-top: 16px; border-top: 1px dashed var(--line); display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
        .xd-stack .label { margin-right: 6px; }
        .chip-s { font-family: var(--font-mono); font-size: 11.5px; padding: 4px 10px; border-radius: 6px; background: var(--white); border: 1px solid var(--line); }

        /* ---------- education ---------- */
        .cert {
          position: relative; background: var(--white); padding: 30px 28px 26px; border: 1.5px solid var(--plum);
          outline: 5px double rgba(122,59,110,.22); outline-offset: -12px; box-shadow: var(--shadow-paper); transform: rotate(-.6deg);
        }
        .pg.r .cert { transform: rotate(.6deg); }
        .cert-k { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; color: var(--rose-ink); }
        .cert-inst { font-family: var(--font-serif); font-weight: 600; font-size: 24px; line-height: 1.2; letter-spacing: -0.015em; margin: 8px 0 4px; max-width: 15ch; }
        .cert-deg { font-family: var(--font-serif); font-style: italic; font-size: 16px; color: var(--muted); }
        .cert-dates { font-family: var(--font-mono); font-size: 11.5px; margin-top: 10px; }
        .seal { position: absolute; top: -26px; right: -18px; width: 96px; height: 96px; display: grid; place-items: center; }
        .seal::before { content: ""; position: absolute; inset: 0; background: var(--gold); clip-path: polygon(50% 0,61% 9%,75% 4%,79% 18%,93% 21%,90% 35%,100% 46%,91% 57%,96% 71%,82% 76%,79% 90%,65% 88%,54% 100%,43% 90%,29% 95%,24% 81%,10% 78%,13% 64%,0 54%,9% 43%,4% 29%,18% 25%,21% 11%,35% 13%); animation: spin 30s linear infinite; }
        .seal::after { content: ""; position: absolute; inset: 14px; border-radius: 50%; border: 1.5px dashed rgba(122,59,110,.45); }
        .seal b { position: relative; z-index: 1; font-family: var(--font-serif); font-size: 22px; line-height: 1; color: var(--plum); text-align: center; }
        .seal b small { display: block; font-family: var(--font-mono); font-size: 8.5px; letter-spacing: .14em; margin-top: 3px; font-weight: 500; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .cw { margin-top: 26px; }
        .cw li { list-style: none; position: relative; padding: 9px 0 9px 22px; border-bottom: 1px dashed var(--line); font-size: 14.5px; }
        .cw li:not(.label)::before  { content: "✦"; position: absolute; left: 0; top: 9px; color: var(--plum); font-size: 11px; }

        /* ---------- skills (label-maker tapes) ---------- */
        .sg { margin-bottom: 26px; }
        .sg-h { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
        .sg-h span:first-child { font-family: var(--font-serif); font-style: italic; font-weight: 600; font-size: 19px; color: var(--plum-deep); }
        .sg-h span:last-child { font-family: var(--font-mono); font-size: 11px; color: var(--muted); }
        .tapes { display: flex; flex-wrap: wrap; gap: 9px 8px; }
        .tape-l {
          font-family: var(--font-mono); font-weight: 500; font-size: 11.5px; letter-spacing: .12em; text-transform: uppercase;
          padding: 6px 12px 5px; border: 1px solid rgba(43,34,48,.15); border-radius: 3px; text-shadow: 0 1px 0 rgba(0,0,0,.35), 0 -1px 0 rgba(255,255,255,.18);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.2), inset 0 -2px 0 rgba(0,0,0,.2), 0 3px 6px -2px rgba(43,34,48,.4);
          background-image: linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,0) 45%, rgba(0,0,0,.06)); transition: transform .2s cubic-bezier(.34,1.56,.64,1);
          clip-path: polygon(0 0, 100% 0, 98% 50%, 100% 100%, 0 100%, 2% 50%);
        }
        .tape-l:hover { transform: translateY(-2px) rotate(0deg) !important; }

        @media (max-width: 1000px) {
          .bnd { margin-right: 0; padding: 10px; border-radius: 20px; }
          .bnd::before { inset: 5px; border-radius: 16px; }
          .dividers { display: none; }
          .mobile-tabs { display: flex; gap: 6px; width: 100%; }
          .mtab { flex: 1; border: none; border-radius: 12px 12px 0 0; padding: 11px 6px 9px; font-weight: 700; font-size: 13px; background: var(--tab); color: var(--tab-ink); opacity: .55; transform: translateY(6px); transition: opacity .2s, transform .2s; }
          .mtab.on { opacity: 1; transform: none; }
          .bsec-head { margin-bottom: 0; }
          .spread { grid-template-columns: 1fr; }
          .pg { min-height: 0; padding: 30px 20px 30px 44px; background-image: linear-gradient(90deg, transparent 28px, rgba(122,59,110,.22) 28px 30px, transparent 30px), repeating-linear-gradient(transparent 0 31px, rgba(122,59,110,.08) 31px 32px), var(--fibre); }
          .pg.l { border-radius: 10px 10px 3px 3px; box-shadow: none; }
          .pg.r { border-radius: 3px 3px 10px 10px; box-shadow: none; margin-top: 4px; }
          .rings { display: none; }
          .xl button { grid-template-columns: 1fr auto; }
          .xl-date { grid-column: 1 / -1; padding: 0; }
          .seal { width: 78px; height: 78px; right: -8px; }
          .seal b { font-size: 18px; }
        }
        @media (prefers-reduced-motion: reduce) { .seal::before { animation: none; } }
      `}</style>
    </section>
  );
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
function monthIndex(s: string) {
  const m = s.trim().toLowerCase().match(/([a-z]{3})?\s*(\d{4})/);
  if (!m) return 0;
  return parseInt(m[2], 10) * 12 + (m[1] ? Math.max(0, MONTHS.indexOf(m[1])) : 0);
}
function range(d: string) {
  const [a, b] = d.split(/\s*[—–-]\s*/);
  return [monthIndex(a), monthIndex(b ?? a)];
}
function shortHash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}


function ExperienceSpread() {
  const jobs = resumeData.experience;
  const [sel, setSel] = useState(0);
  const job = jobs[sel];

  return (
    <>
      {/* Left page: Interactive career timeline */}
      <div className="pg l log">
        <div className="pg-h">
          <h3>Experience</h3>
          <span className="mono">
            {String(jobs.length).padStart(2, "0")} roles · select one
          </span>
        </div>

        <ol className="gl">
          {jobs.map((j, i) => (
            <li key={j.company + j.role} className="gl-i">
              <button
                className={sel === i ? "on" : ""}
                onClick={() => setSel(i)}
                aria-pressed={sel === i}
                data-cursor="Explore"
              >
                <span className="gl-node" aria-hidden="true" />

                <span className="gl-top">
                  <span className="gl-hash">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="gl-ref">
                    {j.current ? "Current role" : "Experience"}
                  </span>
                </span>

                <span className="gl-msg">
                  {j.role}
                </span>

                <span className="gl-meta">
                  {j.company} · {j.dates.replace("—", "–")}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <p className="gl-legend mono">
          Some roles overlapped. Select an experience to explore →
        </p>
      </div>

      {/* Right page: Selected experience details */}
      <div className="pg r" key={sel}>
        <div className="xd-top">
          <span className="xd-mono">
            {MONO[job.company] ?? job.company.slice(0, 2)}
          </span>

          <div>
            <div className="xd-role">{job.role}</div>
            <div className="xd-co">{job.company}</div>
          </div>
        </div>

        <div className="xd-meta">
          <span className="pill date">
            {job.dates.replace("—", "–")}
          </span>

          {job.location && (
            <span className="pill loc">
              📍 {job.location}
            </span>
          )}

          {job.current && (
            <span className="pill now">
              ● Current
            </span>
          )}
        </div>

        <ul className="xd-b">
          {job.bullets.map((bullet, i) => (
            <li
              key={i}
              style={{ animationDelay: `${0.06 * i}s` }}
            >
              {bullet}
            </li>
          ))}
        </ul>

        {job.stack && (
          <div className="xd-stack">
            <span className="label">Stack</span>
            {job.stack.map((tech) => (
              <span key={tech} className="chip-s">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}


function EducationSpread() {
  return (
    <>
      {resumeData.education.map((e, i) => (
        <div key={e.institution} className={`pg ${i === 0 ? "l" : "r"}`}>
          <div className="pg-h">
            <h3>{i === 0 ? "Graduate" : "Undergraduate"}</h3>
            <span className="mono">{e.dates}</span>
          </div>
          <div className="cert">
            <div className="seal">
              <b>
                {e.gpa}
                <small>GPA</small>
              </b>
            </div>
            <div className="cert-k">Certificate of study</div>
            <div className="cert-inst">{e.institution}</div>
            <div className="cert-deg">{e.degree}</div>
            <div className="cert-dates">{e.dates}</div>
          </div>
          <ul className="cw">
            <li className="label" style={{ paddingLeft: 0, borderBottom: "none" }}>
              Key coursework
            </li>
            {e.coursework.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function SkillsSpread() {
  const groups = resumeData.skills;
  const half = Math.ceil(groups.length / 2);
  const cols = [groups.slice(0, half), groups.slice(half)];
  let gi = -1;

  return (
    <>
      {cols.map((col, ci) => (
        <div key={ci} className={`pg ${ci === 0 ? "l" : "r"}`}>
          <div className="pg-h">
            <h3>Skills</h3>
            <span className="mono">{col.reduce((n, g) => n + g.items.length, 0)} labels</span>
          </div>
          {col.map((g) => {
            gi += 1;
            const tape = TAPES[gi % TAPES.length];
            return (
              <div key={g.category} className="sg">
                <div className="sg-h">
                  <span>{g.category}</span>
                  <span>{String(g.items.length).padStart(2, "0")}</span>
                </div>
                <div className="tapes">
                  {g.items.map((it, ii) => (
                    <span key={it} className="tape-l" style={{ backgroundColor: tape.bg, color: tape.fg, transform: `rotate(${((ii * 37) % 5) - 2}deg)` }}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
