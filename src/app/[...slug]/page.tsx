import type { Metadata } from "next";
import { getBlogPost } from "@/lib/blog-api";
import BlogDetailPage from "@/components/blog-detail-page";
import { getCampaign } from "@/lib/campaign-api";
import CampaignDetailPage from "@/components/campaign-detail-page";
import { notFound } from "next/navigation";
import DetailPage from "@/components/detail-page";
import { ServiceListingPage, TreatmentDetailPage } from "@/components/service-pages";
import { getServiceCatalog } from "@/lib/service-catalog";
import { sitePages } from "@/lib/site-content";

async function resolvePage(slug: string[]) {
  if (slug[0] === "blog" && slug.length > 1) {
    if (slug.length !== 2) return {};
    const post = await getBlogPost(slug[1]);
    return post ? { post } : {};
  }
  if (slug[0] === "kampanyalar" && slug.length > 1) {
    if (slug.length !== 2) return {};
    const campaign = await getCampaign(slug[1]);
    return campaign ? { campaign } : {};
  }
  if (slug[0] !== "hizmetler") return { page: sitePages.find(page => page.path === slug.join("/")) };
  const catalog = await getServiceCatalog();
  if (slug.length === 1) return { catalog };
  const category = catalog.categories.find(category => category.slug === slug[1]);
  if (!category || slug.length > 3) return {};
  if (slug.length === 2) return { catalog, category };
  const service = category.services.find(service => service.slug === slug[2]);
  return service ? { catalog, category, service } : {};
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const result = await resolvePage(slug);
  const title = result.post?.title ?? result.campaign?.title ?? result.service?.title ?? result.category?.title ?? result.page?.title ?? (result.catalog ? result.catalog.settings.title : "Sayfa bulunamadı");
  return { title: result.service?.seo_title || `${title} | İxir Güzellik`, description: result.service?.meta_description ?? result.post?.summary ?? result.campaign?.summary ?? result.service?.summary ?? result.category?.description ?? result.page?.description ?? undefined };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const { page, catalog, category, service, campaign, post } = await resolvePage(slug);
  if (post) return <BlogDetailPage post={post}/>;
  if (campaign) return <CampaignDetailPage campaign={campaign}/>;
  if (catalog && category && service) return <TreatmentDetailPage catalog={catalog} category={category} service={service}/>;
  if (catalog) return <ServiceListingPage catalog={catalog} category={category}/>;
  if (!page) notFound();
  return <DetailPage page={page}/>;
}
