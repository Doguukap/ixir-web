import "server-only";

export type Certificate = { id: number; title: string; file: string; type: "pdf" | "image" };

export async function getCertificates(): Promise<Certificate[]> {
  const base = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/certificates`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`Certificates API returned ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.certificates)) throw new Error("Invalid certificates response");
    return data.certificates;
  } catch (error) {
    console.error("Sertifikalara erişilemedi.", error instanceof Error ? error.message : "Bağlantı hatası");
    return [];
  }
}
