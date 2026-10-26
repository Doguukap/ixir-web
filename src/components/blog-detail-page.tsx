import Link from "next/link";
import SiteHeader from "./site-header";
import Footer from "./footer";
import { ServiceImage } from "./service-cards";
import BlogArticleContent from "./blog-article-content";
import type { BlogDetail } from "@/lib/blog-types";

export default function BlogDetailPage({ post }: { post: BlogDetail }) {
  return <><SiteHeader/><main className="blog-detail-page"><article className="blog-detail-shell">
    <div className="blog-detail-cover"><ServiceImage image={post.image} title={post.title} photo={post.photo} priority/></div>
    <header className="blog-detail-heading"><h1>{post.title}</h1></header>
    <BlogArticleContent html={post.content_html} headings={post.headings}/>
    <Link className="detail-back-link" href="/blog">← Tüm yazılar</Link>
  </article></main><Footer language="tr" showWhatsapp={false}/></>;
}
