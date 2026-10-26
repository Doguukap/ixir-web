"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";

export default function Founder({ language }: { language: "tr" | "en" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const maskId = useId();
  const tr = language === "tr";
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        section.dataset.visible = "true";
        observer.disconnect();
      }
    }, { threshold: .3 });
    const signature = section.querySelector(".founder-signature");
    if (signature) observer.observe(signature);
    return () => observer.disconnect();
  }, []);

  return <section className="founder-section" id="ibrahim-akcay" ref={sectionRef} aria-labelledby="founder-title">
    <div className="founder-topline"><span>İBRAHİM AKÇAY</span><span className="founder-rule" /><span>BEAUTY / EXPERTISE / TRUST</span></div>
    <header className="founder-heading">
      <h2 id="founder-title"><span>İBRAHİM AKÇAY</span><span>{tr ? "KİMDİR ?" : "WHO IS HE?"}</span></h2>
      <p>{tr ? "GÜZELLİK KOÇU" : "BEAUTY COACH"}<br />{tr ? "UZMAN ESTETİSYEN" : "EXPERT AESTHETICIAN"}</p>
    </header>
    <div className="founder-layout">
      <figure className="founder-certificate">
        <Image src="/images/ibrahim-akcay-certificate.png" alt={tr ? "İbrahim Akçay, uzmanlık eğitimi sonunda sertifikasıyla" : "İbrahim Akçay with his training certificate"} fill sizes="(max-width: 700px) 90vw, 51vw" quality={90} />
        <figcaption><span>{tr ? <>EĞİTİM<br />DENEYİM<br />UZMANLIK<br />GÜVEN</> : <>EDUCATION<br />EXPERIENCE<br />EXPERTISE<br />TRUST</>}</span><span>{tr ? <>PROFESYONEL<br />GÜZELLİK<br />YOLCULUĞU</> : <>A PROFESSIONAL<br />JOURNEY<br />IN BEAUTY</>}</span></figcaption>
        <span className="certificate-line" aria-hidden="true" />
      </figure>
      <div className="founder-right">
        <figure className="founder-treatment">
          <div className="founder-treatment-photo"><Image src="/images/ibrahim-akcay-treatment.png" alt={tr ? "İbrahim Akçay kişiye özel kaş uygulaması yaparken" : "İbrahim Akçay performing a personalised eyebrow treatment"} fill sizes="(max-width: 700px) 78vw, 39vw" quality={90} /></div>
          <figcaption><span aria-hidden="true" />{tr ? <>KİŞİYE ÖZEL<br />UYGULAMALAR<br />SAĞLIKLI<br />DOĞAL<br />SONUÇLAR</> : <>PERSONALISED<br />TREATMENTS<br />HEALTHY<br />NATURAL<br />RESULTS</>}</figcaption>
        </figure>
        <div className="founder-biography">
          <div className="founder-text">
            <p>{tr ? "İbrahim Akçay 1987 Gaziantep doğumlu Türkiye genelinde Ulusal bir üne sahip olan uzman estetisyendir. Mesleğe çok genç yaşlarda başlayan Akçay, meslek hayatı boyunca 100'den fazla eğitim almış ve Gaziantep'in usta öğretici belgeli ilk ve tek Usta Öğretici estetisyeni olmuştur. Mesleğe giriş yılı 1993 olan İbrahim Akçay, 2000 yılında kendi markası olan İxir Güzellik'i kurmuştur. Estetisyenliğin yanı sıra YouTube ve sosyal medya kanalları üzerinden ücretsiz olarak Güzellik Koçu hizmetleri vermektedir." : "Born in Gaziantep in 1987, İbrahim Akçay is an expert aesthetician with a nationwide reputation in Türkiye. Starting his career at a very young age, he has completed more than 100 training courses and became Gaziantep's first and only aesthetician to hold a master instructor certificate. Having entered the profession in 1993, he founded his own brand, İxir Güzellik, in 2000. Alongside his aesthetic practice, he offers free beauty coaching through YouTube and social media."}</p>
            <div className="founder-signature">
              <svg viewBox="40 320 1370 540" role="img" aria-label="İbrahim Akçay imzası">
                <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1448" height="1086">
                  <g fill="none" stroke="white" strokeWidth="125" strokeLinecap="round" strokeLinejoin="round">
                    <path className="signature-stroke signature-stroke-one" pathLength="1" d="M146 591 C25 600 70 462 167 540 L233 620 L404 351 L241 524" />
                    <path className="signature-stroke signature-stroke-two" pathLength="1" d="M366 586 L369 587 M497 592 L718 431 L657 593 L550 557 M689 569 L900 379 L746 551 L831 511 C911 493 798 590 766 590 L966 508 C1015 500 924 569 925 575 L1121 512 L1054 579 L1121 566 L1212 515 L1144 593 L1291 512" />
                    <path className="signature-stroke signature-stroke-three" pathLength="1" d="M1291 513 C1232 642 1112 819 1050 813 C974 790 1150 611 1379 581" />
                  </g>
                  <rect className="signature-finish" width="1448" height="1086" fill="white" />
                </mask></defs>
                <image href="/images/ibrahim-akcay-signature.png" width="1448" height="1086" mask={`url(#${maskId})`} />
              </svg>
              <span aria-hidden="true" />
            </div>
          </div>
          <aside className="founder-values"><span aria-hidden="true" />{(tr ? ["DENEYİM", "EĞİTİM", "UZMANLIK", "KİŞİYE ÖZEL BAKIM", "DOĞAL SONUÇLAR"] : ["EXPERIENCE", "EDUCATION", "EXPERTISE", "PERSONALISED CARE", "NATURAL RESULTS"]).map(value => <span key={value}>{value}</span>)}</aside>
        </div>
      </div>
    </div>
  </section>;
}
