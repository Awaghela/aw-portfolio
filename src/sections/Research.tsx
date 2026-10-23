import { useState } from "react";
import { resumeData, type Publication } from "../data/resume";
import { Reveal } from "../components/Reveal";

const SELF = resumeData.basics.name;
const LABELS = ["AGRICULTURE / ML", "ENERGY / AUTOML", "FINANCE / FRAUD"];
const SIGNALS = ["YIELD SYSTEMS", "SUBSURFACE DATA", "RISK PATTERNS"];
const ACCENTS = ["#edc4d6", "#d9e9d5", "#f4d6a5"];

function toBibtex(p: Publication) {
  const isJournal = /journal/i.test(p.kind);
  const key = (p.authors[0] ?? "author").split(" ").slice(-1)[0].toLowerCase() + p.year;
  return [
    `@${isJournal ? "article" : "inproceedings"}{${key},`,
    `  title = {${p.title}},`,
    `  author = {${p.authors.join(" and ")}},`,
    `  ${isJournal ? "journal" : "booktitle"} = {${p.venue}},`,
    `  publisher = {${p.publisher}},`,
    `  pages = {${p.pages.replace("–", "--")}},`,
    `  year = {${p.year}},`,
    `  doi = {${p.doi}},`,
    "}",
  ].join("\n");
}

const cropDots = Array.from({ length: 72 }, (_, i) => ({
  x: 91 + (i % 12) * 29,
  y: 125 + Math.floor(i / 12) * 29,
  opacity: 0.22 + ((i * 7) % 9) / 18,
}));

const networkNodes = [
  [110, 138], [180, 100], [253, 126], [342, 94], [407, 153],
  [126, 247], [203, 217], [283, 259], [366, 231], [430, 297],
  [180, 333], [310, 343],
] as const;
const networkEdges = [
  [0, 1], [0, 5], [1, 2], [1, 6], [2, 3], [2, 6], [2, 7],
  [3, 4], [3, 8], [4, 8], [5, 6], [5, 10], [6, 7], [6, 10],
  [7, 8], [7, 11], [8, 9], [8, 11], [9, 11], [10, 11],
] as const;

