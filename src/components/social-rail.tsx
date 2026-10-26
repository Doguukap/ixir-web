import { socialLinks } from "@/lib/social-links";

export function SocialIcon({ kind }: { kind: "instagram" | "facebook" }) {
  return kind === "instagram" ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> : <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 22v-9h3l.5-4H14V6.5c0-1 .3-1.5 1.7-1.5H18V1.4A27 27 0 0 0 14.8 1C11.6 1 10 3 10 6.2V9H7v4h3v9h4Z"/></svg>;
}

export default function SocialRail() {
  return <nav className="social-rail" aria-label="Sosyal medya hesaplarımız">{socialLinks.map(link => <a key={link.kind} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`İxir Güzellik ${link.name}`}><SocialIcon kind={link.kind}/></a>)}</nav>;
}
