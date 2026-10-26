"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Certificate } from "@/lib/certificates";

export default function CertificateGallery({ certificates }: { certificates: Certificate[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = selected !== null;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  const move = (direction: number) => setSelected(current => current === null ? null : (current + direction + certificates.length) % certificates.length);
  if (!certificates.length) return <p className="reference-gallery-empty">Sertifikalarımız yakında burada.</p>;
  const certificate = selected === null ? null : certificates[selected];
  return <><section className="certificate-gallery" aria-label="Sertifikalarımız">{certificates.map((item, index) => <figure key={item.id}><button className="certificate-trigger" type="button" aria-haspopup="dialog" aria-label={`${item.title} sertifikasını aç`} onClick={() => setSelected(index)}>{item.type === "image" ? <Image src={item.file} alt={item.title} fill unoptimized sizes="(max-width:700px) 88vw, (max-width:1050px) 43vw, 29vw"/> : <span className="certificate-pdf-cover"><svg viewBox="0 0 64 80" fill="none" aria-hidden="true"><path d="M8 2h30l18 18v58H8V2Z" stroke="currentColor" strokeWidth="2"/><path d="M38 2v20h18M19 40h26M19 49h26M19 58h17" stroke="currentColor" strokeWidth="2"/></svg><span>PDF</span></span>}<span className="reference-gallery-expand" aria-hidden="true">↗</span></button><figcaption>{item.title}</figcaption></figure>)}</section>
    <dialog className="reference-lightbox certificate-lightbox" ref={dialogRef} aria-labelledby="certificate-lightbox-title" onClose={event => { if (!event.currentTarget.open) setSelected(null); }} onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }} onKeyDown={event => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }}><div className="reference-lightbox-inner"><header><p id="certificate-lightbox-title">{certificate?.title ?? "Sertifika"}</p><button type="button" onClick={() => dialogRef.current?.close()} aria-label="Sertifikayı kapat">×</button></header>{certificate && <div className="reference-lightbox-image certificate-preview">{certificate.type === "pdf" ? <object key={certificate.id} data={certificate.file} type="application/pdf" aria-label={certificate.title}><p>Bu tarayıcı PDF önizlemesini desteklemiyor. Aşağıdaki bağlantıdan dosyayı açabilirsiniz.</p></object> : <Image src={certificate.file} alt={certificate.title} fill unoptimized sizes="90vw"/>}</div>}<footer><button type="button" onClick={() => move(-1)} disabled={certificates.length < 2} aria-label="Önceki sertifika">←</button><span aria-live="polite" aria-atomic="true">{(selected ?? 0) + 1} / {certificates.length}</span><button type="button" onClick={() => move(1)} disabled={certificates.length < 2} aria-label="Sonraki sertifika">→</button>{certificate && <a href={certificate.file} target="_blank" rel="noopener noreferrer">Dosyayı aç ↗</a>}</footer></div></dialog>
  </>;
}
