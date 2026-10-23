import { useState } from "react";
import { resumeData } from "../data/resume";
import { GithubIcon, LinkedinIcon, DownloadIcon } from "../components/icons";
import { Reveal } from "../components/Reveal";

export function Contact() {
  const { basics } = resumeData;
  const github = basics.links.find((l) => l.name === "GitHub")?.url;
  const linkedin = basics.links.find((l) => l.name === "LinkedIn")?.url;
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState("");
  const [stamped, setStamped] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setStamped(true);
    const body = encodeURIComponent(note || "Hi Aayushi,\n\n");
    window.setTimeout(() => {
      window.location.href = `mailto:${basics.email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${body}`;
    }, 900);
    window.setTimeout(() => setStamped(false), 3200);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(basics.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${basics.email}`;
    }
  };

  return (
    <section id="contact" className="contact grain">
      <div className="wrap">
        <div className="label" style={{ marginBottom: 24 }}>
          05 — Contact
        </div>
        <div className="c-top">
          <Reveal y={60}>
            <h2 className="display c-title">
              Let's build
              <br />
              something
              <br />
              that <span>ships</span>
            </h2>
          </Reveal>
          <form className={`postcard ${stamped ? "stamped" : ""}`} onSubmit={send}>
            <div className="pc-top">
              <span className="mono">Postcard · to Aayushi</span>
              <span className="pc-stamp-box display" aria-hidden="true">AW</span>
            </div>
            <label className="pc-label mono" htmlFor="pc-note">Write a note</label>
            <textarea
              id="pc-note"
              className="pc-note hand"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Hi Aayushi, we're hiring for…"
            />
            <div className="pc-foot">
              <span className="mono">Opens your mail app · nothing is stored</span>
              <button type="submit" className="pc-send" data-cursor="Stamp & send">
                Send ✉
              </button>
            </div>
            <span className="pc-approved display" aria-hidden="true">Approved</span>
          </form>
        </div>

        <div className="c-row">
          <div className="c-lines">
            <div className="c-line">
              <a href={`mailto:${basics.email}`} className="c-email">
                {basics.email}
              </a>
              <button className="pill-btn" onClick={copy}>
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <div className="c-line c-sub mono">Based in {basics.location}</div>
          </div>

          <div className="c-icons">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="c-icon">
                <span className="c-sq">
                  <LinkedinIcon size={16} />
                </span>
                <span className="mono">LinkedIn</span>
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="c-icon">
                <span className="c-sq">
                  <GithubIcon size={16} />
                </span>
                <span className="mono">GitHub</span>
              </a>
            )}
            <a
                href="/resume.pdf"
                download="Aayushi_Waghela_Resume.pdf"
                aria-label="Download my résumé"
                className="c-icon"
              >
              <span className="c-sq">
                <DownloadIcon size={16} />
              </span>
              <span className="mono">Résumé</span>
            </a>
          </div>
        </div>

        <footer className="c-foot mono">
          <span>© {new Date().getFullYear()} {basics.name}</span>
          <a href="#top">Back to the start ↑</a>
        </footer>
      </div>

      <style>{`
        .contact { background: var(--ink); color: #fff; padding: 110px 0 34px; }
        .contact.grain::after { opacity: .5; mix-blend-mode: overlay; }
        .contact .label { color: var(--muted-dark); }
        .c-top { display: flex; justify-content: space-between; align-items: center; gap: 30px; }
        .c-title { font-size: clamp(64px, 9vw, 132px); line-height: .9; }
        .c-title span { color: var(--pink); }
        .c-title { color: var(--paper); }
        .c-seal { position: relative; flex-shrink: 0; width: clamp(160px, 20vw, 260px); aspect-ratio: 1; color: var(--pink); }
        .c-seal::after { content: ""; position: absolute; inset: 31%; border-radius: 50%; background: #7a3b6e; opacity: 1; z-index: -1; }
        .c-seal svg { width: 100%; height: 100%; animation: spin 26s linear infinite; }
        .c-seal text { font-family: var(--font-mono); font-size: 12.5px; letter-spacing: 3px; fill: currentColor; }
        .c-seal::before { content: ""; position: absolute; inset: 22%; border-radius: 50%; border: 1.5px dashed currentColor; }
        .c-seal > span { position: absolute; inset: 0; display: grid; place-items: center; font-size: clamp(40px, 5vw, 64px); color: #f8f4f0; z-index: 1; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .c-done { display: inline-flex; align-items: center; gap: 10px; font-size: 12.5px; background: #dfeadd; color: var(--ink); padding: 8px 14px; border-radius: 20px; margin-bottom: 34px; }
        .c-done-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--ink); }
        .postcard {
          position: relative; flex-shrink: 0; width: min(440px, 100%); background-color: var(--paper); color: var(--ink); border-radius: 4px;
          padding: 24px 26px 20px; transform: rotate(3deg); box-shadow: 0 30px 60px -20px rgba(0,0,0,.6);
          background-image: repeating-linear-gradient(transparent 0 31px, rgba(122,59,110,.1) 31px 32px);
        }
        .pc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .pc-top .mono { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }
        .pc-stamp-box { width: 58px; height: 68px; border: 2px dashed var(--plum); display: grid; place-items: center; color: var(--plum); font-size: 20px; }
        .pc-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
        .pc-note { width: 100%; box-sizing: border-box; background: transparent; border: none; resize: none; font-size: 26px; line-height: 32px; color: var(--ink); outline: none; padding: 0; }
        .pc-note::placeholder { color: rgba(43,34,48,.45); }
        .pc-note:focus { background: rgba(240,226,236,.4); }
        .pc-foot { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 10px; }
        .pc-foot .mono { font-size: 10.5px; color: var(--muted); }
        .pc-send { background: var(--plum); color: #fff; border: none; border-radius: 30px; padding: 11px 20px; font-weight: 700; font-size: 14px; }
        .pc-send:hover { background: var(--ink); }
        .pc-approved { position: absolute; right: 50px; top: 104px; font-size: 46px; letter-spacing: .06em; color: var(--plum); border: 4px solid var(--plum); padding: 0 16px; border-radius: 8px; opacity: 0; transform: rotate(-16deg) scale(2.2); pointer-events: none; }
        .postcard.stamped .pc-approved { animation: stamp .45s cubic-bezier(.2,.9,.3,1.3) forwards; }
        @keyframes stamp { 0% { opacity: 0; transform: rotate(-16deg) scale(2.2); } 70% { opacity: .95; transform: rotate(-16deg) scale(.94); } 100% { opacity: .9; transform: rotate(-16deg) scale(1); } }

        .c-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 30px; flex-wrap: wrap; margin-top: 70px; }
        .c-line { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .c-email { font-weight: 700; font-size: clamp(17px, 2vw, 22px); letter-spacing: -0.01em; border-bottom: 2px solid transparent; transition: border-color .2s ease; word-break: break-all; }
        .c-email:hover { border-color: var(--pink); }
        .c-sub { font-size: 12px; color: var(--muted-dark); margin-top: 8px; }
        .c-icons { display: flex; gap: 18px; }
        .c-icon { display: flex; flex-direction: column; align-items: center; gap: 7px; font-size: 10.5px; color: var(--muted-dark); }
        .c-sq { width: 44px; height: 44px; border: 1.5px solid rgba(255,255,255,.5); border-radius: 10px; display: grid; place-items: center; color: #fff; transition: background .2s ease, color .2s ease, transform .2s ease; }
        .c-icon:hover .c-sq { background: var(--plum); border-color: var(--plum); color: #fff; transform: translateY(-3px); }
        .c-icon:hover { color: #fff; }

        .c-foot { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 80px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,.14); font-size: 11.5px; color: var(--muted-dark); }
        .c-foot a { text-decoration: underline; text-underline-offset: 3px; }
        .c-foot a:hover { color: var(--pink); }

        @media (max-width: 760px) {
          .contact { padding: 80px 0 28px; }
          .c-top { flex-direction: column; align-items: flex-start; }
          .postcard { transform: none; margin-top: 10px; }
          .c-done { font-size: 11px; }
          .c-row { margin-top: 40px; }
        }
      `}</style>
    </section>
  );
}
