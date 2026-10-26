import SiteHeader from "./site-header";
import Footer from "./footer";
import CertificateGallery from "./certificate-gallery";
import { getCertificates } from "@/lib/certificates";

export default async function CertificatesPage() {
  const certificates = await getCertificates();
  return <><SiteHeader/><main className="certificates-page"><div className="certificates-shell"><header className="certificates-heading"><h1>Sertifikalarımız</h1></header><CertificateGallery certificates={certificates}/></div></main><Footer language="tr" showWhatsapp={false}/></>;
}
