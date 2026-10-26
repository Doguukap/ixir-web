"use client";

import { useEffect, useId, useRef } from "react";

export default function HeroStardust({ paused }: { paused: boolean }) {
  const gradientId = useId();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const controlRef = useRef<() => void>(() => {});

  useEffect(() => {
    pausedRef.current = paused;
    controlRef.current();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = canvas?.parentElement;
    if (!canvas || !wrapper) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles = Array.from({ length: window.innerWidth <= 700 ? 28 : 48 }, (_, index) => ({
      phase: Math.random(), speed: 1 / (10000 + Math.random() * 10000),
      sway: Math.random() * Math.PI * 2, radius: .6 + Math.random() * 1.5,
      star: index % 7 === 0,
    }));
    let width = 0;
    let height = 0;
    let elapsed = 0;
    let last = 0;
    let frame = 0;
    let visible = true;

    function paint() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        const progress = (particle.phase + elapsed * particle.speed) % 1;
        const x = width * (.93 - .3 * Math.sin(progress * Math.PI * .9) + .035 * Math.sin(progress * Math.PI * 3 + particle.sway));
        const y = -25 + progress * (height + 50);
        const shimmer = .65 + .35 * Math.sin(elapsed / 1700 + particle.sway);
        const alpha = Math.pow(Math.sin(progress * Math.PI), .7) * shimmer * (particle.star ? .9 : .65);
        const radius = particle.star ? particle.radius * 3 : particle.radius;
        context.save();
        context.translate(x, y);
        context.fillStyle = `rgba(${particle.star ? "222,173,67" : "189,139,40"},${alpha})`;
        context.shadowColor = "rgba(255,207,100,.6)";
        context.shadowBlur = particle.star ? 12 : 5;
        context.beginPath();
        if (particle.star) {
          context.rotate(particle.sway + progress * .4);
          context.moveTo(0, -radius);
          context.quadraticCurveTo(radius * .18, -radius * .18, radius, 0);
          context.quadraticCurveTo(radius * .18, radius * .18, 0, radius);
          context.quadraticCurveTo(-radius * .18, radius * .18, -radius, 0);
          context.quadraticCurveTo(-radius * .18, -radius * .18, 0, -radius);
        } else context.arc(0, 0, radius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }
    function draw(now: number) {
      frame = 0;
      if (last) elapsed += Math.min(now - last, 50);
      last = now;
      paint();
      frame = requestAnimationFrame(draw);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (!pausedRef.current && visible && !document.hidden && !preference.matches) frame = requestAnimationFrame(draw);
    }
    function resize() {
      if (!canvas || !wrapper || !context) return;
      const bounds = wrapper.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      paint();
    }
    controlRef.current = sync;
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    const visibilityObserver = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    visibilityObserver.observe(wrapper);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    resize();
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
      controlRef.current = () => {};
    };
  }, []);

  return <div className={`hero-stardust ${paused ? "is-paused" : ""}`} aria-hidden="true"><div className="hero-gold-flare"/><svg className="hero-light-ribbons" viewBox="0 0 600 1000" preserveAspectRatio="none"><defs><linearGradient id={gradientId} x1="550" y1="0" x2="310" y2="1000" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#e1b855" stopOpacity="0"/><stop offset=".2" stopColor="#c99c3d" stopOpacity=".65"/><stop offset=".46" stopColor="#fff0bc"/><stop offset=".7" stopColor="#d9ae53" stopOpacity=".7"/><stop offset="1" stopColor="#d9ae53" stopOpacity="0"/></linearGradient></defs>{[
      "M570 -80C550 120 310 200 330 420S510 740 380 1080",
      "M650 -20C480 130 430 250 450 430S270 790 440 1060",
      "M515 -100C680 170 390 340 405 535S560 860 475 1110",
    ].map((path, index) => <g className={`hero-light-ribbon ribbon-${index}`} key={path} fill="none" stroke={`url(#${gradientId})`}><path className="hero-ribbon-glow" d={path} strokeWidth={index === 0 ? 18 : 12}/><path d={path} strokeWidth={index === 0 ? 3 : 1.5}/><path d={path} stroke="#fff3cf" strokeWidth=".6" opacity=".6"/></g>)}</svg><canvas ref={canvasRef}/></div>;
}
