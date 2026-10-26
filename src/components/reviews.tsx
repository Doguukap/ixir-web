"use client";

import { useEffect, useRef, useState } from "react";

const googleUrl = "https://www.google.com/maps/search/?api=1&query=%C4%B0xir+G%C3%BCzellik+Gaziantep";

function GoogleMark({ large = false }: { large?: boolean }) {
  return <svg className={large ? "google-mark is-large" : "google-mark"} viewBox="0 0 48 48" role="img" aria-label="Google">
    <path fill="#4285F4" d="M43.61 24.46c0-1.36-.12-2.66-.35-3.92H24.4v7.42h10.77a9.2 9.2 0 0 1-4 6.04v5h6.48c3.79-3.49 5.96-8.64 5.96-14.54Z" />
    <path fill="#34A853" d="M24.4 44c5.4 0 9.93-1.79 13.24-4.85l-6.48-5c-1.79 1.2-4.08 1.93-6.76 1.93-5.21 0-9.64-3.52-11.23-8.26H6.48v5.15A20 20 0 0 0 24.4 44Z" />
    <path fill="#FBBC05" d="M13.17 27.82a12 12 0 0 1 0-7.64v-5.15H6.48a20 20 0 0 0 0 17.94l6.69-5.15Z" />
    <path fill="#EA4335" d="M24.4 11.92c2.94 0 5.56 1.01 7.65 3L37.78 9A19.18 19.18 0 0 0 24.4 4a20 20 0 0 0-17.92 11.03l6.69 5.15c1.59-4.74 6.02-8.26 11.23-8.26Z" />
  </svg>;
}
function Stars() {
  return <div className="review-stars" role="img" aria-label="5 / 5">{Array.from({ length: 5 }, (_, index) => <svg key={index} viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2L7 14.2l-5-4.9 6.9-1L12 2Z" fill="currentColor" /></svg>)}</div>;
}
export type CustomerReview = { name: string; initial: string; text: string };
const defaultReviews: CustomerReview[] = [
  { name: "Ahmet Özhan", initial: "A", text: "Gerçek esnaf zihniyetiyle çalışan başarılı bir işletme. :)" },
  { name: "İsimsiz#", initial: "İ", text: "Çok güzel bir yer hizmetlerinden memnun kaldım." },
  { name: "Kadir Can Akçay", initial: "K", text: "Lazer üstüne tanımam tüm ekibi çok memnun ederim. Güler yüzlü ve profesyonel bir ekip." },
];
export default function Reviews({ language, items = defaultReviews }: { language: "tr" | "en"; items?: CustomerReview[] }) {
  const tr = language === "tr";
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollable = items.length > 4;
  const [bounds, setBounds] = useState({ previous: false, next: true });
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !scrollable) return;
    const update = () => {
      const previous = track.scrollLeft > 2;
      const next = track.scrollLeft + track.clientWidth < track.scrollWidth - 2;
      setBounds(current => current.previous === previous && current.next === next ? current : { previous, next });
    };
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); track.removeEventListener("scroll", update); };
  }, [scrollable, items.length]);
  function move(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  return <section id="yorumlar" className="reviews-section" aria-labelledby="reviews-title">
    <div className="reviews-eyebrow">{tr ? "GOOGLE MÜŞTERİ YORUMLARI" : "GOOGLE CUSTOMER REVIEWS"}<span aria-hidden="true" /></div>
    <h2 id="reviews-title">{tr ? "En gerçek geri dönüş, sizin deneyiminiz." : "Your experience is our most meaningful feedback."}</h2>
    <p className="reviews-intro">{tr ? "Müşterilerimizin deneyimlerini keşfedin. Kendiniz için en doğru kararı güvenle verin." : "Explore our clients’ experiences and make the right decision for yourself with confidence."}</p>
    <div className="reviews-google-link"><p>{tr ? <><strong>Google hesabımızı inceleyin,</strong> tüm yorum ve değerlendirmelere göz atın.</> : <><strong>Find us on Google</strong> and explore all reviews and ratings.</>}</p><a href={googleUrl} target="_blank" rel="noopener noreferrer">{tr ? "Google’da Gör" : "View on Google"}<span aria-hidden="true">↗</span></a></div>
    <div id="reviews-track" ref={trackRef} className={`reviews-grid ${scrollable ? "is-scrollable" : ""}`} tabIndex={scrollable ? 0 : undefined} role={scrollable ? "region" : undefined} aria-label={scrollable ? (tr ? "Kaydırılabilir müşteri yorumları" : "Scrollable customer reviews") : undefined}>
      <a className="reviews-summary" href={googleUrl} target="_blank" rel="noopener noreferrer" aria-label={tr ? "Google üzerinde İxir Güzellik işletmesini bul" : "Find İxir Güzellik on Google"}>
        <span className="summary-arrow" aria-hidden="true">↗</span><h3>{tr ? "Mükemmel" : "Excellent"}</h3><Stars /><p><strong>184</strong> {tr ? "değerlendirmeye göre" : "reviews"}</p><div className="summary-google"><GoogleMark large /><span>Google<br />{tr ? "Müşteri Yorumları" : "Customer Reviews"}</span></div>
      </a>
      {items.map((review, index) => <article className="review-card" key={`${review.name}-${index}`}>
        <header><span className="review-avatar" aria-hidden="true">{review.initial}</span><div><h3>{review.name}</h3><time dateTime="2023-07-30">30/07/2023</time></div><GoogleMark /></header>
        <Stars /><blockquote lang="tr">{review.text}</blockquote>
      </article>)}
    </div>
    {scrollable && <div className="reviews-navigation"><button type="button" onClick={() => move(-1)} disabled={!bounds.previous} aria-controls="reviews-track" aria-label={tr ? "Önceki yorumlar" : "Previous reviews"}>←</button><span>{tr ? "Diğer yorumları keşfedin" : "Explore more reviews"}</span><button type="button" onClick={() => move(1)} disabled={!bounds.next} aria-controls="reviews-track" aria-label={tr ? "Sonraki yorumlar" : "Next reviews"}>→</button></div>}
  </section>;
}
