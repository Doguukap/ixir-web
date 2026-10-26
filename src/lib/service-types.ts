export type ServiceContact = {
  contact_label: string;
  whatsapp_label: string;
  whatsapp_number: string;
};
export type Treatment = ServiceContact & {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  seo_title: string | null;
  meta_description: string | null;
  image: string | null;
  image_alt: string | null;
  photo: number;
  duration: string | null;
  sessions: string | null;
  result_title: string;
  result_text: string | null;
  information: { title: string; text: string }[] | null;
  banner_title: string | null;
  banner_text: string | null;
  banner_button_label: string;
  faqs: { question: string; answer: string }[] | null;
  pricing_title: string;
  pricing_note: string | null;
  prices: { label: string; price: string; description?: string }[] | null;
  related_service_ids: (number | string)[];
};
export type TreatmentCategory = ServiceContact & {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  photo: number;
  services: Treatment[];
};
export type ServiceCatalogSettings = ServiceContact & { title: string; description: string | null; image: string | null; photo: number };
export type ServiceCatalog = { categories: TreatmentCategory[]; settings: ServiceCatalogSettings };
export type ServiceNavigationCategory = {
  title: string;
  href: string;
  services: { title: string; href: string; summary: string | null }[];
};
export function treatmentHref(category: TreatmentCategory, service: Treatment) {
  return `/hizmetler/${category.slug}/${service.slug}`;
}
export function serviceWhatsapp(contact: ServiceContact, title: string) {
  const number = /^[1-9][0-9]{7,14}$/.test(contact.whatsapp_number) ? contact.whatsapp_number : "905396660000";
  return `https://wa.me/${number}?text=${encodeURIComponent(`Merhaba, ${title} hakkında bilgi almak istiyorum.`)}`;
}
