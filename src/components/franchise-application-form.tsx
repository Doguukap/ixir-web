"use client";

import { useRef, useState } from "react";
import { franchiseSelectOptions } from "@/lib/franchise-content";

type Errors = Record<string, string[]>;

export default function FranchiseApplicationForm() {
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
      const response = await fetch("/api/franchise-applications", {
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

  const error = (name: string) => errors[name] ? <span className="franchise-field-error" id={`franchise-error-${name}`}>{errors[name][0]}</span> : null;
  const invalid = (name: string) => ({ "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `franchise-error-${name}` : undefined });

  return <section className="franchise-application-section" id="franchising-basvuru" aria-labelledby="franchise-application-title"><header className="franchise-form-heading"><div><p className="treatment-eyebrow">YENİ BİR HİKÂYE, BİRLİKTE.</p><h2 id="franchise-application-title">Franchising<br/><em>Başvuru Formu</em></h2></div><p>Sizi ve yatırım planınızı tanıyalım.<br/>Yıldızlı alanların doldurulması zorunludur.</p></header>
    <form ref={formRef} className="franchise-application-form" onSubmit={submit} aria-busy={pending}>
      <fieldset disabled={pending || success}><legend className="sr-only">Franchising başvuru bilgileriniz</legend>
        <div className="franchise-form-grid">
          <label className="franchise-field">İsim Soyisim *<input name="name" autoComplete="name" required maxLength={150} {...invalid("name")}/>{error("name")}</label>
          <label className="franchise-field">Telefon *<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={30} minLength={7} {...invalid("phone")}/>{error("phone")}</label>
          <label className="franchise-field franchise-field-wide">E-posta Adresi *<input name="email" type="email" autoComplete="email" required maxLength={254} {...invalid("email")}/>{error("email")}</label>
          <label className="franchise-field franchise-field-wide">Açık Adres *<textarea name="address" autoComplete="street-address" rows={2} required maxLength={1000} {...invalid("address")}/>{error("address")}</label>
          <label className="franchise-field">Şehir *<input name="city" autoComplete="address-level1" required maxLength={100} {...invalid("city")}/>{error("city")}</label>
          <label className="franchise-field">İlçe *<input name="district" autoComplete="address-level2" required maxLength={100} {...invalid("district")}/>{error("district")}</label>
          <label className="franchise-field">Mesleğiniz *<input name="occupation" autoComplete="organization-title" required maxLength={150} {...invalid("occupation")}/>{error("occupation")}</label>
          <label className="franchise-field">Güzellik Hizmeti ve Kişisel Bakım İle İlgili Toplam Deneyim Yılınız? *<input name="experience_years" type="number" min={0} max={80} step={1} inputMode="numeric" required {...invalid("experience_years")}/>{error("experience_years")}</label>
          <label className="franchise-field">Eğitim Durumunuz *<select name="education" defaultValue="" required {...invalid("education")}><option value="" disabled>Seçin</option>{franchiseSelectOptions.education.map(option => <option key={option}>{option}</option>)}</select>{error("education")}</label>
          <label className="franchise-field">Ortalama Yatırım Bütçeniz *<input name="investment_budget" required maxLength={150} placeholder="Tutar veya bütçe aralığı" {...invalid("investment_budget")}/>{error("investment_budget")}</label>
          <label className="franchise-field">İxir’i Nereden Duydunuz *<select name="source" defaultValue="" required {...invalid("source")}><option value="" disabled>Seçin</option>{franchiseSelectOptions.source.map(option => <option key={option}>{option}</option>)}</select>{error("source")}</label>
          <label className="franchise-field">Yönetim Planınız *<select name="management_plan" defaultValue="" required {...invalid("management_plan")}><option value="" disabled>Seçin</option>{franchiseSelectOptions.management_plan.map(option => <option key={option}>{option}</option>)}</select>{error("management_plan")}</label>
          <label className="franchise-field franchise-field-wide">Kendinizden Bahsediniz *<textarea name="about" rows={5} required maxLength={5000} {...invalid("about")}/>{error("about")}</label>
        </div>
        <label className="franchise-consent"><input type="checkbox" name="consent" required {...invalid("consent")}/><span>Kişisel verilerimin talebimin yanıtlanması amacıyla işlenmesini kabul ediyorum. *</span></label>{error("consent")}
        <div className="franchise-form-footer"><p>İxir Güzellik ile iş ortaklığına ilk adımı atın.</p><button type="submit" className="franchise-submit">{pending ? "Gönderiliyor…" : "Gönder"}<span aria-hidden="true">↗</span></button></div>
      </fieldset>
      {message && <div className={`franchise-form-message ${success ? "is-success" : "is-error"}`} role={success ? "status" : "alert"}>{message}</div>}
    </form>
  </section>;
}
