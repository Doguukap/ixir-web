"use client";

import BrandLogo from "./brand-logo";
import { useEffect, useRef } from "react";

export default function ScrollAbout({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (preference.matches) {
        track.style.setProperty("--about-reveal", "1");
        track.style.setProperty("--logo-opacity", "0");
        return;
      }
      const bounds = track.getBoundingClientRect();
      const distance = Math.max(1, track.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -bounds.top / distance));
      const reveal = Math.min(1, Math.max(0, (progress - 0.08) / 0.52));
      const eased = reveal * reveal * (3 - 2 * reveal);
      track.style.setProperty("--about-reveal", eased.toFixed(4));
      track.style.setProperty("--logo-opacity", Math.max(0, 1 - reveal * 2.5).toFixed(4));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, []);

  return <section id="hakkimizda" className="about-scroll-track" ref={trackRef} aria-labelledby="about-title">
    <div className="about-scroll-stage">
      <div className="about-intro-logo" aria-hidden="true">
        <span className="brand"><BrandLogo sizes="(max-width:700px) 150px, 250px"/></span>
      </div>
      {children}
    </div>
  </section>;
}
