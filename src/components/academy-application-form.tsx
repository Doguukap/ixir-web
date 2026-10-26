"use client";

import { useRef, useState } from "react";
import { academySourceOptions } from "@/lib/academy-content";

type Errors = Record<string, string[]>;

export default function AcademyApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const inFlight = useRef(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setPending(true);
    setErrors({});
    setMessage("");
    const data = new FormData(event.currentTarget);
    const payload = { ...Object.fromEntries(data), consent: data.get("consent") === "on" };
    try {
      const response = await fetch("/api/academy-applications", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (response.status === 422) {
        const fieldErrors: Errors = result.errors ?? {};
        setErrors(fieldErrors);
        setMessage("Lütfen işaretli alanları kontrol edin.");
        const field = formRef.current?.elements.namedItem(Object.keys(fieldErrors)[0]);
        if (field instanceof HTMLElement) field.focus();
      } else if (!response.ok || result.saved !== true) {
        setMessage(response.status === 429 ? "Kısa sürede çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin." : "Başvurunuz kaydedilemedi. Bilgileriniz formda duruyor; lütfen tekrar deneyin.");
      } else {
        setSuccess(true);
        setMessage("Başvurunuz alındı. İlginiz için teşekkür ederiz.");
        formRef.current?.reset();
      }
    } catch {
      setMessage("Bağlantı kurulamadı. Bilgileriniz formda duruyor; lütfen tekrar deneyin.");
    } finally {
      setPending(false);
      inFlight.current = false;
    }
  }

  const error = (name: string) => errors[name] ? <span className="franchise-field-error" id={`academy-error-${name}`}>{errors[name][0]}</span> : null;
  const invalid = (name: string) => ({ "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `academy-error-${name}` : undefined });

  return <section className="franchise-application-section" id="akademi-basvuru" aria-labelledby="academy-application-title"><header className="franchise-form-heading"><div><p className="treatment-eyebrow">BİLGİNİZİ BİR ADIM ÖTEYE TAŞIYIN.</p><h2 id="academy-application-title">Akademi<br/><em>Başvuru Formu</em></h2></div><p>Sizi ve eğitim talebinizi tanıyalım.<br/>Yıldızlı alanların doldurulması zorunludur.</p></header>
    <form ref={formRef} className="franchise-application-form" onSubmit={submit} aria-busy={pending}>
      <fieldset disabled={pending || success}><legend className="sr-only">Akademi başvuru bilgileriniz</legend>
        <div className="franchise-form-grid">
          <label className="franchise-field">Ad Soyad *<input name="name" autoComplete="name" required maxLength={150} {...invalid("name")}/>{error("name")}</label>
          <label className="franchise-field">Telefon *<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={7} maxLength={30} {...invalid("phone")}/>{error("phone")}</label>
          <label className="franchise-field franchise-field-wide">E-posta Adresi<input name="email" type="email" autoComplete="email" maxLength={254} {...invalid("email")}/>{error("email")}</label>
          <label className="franchise-field franchise-field-wide">Açık Adres<textarea name="address" autoComplete="street-address" rows={2} maxLength={1000} {...invalid("address")}/>{error("address")}</label>
          <label className="franchise-field">Şehir<input name="city" autoComplete="address-level1" maxLength={100} {...invalid("city")}/>{error("city")}</label>
          <label className="franchise-field">İlçe<input name="district" autoComplete="address-level2" maxLength={100} {...invalid("district")}/>{error("district")}</label>
          <label className="franchise-field franchise-field-wide">Firma Unvanı<input name="company_name" autoComplete="organization" maxLength={150} {...invalid("company_name")}/>{error("company_name")}</label>
          <label className="franchise-field">Vergi Dairesi<input name="tax_office" maxLength={150} {...invalid("tax_office")}/>{error("tax_office")}</label>
          <label className="franchise-field">Vergi Numarası<input name="tax_number" inputMode="numeric" maxLength={20} {...invalid("tax_number")}/>{error("tax_number")}</label>
          <label className="franchise-field franchise-field-wide">Faaliyet Gösterdiğiniz Sektör ve Deneyim Süresi (Yıl)<input name="sector_experience" maxLength={300} {...invalid("sector_experience")}/>{error("sector_experience")}</label>
          <label className="franchise-field franchise-field-wide">Bizi Nereden Buldunuz ?<select name="source" defaultValue="" {...invalid("source")}><option value="">Seçin</option>{academySourceOptions.map(option => <option key={option}>{option}</option>)}</select>{error("source")}</label>
        </div>
        <label className="franchise-consent"><input type="checkbox" name="consent" required {...invalid("consent")}/><span>Kişisel verilerimin talebimin yanıtlanması amacıyla işlenmesini kabul ediyorum. *</span></label>{error("consent")}
        <div className="franchise-form-footer"><p>İxir Akademi ile eğitim yolculuğunuza ilk adımı atın.</p><button type="submit" className="franchise-submit">{pending ? "Gönderiliyor…" : "Gönder"}<span aria-hidden="true">↗</span></button></div>
      </fieldset>
      {message && <div className={`franchise-form-message ${success ? "is-success" : "is-error"}`} role={success ? "status" : "alert"}>{message}</div>}
    </form>
  </section>;
}
