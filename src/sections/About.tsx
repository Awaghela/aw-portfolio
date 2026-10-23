import { resumeData } from "../data/resume";
import { Reveal } from "../components/Reveal";

export function About() {
  const { basics, education } = resumeData;

  return (
    <section id="about" className="about grain">
      <div className="wrap">
        <Reveal y={50}>
          <div className="sheet">
            <span className="punch" style={{ top: 70 }} />
            <span className="punch" style={{ top: "52%" }} />

            <div className="sheet-text">
              <div className="label" style={{ marginBottom: 18 }}>
                01 — <span className="serif-i" style={{ fontSize: 15 }}>about me</span>
              </div>
              <p className="hand sheet-quote">
              I turn complex ideas into{" "}
              <mark>simple, intelligent, and meaningful experiences.</mark>
            </p>
              {basics.summary.map((p, i) => (
                <p key={i} className="sheet-p">
                  {p}
                </p>
              ))}
            <div className="sheet-facts">
            <div>
              <span className="label">Focus</span>
              <b>Full-Stack · Distributed Systems · AI/ML</b>
            </div>
            <div>
              <span className="label">Speaks</span>
              <b>Python · C++ · TypeScript</b>
            </div>
            <div>
              <span className="label">Degree</span>
              <b>M.S. Computer Science · CU Boulder '26</b>
            </div>
          </div>
            </div>

            <div className="collage">
              <div className="note">
                <div className="binder-clip" aria-hidden="true">
                  <span />
                </div>
                <div className="note-lines" />
                <div className="note-head">
                  <span className="hand">Hi, I am</span>
                  <span className="display">{basics.name}</span>
                </div>
                <div className="polaroid">
                  <img src="/profile.jpg" alt={basics.name} />
                </div>
              </div>
              <span className="tape tape-a" aria-hidden="true" />
              <div className="sticky hand">
                MS CS '26 · GPA {education[0].gpa}
                <br />
                ex-AWS SDE intern
                <br />
                {basics.location} ☺
              </div>
              <div className="stamp" aria-hidden="true">
                <svg viewBox="0 0 100 100">
                  <defs>
                    <path id="stampCircle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
                  </defs>
                  <text>
                    <textPath href="#stampCircle">SHIP IT · BUILD IT · SCALE IT · </textPath>
                  </text>
                </svg>
                <span>AW</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .about { background: var(--plum-band); padding: 120px 0 110px; }
        .sheet {
          position: relative; display: grid; grid-template-columns: 1.15fr .85fr; gap: 48px; align-items: start;
          background-color: var(--paper); border-radius: 4px; padding: 56px 56px 56px 80px; box-shadow: var(--shadow-lift);
          background-image: linear-gradient(90deg, transparent 54px, rgba(217,112,126,.5) 54px 56px, transparent 56px), var(--fibre);
        }
        .punch { position: absolute; left: 22px; width: 16px; height: 16px; border-radius: 50%; background: var(--plum-band); box-shadow: inset 0 2px 3px rgba(0,0,0,.25); }
        .sheet-quote { font-size: clamp(28px, 3vw, 38px); line-height: 1.15; margin-bottom: 22px; color: var(--ink); max-width: 18ch; }
        .sheet-quote mark { background: linear-gradient(transparent 58%, rgba(224,168,62,.55) 58% 88%, transparent 88%); color: inherit; padding: 0 2px; }
        .sheet-p { font-size: 15px; line-height: 1.75; color: var(--ink); opacity: .86; margin-bottom: 14px; max-width: 58ch; }
        .sheet-facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 28px; padding-top: 20px; border-top: 1px dashed var(--line); }
        .sheet-facts div { display: flex; flex-direction: column; gap: 4px; }
        .sheet-facts b { font-size: 13.5px; }
        .sheet-facts div:nth-child(1) .label { color: var(--plum); }
        .sheet-facts div:nth-child(2) .label { color: var(--rose-ink); }
        .sheet-facts div:nth-child(3) .label { color: var(--gold-ink); }

        .collage { position: relative; margin-top: -110px; }
        .note {
          position: relative; background: #fff; padding: 26px 22px 22px; transform: rotate(2.5deg); box-shadow: var(--shadow-paper);
          border-radius: 2px;
        }
        .note-lines { position: absolute; inset: 0; background: repeating-linear-gradient(transparent 0 27px, #e7e3dc 27px 28px); opacity: .7; pointer-events: none; }
        .note-head { position: relative; display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; }
        .note-head .hand { font-size: 30px; color: var(--plum); }
        .note-head .display { font-size: 30px; letter-spacing: .01em; line-height: 1; }
        .polaroid { position: relative; background: #fff; padding: 10px 10px 34px; box-shadow: 0 6px 18px -6px rgba(0,0,0,.35); transform: rotate(-3deg); margin: 0 6px; }
        .polaroid img { width: 100%; aspect-ratio: 4/4.4; object-fit: cover; object-position: 50% 20%; filter: grayscale(1) contrast(1.08); }

        .binder-clip { position: absolute; top: -30px; left: 50%; transform: translateX(-50%); width: 64px; height: 44px; z-index: 3; }
        .binder-clip::before { content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 24px; background: linear-gradient(180deg, #4a4a4a, #1b1b1b); border-radius: 3px 3px 6px 6px; }
        .binder-clip span, .binder-clip::after { content: ""; position: absolute; top: 0; width: 22px; height: 30px; border: 3px solid #9a9a9a; border-bottom: none; border-radius: 12px 12px 0 0; }
        .binder-clip span { left: 6px; }
        .binder-clip::after { right: 6px; }

        .tape { position: absolute; width: 110px; height: 30px; background: rgba(240,179,194,.85); }
        .tape-a { top: 330px; left: -44px; transform: rotate(-32deg); }
        .sticky {
          position: absolute; bottom: -46px; right: -34px; width: 170px; padding: 16px 16px 18px; background: var(--gold-soft); font-size: 21px; line-height: 1.15;
          transform: rotate(-6deg); box-shadow: 0 10px 20px -8px rgba(0,0,0,.35); color: var(--gold-ink); border-top: 14px solid rgba(224,168,62,.55);
        }
        .stamp { position: absolute; top: -40px; right: -34px; width: 104px; height: 104px; color: var(--gold); }
        .stamp svg { width: 100%; height: 100%; animation: spin 18s linear infinite; }
        .stamp text { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 2.5px; fill: currentColor; }
        .stamp span { position: absolute; inset: 0; display: grid; place-items: center; font-family: var(--font-display); font-size: 26px; }
        .stamp::before { content: ""; position: absolute; inset: 18px; border: 1.5px dashed currentColor; border-radius: 50%; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 900px) {
          .about { padding: 90px 0 80px; }
          .sheet { grid-template-columns: 1fr; padding: 40px 22px 70px 52px; gap: 60px; background-image: linear-gradient(90deg, transparent 36px, rgba(217,112,126,.5) 36px 38px, transparent 38px), var(--fibre); }
          .punch { left: 12px; width: 13px; height: 13px; }
          .collage { margin: 0 8px 0 0; max-width: 360px; }
          .sheet-facts { grid-template-columns: 1fr; }
          .sticky { right: -14px; width: 150px; font-size: 19px; }
          .stamp { right: -18px; width: 84px; height: 84px; }
        }
      `}</style>
    </section>
  );
}
