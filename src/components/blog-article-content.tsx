"use client";

import { useEffect, useRef, useState } from "react";
import type { BlogHeading } from "@/lib/blog-types";

export default function BlogArticleContent({ html, headings }: { html: string; headings: BlogHeading[] }) {
  const articleRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(headings[0]?.id ?? "");
  const activeRef = useRef(headings[0]?.id ?? "");

  useEffect(() => {
    const article = articleRef.current;
    if (!article || !headings.length) return;
    const allowedIds = new Set(headings.map(heading => heading.id));
    const elements = Array.from(article.querySelectorAll<HTMLElement>("h3[id]")).filter(element => allowedIds.has(element.id));
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = Math.min(160, window.innerHeight * .22);
      let current = elements[0]?.id ?? "";
      for (const heading of elements) {
        if (heading.getBoundingClientRect().top <= threshold) current = heading.id;
        else break;
      }
      if (current !== activeRef.current) {
        activeRef.current = current;
        setActive(current);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(article);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [html, headings]);

  return <div className={`blog-article-layout ${headings.length ? "has-contents" : ""}`}>
    {headings.length > 0 && <aside className="blog-contents"><nav aria-label="Blog içerik haritası"><h2>İçerik Haritası</h2><ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`} aria-current={active === heading.id ? "location" : undefined}>{heading.title}</a></li>)}</ol></nav></aside>}
    {/* The API sanitizes rich HTML and assigns the H3 IDs used by the contents map. */}
    <div ref={articleRef} className="campaign-rich-content blog-rich-content" dangerouslySetInnerHTML={{ __html: html }}/>
  </div>;
}
