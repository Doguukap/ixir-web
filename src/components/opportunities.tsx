"use client";

import BrandLogo from "./brand-logo";
import { useId, useState } from "react";
import { contactUrl } from "@/lib/contact";

function Spiral({ light }: { light: boolean }) {
  const id = useId();
  const paths = Array.from({ length: 11 }, (_, arm) => {
    const points = Array.from({ length: 150 }, (_, step) => {
      const t = step / 149;
      const radius = 8 + Math.pow(t, 1.45) * 560;
      const angle = t * Math.PI * 1.65 + arm * Math.PI * 2 / 11;
      return `${step ? "L" : "M"}${(500 + Math.cos(angle) * radius).toFixed(2)},${(500 + Math.sin(angle) * radius).toFixed(2)}`;
    });
    return points.join(" ");
  });
  return <div className="opportunity-spiral" aria-hidden="true"><div className="spiral-orbit"><svg viewBox="0 0 1000 1000" fill="none">
    <defs><linearGradient id={id} x1="100" y1="100" x2="900" y2="900" gradientUnits="userSpaceOnUse">
      {light ? <><stop stopColor="#fff" /><stop offset=".3" stopColor="#cccac6" /><stop offset=".5" stopColor="#fff" /><stop offset=".75" stopColor="#e1dfda" /><stop offset="1" stopColor="#fff" /></> : <><stop stopColor="#060606" /><stop offset=".3" stopColor="#66635d" /><stop offset=".5" stopColor="#101010" /><stop offset=".75" stopColor="#a29b90" /><stop offset="1" stopColor="#080808" /></>}
    </linearGradient></defs>
    {paths.map((path, index) => <path key={index} d={path} stroke={`url(#${id})`} strokeWidth="40" strokeLinecap="round" />)}
  </svg></div><span className="spiral-brand"><BrandLogo sizes="(max-width:700px) 70px, 100px"/></span></div>;
}

export default function Opportunities({ language }: { language: "tr" | "en" }) {
  const [active, setActive] = useState<number | null>(null);
  const tr = language === "tr";
  const cards = [
    { title: tr ? "AKADEMİ" : "ACADEMY", eyebrow: tr ? "BİLGİ · UZMANLIK · GELECEK" : "KNOWLEDGE · EXPERTISE · FUTURE", description: tr ? "Güzellik alanında uzmanlaş, eğitimlerle kariyerini bir üst seviyeye taşı. Sektörün profesyonellerinden ilham al, geleceğini birlikte şekillendirelim." : "Develop your beauty expertise and take your career further through professional training. Learn from industry professionals and shape your future with us.", topic: tr ? "Akademi Başvurusu" : "Academy Application" },
    { title: "FRANCHISING", eyebrow: tr ? "İŞ BİRLİĞİ · DESTEK · BÜYÜME" : "PARTNERSHIP · SUPPORT · GROWTH", description: tr ? "İxir Güzellik ailesine katıl. Marka deneyimimiz, eğitim ve iş birliği olanaklarımızla kendi güzellik merkezini açmak için ilk adımı at." : "Join the İxir Güzellik family. Take the first step towards your own beauty centre with our brand experience, training and partnership opportunities.", topic: tr ? "Franchising Başvurusu" : "Franchising Application" },
  ];
  return <section id="akademi-franchising" className="opportunities-section" aria-labelledby="opportunities-title">
    <header className="opportunities-heading"><p>{tr ? "DAHA GÜÇLÜ BİR GÜZELLİK YARINI İÇİN" : "FOR A STRONGER FUTURE IN BEAUTY"}</p><h2 id="opportunities-title">{tr ? "AKADEMİ & FRANCHISING" : "ACADEMY & FRANCHISING"}</h2><span aria-hidden="true" /><p>{tr ? "Uzmanlıkla büyüyen bir ekosistem. Kendini geliştir, bizimle büyü." : "An ecosystem built on expertise. Develop your skills. Grow with us."}</p></header>
    <div className="opportunity-cards" onPointerLeave={event => { if (event.pointerType === "mouse") setActive(null); }}>
      {cards.map((card, index) => <article id={index === 0 ? "akademi" : "franchising"} key={card.title} className={`opportunity-card ${index === 1 ? "is-light" : "is-dark"} ${active === index ? "is-expanded" : ""}`}
        onPointerEnter={event => { if (event.pointerType === "mouse") setActive(index); }}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }}
        onKeyDown={event => { if (event.key === "Escape") setActive(null); }}>
        <Spiral light={index === 1} />
        <div className="opportunity-scrim" />
        <button className="opportunity-trigger" type="button" aria-label={tr ? `${card.title} hakkında bilgi al` : `Learn about ${card.title}`} aria-expanded={active === index} aria-controls={`opportunity-details-${index}`} onFocus={() => setActive(index)} onClick={() => setActive(index)} />
        <div className="opportunity-copy"><p className="opportunity-eyebrow">{card.eyebrow}</p><h3>{card.title}</h3><span className="opportunity-rule" aria-hidden="true" />
          <div id={`opportunity-details-${index}`} className="opportunity-details" aria-hidden={active !== index}><p>{card.description}</p><a href={contactUrl(card.topic, language)} target="_blank" rel="noopener noreferrer" tabIndex={active === index ? 0 : -1}>{tr ? "Başvur" : "Apply"}<span aria-hidden="true">↗</span></a></div>
        </div>
        <span className="opportunity-index" aria-hidden="true">0{index + 1} / İXİR</span>
      </article>)}
    </div>
  </section>;
}
