import Link from "next/link";
import SiteHeader from "./site-header";
import Footer from "./footer";
import { ServiceHeroActions } from "./service-hero-actions";
import AcademyApplicationForm from "./academy-application-form";
import AcademyScrollJourney from "./academy-scroll-journey";
import { academyIntroduction } from "@/lib/academy-content";

export default function AcademyPage() {
  return <><SiteHeader/><main className="detail-page academy-page"><AcademyScrollJourney>
    <header className="academy-intro">
      <nav className="treatment-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Anasayfa</Link><span>/</span><span aria-current="page">Akademi</span></nav>
      <div className="academy-intro-copy"><p className="treatment-eyebrow">İXİR AKADEMİ</p><h1>Akademi</h1><p className="academy-introduction">{academyIntroduction}</p><ServiceHeroActions title="İxir Akademi eğitimleri"/><a className="academy-form-cue" href="#akademi-basvuru">Başvuru formuna ilerleyin <span aria-hidden="true">↓</span></a></div>
    </header>
    <div className="academy-journey-passage" aria-hidden="true"><span/><p>BİLGİDEN UZMANLIĞA.</p></div>
    <div className="academy-form-destination" data-academy-form><AcademyApplicationForm/></div>
  </AcademyScrollJourney></main><Footer language="tr"/></>;
}