function ResearchSignal({ index }: { index: number }) {
  return (
    <svg
      className="rl-signal"
      viewBox="0 0 520 440"
      role="img"
      aria-label={
        index === 0 ? "Animated crop yield data plot" :
        index === 1 ? "Animated geological well-log visualization" :
        "Animated financial transaction risk network"
      }
    >
      <defs>
        <linearGradient id="rl-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ACCENTS[index]} stopOpacity=".95" />
          <stop offset="100%" stopColor="#b17ca6" stopOpacity=".25" />
        </linearGradient>
        <linearGradient id="rl-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENTS[index]} stopOpacity=".27" />
          <stop offset="100%" stopColor={ACCENTS[index]} stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="260" cy="220" r="178" fill="none" stroke={ACCENTS[index]} strokeOpacity=".14" strokeWidth="1" strokeDasharray="4 10" />

      {index === 0 && (
        <g className="rl-plot-in">
          <path d="M90 335 L90 310 L118 296 L147 303 L176 265 L205 274 L234 239 L263 220 L292 245 L321 190 L350 202 L379 165 L408 140 L437 122 L437 335 Z" fill="url(#rl-fill)" />
          <path d="M90 310 L118 296 L147 303 L176 265 L205 274 L234 239 L263 220 L292 245 L321 190 L350 202 L379 165 L408 140 L437 122" stroke={ACCENTS[index]} strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" className="rl-trace" />
          {cropDots.filter((_, i) => i % 3 === 0).map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={i % 4 === 0 ? 2.5 : 1.4} fill={ACCENTS[index]} opacity={dot.opacity} className="rl-twinkle" style={{ animationDelay: `${(i % 13) * -0.3}s` }} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M${130 + i * 63} 355 v${-20 - i * 8}`} stroke={ACCENTS[index]} strokeWidth="8" strokeLinecap="round" strokeOpacity=".65" />
          ))}
          <circle cx="408" cy="140" r="7" fill={ACCENTS[index]} />
          <circle cx="408" cy="140" r="17" fill="none" stroke={ACCENTS[index]} strokeOpacity=".5" className="rl-pulse" />
          <text x="100" y="92" fill={ACCENTS[index]} fontSize="11" letterSpacing="3">PREDICTIVE GROWTH</text>
          <text x="397" y="105" fill={ACCENTS[index]} fontSize="11">↑</text>
        </g>
      )}

      {index === 1 && (
        <g className="rl-plot-in">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M45 ${140 + i * 38} C125 ${95 + i * 38}, 170 ${196 + i * 29}, 260 ${147 + i * 38} S400 ${107 + i * 43}, 478 ${132 + i * 38}`}
              fill="none"
              stroke={ACCENTS[index]}
              strokeWidth={i === 3 ? 3 : 1.6}
              strokeOpacity={0.28 + i * 0.075}
            />
          ))}
          <path d="M255 85 V365" stroke={ACCENTS[index]} strokeOpacity=".9" strokeWidth="3" strokeDasharray="6 8" />
          <path d="M255 112 L266 145 L246 172 L267 198 L251 232 L276 260 L243 297 L262 323 L255 360" fill="none" stroke={ACCENTS[index]} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="rl-trace" />
          {[145, 198, 260, 323].map((y, i) => (
            <g key={i}>
              <circle cx={i % 2 ? 267 : 255} cy={y} r="6" fill={ACCENTS[index]} />
              <circle cx={i % 2 ? 267 : 255} cy={y} r="16" fill="none" stroke={ACCENTS[index]} strokeOpacity=".35" />
            </g>
          ))}
          <rect x="226" y="78" width="57" height="286" rx="27" fill="none" stroke={ACCENTS[index]} strokeOpacity=".2" />
          <text x="92" y="94" fill={ACCENTS[index]} fontSize="11" letterSpacing="3">WELL LOG / SIGNAL</text>
          <text x="314" y="363" fill={ACCENTS[index]} fontSize="11">DEPTH ↓</text>
        </g>
      )}

      {index === 2 && (
        <g className="rl-plot-in">
          {networkEdges.map(([a, b], i) => (
            <line key={i} x1={networkNodes[a][0]} y1={networkNodes[a][1]} x2={networkNodes[b][0]} y2={networkNodes[b][1]} stroke={ACCENTS[index]} strokeWidth={i % 3 === 0 ? 2 : 1} strokeOpacity={i % 3 === 0 ? ".65" : ".3"} />
          ))}
          {networkNodes.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={i === 7 ? 13 : 5.5} fill={i === 7 ? "#f3a3aa" : ACCENTS[index]} className="rl-twinkle" style={{ animationDelay: `${i * -0.19}s` }} />
              {i === 7 && <circle cx={x} cy={y} r="26" fill="none" stroke="#f3a3aa" strokeWidth="2" className="rl-pulse" />}
            </g>
          ))}
          <path d="M284 226 L320 194" fill="none" stroke="#f3a3aa" strokeWidth="1.5" strokeDasharray="4 4" />
          <rect x="319" y="170" width="110" height="27" rx="4" fill="#f3a3aa" />
          <text x="331" y="188" fill="#2b2230" fontSize="10" fontWeight="bold" letterSpacing="1">ANOMALY / 01</text>
          <text x="96" y="88" fill={ACCENTS[index]} fontSize="11" letterSpacing="3">TRANSACTION GRAPH</text>
        </g>
      )}
    </svg>
  );
}

