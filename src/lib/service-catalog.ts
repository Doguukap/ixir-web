import "server-only";
import importedContent from "./data/service-content.json";
import { cache } from "react";
import { connection } from "next/server";
import { serviceCategories, slugify } from "./site-content";
import type { ServiceCatalog, Treatment, TreatmentCategory } from "./service-types";

const serviceCopy = new Map(importedContent.services.map(service => [service.slug, service.content]));

const contact = { contact_label: "Bize ulaşın", whatsapp_label: "WhatsApp ile görüşün", whatsapp_number: "905396660000" };

// Keep the existing routes usable during initial local database setup.
// A successful API response, including an empty catalog, is always authoritative.
function initialCatalog(): ServiceCatalog {
  let id = 0;
  return { settings: { ...contact, title: "Size özel bakım.", description: "Güzellik ve bakım yolculuğunuzda, ihtiyacınıza uygun uygulamayı birlikte keşfedelim.", image: null, photo: 4 }, categories: serviceCategories.map((category, index): TreatmentCategory => ({
    ...contact, id: index + 1, title: category.title, slug: slugify(category.title),
    description: "İhtiyaçlarınıza uygun uygulamaları keşfedin.", image: null, photo: [4, 7, 3, 2, 5][index],
    services: category.services.map((title): Treatment => ({
      ...contact, id: ++id, title, slug: slugify(title), summary: null, seo_title: null, meta_description: null, image: null, image_alt: null,
      photo: [4, 7, 3, 2, 5][index], duration: null, sessions: null, result_title: "Kaliteli sonuç", result_text: null,
      information: [], banner_title: "Bakımınıza ilk adımı birlikte atalım.", banner_text: null, banner_button_label: "Size özel planı konuşalım",
      faqs: [], pricing_title: "Size özel fiyatlandırma", pricing_note: null, prices: [], related_service_ids: [],
      ...serviceCopy.get(slugify(title)),
    })),
  })) };
}

export const getServiceCatalog = cache(async (): Promise<ServiceCatalog> => {
  await connection();
  const base = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/service-catalog`, {
      cache: "no-store", signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`Catalog API returned ${response.status}`);
    const data: ServiceCatalog = await response.json();
    if (!Array.isArray(data.categories)) throw new Error("Invalid service catalog response");
    return data;
  } catch (error) {
    console.error("Hizmet kataloğuna erişilemedi.", error instanceof Error ? error.message : "Bağlantı hatası");
    // Production must never resurrect unpublished or deleted services on an API failure.
    if (process.env.NODE_ENV === "production") throw error;
    return initialCatalog();
  }
});
