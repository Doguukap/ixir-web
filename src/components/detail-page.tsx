import Image from "next/image";
import { ServiceHeroActions } from "./service-hero-actions";
import Link from "next/link";
import SiteHeader from "./site-header";
import Footer from "./footer";
import PriceListPage from "./price-list-page";
import ContactPage from "./contact-page";
import CertificatesPage from "./certificates-page";
import ReferencesPage from "./references-page";
import BlogPage from "./blog-page";
import CampaignsPage from "./campaigns-page";
import AcademyPage from "./academy-page";
import FranchiseFaq from "./franchise-faq";
import FranchiseApplicationForm from "./franchise-application-form";
import { corporateLinks, findServiceHref, serviceCategories, slugify, type SitePage } from "@/lib/site-content";
import { contactUrl } from "@/lib/contact";

function ServiceLists({category}:{category?:string}){return <div className="detail-service-groups">{serviceCategories.filter(item=>!category||item.title===category).map(item=><section key={item.title}><h2><Link href={`/hizmetler/${slugify(item.title)}`}>{item.title}</Link></h2><ul>{item.services.map(service=><li key={service}><Link href={findServiceHref(service)}>{service}<span aria-hidden="true">↗</span></Link></li>)}</ul></section>)}</div>;}
export default function DetailPage({page}:{page:SitePage}){
  if(page.kind==='academy') return <AcademyPage/>;
  if(page.kind==='campaigns') return <CampaignsPage/>;
  if(page.kind==='blog') return <BlogPage/>;
  if(page.kind==='reviews') return <ReferencesPage/>;
  if(page.kind==='pricing') return <PriceListPage/>;
  if(page.kind==='contact') return <ContactPage/>;
  if(page.kind==='certificates') return <CertificatesPage/>;
  const hideContactActions=page.path==='kurumsal'||page.path.startsWith('kurumsal/')||page.kind==='article';
  const special=['services','category','campaigns','blog','reviews','pricing','contact','franchise'].includes(page.kind);
  return <><SiteHeader/><main className="detail-page"><header className={`detail-page-heading ${(page.path==='kurumsal/hakkimizda'||page.kind==='franchise')?'about-page-heading':''}`}><nav aria-label="Sayfa yolu"><Link href="/">Anasayfa</Link><span>/</span><span>{page.eyebrow}</span></nav>{page.path!=='kurumsal/hakkimizda'&&page.kind!=='franchise'&&<p className="detail-eyebrow">{page.eyebrow}</p>}<h1>{page.title}</h1><p className="detail-page-intro">{page.description}</p>{!hideContactActions&&<ServiceHeroActions title={page.title}/>}</header>
    {!special&&<div className={`detail-editorial ${page.kind==='founder'?'founder-detail-editorial':''} ${!page.image&&page.photo===undefined?'text-only':''}`}>
      {(page.image||page.photo!==undefined)&&<div className="detail-editorial-image">{page.image?<Image src={page.image} alt={page.title} fill sizes="(max-width:700px) 88vw, 44vw" priority/>:<svg viewBox={`${(page.photo??0)%4} ${Math.floor((page.photo??0)/4)} 1 1`} preserveAspectRatio="xMidYMid slice" aria-hidden="true"><image href="/images/services-atlas.png" width="4" height="2"/></svg>}</div>}
      <div className="detail-editorial-copy">{page.paragraphs.map(text=><p key={text}>{text}</p>)}{!hideContactActions&&page.kind!=='vision'&&page.kind!=='values'&&<a className="detail-primary-link" href={contactUrl(page.title)} target="_blank" rel="noopener noreferrer">Bilgi ve randevu <span aria-hidden="true">↗</span></a>}
      {page.kind==='service'&&<dl className="detail-practical"><div><dt>Randevu</dt><dd>Ön görüşme ile planlanır</dd></div><div><dt>Fiyat ve süre</dt><dd>Uygulamaya göre belirlenir</dd></div><div><dt>Bilgi</dt><dd><a href="tel:+905396660000">+90 539 666 00 00</a></dd></div></dl>}
      {page.kind==='article'&&<Link className="detail-back-link" href="/blog">← Tüm yazılar</Link>}
      </div>
    </div>}
    {page.kind==='vision'&&<div className="detail-values"><article><span>01</span><h2>VİZYONUMUZ</h2><p>Türkiye genelinde yeniliklere öncülük eden, diğer güzellik merkezleri ve ilgili sağlık kuruluşları tarafından örnek alınan güzellik ve sağlık merkezi olmak</p><p>Gaziantep ilinde sektörümüzde lider olmanın gururunu tüm Türkiye’ye yayarak ülke genelinde kaliteli ve profesyonel bir hizmet ağı kurmak.</p></article><article><span>02</span><h2>MİSYONUMUZ</h2><p>Yüksek kalitede, hijyenik ve profesyonel hizmet sunmak</p><p>Müşteri memnuniyetin maksimum seviyede tutmak</p><p>İnsanları sektörümüz ve barındırdığı hizmetler hakkında yanlış bilgilerden korumak ve aydınlatmak</p><p>Personelimizin sürekli gelişmesini ve güven içinde mutlu çalışmasını sağlamak.</p></article></div>}
    {page.kind==='values'&&<div className="detail-values">{[
  {
    "title": "SAĞLIK",
    "text": "Sağlık insan için en önemli değerlerdendir. Bizim için de güzellikten önce sağlık gelir. Sağlıksız veya sağlığınıza zarar verebilecek uygulamalardan kaçınırız. Hijyen kurallarına özen gösteririz. Çalışma ortamımızı ve ekipmanlarımızı her zaman streilize eder, çalışanlarımızın kişisel bakımları ve sağlık durumlarını takip ederiz."
  },
  {
    "title": "MEMNUNİYET",
    "text": "Müşteri memnuniyeti olmazsa olmazımız. Bu nedenle müşterilerimizi doğru yönlendirir, onlara en sağlıklı ve en iyi hizmeti veririz. Karışılıklı güven içerisinde yürüttüğümüz ilişkilerimizde karar aşamasında ortak paydada bulunmaya çalışırız. Memnuniyet esaslı hizmetlerimizde gerekli olduğu yerde kişiye özel çözümler ve hizmetler sunarız."
  },
  {
    "title": "GELİŞİM",
    "text": "Personellerimizi deneyimli ve uzman kişilerden oluşturur, dönemsel eğitimlerle de daha da gelişmeleriniz sağlarız. Bu sayede müşterilerimize, çalışanlarımıza ve kendimize artı değer katmış oluruz. Gelişim için yeni yollara ararız. Sektörümüzde ki hareketleri doğru analiz ederek, doğru yatırımlar yapmak için sürekli araştırma içine gireriz."
  },
  {
    "title": "SAYGI",
    "text": "Çalışanlarımıza, müşterilerimize ve çözüm ortaklarımıza karşı olan sorumlulukların bilincinde ve arkasındayız. Çalışanlarımıza altından kalkabilecekleri gerekli sorumlulukları verir, takdirlerimizi ve teşekkürlerimizi esirgemeyiz. Her zaman açık fikirli bir müzakere ortamını destekler, en iyi fikrin kazanmasını isteriz. İletişimimiz açık, belirgin ve nesneldir. Müşterilerimizin de fikirlerine saygı duyar ve gizlilik esasına önem gösteririz. Buna ek olarak çevremize duyarlı davranır, sosyal sorumluluklarımızın bilinci ile hareket ederiz."
  }
].map((value,index)=><article key={value.title}><span>0{index+1}</span><h2>{value.title}</h2><p>{value.text}</p></article>)}</div>}
    {['corporate','founder','certificates'].includes(page.kind)&&<nav className="detail-corporate-links" aria-label="Kurumsal sayfalar">{corporateLinks.map(item=><Link href={`/kurumsal/${item.slug}`} key={item.slug}>{item.title}<span aria-hidden="true">↗</span></Link>)}</nav>}
    {(page.kind==='services'||page.kind==='category')&&<ServiceLists category={page.category}/>}
    {page.kind==='service'&&<aside className="detail-related"><h2>Aynı kategorideki hizmetler</h2><ServiceLists category={page.category}/></aside>}
    {page.kind==='franchise'&&<div className="franchise-page-content"><FranchiseFaq/><FranchiseApplicationForm/></div>}
  </main><Footer language="tr" showWhatsapp={!hideContactActions}/></>;
}
