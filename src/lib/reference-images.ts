import "server-only";

export type ReferenceImage = { id: number; title: string; image: string };

export async function getReferenceImages(): Promise<ReferenceImage[]> {
  const base = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/reference-images`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`Reference API returned ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.images)) throw new Error("Invalid reference gallery response");
    return data.images;
  } catch (error) {
    console.error("Referans görsellerine erişilemedi.", error instanceof Error ? error.message : "Bağlantı hatası");
    return [];
  }
}
