import Link from "next/link";
import SiteHeader from "./site-header";
import Footer from "./footer";
import { ServiceImage } from "./service-cards";
import { getBlogPosts } from "@/lib/blog-api";

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <><SiteHeader/><main className="blog-listing-page"><div className="blog-listing-shell">
    <header className="blog-listing-heading"><h1>Blog</h1></header>
    <section className="blog-listing-grid" aria-label="Blog yazıları">{posts.map(post => <article className="blog-listing-card" key={post.id}>
      <Link href={`/blog/${post.slug}`} className="blog-listing-link"><div className="blog-listing-photo"><ServiceImage image={post.image} title={post.title} photo={post.photo}/></div>
        <div className="blog-listing-copy">{post.category && <p className="blog-listing-category">{post.category}</p>}<h2>{post.title}</h2>{post.summary && <p className="blog-listing-excerpt">{post.summary}</p>}<span className="blog-listing-read">Yazıyı oku <span aria-hidden="true">↗</span></span></div>
      </Link>
    </article>)}</section>{!posts.length && <p className="treatment-empty">Blog yazılarımız yakında burada.</p>}
  </div></main><Footer language="tr" showWhatsapp={false}/></>;
}
