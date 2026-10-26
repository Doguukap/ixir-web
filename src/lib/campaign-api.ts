import "server-only";
import { cache } from "react";
import { campaignOffers } from "./campaigns";
import type { CampaignSummary, CampaignDetail } from "./campaign-types";

function initialCampaigns(): CampaignSummary[] {
  return campaignOffers.map((offer, index) => ({ id: index + 1, slug: offer.id, title: offer.title, summary: offer.description, title_en: offer.titleEn, summary_en: offer.descriptionEn, image: null, photo: offer.photo }));
}
const apiBase = () => (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api").replace(/\/$/, "");
export const getCampaigns = cache(async (): Promise<CampaignSummary[]> => {
  try {
    const response = await fetch(`${apiBase()}/campaigns`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`Campaign API returned ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.campaigns)) throw new Error("Invalid campaign list");
    return data.campaigns;
  } catch (error) {
    console.error("Kampanyalara erişilemedi.", error instanceof Error ? error.message : "Bağlantı hatası");
    return process.env.NODE_ENV === "development" ? initialCampaigns() : [];
  }
});
export const getCampaign = cache(async (slug: string): Promise<CampaignDetail | null> => {
  try {
    const response = await fetch(`${apiBase()}/campaigns/${encodeURIComponent(slug)}`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Campaign API returned ${response.status}`);
    const data = await response.json();
    return data.campaign;
  } catch (error) {
    if (process.env.NODE_ENV !== "development") throw error;
    const campaign = initialCampaigns().find(item => item.slug === slug);
    if (!campaign) return null;
    // Local fallback contains only the existing plain-text summaries.
    const text = (campaign.summary ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    return { ...campaign, content_html: `<p>${text}</p>` };
  }
});
