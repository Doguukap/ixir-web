"use client";

import BrandLogo from "./brand-logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { corporateLinks, primaryLinks } from "@/lib/site-content";

import { useServiceNavigation } from "./service-navigation";

export default function SiteHeader({ language = "tr", onLanguageChange, home = false }: { language?:"tr"|"en"; onLanguageChange?:(language:"tr"|"en")=>void; home?:boolean }) {
  const [mobileOpen,setMobileOpen]=useState(false);
  const [dropdown,setDropdown]=useState<string|null>(null);
  const pathname=usePathname();
  const tr=language==='tr';
  const close=()=>{setMobileOpen(false);setDropdown(null);};
  const corporate=corporateLinks.map(item=>({title:tr?item.title:item.en,href:`/kurumsal/${item.slug}`}));
  const services=useServiceNavigation();
  return <header className={`site-header ${home?'is-home':'is-inner'}`} onKeyDown={event=>{if(event.key==='Escape'){setDropdown(null);setMobileOpen(false);}}}>
    <Link href="/" className="site-header-brand" aria-label="İxir Güzellik — Anasayfa" onClick={close}><BrandLogo priority sizes="(max-width:700px) 65px, 76px"/></Link>
    <nav id="site-navigation" className={`site-navigation ${mobileOpen?'is-open':''}`} aria-label={tr?'Ana menü':'Main navigation'} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setDropdown(null);}}>
      {[{id:'corporate',title:tr?'Kurumsal':'About',href:'/kurumsal',items:corporate},{id:'services',title:tr?'Hizmetler':'Services',href:'/hizmetler',items:services}].map(group=><div className="site-nav-group" key={group.id} onPointerEnter={event=>{if(event.pointerType==='mouse')setDropdown(group.id);}} onPointerLeave={event=>{if(event.pointerType==='mouse')setDropdown(null);}}>
        <div className="site-nav-parent"><Link href={group.href} onClick={close} aria-current={pathname===group.href?'page':undefined}>{group.title}</Link><button type="button" className="site-submenu-toggle" aria-expanded={dropdown===group.id} aria-controls={`submenu-${group.id}`} aria-label={`${group.title} ${tr?'alt menüsü':'submenu'}`} onClick={()=>setDropdown(dropdown===group.id?null:group.id)}>⌄</button></div>
        <div className={`site-dropdown ${dropdown===group.id?'is-open':''}`} id={`submenu-${group.id}`}><ul>{group.items.map(item=><li key={item.href}><Link href={item.href} onClick={close} aria-current={pathname===item.href?'page':undefined}>{item.title}<span aria-hidden="true">↗</span></Link></li>)}</ul></div>
      </div>)}
      {primaryLinks.map(item=><Link key={item.href} href={item.href} onClick={close} aria-current={pathname===item.href?'page':undefined}>{tr?item.title:item.en}</Link>)}
    </nav>
    <div className="site-header-actions">{onLanguageChange&&<div className="site-language" aria-label="Dil / Language"><button type="button" aria-pressed={tr} onClick={()=>onLanguageChange('tr')}>TR</button><span/><button type="button" aria-pressed={!tr} onClick={()=>onLanguageChange('en')}>EN</button></div>}<button type="button" className="site-menu-button" aria-controls="site-navigation" aria-expanded={mobileOpen} aria-label={mobileOpen?'Menüyü kapat':'Menüyü aç'} onClick={()=>setMobileOpen(!mobileOpen)}><span/><span/></button></div>
  </header>;
}
