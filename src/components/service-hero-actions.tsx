import Link from "next/link";
import WhatsappIcon from "./whatsapp-icon";
import { serviceWhatsapp, type ServiceContact } from "@/lib/service-types";

const defaultContact: ServiceContact = { contact_label: "Bize ulaşın", whatsapp_label: "WhatsApp ile görüşün", whatsapp_number: "905396660000" };

export function ServiceHeroActions({ contact = defaultContact, title }: { contact?: ServiceContact; title: string }) {
  return <div className="treatment-actions"><Link href="/iletisim" className="treatment-button">{contact.contact_label}<span aria-hidden="true">↗</span></Link><a className="treatment-button treatment-button-whatsapp" href={serviceWhatsapp(contact, title)} target="_blank" rel="noopener noreferrer"><WhatsappIcon/>{contact.whatsapp_label}</a></div>;
}