export function Research() {
  const publications = [...resumeData.publications].sort((a, b) => b.year - a.year);
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const pub = publications[selected];

  if (!pub) return null;

  const selectPaper = (i: number) => {
    setSelected((i + publications.length) % publications.length);
    setCopied(false);
    setCopyError(false);
  };

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(toBibtex(pub));
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
      setCopied(false);
    }
  };

  return (
    <section className="rl-section fsec" id="research">
      <div
        className="wrap fwrap rl-wrap"
        data-tab="04 · Research"
        style={{ ["--f" as string]: "var(--folder-peach)", ["--tabw" as string]: "190px" }}
      >
        <div className="rl-heading">
          <div>
            <div className="label">04 — Research / selected publications</div>
            <Reveal y={22}>
              <h2 className="rl-title">
                <span className="display">Ideas,</span>
                <span className="serif-i">in motion.</span>
              </h2>
            </Reveal>
          </div>
          <span className="rl-heading-side mono">0{publications.length} PUBLISHED WORKS</span>
        </div>

        <div className="rl-console">
          <div className="rl-console-bar mono">
            <span><span className="rl-console-led" /> RESEARCH / VISUAL EXPLORER</span>
            <span>0{selected + 1} <span className="rl-bar-slash">/</span> 0{publications.length}</span>
          </div>

          <div className="rl-main">
            <div className="rl-visual" style={{ ["--viz" as string]: ACCENTS[selected % ACCENTS.length] }}>
              <div className="rl-visual-grid" aria-hidden="true" />
              <div className="rl-visual-top mono">
                <span>{SIGNALS[selected % SIGNALS.length]}</span>
                <span className="rl-signal-live">● LIVE VIEW</span>
              </div>
              <div className="rl-art" key={pub.doi}>
                <ResearchSignal index={selected % 3} />
              </div>
              <div className="rl-visual-bottom mono">
                <span>FIG. 0{selected + 1}</span>
                <span>{pub.year} / RESEARCH</span>
              </div>
            </div>

            <article
              className="rl-paper"
              key={`paper-${pub.doi}`}
              role="tabpanel"
              id="rl-paper-panel"
              aria-labelledby={`rl-tab-${selected}`}
            >
              <div className="rl-paper-top">
                <span className="rl-kicker mono">RESEARCH NOTE / 0{selected + 1}</span>
                <span className="rl-category mono">{LABELS[selected % LABELS.length]}</span>
              </div>

              <h3 className="rl-paper-title">{pub.title}</h3>

              <div className="rl-people">
                {pub.authors.map((author, index) => (
                  <span key={`${author}-${index}`}>
                    {author === SELF ? <strong>{author}</strong> : author}
                    {index < pub.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>

              <div className="rl-venue">{pub.venue}</div>
              <div className="rl-metadata mono">
                <span>{pub.publisher}</span>
                <span>{pub.year}</span>
                <span>PP. {pub.pages}</span>
              </div>

              <div className="rl-summary">
                <span className="rl-summary-label mono">THE IDEA</span>
                <p>{pub.abstract}</p>
              </div>

              <div className="rl-paper-bottom">
                <div className="rl-links">
                  <a className="rl-read" href={pub.url} target="_blank" rel="noopener noreferrer">
                    Read publication <span aria-hidden="true">↗</span>
                  </a>
                  {pub.pdf && (
                    <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="rl-pdf mono">PDF ↗</a>
                  )}
                  <button type="button" className="rl-cite mono" onClick={copyCitation}>
                    {copied ? "✓ COPIED" : copyError ? "COPY FAILED" : "COPY BIBTEX ↗"}
                  </button>
                </div>
                <div className="rl-doi mono">DOI / {pub.doi}</div>
              </div>
            </article>
          </div>

          <nav className="rl-selector" aria-label="Browse published research">
            <div className="rl-tabs" role="tablist" aria-label="Published studies">
              {publications.map((paper, i) => (
                <button
                  key={paper.doi}
                  id={`rl-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-controls="rl-paper-panel"
                  aria-selected={selected === i}
                  className={`rl-tab ${selected === i ? "active" : ""}`}
                  onClick={() => selectPaper(i)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      const next = (i + (event.key === "ArrowRight" ? 1 : -1) + publications.length) % publications.length;
                      selectPaper(next);
                      document.getElementById(`rl-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <span className="rl-tab-num mono">0{i + 1}</span>
                  <span className="rl-tab-copy">
                    <strong>{LABELS[i % LABELS.length]}</strong>
                    <small>{paper.year} · {paper.publisher}</small>
                  </span>
                </button>
              ))}
            </div>
            <div className="rl-arrows">
              <button type="button" aria-label="Previous paper" onClick={() => selectPaper(selected - 1)}>←</button>
              <button type="button" aria-label="Next paper" onClick={() => selectPaper(selected + 1)}>→</button>
            </div>
          </nav>
        </div>
      </div>

      <style>{`
        .rl-section .rl-wrap { padding: 40px 44px 43px; }
        .rl-heading { display: flex; justify-content: space-between; align-items: center; gap: 14px; margin-bottom: 19px; }
        .rl-title { display: flex; align-items: baseline; flex-wrap: wrap; gap: 15px; margin-top: 11px; line-height: 1; }
        .rl-title .display { font-size: clamp(65px, 8vw, 106px); }
        .rl-title .serif-i { font-size: clamp(35px, 4vw, 59px); }
        .rl-heading-side { font-size: 10px; letter-spacing: .12em; color: var(--plum); white-space: nowrap; }

        .rl-console { min-width: 0; border: 2px solid var(--ink); border-radius: 16px; overflow: hidden; background: #fffcf9; box-shadow: 5px 5px 0 var(--ink); }
        .rl-console-bar { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 9px 17px; background: var(--ink); color: #f6e8f0; font-size: 10px; letter-spacing: .12em; }
        .rl-console-bar > span:first-child { display: inline-flex; align-items: center; gap: 10px; }
        .rl-console-led { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #dfEadd; box-shadow: 0 0 0 3px rgba(223,234,221,.14); }
        .rl-bar-slash { opacity: .55; }
        .rl-main { display: grid; grid-template-columns: 42% minmax(0,1fr); min-height: 395px; }

        .rl-visual { position: relative; isolation: isolate; min-height: 390px; overflow: hidden; background: radial-gradient(ellipse at 46% 52%, #423046 0%, #2b2230 65%, #241b28 100%); }
        .rl-visual-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(242,221,237,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(242,221,237,.04) 1px,transparent 1px); background-size: 32px 32px; mask-image: radial-gradient(ellipse at center,#000 12%, transparent 90%); }
        .rl-visual-top,.rl-visual-bottom { position: absolute; left: 20px; right: 20px; z-index: 2; display: flex; align-items: center; justify-content: space-between; font-size: 9px; letter-spacing: .12em; color: #e9d5e2; }
        .rl-visual-top { top: 19px; }
        .rl-visual-bottom { bottom: 18px; opacity: .75; }
        .rl-signal-live { color: #e8bfda; }
        .rl-art { position: absolute; inset: 0; display: grid; place-items: center; animation: rl-appear .48s cubic-bezier(.2,.8,.2,1) both; }
        .rl-signal { width: 100%; height: 100%; max-width: 515px; }
        .rl-orbit { animation: none; }
        .rl-twinkle { animation: rl-twinkle 4s ease-in-out infinite alternate; }
        .rl-pulse { transform-box: fill-box; transform-origin: center; animation: rl-pulse 2.8s ease-in-out infinite; }
        .rl-trace { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: rl-draw 1.35s cubic-bezier(.2,.8,.2,1) .12s forwards; }
        .rl-plot-in { animation: rl-appear .55s ease-out both; }

        .rl-paper { display: flex; flex-direction: column; min-width: 0; min-height: 0; padding: 24px 28px 21px; background: #fffcf9; animation: rl-slide-in .43s cubic-bezier(.2,.8,.2,1) both; }
        .rl-paper-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .rl-kicker { font-size: 10px; color: #8a7584; letter-spacing: .12em; }
        .rl-category { margin: 0; background: #f0e2ec; color: var(--plum); padding: 5px 9px; border-radius: 99px; font-size: 9px; white-space: nowrap; }
        .rl-paper-title { font-family: var(--font-serif); font-size: clamp(22px,2.05vw,29px); font-weight: 650; line-height: 1.17; letter-spacing: -.03em; color: var(--ink); margin: 13px 0 8px; }
        .rl-people { font-size: 11.5px; line-height: 1.53; color: var(--muted); }
        .rl-people strong { color: var(--plum); text-decoration: underline; text-decoration-color: #e5bfd7; text-decoration-thickness: 2px; text-underline-offset: 3px; }
        .rl-venue { font-size: 11.5px; font-weight: 700; line-height: 1.5; margin-top: 11px; color: var(--ink); }
        .rl-metadata { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 8px; }
        .rl-metadata span { color: #6b6070; background: #f3e9ea; border-radius: 4px; padding: 4px 7px; font-size: 9px; }
        .rl-summary { padding: 11px 13px; border-left: 3px solid var(--plum); background: #f9f2f4; margin-top: 14px; }
        .rl-summary-label { color: var(--plum); font-size: 9px; letter-spacing: .1em; }
        .rl-summary p { font-size: 11.7px; line-height: 1.54; color: #615563; margin-top: 5px; }
        .rl-paper-bottom { margin-top: 15px; padding-top: 0; }
        .rl-links { display: flex; align-items: center; flex-wrap: wrap; gap: 11px 17px; }
        .rl-read { display: inline-flex; align-items: center; gap: 12px; padding: 10px 15px; background: var(--plum); color: #fff; border-radius: 24px; font-size: 11.5px; font-weight: 700; transition: background .2s ease,transform .2s ease; }
        .rl-read:hover { background: var(--plum-deep); transform: translateY(-2px); }
        .rl-read span { font-size: 17px; }
        .rl-cite,.rl-pdf { font-size: 10px; letter-spacing: .06em; border: 0; border-bottom: 1px solid #c3b0bf; background: transparent; padding: 6px 0; }
        .rl-cite:hover,.rl-pdf:hover { color: var(--plum); border-color: var(--plum); }
        .rl-doi { font-size: 9px; line-height: 1.5; color: #8a7884; overflow-wrap: anywhere; margin-top: 10px; }

        .rl-selector { display: flex; align-items: stretch; min-height: 75px; border-top: 1.5px solid #d9cbd2; background: #fffaf7; }
        .rl-tabs { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); flex: 1; min-width: 0; }
        .rl-tab { min-width: 0; display: flex; align-items: center; gap: 11px; padding: 12px 17px; border: 0; border-right: 1px solid #e5d8df; border-top: 3px solid transparent; background: transparent; text-align: left; transition: background .25s ease,border-color .25s ease; }
        .rl-tab:hover { background: #f6ecf2; }
        .rl-tab.active { background: #f0e2ec; border-top-color: var(--plum); }
        .rl-tab-num { font-size: 18px; color: #988493; }
        .rl-tab.active .rl-tab-num { color: var(--plum); }
        .rl-tab-copy { display: grid; gap: 5px; min-width: 0; }
        .rl-tab-copy strong { font-size: 10px; letter-spacing: .05em; color: var(--ink); }
        .rl-tab.active .rl-tab-copy strong { color: var(--plum); }
        .rl-tab-copy small { font-size: 9px; color: var(--muted); }
        .rl-arrows { display: flex; flex-direction: column; width: 43px; flex: none; }
        .rl-arrows button { flex: 1; border: 0; background: #fffaf7; transition: background .2s ease; }
        .rl-arrows button + button { border-top: 1px solid #e5d8df; }
        .rl-arrows button:hover { background: #f0e2ec; }

        @keyframes rl-appear { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }
        @keyframes rl-slide-in { from { opacity: 0; transform: translateY(9px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rl-twinkle { to { opacity: .2; } }
        @keyframes rl-pulse { 0%,100% { opacity: .8; transform: scale(.65); } 50% { opacity: .3; transform: scale(1.4); } }
        @keyframes rl-draw { to { stroke-dashoffset: 0; } }

        @media (max-width: 900px) {
          .rl-main { grid-template-columns: 1fr; }
          .rl-visual { min-height: 300px; }
          .rl-paper { padding: 22px; }
          .rl-title .display { font-size: clamp(58px,9vw,95px); }
          .rl-title .serif-i { font-size: clamp(32px,5vw,52px); }
          .rl-heading-side { display: none; }
        }
        @media (max-width: 600px) {
          .rl-section .rl-wrap { padding: 37px 16px 30px; }
          .rl-title { gap: 7px; }
          .rl-title .display { font-size: clamp(55px,14vw,75px); }
          .rl-title .serif-i { font-size: clamp(29px,7vw,44px); }
          .rl-heading { margin-bottom: 17px; }
          .rl-console-bar { padding: 9px 12px; font-size: 9px; }
          .rl-visual { min-height: 240px; }
          .rl-visual-top,.rl-visual-bottom { left: 14px; right: 14px; font-size: 8px; }
          .rl-visual-top { top: 13px; } .rl-visual-bottom { bottom: 13px; }
          .rl-paper { padding: 18px 16px; }
          .rl-paper-title { font-size: 23px; }
          .rl-selector { min-height: 78px; }
          .rl-tab { flex-direction: column; gap: 3px; align-items: flex-start; padding: 10px 8px; }
          .rl-tab-num { font-size: 15px; }
          .rl-tab-copy strong { font-size: 8px; }
          .rl-tab-copy small { font-size: 7px; }
          .rl-arrows { width: 32px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rl-twinkle,.rl-pulse,.rl-trace,.rl-plot-in,.rl-art,.rl-paper { animation: none !important; }
          .rl-trace { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
