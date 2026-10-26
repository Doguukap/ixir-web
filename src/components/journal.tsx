"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useBlogPosts } from "./blog-provider";
import { useCampaigns } from "./campaign-provider";

export function Campaigns({ language }: { language: "tr" | "en" }) {
  const tr = language === "tr";
  const [selected, setSelected] = useState(0);
  const offers = useCampaigns().map(offer => ({ id: offer.slug, name: !tr && offer.title_en ? offer.title_en : offer.title, description: !tr && offer.summary_en ? offer.summary_en : offer.summary, photo: offer.photo, image: offer.image }));
  if (!offers.length) return null;
  const selectedIndex = selected % offers.length;
  const move = (direction: number) => setSelected(current => (current + direction + offers.length) % offers.length);
  return <section id="kampanyalar" className="campaign-carousel-section" aria-labelledby="campaigns-title">
    <header className="campaign-carousel-heading"><h2 id="campaigns-title">{tr ? "Kampanyalar" : "Offers"}</h2><p>{tr ? "Güncel paketler ve uygulamalar." : "Current packages and treatments."}</p></header>
    <div className="campaign-carousel" role="region" aria-roledescription={tr ? "kart vitrini" : "carousel"} aria-label={tr ? "Kampanyalar" : "Offers"} onKeyDown={event => {
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    }}>
      {offers.map((offer, index) => {
        const distance = (index - selectedIndex + offers.length) % offers.length;
        const offset = distance > offers.length / 2 ? distance - offers.length : distance;
        const active = offset === 0;
        return <article id={offer.id} className={`campaign-slide ${active ? "is-current" : ""}`} data-position={offset} hidden={Math.abs(offset) > 2} key={offer.id}>
          {offer.image ? <Image className="campaign-slide-photo" src={offer.image} alt="" fill unoptimized sizes="(max-width:700px) 64vw, 30vw"/> : <svg className="campaign-slide-photo" viewBox={`${offer.photo % 4} ${Math.floor(offer.photo / 4)} 1 1`} preserveAspectRatio="xMidYMid slice" aria-hidden="true"><image href="/images/services-atlas.png" width="4" height="2" /></svg>}
          <div className="campaign-slide-shade" />
          <button className="campaign-slide-select" type="button" aria-label={`${offer.name} — ${tr ? "kampanyayı göster" : "show offer"}`} aria-pressed={active} onClick={() => setSelected(index)} />
          <div className="campaign-slide-copy"><span className="campaign-slide-label">İXİR GÜZELLİK</span><h3>{offer.name}</h3><div className="campaign-slide-details" aria-hidden={!active}><p>{offer.description}</p><Link href={`/kampanyalar/${offer.id}`} tabIndex={active ? 0 : -1}>{tr ? "Kampanyayı incele" : "View offer"}<span aria-hidden="true">↗</span></Link></div></div>
        </article>;
      })}
    </div>
    <div className="campaign-carousel-controls"><button type="button" onClick={() => move(-1)} aria-label={tr ? "Önceki kampanya" : "Previous offer"}>←</button><div className="campaign-carousel-dots">{offers.map((offer, index) => <button key={offer.id} type="button" className={selectedIndex === index ? "is-current" : ""} onClick={() => setSelected(index)} aria-label={offer.name} aria-pressed={selectedIndex === index} />)}</div><button type="button" onClick={() => move(1)} aria-label={tr ? "Sonraki kampanya" : "Next offer"}>→</button></div>
    <p className="sr-only" aria-live="polite" aria-atomic="true">{offers[selectedIndex].name} — {selectedIndex + 1} / {offers.length}</p>
  </section>;
}

export function Blog({ language }: { language: "tr" | "en" }) {
  const tr = language === "tr";
  const posts = useBlogPosts();
  if (!posts.length) return null;
  return <section id="blog" className="blog-section" aria-labelledby="blog-title">
    <header className="editorial-section-heading"><div><p>{tr ? "İXİR’DEN NOTLAR" : "NOTES FROM İXİR"}</p><h2 id="blog-title">{tr ? "Güzelliğe dair." : "All about beauty."}</h2></div><Link href="/blog" className="journal-all">{tr ? "TÜM YAZILAR" : "ALL STORIES"}<span aria-hidden="true">↗</span></Link></header>
    <div className="blog-grid">{posts.map(post => <article className="blog-card" key={post.id} id={`blog-${post.slug}`}><Link className="blog-photo" href={`/blog/${post.slug}`} aria-label={post.title}>{post.image ? <Image src={post.image} alt="" fill unoptimized sizes="(max-width:700px) 88vw, 30vw"/> : <svg viewBox={`${post.photo % 4} ${Math.floor(post.photo / 4)} 1 1`} preserveAspectRatio="xMidYMid slice" aria-hidden="true"><image href="/images/services-atlas.png" width="4" height="2"/></svg>}<span aria-hidden="true">↗</span></Link><p className="blog-category">{post.category}</p><h3><Link href={`/blog/${post.slug}`}>{!tr && post.title_en ? post.title_en : post.title}</Link></h3><p className="blog-card-summary">{!tr && post.summary_en ? post.summary_en : post.summary}</p><Link className="blog-card-read" href={`/blog/${post.slug}`}>{tr ? "Yazıyı oku" : "Read story"}<span aria-hidden="true">↗</span></Link></article>)}</div>
  </section>;
}
