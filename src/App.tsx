import { useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Binder } from "./sections/Binder";
import { Projects } from "./sections/Projects";
import { Research } from "./sections/Research";
import { Contact } from "./sections/Contact";
import { ProjectPage } from "./pages/ProjectPage";
import { CommandPalette } from "./components/CommandPalette";
import { Cursor } from "./components/Cursor";
// @ts-ignore CSS is loaded by the app's bundler; it has no TypeScript declarations.
import "./portfolioFixed.css";
// @ts-ignore CSS is loaded by the app's bundler; it has no TypeScript declarations.
import "./portfolioMobile.css";

// Deep links still work; / opens the Hero.
const PATH_TO_SECTION: Record<string, string> = {
  "/about": "about",
  "/experience": "experience",
  "/skills": "experience",
  "/projects": "projects",
  "/research": "research",
  "/publications": "research",
  "/contact": "contact",
};

const SECTIONS = ["about", "experience", "projects", "research", "contact"] as const;
type SectionName = (typeof SECTIONS)[number];
type ScreenName = "home" | SectionName;
const SCREEN_ORDER: readonly ScreenName[] = ["home", ...SECTIONS];

// Respect scrollable notebook pages, research details, and short-screen layouts.
// Change screens only when no ancestor beneath the active screen can scroll
// in the requested direction.
function canScrollInside(target: HTMLElement | null, screen: HTMLElement, direction: 1 | -1): boolean {
  let element: HTMLElement | null = target;
  while (element) {
    const scrollable = /auto|scroll|overlay/.test(window.getComputedStyle(element).overflowY);
    const remaining = element.scrollHeight - element.clientHeight;
    if (scrollable && remaining > 2) {
      if (direction > 0 && element.scrollTop < remaining - 2) return true;
      if (direction < 0 && element.scrollTop > 2) return true;
    }
    if (element === screen) break;
    element = element.parentElement;
  }
  return false;
}

function OnePage() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [entering, setEntering] = useState(false);
  const portalTimer = useRef<number | null>(null);
  const lockedUntil = useRef(0);
  const previousWheelAt = useRef(0);
  const gestureUsed = useRef(false);
  const touchStart = useRef<{
    x: number;
    y: number;
    canUp: boolean;
    canDown: boolean;
  } | null>(null);

  const fromUrl = hash.replace(/^#/, "") || PATH_TO_SECTION[pathname] || "home";
  const active: ScreenName = SECTIONS.includes(fromUrl as SectionName)
    ? (fromUrl as SectionName)
    : "home";

  useEffect(() => {
    // A detailed project case study is a separate route and scrolls normally.
    document.documentElement.classList.add("portfolio-fixed");
    document.body.classList.add("portfolio-fixed");
    return () => {
      document.documentElement.classList.remove("portfolio-fixed");
      document.body.classList.remove("portfolio-fixed");
    };
  }, []);

  useEffect(() => () => {
    if (portalTimer.current !== null) window.clearTimeout(portalTimer.current);
  }, []);

  const navigateOneScreen = useCallback((direction: 1 | -1) => {
    const now = Date.now();
    if (entering || portalTimer.current !== null || now < lockedUntil.current) return;

    const currentIndex = SCREEN_ORDER.indexOf(active);
    const next = SCREEN_ORDER[currentIndex + direction];
    if (!next) return;

    // Prevent a trackpad's momentum from advancing through multiple screens.
    lockedUntil.current = now + 950;

    if (active === "home" && next === "about") {
      setEntering(true);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      portalTimer.current = window.setTimeout(() => {
        navigate("/#about");
        setEntering(false);
        portalTimer.current = null;
      }, reducedMotion ? 50 : 720);
    } else if (next === "home") {
      navigate("/");
    } else {
      navigate(`/#${next}`);
    }
  }, [active, entering, navigate]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    // Ignore horizontal scrolling and tiny touchpad noise.
    if (Math.abs(event.deltaY) < 18 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    const now = Date.now();
    if (now - previousWheelAt.current > 250) gestureUsed.current = false;
    previousWheelAt.current = now;
    if (gestureUsed.current || now < lockedUntil.current) return;

    const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;
    if (active !== "home" && canScrollInside(event.target as HTMLElement, event.currentTarget, direction)) {
      // Finish scrolling the current panel before attempting another section.
      gestureUsed.current = true;
      return;
    }
    gestureUsed.current = true;
    navigateOneScreen(direction);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const finger = event.touches[0];
    if (!finger) return;
    const target = event.target as HTMLElement;
    const screen = event.currentTarget;
    touchStart.current = {
      x: finger.clientX,
      y: finger.clientY,
      canUp: active !== "home" && canScrollInside(target, screen, -1),
      canDown: active !== "home" && canScrollInside(target, screen, 1),
    };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const finger = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !finger) return;

    const deltaY = start.y - finger.clientY;
    const deltaX = start.x - finger.clientX;
    if (Math.abs(deltaY) < 70 || Math.abs(deltaY) < Math.abs(deltaX) * 1.3) return;

    const direction: 1 | -1 = deltaY > 0 ? 1 : -1;
    // If the panel could scroll when the gesture started, let it finish first.
    if (direction > 0 ? start.canDown : start.canUp) return;
    navigateOneScreen(direction);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a, [contenteditable='true'], [role='dialog']")) return;

      let direction: 1 | -1;
      if (["ArrowDown", "PageDown"].includes(event.key) || (event.key === " " && !event.shiftKey)) {
        direction = 1;
      } else if (["ArrowUp", "PageUp"].includes(event.key) || (event.key === " " && event.shiftKey)) {
        direction = -1;
      } else {
        return;
      }

      if (active !== "home") {
        const screen = document.querySelector<HTMLElement>(`.portfolio-screen[data-section="${active}"]`);
        if (screen && canScrollInside(target && screen.contains(target) ? target : screen, screen, direction)) return;
      }
      event.preventDefault();
      navigateOneScreen(direction);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigateOneScreen]);

  return (
    <main className="portfolio-shell" id="top">
      {active === "home" ? (
        <div
          className={`portfolio-hero ${entering ? "portfolio-entering" : ""}`}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClickCapture={(event) => {
            // Reuse the existing scroll cue in Hero.tsx.
            if ((event.target as HTMLElement).closest(".hero-scroll")) {
              event.preventDefault();
              navigateOneScreen(1);
            }
          }}
        >
          <Hero />
          {entering && <div className="portfolio-portal" aria-hidden="true" />}
        </div>
      ) : (
        <div
          key={active}
          className="portfolio-screen"
          data-section={active}
          aria-label={`${active} section`}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {active === "about" && <About />}
          {active === "experience" && <Binder />}
          {active === "projects" && <Projects />}
          {active === "research" && <Research />}
          {active === "contact" && <Contact />}
        </div>
      )}
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <CommandPalette />
      <Cursor />
      <Routes>
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<OnePage />} />
      </Routes>
    </BrowserRouter>
  );
}
