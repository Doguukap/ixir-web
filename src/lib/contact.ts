export function contactUrl(topic: string, language: "tr" | "en" = "tr") {
  const message = language === "tr" ? `Merhaba, ${topic} hakkında bilgi almak istiyorum.` : `Hello, I would like more information about ${topic}.`;
  return `https://wa.me/905396660000?text=${encodeURIComponent(message)}`;
}
