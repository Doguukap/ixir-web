export type BlogSummary = {
  id: number; slug: string; title: string; category: string | null; summary: string | null;
  title_en: string | null; summary_en: string | null; image: string | null; photo: number;
};
export type BlogHeading = { id: string; title: string };
export type BlogDetail = BlogSummary & { content_html: string; headings: BlogHeading[] };
