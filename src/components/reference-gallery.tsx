"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ReferenceImage } from "@/lib/reference-images";

export default function ReferenceGallery({ images }: { images: ReferenceImage[] }) {
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

  function move(direction: number) {
    setSelected(current => current === null ? null : (current + direction + images.length) % images.length);
  }

  if (!images.length) return <p className="reference-gallery-empty">Referans görsellerimiz yakında burada.</p>;
  const image = selected === null ? null : images[selected];
  return <><section className="reference-gallery" aria-label="Referans görselleri">{images.map((item, index) => <figure className="reference-gallery-item" key={item.id}><button className="reference-gallery-trigger" type="button" aria-haspopup="dialog" aria-label={`${item.title} görselini büyüt`} onClick={() => setSelected(index)}><Image src={item.image} alt={item.title} fill unoptimized sizes="(max-width:700px) 88vw, (max-width:1050px) 43vw, 29vw"/><span className="reference-gallery-expand" aria-hidden="true">↗</span></button><figcaption>{item.title}</figcaption></figure>)}</section>
    <dialog className="reference-lightbox" ref={dialogRef} aria-labelledby="reference-lightbox-title" onClose={event => { if (!event.currentTarget.open) setSelected(null); }} onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }} onKeyDown={event => {
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    }}><div className="reference-lightbox-inner"><header><p id="reference-lightbox-title">{image?.title ?? "Referans görseli"}</p><button type="button" onClick={() => dialogRef.current?.close()} aria-label="Görseli kapat">×</button></header>{image && <div className="reference-lightbox-image"><Image src={image.image} alt={image.title} fill unoptimized sizes="90vw"/></div>}<footer><button type="button" onClick={() => move(-1)} disabled={images.length < 2} aria-label="Önceki görsel">←</button><span aria-live="polite" aria-atomic="true">{(selected ?? 0) + 1} / {images.length}</span><button type="button" onClick={() => move(1)} disabled={images.length < 2} aria-label="Sonraki görsel">→</button></footer></div></dialog>
  </>;
}
