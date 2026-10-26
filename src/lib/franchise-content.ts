export const franchiseInvitation = "Aşağıda yer alan Franchising Başvuru Formunu doldurarak İxir Güzellik'in yüksek kazançlı, avantajlı iş ortaklığına dahil olun !";

const requirements = [
  { title: "Franchising Düşünülen İşyerinin;", items: [
    "Minimum 150 m² olması,",
    "İşlek yaya ve araç trafiği olan ana cadde üzerinde olması,",
    "Sorunsuz internet, su, elektrik alt yapısına sahip olması,",
    "Komşu işletmelerin müşterilere rahatsız hissetmeyecek bir işletme olması (iddaa bayii, ganyan bayii, kasap vs. olmaması ),",
    "İxir Güzellik bayisi olan il veya ilçede olmaması (Nüfusu 3.000.000'u geçmeyen il ve ilçeler için geçerlidir.)",
  ] },
  { title: "Franchising İşleten Kişinin;", items: [
    "18 yaşını doldurmuş T.C. vatandaşı olması, T.C. vatandaşı olmayan işletmecilerin Türkiye Cumhuriyeti'nde çalışma izni olması,",
    "Ağır suçlar ile ilgili hiçbir sabıka kaydının olmaması,",
    "Franchising düşünülen il veya ilçeyi iyi tanıyor olması,",
    "Güzellik ve Estetik alanında en az 3 yıl deneyimli olması, deneyimli değil ise İxir Akademi tarafından eğitim görmeyi kabul etmesi şartları bulunmaktadır.",
  ] },
];
export const franchiseQuestions: { id: string; title: string; paragraphs?: string[]; groups?: { title?: string; items: string[] }[]; closing?: string }[] = [
  { id: "neden-ixir", title: "Neden İxir?", paragraphs: [
    "14 yıllık deneyim, uzman kadro ve yüksek marka değeri ve geniş hizmet kapasitesi ile İxir Güzellik Franshising almak isteyen yatırımcılara rakiplerine nazaran büyük bir avantaj sağlamaktadır. Bunun yanı sıra Franchising destekleri ile İxir Güzellik Franchising almak isteyenlere çok büyük kolaylıklar sağlamakta, harika fırsatlar sunmaktadır.",
    "Şimdi Franchising şartlarımızı kontrol edin ve",
  ] },
  { id: "avantajlar", title: "Franchising avantajlarınız nelerdir?", groups: [{ items: [
    "Ücretsiz Franchising Bedeli",
    "Düşük Royalty Bedeli ile Yüksek Kar Oranı",
    "Personel Eğitim Desteği",
    "Personel Tedarik Desteği",
    "İndirimli Makine, Teçhizat Desteği,",
    "Reklam ve Tanıtım Hediyesi (Kurulma Özel 50.000₺'lik, tek sefere mahsustur.)",
    "Reklam ve Tanıtım Desteği",
    "Satış, Teknik ve Marka Danışmanlık Desteği",
    "Bayi Koruma Desteği",
  ] }], closing: "vs. gibi daha sayamadığımız birçok destekle İxir Güzellik başlangıçta ve devamında her zaman bayilerinin yanında durur." },
  { id: "sartlar", title: "Franchising şartlarımız nelerdir?", groups: requirements },
  { id: "maliyet", title: "Franchising maliyeti nedir?", groups: requirements },
];

export const franchiseSelectOptions = {
  education: ["İlköğretim", "Lise", "Ön lisans", "Lisans", "Yüksek lisans", "Doktora", "Diğer"],
  source: ["Google / İnternet araması", "Instagram", "Facebook", "YouTube", "Tavsiye", "İxir şubesi", "Diğer"],
  management_plan: ["İşletmeyi kendim yöneteceğim", "Profesyonel yönetici ile çalışacağım", "Ortağımla birlikte yöneteceğim", "Henüz karar vermedim"],
};
