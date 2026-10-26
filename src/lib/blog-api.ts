import "server-only";
import { cache } from "react";
import { articles } from "./articles";
import type { BlogSummary, BlogDetail } from "./blog-types";

function initialPosts(): BlogSummary[] {
  return articles.map((article, index) => ({ id: index + 1, slug: article.id, title: article.tr, category: article.category, summary: article.text, title_en: article.en, summary_en: article.textEn, image: null, photo: article.position + 4 }));
}
const apiBase = () => (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api").replace(/\/$/, "");
export const getBlogPosts = cache(async (): Promise<BlogSummary[]> => {
  try {
    const response = await fetch(`${apiBase()}/blog-posts`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`Blog API returned ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.posts)) throw new Error("Invalid blog list");
    return data.posts;
  } catch (error) {
    console.error("Blog yazılarına erişilemedi.", error instanceof Error ? error.message : "Bağlantı hatası");
    return process.env.NODE_ENV === "development" ? initialPosts() : [];
  }
});
export const getBlogPost = cache(async (slug: string): Promise<BlogDetail | null> => {
  try {
    const response = await fetch(`${apiBase()}/blog-posts/${encodeURIComponent(slug)}`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Blog API returned ${response.status}`);
    const data = await response.json();
    return data.post;
  } catch (error) {
    if (process.env.NODE_ENV !== "development") throw error;
    const post = initialPosts().find(item => item.slug === slug);
    if (!post) return null;
    const text = (post.summary ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    return { ...post, content_html: `<p>${text}</p>`, headings: [] };
  }
});
