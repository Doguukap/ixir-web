import { academyIntroduction } from "./academy-content";
import { aboutParagraphs } from "./about-content";
export const slugify = (value: string) => value.toLocaleLowerCase("tr").replace(/ı/g,"i").replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ö/g,"o").replace(/ç/g,"c").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export const serviceCategories = [
  { title:"Güzellik Hizmetleri", en:"Beauty Services", services:["Protez Tırnak","Jel Tırnak","Nail Art","Rus Manikürü ve Pedikürü","Kirpik Lifting","İpek Kirpik","Kaş Laminasyonu","Altın Oran Kaş Tasarımı","Kaş Tasarımı","Kalıcı Makyaj","Kalıcı Dudak Renklendirme","Kalıcı Eyeliner","Kalıcı Dipliner","Saç Simülasyonu"] },
  { title:"Medikal İşlemler", en:"Medical Treatments", services:["Hydrafacial Cilt Bakımı","Medikal Cilt Bakımı","Medikal El ve Ayak Bakımı","Karbon Peeling","Altın Maske","Ben Alma","Leke ve Akne Giderme","Siyah Nokta Giderme","Dövme Silme","Kupa / Hacamat"] },
  { title:"Diyetetik ve Beslenme Hizmetleri", en:"Nutrition & Body Care", services:["Diyet Programı","G5 Zayıflama Teknolojisi","Lipozen (Bölgesel İncelme)","EMS Kas Geliştirme Cihazı"] },
  { title:"Ayak Sağlığı Hizmetleri", en:"Foot Health Services", services:["Tırnak Batması Tedavisi","Ayak Mantarı Tedavisi","Hipertrofik, Deforme Tırnak Bakımı","Nasır Tedavisi","Çatlak Topuk Tedavisi","Diyabetli Birey Ayak Bakımı","Ayak Anatomisi Hata Giderme","Medikal Ayak Bakımı"] },
  { title:"Estetik Hizmetleri", en:"Aesthetic Services", services:["Microblading"] },
];
export const corporateLinks = [
  { title:"Hakkımızda", en:"About Us", slug:"hakkimizda" },
  { title:"İbrahim Akçay", en:"İbrahim Akçay", slug:"ibrahim-akcay" },
  { title:"Vizyon & Misyon", en:"Vision & Mission", slug:"vizyon-misyon" },
  { title:"Değerlerimiz", en:"Our Values", slug:"degerlerimiz" },
  { title:"Sertifikalarımız", en:"Certificates", slug:"sertifikalarimiz" },
];
export const primaryLinks = [
  { title:"Franchising", en:"Franchising", href:"/franchising" },
  { title:"Akademi", en:"Academy", href:"/akademi" },
  { title:"Kampanyalar", en:"Offers", href:"/kampanyalar" },
  { title:"Blog", en:"Blog", href:"/blog" },
  { title:"Referanslar", en:"Testimonials", href:"/referanslar" },
  { title:"Fiyat Listesi", en:"Price List", href:"/fiyat-listesi" },
  { title:"İletişim", en:"Contact", href:"/iletisim" },
];
export type SitePage = { path:string; title:string; eyebrow:string; description:string; paragraphs:string[]; kind:"corporate"|"founder"|"vision"|"values"|"certificates"|"services"|"category"|"service"|"academy"|"franchise"|"campaigns"|"blog"|"article"|"reviews"|"pricing"|"contact"; image?:string; category?:string; photo?:number };
const biography = "İbrahim Akçay 1987 Gaziantep doğumlu Türkiye genelinde Ulusal bir üne sahip olan uzman estetisyendir. Mesleğe çok genç yaşlarda başlayan Akçay, meslek hayatı boyunca 100'den fazla eğitim almış ve Gaziantep'in usta öğretici belgeli ilk ve tek Usta Öğretici estetisyeni olmuştur. Mesleğe giriş yılı 1993 olan İbrahim Akçay, 2000 yılında kendi markası olan İxir Güzellik'i kurmuştur. Estetisyenliğin yanı sıra YouTube ve sosyal medya kanalları üzerinden ücretsiz olarak Güzellik Koçu hizmetleri vermektedir.";
export const sitePages:SitePage[] = [
  { path:"kurumsal",title:"İxir’i tanıyın.",eyebrow:"KURUMSAL",description:"Güzellik, bakım ve kişisel ilgi bir arada.",paragraphs:["İxir Güzellik olarak saç, güzellik ve kişisel bakım alanlarında, her bireyin kendi güzelliğine güvenle ulaşmasını amaçlıyoruz."],kind:"corporate",image:"/images/ibrahim-akcay-treatment.png" },
  { path:"kurumsal/hakkimizda",title:"Hakkımızda",eyebrow:"HAKKIMIZDA",description:"Güzelliğe zarif bir dokunuş.",paragraphs:aboutParagraphs,kind:"corporate",image:"/images/ibrahim-akcay-treatment.png" },
  { path:"kurumsal/ibrahim-akcay",title:"İbrahim Akçay",eyebrow:"GÜZELLİK KOÇU · UZMAN ESTETİSYEN",description:"Eğitim, deneyim ve kişiye özel yaklaşım.",paragraphs:[biography],kind:"founder",image:"/images/ibrahim-akcay-certificate.png" },
  { path:"kurumsal/vizyon-misyon",title:"Vizyon & Misyon",eyebrow:"KURUMSAL",description:"Güzelliğe ve bakıma yaklaşımımız.",paragraphs:[],kind:"vision" },
  { path:"kurumsal/degerlerimiz",title:"Değerlerimiz",eyebrow:"KURUMSAL",description:"Her görüşmede, her uygulamada aynı özen.",paragraphs:[],kind:"values" },
  { path:"kurumsal/sertifikalarimiz",title:"Sertifikalarımız",eyebrow:"KURUMSAL",description:"Mesleki gelişimin izleri.",paragraphs:["İbrahim Akçay’ın meslek hayatı boyunca edindiği eğitim ve uzmanlık, İxir’in kişiye özel bakım yaklaşımına yön verir."],kind:"certificates",image:"/images/ibrahim-akcay-certificate.png" },
  { path:"hizmetler",title:"Size özel bakım.",eyebrow:"HİZMETLERİMİZ",description:"Güzellikten kişisel bakıma, tüm hizmetlerimizi keşfedin.",paragraphs:[],kind:"services" },
  { path:"franchising",title:"Franchising",eyebrow:"FRANCHISING",description:"İxir ile birlikte büyüyün.",paragraphs:["İxir Güzellik ailesine katılmak, marka deneyimimiz ve iş birliği olanaklarımız hakkında bilgi almak için bizimle iletişime geçin."],kind:"franchise" },
  { path:"akademi",title:"Akademi",eyebrow:"İXİR AKADEMİ",description:"Güzellik alanında mesleki gelişim.",paragraphs:[academyIntroduction],kind:"academy" },
  { path:"kampanyalar",title:"Kampanyalar",eyebrow:"İXİR GÜZELLİK",description:"Güncel paket ve uygulama seçenekleri.",paragraphs:[],kind:"campaigns" },
  { path:"blog",title:"Blog",eyebrow:"BLOG",description:"Bakım, güzellik ve İxir’den notlar.",paragraphs:[],kind:"blog" },
  { path:"referanslar",title:"Referanslar",eyebrow:"REFERANSLAR",description:"Deneyiminiz bizim için değerli.",paragraphs:[],kind:"reviews" },
  { path:"fiyat-listesi",title:"Fiyat Listesi",eyebrow:"GÜZELLİK & BAKIM",description:"Uygulama ve başlangıç fiyatlarını inceleyin.",paragraphs:[],kind:"pricing" },
  { path:"iletisim",title:"İletişim",eyebrow:"İLETİŞİM",description:"Randevu, eğitim ve iş birliği için bize ulaşın.",paragraphs:[],kind:"contact" },
];
serviceCategories.forEach((category,index)=> {
  const categorySlug = slugify(category.title);
  sitePages.push({path:`hizmetler/${categorySlug}`,title:category.title,eyebrow:"HİZMETLERİMİZ",description:"İhtiyaçlarınıza uygun uygulamaları keşfedin.",paragraphs:[],kind:"category",category:category.title,photo:[4,7,3,2,5][index]});
  category.services.forEach(service=>sitePages.push({path:`hizmetler/${categorySlug}/${slugify(service)}`,title:service,eyebrow:category.title.toLocaleUpperCase("tr"),description:`${service} hakkında bilgi ve randevu.`,paragraphs:[`${service}, ${category.title.toLocaleLowerCase("tr")} kapsamında sunduğumuz uygulamalar arasındadır. Uygulama seçenekleri ve kişisel beklentileriniz hakkında ekibimizle görüşebilirsiniz.`,"Uygulamanın uygunluğu, süresi, seans planı ve fiyat bilgisi görüşme sırasında değerlendirilir. Randevu öncesinde sorularınızı bizimle paylaşabilirsiniz."],kind:"service",category:category.title,photo:[4,7,3,2,5][index]}));
});
export function findServiceHref(title:string) { return '/'+(sitePages.find(page=>page.kind==='service' && page.title===title)?.path ?? 'hizmetler'); }
