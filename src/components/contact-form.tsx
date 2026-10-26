"use client";

import { useRef, useState } from "react";

type Errors = Record<string, string[]>;

export default function ContactForm() {
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
      const response = await fetch("/api/contact-messages", {
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
        setMessage(response.status === 429 ? "Kısa sürede çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin." : "Mesajınız kaydedilemedi. Bilgileriniz formda duruyor; lütfen tekrar deneyin.");
      } else {
        setSuccess(true);
        setMessage("Mesajınız alındı. İlginiz için teşekkür ederiz.");
        formRef.current?.reset();
      }
    } catch {
      setMessage("Bağlantı kurulamadı. Bilgileriniz formda duruyor; lütfen tekrar deneyin.");
    } finally {
      setPending(false);
      inFlight.current = false;
    }
  }

  const error = (name: string) => errors[name] ? <span className="franchise-field-error" id={`contact-error-${name}`}>{errors[name][0]}</span> : null;
  const invalid = (name: string) => ({ "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `contact-error-${name}` : undefined });

  return <section className="contact-form-section" aria-labelledby="contact-form-title"><h2 id="contact-form-title">Bize yazın</h2>
    <form ref={formRef} className="contact-message-form" onSubmit={submit} aria-busy={pending}>
      <fieldset disabled={pending || success}><legend className="sr-only">İletişim formu</legend>
        <div className="franchise-form-grid">
          <label className="franchise-field">Ad Soyad *<input name="name" autoComplete="name" required maxLength={150} {...invalid("name")}/>{error("name")}</label>
          <label className="franchise-field">E-posta Adresi *<input name="email" type="email" autoComplete="email" required maxLength={254} {...invalid("email")}/>{error("email")}</label>
          <label className="franchise-field">Telefon<input name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={7} maxLength={30} {...invalid("phone")}/>{error("phone")}</label>
          <label className="franchise-field">Konu<input name="subject" maxLength={200} {...invalid("subject")}/>{error("subject")}</label>
          <label className="franchise-field franchise-field-wide">Mesajınız *<textarea name="message" rows={6} required maxLength={5000} {...invalid("message")}/>{error("message")}</label>
        </div>
        <label className="franchise-consent"><input type="checkbox" name="consent" required {...invalid("consent")}/><span>Kişisel verilerimin talebimin yanıtlanması amacıyla işlenmesini kabul ediyorum. *</span></label>{error("consent")}
        <div className="franchise-form-footer"><p>Yıldızlı alanların doldurulması zorunludur.</p><button type="submit" className="franchise-submit">{pending ? "Gönderiliyor…" : "Gönder"}<span aria-hidden="true">↗</span></button></div>
      </fieldset>
      {message && <div className={`franchise-form-message ${success ? "is-success" : "is-error"}`} role={success ? "status" : "alert"}>{message}</div>}
    </form>
  </section>;
}
