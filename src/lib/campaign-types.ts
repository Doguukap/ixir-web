export type CampaignSummary = {
  id: number; slug: string; title: string; summary: string | null;
  title_en: string | null; summary_en: string | null; image: string | null; photo: number;
};
export type CampaignDetail = CampaignSummary & { content_html: string };
