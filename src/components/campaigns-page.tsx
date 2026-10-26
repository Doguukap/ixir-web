import Link from "next/link";
import SiteHeader from "./site-header";
import Footer from "./footer";
import CampaignNewsletter from "./campaign-newsletter";
import { ServiceImage } from "./service-cards";
import { getCampaigns } from "@/lib/campaign-api";

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();
  return <><SiteHeader/><main className="campaigns-page"><div className="campaigns-page-shell">
    <header className="campaigns-page-heading"><h1>Kampanyalar</h1></header>
    <section className="campaigns-page-grid" aria-label="Kampanyalar">{campaigns.map(offer => <article className="campaign-offer-card" key={offer.id} id={offer.slug}><Link className="campaign-offer-link" href={`/kampanyalar/${offer.slug}`}>
      <div className="campaign-offer-visual"><ServiceImage image={offer.image} title={offer.title} photo={offer.photo}/><span className="campaign-offer-badge"><span aria-hidden="true">✦</span> KAMPANYA</span></div>
      <div className="campaign-offer-content"><h2>{offer.title}</h2>{offer.summary && <p>{offer.summary}</p>}<span className="campaign-offer-detail-link">Kampanyayı incele <span aria-hidden="true">↗</span></span></div>
    </Link></article>)}</section>{campaigns.length === 0 && <p className="treatment-empty">Güncel kampanyalarımız yakında burada.</p>}
    <CampaignNewsletter/>
  </div></main><Footer language="tr"/></>;
}
