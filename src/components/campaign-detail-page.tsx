import Link from "next/link";
import SiteHeader from "./site-header";
import Footer from "./footer";
import { ServiceImage } from "./service-cards";
import { ServiceHeroActions } from "./service-hero-actions";
import type { CampaignDetail } from "@/lib/campaign-types";

export default function CampaignDetailPage({ campaign }: { campaign: CampaignDetail }) {
  return <><SiteHeader/><main className="campaign-detail-page"><article className="campaign-detail-shell"><nav className="treatment-breadcrumb" aria-label="Sayfa yolu"><Link href="/">Anasayfa</Link><span>/</span><Link href="/kampanyalar">Kampanyalar</Link><span>/</span><span aria-current="page">{campaign.title}</span></nav>
    <header className="campaign-detail-heading"><p className="treatment-eyebrow">KAMPANYA</p><h1>{campaign.title}</h1>{campaign.summary && <p>{campaign.summary}</p>}</header>
    <div className="campaign-detail-cover"><ServiceImage image={campaign.image} title={campaign.title} photo={campaign.photo} priority/></div>
    {/* HTML is sanitized by Filament's RichContentRenderer in the backend API. */}
    <div className="campaign-rich-content" dangerouslySetInnerHTML={{ __html: campaign.content_html }}/>
    <aside className="campaign-detail-contact"><h2>Kampanya hakkında bilgi alın.</h2><ServiceHeroActions title={`${campaign.title} kampanyası`}/></aside><Link className="detail-back-link" href="/kampanyalar">← Tüm kampanyalar</Link>
  </article></main><Footer language="tr"/></>;
}
