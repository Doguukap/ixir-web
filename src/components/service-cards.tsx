import Link from "next/link";
import Image from "next/image";
import { treatmentHref, type Treatment, type TreatmentCategory } from "@/lib/service-types";

export function ServiceImage({ image, title, photo = 4, priority = false }: { image: string | null; title: string; photo?: number; priority?: boolean }) {
  if (image) return <Image src={image} alt={title} fill unoptimized sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 33vw" priority={priority} />;
  return <svg viewBox={`${photo % 4} ${Math.floor(photo / 4)} 1 1`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={title}><image href="/images/services-atlas.png" width="4" height="2" /></svg>;
}

export function ServiceCards({ items }: { items: { category: TreatmentCategory; service: Treatment }[] }) {
  return <div className="treatment-card-grid">{items.map(({ category, service }, index) => <Link key={service.id} href={treatmentHref(category, service)} className="treatment-card">
    <div className="treatment-card-image"><ServiceImage image={service.image} title={service.image_alt || service.title} photo={service.photo} /></div>
    <span className="treatment-card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    <div className="treatment-card-copy"><span className="treatment-card-category">{category.title}</span><h3>{service.title}</h3><p>{service.summary || `${service.title} hakkında bilgi ve randevu için bizimle iletişime geçin.`}</p><span className="treatment-card-link">İşlemi keşfedin <span aria-hidden="true">↗</span></span></div>
  </Link>)}</div>;
}
