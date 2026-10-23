import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resumeData, slugify } from "../data/resume";

type Cmd = { id: string; label: string; hint: string; run: () => void };

export function openPalette() {
  window.dispatchEvent(new CustomEvent("open-palette"));
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { basics } = resumeData;

  const go = (id: string) => {
    navigate(`/#${id}`);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
  };
  const flash = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(""), 1600);
  };

  const cmds: Cmd[] = useMemo(() => {
    const list: Cmd[] = [
      { id: "about", label: "About", hint: "section", run: () => go("about") },
      { id: "experience", label: "Experience, education & skills", hint: "section", run: () => go("experience") },
      { id: "projects", label: "Projects", hint: `${resumeData.projects.length} builds`, run: () => go("projects") },
      { id: "research", label: "Research", hint: `${resumeData.publications.length} papers`, run: () => go("research") },
      { id: "contact", label: "Contact", hint: "section", run: () => go("contact") },
      { id: "resume", label: "Download résumé", hint: "PDF", run: () => window.open("/resume.pdf", "_blank") },
      {
        id: "email",
        label: "Copy email",
        hint: basics.email,
        run: () => {
          navigator.clipboard?.writeText(basics.email).then(() => flash("Email copied"), () => (window.location.href = `mailto:${basics.email}`));
        },
      },
    ];
    basics.links.forEach((l) => list.push({ id: l.name, label: `Open ${l.name}`, hint: "↗", run: () => window.open(l.url, "_blank", "noopener") }));
    resumeData.projects.forEach((p) =>
      list.push({ id: `p-${p.title}`, label: `Case study: ${p.title}`, hint: p.tag, run: () => navigate(`/projects/${slugify(p.title)}`) })
    );
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shown = cmds.filter((c) => (c.label + " " + c.hint).toLowerCase().includes(q.trim().toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const run = (c?: Cmd) => {
    if (!c) return;
    setOpen(false);
    c.run();
  };

  return (
    <>
      {open && (
        <div className="cmdk-back" onClick={() => setOpen(false)}>
          <div className="cmdk" role="dialog" aria-modal="true" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
            <label className="cmdk-in">
              <span className="mono" aria-hidden="true">›</span>
              <input
                ref={inputRef}
                value={q}
                placeholder="Jump to… projects, résumé, copy email"
                aria-label="Search commands"
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSel((s) => Math.min(shown.length - 1, s + 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSel((s) => Math.max(0, s - 1));
                  } else if (e.key === "Enter") run(shown[sel]);
                }}
              />
              <span className="cmdk-esc mono">esc</span>
            </label>
            <ul className="cmdk-list" role="listbox">
              {shown.map((c, i) => (
                <li key={c.id} role="option" aria-selected={i === sel}>
                  <button className={i === sel ? "on" : ""} onMouseEnter={() => setSel(i)} onClick={() => run(c)}>
                    <b>{c.label}</b>
                    <span className="mono">{c.hint}</span>
                  </button>
                </li>
              ))}
              {shown.length === 0 && <li className="cmdk-none">No match. Try “projects” or “résumé”.</li>}
            </ul>
          </div>
        </div>
      )}
      {toast && <div className="cmdk-toast mono" role="status">{toast}</div>}
    </>
  );
}
