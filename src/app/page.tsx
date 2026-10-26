"use client";

import HeroVideo from "@/components/hero-video";
import { aboutParagraphs } from "@/lib/about-content";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import Services from "@/components/services";
import Founder from "@/components/founder";
import Opportunities from "@/components/opportunities";
import WhyIxir from "@/components/why-ixir";
import Reviews from "@/components/reviews";
import Pricing from "@/components/pricing";
import { Campaigns, Blog } from "@/components/journal";
import Footer from "@/components/footer";
import ScrollAbout from "@/components/scroll-about";
import { contactUrl } from "@/lib/contact";
import { useRef, useState } from "react";

const content = {
  tr: {
    nav: ["HİZMETLERİMİZ", "HAKKIMIZDA", "KAMPANYALAR", "İLETİŞİM"],
    eyebrow: "SADECE DAHA GÜZEL BİR SEN",
    title: "GÜZELLİĞİN", emphasis: "DOĞAL HÂLİ",
    description: "Saç, cilt ve kişisel bakımda uzman dokunuşlar.",
    descriptionSecond: "İxir Güzellik ile kendinizin en iyi hâlini keşfedin.",
    appointment: "RANDEVU AL", scroll: "AŞAĞI KAYDIRIN",
    services: "Saç, cilt ve kişisel bakım", about: "Güzelliğinize doğal bir dokunuş.",
    gallery: "Güzelliğin her hâli.", contact: "Randevu ve iletişim",
    contactText: "Randevu ve iletişim bilgileri yakında burada paylaşılacak.",
  },
  en: {
    nav: ["OUR SERVICES", "ABOUT US", "OFFERS", "CONTACT"],
    eyebrow: "SIMPLY A MORE BEAUTIFUL YOU",
    title: "BEAUTY IN ITS", emphasis: "NATURAL FORM",
    description: "Expert care for your hair, skin and personal well-being.",
    descriptionSecond: "Discover your best self with İxir Güzellik.",
    appointment: "BOOK A VISIT", scroll: "SCROLL DOWN",
    services: "Hair, skin & personal care", about: "A natural touch to your beauty.",
    gallery: "Every expression of beauty.", contact: "Appointments & contact",
    contactText: "Appointment and contact details will be shared here soon.",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<"tr" | "en">("tr");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const copy = content[language];
  const aboutCopy = language === "tr" ? {
    title: "Güzelliğe", emphasis: "Zarif Bir Dokunuş",
    text: aboutParagraphs.join("\n\n"),
    more: "DAHA FAZLA", play: "Tanıtım önizlemesini oynat", video: "TANITIM FİLMİ",
  } : {
    title: "An Elegant", emphasis: "Touch of Beauty",
    text: "At İXİR Güzellik, our expertise in hair, beauty and personal care helps everyone embrace their own beauty with confidence. With modern techniques, quality products and individually tailored care, we create natural, healthy and elegant results — and a salon experience that leaves you feeling your best.",
    more: "DISCOVER MORE", play: "Play introduction preview", video: "BRAND FILM",
  };

  async function playVideo() {
    if (!videoRef.current) return;
    try {
      await videoRef.current.play();
      setVideoPlaying(true);
    } catch {
      setVideoPlaying(false);
    }
  }

  function changeLanguage(value: "tr" | "en") {
    setLanguage(value);
    document.documentElement.lang = value;
  }

  return (
    <main>
      <section id="anasayfa" className="hero" aria-labelledby="hero-title">
        <HeroVideo/>
        <div className="hero-shade" />
        <SiteHeader language={language} onLanguageChange={changeLanguage} home />
        <div className="hero-content">
          <p className="eyebrow">{copy.eyebrow}<span aria-hidden="true" /></p>
          <h1 id="hero-title"><span>{copy.title}</span><strong>{copy.emphasis}</strong></h1>
          <p className="hero-description">{copy.description}<br />{copy.descriptionSecond}</p>
          <div className="treatment-actions"><a className="treatment-button" href={contactUrl(language === "tr" ? "Randevu" : "Appointment", language)} target="_blank" rel="noopener noreferrer">{language === "tr" ? "Randevu Al" : "Book an Appointment"}<span aria-hidden="true">↗</span></a></div>
        </div>
        <a className="scroll-cue" href="#hakkimizda"><span aria-hidden="true" />{copy.scroll}</a>
      </section>
      <ScrollAbout>
      <div className="about-section">
        <div className="about-content">
          <p className="about-eyebrow">{copy.nav[1]}<span aria-hidden="true" /></p>
          <h2 id="about-title">{aboutCopy.title}<br /><strong>{aboutCopy.emphasis}</strong></h2>
          <p className="about-description about-description-full" style={{ whiteSpace: "pre-line" }}>{aboutCopy.text}</p>
          <p className="about-description about-description-mobile">{language === "tr" ? "2005 yılında Gaziantep’te İbrahim Akçay tarafından kurulan İxir Güzellik; uzman ekibiyle güzellik ve kişisel bakım hizmetleri sunar." : "Founded in Gaziantep in 2005 by İbrahim Akçay, İxir Güzellik offers beauty and personal care services with an experienced team."}</p>
          <Link className="about-more" href="/kurumsal/hakkimizda">{aboutCopy.more}<svg width="28" height="18" viewBox="0 0 28 18" fill="none" aria-hidden="true"><path d="M1 9h25M20 3l6 6-6 6" stroke="currentColor" /></svg></Link>
        </div>
        <div className={`about-video ${videoPlaying ? "is-playing" : ""}`}>
          <video ref={videoRef} className="about-video-player" poster="/images/ixirhero-bg.png" preload="none" playsInline loop controls={videoPlaying} onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)} aria-label={aboutCopy.play}>
            <source src="/videos/ixir-preview.mp4" type="video/mp4" />
          </video>
          {!videoPlaying && <button className="video-play" type="button" onClick={playVideo} aria-label={aboutCopy.play}><svg width="30" height="36" viewBox="0 0 30 36" fill="none" aria-hidden="true"><path d="M4 2L28 18L4 34V2Z" fill="currentColor" /></svg></button>}
          <span className="video-caption">{aboutCopy.video}<span>İXİR GÜZELLİK</span></span>
        </div>
      </div>
      </ScrollAbout>
      <Services language={language} />
      <Founder language={language} />
      <Opportunities language={language} />
      <WhyIxir language={language} />
      <Reviews language={language} />
      <Pricing language={language} />
      <Campaigns language={language} />
      <Blog language={language} />
      <Footer language={language} />
    </main>
  );
}
