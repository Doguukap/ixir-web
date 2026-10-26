"use client";

import { useEffect, useRef } from "react";

export default function AcademyScrollJourney({ children }: { children: React.ReactNode }) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const journey = journeyRef.current;
    const star = starRef.current;
    const destination = journey?.querySelector<HTMLElement>("[data-academy-form]");
    if (!journey || !star || !destination) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (preference.matches) {
        star.style.removeProperty("transform");
        star.style.removeProperty("opacity");
        return;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;
      const formTop = destination.getBoundingClientRect().top;
      const start = Math.max(0, journey.getBoundingClientRect().top + window.scrollY - 100);
      const end = Math.max(start + 1, formTop + window.scrollY - height * .72);
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      const fade = Math.min(1, Math.max(0, (progress - .7) / .3));
      const easedFade = fade * fade * (3 - 2 * fade);
      const small = width <= 700;
      const size = small ? 40 : 88;
      const x = Math.min(width - size - 10, width * (small ? .94 : .88) - size / 2 - Math.sin(progress * Math.PI) * (small ? 8 : width * .045));
      const y = height * (.46 + progress * .16) - size / 2;

      star.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${progress * 150}deg) scale(${1 - easedFade * .25})`;
      star.style.opacity = String(formTop <= height * .72 ? 0 : 1 - easedFade);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(journey);
    observer.observe(destination);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, []);

  return <div ref={journeyRef} className="academy-scroll-journey">
    <div ref={starRef} className="academy-guide-star" aria-hidden="true"><svg viewBox="0 0 100 100" fill="none"><path d="M50 0C53 33 67 47 100 50C67 53 53 67 50 100C47 67 33 53 0 50C33 47 47 33 50 0Z" fill="currentColor"/><path d="M50 28V72M28 50H72" stroke="#f6f4f0" strokeWidth=".75"/></svg></div>
    {children}
  </div>;
}
