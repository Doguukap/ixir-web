import type { Metadata } from "next";
import SocialRail from "@/components/social-rail";
import { connection } from "next/server";
import { getBlogPosts } from "@/lib/blog-api";
import { BlogProvider } from "@/components/blog-provider";
import { getCampaigns } from "@/lib/campaign-api";
import { CampaignProvider } from "@/components/campaign-provider";
import "./globals.css";
import { getServiceCatalog } from "@/lib/service-catalog";
import { treatmentHref } from "@/lib/service-types";
import { ServiceNavigationProvider } from "@/components/service-navigation";

export const metadata: Metadata = {
  title: "İxir Güzellik | Güzelliğin Doğal Hâli",
  description: "Saç, cilt ve kişisel bakımda uzman dokunuşlar. İxir Güzellik ile kendinizin en iyi hâlini keşfedin.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await connection();
  const [catalog, campaigns, posts] = await Promise.all([getServiceCatalog().catch(() => ({ categories: [] })), getCampaigns(), getBlogPosts()]);
  const categories = catalog.categories.map(category => ({
    title: category.title, href: `/hizmetler/${category.slug}`,
    services: category.services.map(service => ({ title: service.title, summary: service.summary, href: treatmentHref(category, service) })),
  }));
  return <html lang="tr"><body><ServiceNavigationProvider categories={categories}><CampaignProvider campaigns={campaigns}><BlogProvider posts={posts}>{children}<SocialRail/></BlogProvider></CampaignProvider></ServiceNavigationProvider></body></html>;
}
