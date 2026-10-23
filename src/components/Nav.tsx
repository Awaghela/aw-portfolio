
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { openPalette } from "./CommandPalette";

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

const PATH_TO_ID: Record<string, string> = {
  "/about": "about",
  "/experience": "experience",
  "/skills": "experience",
  "/projects": "projects",
  "/research": "research",
  "/publications": "research",
  "/contact": "contact",
};

export function Nav() {
  const { pathname, hash } = useLocation();

  const onCase = pathname.startsWith("/projects/");

  const active = onCase
    ? "projects"
    : hash.slice(1) || PATH_TO_ID[pathname] || "";

  const linksRef = useRef<HTMLDivElement>(null);

  // Automatically center the selected tab on mobile.
  useEffect(() => {
    if (!window.matchMedia("(max-width: 760px)").matches) {
      return;
    }

    const list = linksRef.current;

    const selected = Array.from(
      list?.querySelectorAll<HTMLElement>(".nav-link") ?? []
    ).find((link) => link.getAttribute("aria-current") === "page");

    if (!list || !selected) return;

    const listRect = list.getBoundingClientRect();
    const selectedRect = selected.getBoundingClientRect();

    const offset = selectedRect.left - listRect.left;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    list.scrollTo({
      left:
        list.scrollLeft +
        offset -
        (list.clientWidth - selected.clientWidth) / 2,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }, [active]);

  // Hide the navbar on the landing Hero.
  // Show it from About onward.
  // Users can navigate using the navbar or vertical scrolling.
  if (!onCase && !active) return null;

  return (
    <header className="nav scrolled portfolio-nav">
      <nav className="nav-pill" aria-label="Primary">

        {/* Logo / Return to Hero */}
        <Link
          to="/"
          className="nav-name"
          aria-label="Return to portfolio Hero"
        >
          <span className="nav-name-full">
            Aayushi Waghela
          </span>

          <span className="nav-name-short">
            AW.
          </span>
        </Link>

        <span
          className="nav-sep"
          aria-hidden="true"
        />

        {/* Navigation links */}
        <div
          className="nav-links"
          ref={linksRef}
        >
          {LINKS.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              className={`nav-link ${
                active === link.id ? "on" : ""
              }`}
              aria-current={
                active === link.id ? "page" : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Command palette shortcut */}
        <button
          type="button"
          className="nav-k"
          onClick={openPalette}
          aria-label="Open command palette (Command K)"
          data-cursor="Search"
        >
          ⌘K
        </button>

      </nav>

      <style>{`
        /* ==========================================
           DESKTOP NAVBAR
           ========================================== */

        .nav {
          position: fixed;
          top: 14px;
          left: 0;
          right: 0;
          z-index: 100;

          display: flex;
          justify-content: center;

          padding: 0 12px;
          pointer-events: none;
        }

        .portfolio-nav {
          animation: navUnfold .5s
            cubic-bezier(.2,.8,.2,1) both;
        }

        @keyframes navUnfold {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-pill {
          pointer-events: auto;

          display: flex;
          align-items: center;
          gap: 14px;

          max-width: 100%;
          min-width: 0;

          background: rgba(255,255,255,.92);

          backdrop-filter: blur(12px) saturate(1.2);
          -webkit-backdrop-filter: blur(12px) saturate(1.2);

          border: 1px solid var(--line);
          border-radius: 40px;

          padding: 9px 12px 9px 22px;

          box-shadow:
            0 8px 30px -12px rgba(0,0,0,.25);
        }

        /* Logo */

        .nav-name {
          flex-shrink: 0;

          font-weight: 800;
          font-size: 13.5px;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .nav-name-short {
          display: none;
        }

        .nav-sep {
          flex-shrink: 0;
          width: 1px;
          height: 18px;
          background: var(--line);
        }

        /* Navigation tabs */

        .nav-links {
          display: flex;
          align-items: center;

          flex: 1;
          min-width: 0;
          gap: 2px;

          overflow-x: auto;
          overflow-y: hidden;

          scrollbar-width: none;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
        }

        .nav-links::-webkit-scrollbar {
          display: none;
        }

        .nav-link {
          flex-shrink: 0;

          font-family: var(--font-mono);
          font-size: 12px;

          color: var(--muted);

          padding: 6px 11px;
          border-radius: 20px;
          white-space: nowrap;

          transition:
            color .2s ease,
            background .2s ease;
        }

        .nav-link:hover {
          color: var(--ink);
        }

        .nav-link.on {
          color: var(--ink);
          background: var(--paper-2);
        }

        /* Command palette */

        .nav-k {
          flex-shrink: 0;
        }

        /* ==========================================
           TABLET NAVBAR
           ========================================== */

        @media (max-width: 900px) {

          .nav {
            padding: 0 10px;
          }

          .nav-pill {
            max-width: calc(100vw - 20px);
            gap: 9px;
            padding: 7px 10px;
          }

          .nav-link {
            font-size: 11.5px;
            padding: 6px 9px;
          }
        }

        /* ==========================================
           MOBILE NAVBAR
           ========================================== */

        @media (max-width: 640px) {

          .nav {
            top: max(8px, env(safe-area-inset-top));
            padding: 0 8px;
          }

          .nav-pill {
            box-sizing: border-box;

            width: calc(100vw - 16px);
            max-width: calc(100vw - 16px);

            padding: 6px;
            gap: 6px;

            border-radius: 28px;
          }

          /* Compact AW logo */

          .nav-name {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            flex-shrink: 0;

            font-size: 11px;
            color: #fff;
            background: var(--plum);

            border-radius: 20px;
            padding: 7px 9px;
          }

          .nav-name-full,
          .nav-sep {
            display: none;
          }

          .nav-name-short {
            display: inline;
          }

          /* Horizontally scrollable tabs */

          .nav-links {
            flex: 1;
            min-width: 0;

            display: flex;
            align-items: center;

            overflow-x: auto;
            overflow-y: hidden;

            gap: 2px;

            scrollbar-width: none;

            scroll-snap-type: x proximity;
            overscroll-behavior-x: contain;

            -webkit-overflow-scrolling: touch;
          }

          .nav-links::-webkit-scrollbar {
            display: none;
          }

          .nav-link {
            flex-shrink: 0;

            font-size: 11px;
            padding: 7px 9px;

            scroll-snap-align: center;
          }

          .nav-link.on {
            background: var(--paper-2);
            color: var(--plum);
            font-weight: 700;
          }

          /* Compact command shortcut */

          .nav-k {
            flex-shrink: 0;
            font-size: 10px;
            padding: 6px;
            white-space: nowrap;
          }
        }

        /* ==========================================
           VERY SMALL PHONES
           ========================================== */

        @media (max-width: 360px) {

          .nav-pill {
            gap: 4px;
            padding: 5px;
          }

          .nav-name {
            padding: 6px 7px;
          }

          .nav-link {
            font-size: 10.5px;
            padding: 6px 8px;
          }

          .nav-k {
            font-size: 9px;
            padding: 5px;
          }
        }

        /* ==========================================
           ACCESSIBILITY
           ========================================== */

        @media (prefers-reduced-motion: reduce) {

          .portfolio-nav {
            animation: none;
          }

          .nav-link {
            transition: none;
          }
        }
      `}</style>
    </header>
  );
}
