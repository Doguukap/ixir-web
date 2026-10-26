"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function WhyIxir({ language }: { language: "tr" | "en" }) {
  const tr = language === "tr";
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const values = Array.from(section.querySelectorAll<HTMLElement>("[data-counter]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const formatter = new Intl.NumberFormat(language === "tr" ? "tr-TR" : "en-US");
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      values.forEach(value => { value.textContent = formatter.format(Number(value.dataset.counter)) + (value.dataset.plus === "true" ? "+" : ""); });
    };
    if (preference.matches) { finish(); return; }
    values.forEach(value => { value.textContent = "0"; });
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const update = (now: number) => {
        let done = true;
        values.forEach((value, index) => {
          const progress = Math.min(1, Math.max(0, (now - start - index * 100) / 1500));
          if (progress < 1) done = false;
          const count = Math.round(Number(value.dataset.counter) * (1 - Math.pow(1 - progress, 3)));
          value.textContent = formatter.format(count) + (value.dataset.plus === "true" ? "+" : "");
        });
        if (!done) frame = requestAnimationFrame(update);
      };
      frame = requestAnimationFrame(update);
    }, { threshold: .2 });
    observer.observe(section.querySelector(".why-stats") ?? section);
    const onPreference = () => { if (preference.matches) { observer.disconnect(); finish(); } };
    preference.addEventListener("change", onPreference);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); preference.removeEventListener("change", onPreference); };
  }, [language]);
  const stats = tr
    ? [{ value: "14", label: "yıllık tecrübe", detail: "DENEYİM" }, { value: "35.000+", label: "gerçekleştirilen işlem", detail: "UZMAN DOKUNUŞ" }, { value: "120+", label: "ödül ve başarı", detail: "MÜKEMMELLİK" }]
    : [{ value: "14", label: "years of experience", detail: "EXPERIENCE" }, { value: "35,000+", label: "treatments performed", detail: "EXPERT CARE" }, { value: "120+", label: "awards & achievements", detail: "EXCELLENCE" }];
  return <section ref={sectionRef} className="why-section" aria-labelledby="why-title">
    <div className="why-content">
      <p className="why-eyebrow">{tr ? "GÜZELLİKTE GÜVENİLİR ADRES" : "YOUR TRUSTED BEAUTY DESTINATION"}<span aria-hidden="true" /></p>
      <h2 id="why-title">{tr ? "NEDEN" : "WHY"} <span>İXİR</span><br />{tr ? "GÜZELLİK?" : "GÜZELLİK?"}</h2>
      <p className="why-description">{tr ? "Müşterilerimizin bizi tercih etmesinin arkasında sadece yıllara dayanan tecrübemiz değil; uzman kadromuz, üstün hizmet kalitemiz, hijyenik ortamımız ve her zaman en iyi sonuçları hedefleyen profesyonel yaklaşımımız var." : "Our clients choose us for more than our years of experience. They trust our expert team, quality care, hygienic environment and professional approach that always aims for the best results."}</p>
      <Link className="why-discover" href="#ibrahim-akcay">{tr ? "DAHA FAZLASINI KEŞFET" : "DISCOVER MORE"}<span aria-hidden="true">↗</span></Link>
    </div>
    <dl className="why-stats">{stats.map(stat => <div className="why-stat" key={stat.detail}><dt>{stat.detail}</dt><dd><strong><span className="sr-only">{stat.value}</span><span aria-hidden="true" data-counter={Number(stat.value.replace(/[^0-9]/g, ""))} data-plus={stat.value.includes("+")}>{stat.value}</span></strong><span>{stat.label}</span></dd></div>)}</dl>
  </section>;
}
