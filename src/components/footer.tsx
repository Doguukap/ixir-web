"use client";

import { SocialIcon } from "./social-rail";
import { socialLinks } from "@/lib/social-links";
import WhatsappIcon from "./whatsapp-icon";
import BrandLogo from "./brand-logo";
import Link from "next/link";
import { useBlogPosts } from "./blog-provider";

const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Sar%C4%B1g%C3%BCll%C3%BCk+Z%C3%BCbeyde+Han%C4%B1m+Blv+54%2FB+Gaziantep";
const whatsappUrl = "https://wa.me/905396660000";
function ContactIcon({ kind }: { kind: "pin" | "phone" | "mail" | "whatsapp" }) {
  if (kind === "whatsapp") return <WhatsappIcon/>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{kind === "pin" ? <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></> : kind === "mail" ? <><rect x="2" y="4" width="20" height="16" rx="1" /><path d="m3 5 9 8 9-8" /></> : <path d="M5 3h4l1 5-2 2a15 15 0 0 0 6 6l2-2 5 1v4c0 1-1 2-2 2C10 21 3 14 3 5c0-1 1-2 2-2Z" />}</svg>;
}
export default function Footer({ language, showWhatsapp = true }: { language: "tr" | "en"; showWhatsapp?: boolean }) {
  const tr = language === "tr";
  const posts = useBlogPosts();
  const menu = [
    [tr ? "Anasayfa" : "Home", "/"], [tr ? "Kurumsal" : "About us", "/kurumsal/hakkimizda"], [tr ? "Hizmetlerimiz" : "Services", "/hizmetler"], [tr ? "Referanslarımız" : "Testimonials", "/referanslar"], [tr ? "Kampanyalar" : "Campaigns", "/kampanyalar"], [tr ? "Fiyat Listesi" : "Price List", "/fiyat-listesi"], ["Blog", "/blog"], [tr ? "Akademi" : "Academy", "/akademi"], ["Franchising", "/franchising"], [tr ? "İletişim" : "Contact", "/iletisim"],
  ];
  return <footer className="site-footer">
    <div className="footer-top"><Link href="/" className="footer-brand" aria-label="İxir Güzellik — Anasayfa"><BrandLogo sizes="(max-width:700px) 80px, 105px"/></Link><div className="footer-social"><p>{tr ? "Sosyal Medya’da İXİR" : "İXİR on Social Media"}</p>{socialLinks.map(link => <a key={link.kind} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`İxir Güzellik ${link.name}`}><SocialIcon kind={link.kind}/></a>)}</div></div>
    <div className="footer-columns">
      <nav aria-label={tr ? "Hızlı menü" : "Quick links"}><h2>{tr ? "Hızlı Menü" : "Quick Links"}</h2><ul>{menu.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>
      <nav aria-label={tr ? "Hizmetler" : "Services"}><h2>{tr ? "Hizmetler" : "Services"}</h2><ul>{(tr ? ["Saç Simülasyonu", "Lazer Epilasyon", "Cilt Bakımı", "Tırnak Bakımı"] : ["Scalp Micropigmentation", "Laser Hair Removal", "Skin Care", "Nail Care"]).map(label => <li key={label}><Link href="/hizmetler">{label}</Link></li>)}</ul></nav>
      <nav aria-label={tr ? "Kampanyalar" : "Campaigns"}><h2>{tr ? "Kampanyalar" : "Campaigns"}</h2><ul><li><Link href="/kampanyalar#kampanya-guzellik">{tr ? "Güzellik & Bakım" : "Beauty & Care"}</Link></li><li><Link href="/kampanyalar#kampanya-cilt">{tr ? "Cilt Bakımı" : "Skin Care"}</Link></li><li><Link href="/kampanyalar#kampanya-vucut">{tr ? "Vücut & Kişisel Bakım" : "Body & Personal Care"}</Link></li></ul></nav>
      <nav aria-label="Blog"><h2>Blog</h2><ul className="footer-blog-links">{posts.map(post => <li key={post.id}><Link href={`/blog/${post.slug}`}>{!tr && post.title_en ? post.title_en : post.title}</Link></li>)}</ul></nav>
      <div id="iletisim" className="footer-contact"><h2>{tr ? "Bize Ulaşın" : "Contact Us"}</h2><address><Link href={mapsUrl} target="_blank" rel="noopener noreferrer"><ContactIcon kind="pin" /><span>Sarıgüllük, Zübeyde Hanım Blv.<br />No:54/B, 27000<br />Şehitkamil/Gaziantep</span></Link><Link href="tel:+905396660000"><ContactIcon kind="phone" /><span>+90 539 666 00 00</span></Link>{showWhatsapp&&<Link href={whatsappUrl} target="_blank" rel="noopener noreferrer"><ContactIcon kind="whatsapp" /><span>+90 539 666 00 00</span></Link>}<Link href="mailto:info@ixirguzellik.com"><ContactIcon kind="mail" /><span>info@ixirguzellik.com</span></Link></address></div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} İXİR Güzellik. {tr ? "Tüm hakları saklıdır." : "All rights reserved."}</p><Link href="/">{tr ? "YUKARI DÖN" : "BACK TO TOP"}<span aria-hidden="true">↑</span></Link></div>
    {showWhatsapp&&<Link className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={tr ? "WhatsApp üzerinden iletişime geçin" : "Contact us on WhatsApp"}><ContactIcon kind="whatsapp" /></Link>}
  </footer>;
}
