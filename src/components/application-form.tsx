"use client";
import { useState } from "react";
export default function ApplicationForm({ type }: {type:"Akademi"|"Franchising"}) {
  const [ready,setReady]=useState(false);
  return <form className="detail-application" onSubmit={event=>{event.preventDefault();const data=new FormData(event.currentTarget);const message=`Merhaba, ${type} hakkında bilgi almak istiyorum.\nAd Soyad: ${data.get('name')}\nTelefon: ${data.get('phone')}\nŞehir: ${data.get('city')}\nMesaj: ${data.get('message')}`;const url=`https://wa.me/905396660000?text=${encodeURIComponent(message)}`;window.open(url,'_blank','noopener,noreferrer');setReady(true);}}>
    <h2>{type} başvurusu</h2><p>Bilgilerinizi doldurun, talebinizi WhatsApp üzerinden bize iletin.</p>
    <div className="detail-form-grid"><label>Ad Soyad<input name="name" autoComplete="name" required maxLength={100}/></label><label>Telefon<input name="phone" type="tel" autoComplete="tel" required maxLength={30}/></label></div>
    <label>Şehir<input name="city" autoComplete="address-level2" required maxLength={100}/></label><label>{type==='Akademi'?'İlgilendiğiniz eğitim ve mesajınız':'Yatırım planınız ve mesajınız'}<textarea name="message" required rows={4} maxLength={2000}/></label>
    <button type="submit">WhatsApp ile başvur <span aria-hidden="true">↗</span></button>{ready&&<p role="status">Başvuruyu tamamlamak için WhatsApp’ta açılan mesajı gönderin.</p>}
  </form>;
}
