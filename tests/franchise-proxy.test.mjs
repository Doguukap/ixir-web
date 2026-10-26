import { afterEach, beforeEach, mock, test } from "node:test";
import assert from "node:assert/strict";
import { POST as franchisePOST } from "../src/app/api/franchise-applications/route.ts";
import { POST as newsletterPOST } from "../src/app/api/newsletter-subscriptions/route.ts";
import { POST as contactPOST } from "../src/app/api/contact-messages/route.ts";
import { POST as academyPOST } from "../src/app/api/academy-applications/route.ts";

beforeEach(() => mock.method(console, "error", () => {}));
afterEach(() => mock.restoreAll());
for (const [label, POST, endpoint] of [["franchise", franchisePOST, "/api/franchise-applications"], ["academy", academyPOST, "/api/academy-applications"], ["newsletter", newsletterPOST, "/api/newsletter-subscriptions"], ["contact", contactPOST, "/api/contact-messages"]]) {
const request = () => new Request(`http://localhost${endpoint}`, { method: "POST", body: JSON.stringify({ name: "Başvuru" }) });

test(`${label}: success requires a confirmed database save`, async () => {
  mock.method(globalThis, "fetch", async () => Response.json({ saved: true }, { status: 201 }));
  const response = await POST(request());
  assert.ok(globalThis.fetch.mock.calls[0].arguments[0].endsWith(endpoint));
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { saved: true });
});

test(`${label}: backend validation errors reach the form`, async () => {
  const errors = { consent: ["Onay gerekli."] };
  mock.method(globalThis, "fetch", async () => Response.json({ errors }, { status: 422 }));
  const response = await POST(request());
  assert.equal(response.status, 422);
  assert.deepEqual(await response.json(), { errors });
});

test(`${label}: database failure never reports success or exposes backend details`, async () => {
  mock.method(globalThis, "fetch", async () => new Response("SQL connection details", { status: 500 }));
  const response = await POST(request());
  assert.equal(response.status, 503);
  assert.equal((await response.text()).includes("SQL connection details"), false);
});

test(`${label}: an unconfirmed success response is treated as a failure`, async () => {
  mock.method(globalThis, "fetch", async () => Response.json({}, { status: 201 }));
  assert.equal((await POST(request())).status, 503);
});

test(`${label}: connection failure returns a retryable failure`, async () => {
  mock.method(globalThis, "fetch", async () => { throw new Error("unavailable"); });
  assert.equal((await POST(request())).status, 503);
});

test(`${label}: rate limits are preserved`, async () => {
  mock.method(globalThis, "fetch", async () => Response.json({}, { status: 429 }));
  assert.equal((await POST(request())).status, 429);
});

test(`${label}: malformed and oversized requests never contact the backend`, async () => {
  const upstream = mock.method(globalThis, "fetch", async () => { throw new Error("must not be called"); });
  assert.equal((await POST(new Request(`http://localhost${endpoint}`, { method: "POST", body: "{" }))).status, 400);
  assert.equal((await POST(new Request(`http://localhost${endpoint}`, { method: "POST", body: "x".repeat(20001) }))).status, 413);
  assert.equal(upstream.mock.callCount(), 0);
});

}
