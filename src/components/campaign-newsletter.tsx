"use client";

import { useRef, useState } from "react";

export default function CampaignNewsletter() {
  const formRef = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function subscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setPending(true);
    setErrors({});
    setMessage("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/newsletter-subscriptions", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), consent: data.get("consent") === "on" }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (response.status === 422) {
        setErrors(result.errors ?? {});
        setMessage("Lütfen e-posta adresinizi ve onay kutusunu kontrol edin.");
        const firstField = formRef.current?.elements.namedItem(Object.keys(result.errors ?? {})[0]);
        if (firstField instanceof HTMLElement) firstField.focus();
      } else if (!response.ok || result.saved !== true) {
        setMessage(response.status === 429 ? "Lütfen biraz sonra tekrar deneyin." : "Kaydınız tamamlanamadı. Lütfen tekrar deneyin.");
      } else {
        setSuccess(true);
        setMessage("Bülten kaydınız alındı. İlginiz için teşekkür ederiz.");
        formRef.current?.reset();
      }
    } catch {
      setMessage("Bağlantı kurulamadı. Lütfen tekrar deneyin.");
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }

  return <section className="campaign-newsletter" aria-labelledby="campaign-newsletter-title"><div className="campaign-newsletter-copy"><span className="campaign-newsletter-star" aria-hidden="true">✦</span><h2 id="campaign-newsletter-title">Kampanyalardan haber almak için <em>bültenimize kaydolun.</em></h2></div>
    <form ref={formRef} onSubmit={subscribe} className="campaign-newsletter-form" aria-busy={pending}><fieldset disabled={pending || success}><legend className="sr-only">Kampanya bültenine kayıt</legend>
      <label className="campaign-newsletter-email" htmlFor="newsletter-email">E-posta adresiniz</label><div className="campaign-newsletter-input-row"><input id="newsletter-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="E-posta adresinizi yazın" aria-invalid={!!errors.email} aria-describedby={errors.email ? "newsletter-email-error" : undefined}/><button type="submit">{pending ? "Kaydediliyor…" : "Kaydol"}<span aria-hidden="true">↗</span></button></div>
      {errors.email && <p className="campaign-newsletter-error" id="newsletter-email-error">{errors.email[0]}</p>}
      <label className="campaign-newsletter-consent"><input name="consent" type="checkbox" required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "newsletter-consent-error" : undefined}/><span>Kampanyalar hakkında e-posta almayı ve e-posta adresimin bu amaçla işlenmesini kabul ediyorum.</span></label>
      {errors.consent && <p className="campaign-newsletter-error" id="newsletter-consent-error">{errors.consent[0]}</p>}
    </fieldset>{message && <p className={`campaign-newsletter-message ${success ? "is-success" : "is-error"}`} role={success ? "status" : "alert"}>{message}</p>}</form>
  </section>;
}
