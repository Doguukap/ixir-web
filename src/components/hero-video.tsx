"use client";

import Image from "next/image";
import HeroStardust from "./hero-stardust";
import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  return <><HeroStardust paused={paused}/><div className="hero-portrait" aria-hidden="true">{enabled && !failed ? <video className="hero-portrait-media" autoPlay muted loop playsInline preload="metadata" poster="/images/hero-woman-poster.png" onError={() => setFailed(true)} onPlay={() => setPaused(false)} onPause={() => setPaused(true)}><source src="/images/hero-woman-pingpong.webm" type="video/webm"/></video> : <Image className="hero-portrait-media" src="/images/hero-woman-poster.png" alt="" fill preload sizes="(max-width:700px) 100vw, 56vw"/>}</div>

  </>;
}
