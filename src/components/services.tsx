"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useServiceNavigation } from "./service-navigation";

type Service = { tr: string; en: string; category: string; categoryEn: string; position: number };
const groups: { tr: string; en: string; services: Service[] }[] = [
  { tr: "ERKEK", en: "MEN", services: [
    { tr: "Saç Simülasyonu", en: "Scalp Micropigmentation", category: "GÜZELLİK", categoryEn: "BEAUTY", position: 0 },
    { tr: "Medikal Cilt Bakımı", en: "Medical Skin Care", category: "MEDİKAL BAKIM", categoryEn: "SKIN CARE", position: 1 },
    { tr: "Medikal Ayak Bakımı", en: "Medical Foot Care", category: "AYAK SAĞLIĞI", categoryEn: "FOOT CARE", position: 2 },
    { tr: "EMS Kas Geliştirme", en: "EMS Muscle Training", category: "VÜCUT BAKIMI", categoryEn: "BODY CARE", position: 3 },
  ] },
  { tr: "KADIN", en: "WOMEN", services: [
    { tr: "Jel Tırnak", en: "Gel Nails", category: "GÜZELLİK", categoryEn: "BEAUTY", position: 4 },
    { tr: "Microblading", en: "Microblading", category: "ESTETİK", categoryEn: "AESTHETICS", position: 5 },
    { tr: "Kirpik Lifting", en: "Lash Lift", category: "GÜZELLİK", categoryEn: "BEAUTY", position: 6 },
    { tr: "Hydrafacial Cilt Bakımı", en: "Hydrafacial Skin Care", category: "MEDİKAL BAKIM", categoryEn: "SKIN CARE", position: 7 },
  ] },
];

export default function Services({ language }: { language: "tr" | "en" }) {
  const tr = language === "tr";
  const catalog = useServiceNavigation();
  const trackRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const tiles = Array.from(track.querySelectorAll<HTMLElement>(".service-tile"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = track.getBoundingClientRect();
      const mobile = window.innerWidth <= 700;
      const scrollDistance = Math.max(1, track.offsetHeight - window.innerHeight);
      // Finish assembling before the sticky track ends, leaving a reading pause.
      const progress = Math.min(1, Math.max(0, -bounds.top / (scrollDistance * .65)));
      tiles.forEach((tile, index) => {
        const tileTop = (tile.closest(".service-group")?.getBoundingClientRect().top ?? 0) + tile.offsetTop;
        const local = mobile ? (window.innerHeight * .95 - tileTop) / (window.innerHeight * .35) : (progress - index * .075) / .22;
        const value = preference.matches ? 1 : Math.min(1, Math.max(0, local));
        tile.style.setProperty("--piece-progress", String(value * value * (3 - 2 * value)));
      });
      const heading = preference.matches || mobile ? 1 : Math.min(1, Math.max(0, (progress - .8) / .18));
      track.style.setProperty("--heading-progress", String(heading));
      track.dataset.assembled = preference.matches || mobile || progress >= .8 ? "true" : "false";
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); preference.removeEventListener("change", schedule); };
  }, []);
  return <section id="hizmetler" className="services-section services-scroll-track" ref={trackRef} aria-labelledby="services-title">
    <div className="services-scroll-stage">
    <header className="services-heading">
      <div className="services-ornament" aria-hidden="true"><span /><span /></div>
      <h2 id="services-title">{tr ? "HİZMETLERİMİZ" : "OUR SERVICES"}</h2>
      <p>{tr ? "Kendinize iyi bakmanın en güzel hâli. Uzman ekibimizle, size özel güzellik ve bakım deneyimi." : "The beauty of caring for yourself. A personal beauty and care experience with our expert team."}</p>
      <button className="services-view-all" type="button" onClick={() => dialogRef.current?.showModal()}>{tr ? "TÜMÜNÜ GÖR" : "VIEW ALL"}<span aria-hidden="true">↗</span></button>
    </header>
    <div className="service-groups">{groups.map(group => <ServiceGroup key={group.en} group={group} language={language} />)}</div>
    </div>
    <dialog className="services-catalog" ref={dialogRef} aria-labelledby="catalog-title" onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <form method="dialog"><button className="catalog-close" aria-label={tr ? "Kapat" : "Close"}>×</button></form>
      <h2 id="catalog-title">{tr ? "Tüm Hizmetlerimiz" : "All Our Services"}</h2>
      <div className="catalog-groups">{catalog.map(category => <section key={category.href}><h3>{category.title}</h3><ul>{category.services.map(service => <li key={service.href}><Link href={service.href} onClick={() => dialogRef.current?.close()}>{service.title}<span aria-hidden="true">↗</span></Link></li>)}</ul></section>)}</div>
    </dialog>
  </section>;
}

function ServiceGroup({ group, language }: { group: typeof groups[number]; language: "tr" | "en" }) {
  const [active, setActive] = useState<number | null>(null);
  const catalog = useServiceNavigation();
  const tr = language === "tr";
  return <div className="service-group" data-active={active ?? "none"}
    onPointerLeave={event => { if (event.pointerType === "mouse") setActive(null); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }}
    onKeyDown={event => { if (event.key === "Escape") setActive(null); }}
    role="group" aria-label={tr ? `${group.tr} hizmetleri` : `${group.en} services`}>
    <div className="service-mosaic">
      {group.services.filter(service => catalog.some(category => category.services.some(item => item.title === service.tr || (service.tr === "EMS Kas Geliştirme" && item.title === "EMS Kas Geliştirme Cihazı")))).map((service, index) => {
        const label = tr ? service.tr : service.en;
        const entry = catalog.flatMap(category => category.services).find(item => item.title === service.tr || (service.tr === "EMS Kas Geliştirme" && item.title === "EMS Kas Geliştirme Cihazı"));
        const expanded = active === index;
        return <article key={service.en} className={`service-tile ${expanded ? "is-active" : ""}`} data-piece={service.position}
          onPointerEnter={event => { if (event.pointerType === "mouse") setActive(index); }}>
          <svg className="service-photo" viewBox={`${service.position % 4} ${Math.floor(service.position / 4)} 1 1`} preserveAspectRatio="xMidYMid slice" aria-hidden="true"><image href="/images/services-atlas.png" width="4" height="2" /></svg>
          <button className="service-select" type="button" aria-expanded={expanded} aria-controls={`service-${service.position}-action`} onFocus={() => setActive(index)} onClick={() => setActive(index)} aria-label={tr ? `${label} hizmetini incele` : `Explore ${label}`} />
          <div className="service-info">
            <p>{tr ? service.category : service.categoryEn}</p>
            <h3>{label}</h3>
            <Link id={`service-${service.position}-action`} className="service-book" href={entry?.href ?? "/hizmetler"} tabIndex={expanded ? 0 : -1} aria-hidden={!expanded}>{tr ? "İŞLEMİ KEŞFET" : "EXPLORE SERVICE"}<span aria-hidden="true">↗</span></Link>
          </div>
          <span className="service-number" aria-hidden="true">0{index + 1}</span>
        </article>;
      })}
    </div>
    <p className="service-gender" aria-hidden="true">{tr ? group.tr : group.en}</p>
  </div>;
}
