"use client";

import { createContext, useContext } from "react";
import type { BlogSummary } from "@/lib/blog-types";

const BlogContext = createContext<BlogSummary[]>([]);
export function BlogProvider({ posts, children }: { posts: BlogSummary[]; children: React.ReactNode }) {
  return <BlogContext.Provider value={posts}>{children}</BlogContext.Provider>;
}
export const useBlogPosts = () => useContext(BlogContext);
