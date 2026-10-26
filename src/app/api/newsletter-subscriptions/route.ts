export async function POST(request: Request) {
  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > 20000) return Response.json({ message: "Form çok uzun." }, { status: 413 });
    payload = JSON.parse(body);
  } catch {
    return Response.json({ message: "Geçersiz form verisi." }, { status: 400 });
  }

  const base = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/newsletter-subscriptions`, {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload), cache: "no-store", signal: AbortSignal.timeout(15000),
    });
    if (response.status === 422) {
      const data = await response.json();
      return Response.json({ errors: data.errors }, { status: 422 });
    }
    if (response.status === 429) return Response.json({ message: "Lütfen biraz sonra tekrar deneyin." }, { status: 429 });
    if (response.status !== 201) throw new Error(`Application API returned ${response.status}`);
    const data = await response.json();
    if (data.saved !== true) throw new Error("Application API did not confirm persistence");
    return Response.json({ saved: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Bülten kaydı iletilemedi.", error instanceof Error ? error.message : "Bağlantı hatası");
    return Response.json({ message: "Bülten kaydı şu anda tamamlanamıyor." }, { status: 503 });
  }
}
