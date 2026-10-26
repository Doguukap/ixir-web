"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { contactUrl } from "@/lib/contact";

const prices = [
  { tr: "Protez / Jel Tırnak", en: "Nail Extensions / Gel Nails", price: "500", from: true },
  { tr: "Kirpik Lifting / İpek Kirpik", en: "Lash Lift / Lash Extensions", price: "250", from: true },
  { tr: "Kalıcı Makyaj", en: "Permanent Makeup", price: "250", from: true },
  { tr: "Hydrafacial Cilt Bakımı", en: "Hydrafacial Skin Care", price: "1.000", from: false },
  { tr: "Lazer Epilasyon", en: "Laser Hair Removal", price: "250", from: true },
  { tr: "Kavitasyon / G5 Zayıflama", en: "Cavitation / G5 Body Care", price: "500", from: true },
];

export default function Pricing({ language }: { language: "tr" | "en" }) {
  const tr = language === "tr";
  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { section.dataset.visible = "true"; observer.disconnect(); }
    }, { threshold: .15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  const priceText = (item: typeof prices[number]) => <><strong>{item.price} ₺</strong><span>{item.from ? (tr ? "’den başlayan" : "starting from") : (tr ? " / 1 saat" : " / 1 hour")}</span></>;
  return <section id="fiyat-listesi" className="pricing-section" ref={sectionRef} aria-labelledby="pricing-title">
    <div className="pricing-content">
      <p className="pricing-eyebrow"><span aria-hidden="true" />{tr ? "GÜZELLİK & BAKIM" : "BEAUTY & CARE"}</p>
      <h2 id="pricing-title"><span>{tr ? "FİYAT" : "PRICE"}</span> {tr ? "LİSTESİ" : "LIST"}</h2>
      <dl className="pricing-list">{prices.map((item, index) => <div className="pricing-row" key={item.en} style={{ "--row-index": index } as CSSProperties}><dt>{tr ? item.tr : item.en}</dt><dd>{priceText(item)}</dd></div>)}</dl>
      <button className="pricing-view-all" type="button" onClick={() => dialogRef.current?.showModal()}>{tr ? "TAMAMINI GÖR" : "VIEW FULL LIST"}<span aria-hidden="true">↗</span></button>
    </div>
    <div className="pricing-visual">
      <div className="pricing-photo" aria-hidden="true"><svg viewBox="3 1 1 1" preserveAspectRatio="xMidYMid slice"><image href="/images/services-atlas.png" width="4" height="2" /></svg></div>
      <div className="pricing-frame" aria-hidden="true" />
      <aside className="opening-hours" aria-labelledby="hours-title"><p id="hours-title">{tr ? "ÇALIŞMA SAATLERİ" : "OPENING HOURS"}</p><span className="hours-rule" aria-hidden="true" /><p>{tr ? "Pazartesi — Cumartesi" : "Monday — Saturday"}</p><strong>09:00 — 19:00</strong><span className="hours-divider" aria-hidden="true" /><p>{tr ? "Pazar kapalı" : "Closed on Sunday"}</p></aside>
      <span className="pricing-side-label" aria-hidden="true">İXİR GÜZELLİK / BEAUTY & CARE</span>
    </div>
    <dialog ref={dialogRef} className="services-catalog pricing-dialog" aria-labelledby="full-prices-title" onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <form method="dialog"><button className="catalog-close" aria-label={tr ? "Kapat" : "Close"}>×</button></form>
      <h2 id="full-prices-title">{tr ? "Fiyat Listesi" : "Price List"}</h2>
      <div className="full-pricing-list">{prices.map(item => <a key={item.en} href={contactUrl(tr ? item.tr : item.en, language)} target="_blank" rel="noopener noreferrer" onClick={() => dialogRef.current?.close()}><span>{tr ? item.tr : item.en}</span><span>{priceText(item)}<span className="price-book-arrow" aria-hidden="true">↗</span></span></a>)}</div>
      <p className="pricing-dialog-note">{tr ? "Diğer hizmetlerimiz ve kişiye özel uygulamalar için bizimle iletişime geçebilirsiniz." : "Contact us for information about our other services and personalised treatments."}</p>
      <a className="pricing-view-all" href={contactUrl(tr ? "Fiyat Bilgisi" : "Pricing Enquiry", language)} target="_blank" rel="noopener noreferrer" onClick={() => dialogRef.current?.close()}>{tr ? "FİYAT BİLGİSİ AL" : "ENQUIRE ABOUT PRICES"}<span aria-hidden="true">↗</span></a>
    </dialog>
  </section>;
}
