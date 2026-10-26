import SiteHeader from "./site-header";
import Footer from "./footer";
import { ServiceHeroActions } from "./service-hero-actions";
import ReferenceGallery from "./reference-gallery";
import { getReferenceImages } from "@/lib/reference-images";

export default async function ReferencesPage() {
  const images = await getReferenceImages();
  return <><SiteHeader/><main className="references-page"><div className="references-shell"><header className="references-heading"><div><h1>Referanslar</h1><p>Deneyiminiz bizim için değerli.</p></div><ServiceHeroActions title="İxir Güzellik referansları"/></header><ReferenceGallery images={images}/></div></main><Footer language="tr"/></>;
}
