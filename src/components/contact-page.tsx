import SiteHeader from "./site-header";
import Footer from "./footer";
import ContactForm from "./contact-form";

export default function ContactPage() {
  return <><SiteHeader/><main className="contact-page"><div className="contact-page-shell"><header className="contact-page-heading"><h1>İletişim</h1></header><div className="contact-page-columns">
    <section className="contact-information" aria-labelledby="contact-information-title"><h2 id="contact-information-title">İxir Güzellik</h2><dl>
      <div><dt>Adres</dt><dd><address><a href="https://www.google.com/maps/search/?api=1&query=Sarıgüllük+Zübeyde+Hanım+54%2FB+Gaziantep" target="_blank" rel="noopener noreferrer">Sarıgüllük, Zübeyde Hanım Blv. No:54/B<br/>27000 Şehitkamil / Gaziantep</a></address></dd></div>
      <div><dt>Telefon</dt><dd><a href="tel:+905396660000">+90 539 666 00 00</a></dd></div>
      <div><dt>WhatsApp</dt><dd><a href="https://wa.me/905396660000" target="_blank" rel="noopener noreferrer">+90 539 666 00 00</a></dd></div>
      <div><dt>E-posta</dt><dd><a href="mailto:info@ixirguzellik.com">info@ixirguzellik.com</a></dd></div>
      <div><dt>Çalışma saatleri</dt><dd>Pazartesi – Cumartesi: 09:00 – 19:00<br/>Pazar kapalı</dd></div>
    </dl></section><ContactForm/>
  </div></div></main><Footer language="tr"/></>;
}
