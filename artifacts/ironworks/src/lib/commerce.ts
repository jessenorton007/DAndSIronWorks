export interface PurchasePayload {
  productId: string;
  productTitle: string;
  productType: string;
  priceLabel: string;
  quantity: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
  };
  deliveryPreference: string;
  notes: string;
}

export interface PurchaseResponse {
  ok: boolean;
  orderId: string;
  paymentStatus: "payment_link_ready" | "needs_quickbooks_setup";
  paymentUrl?: string;
  emailSent: boolean;
  message: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

async function postJson<T>(url: string, payload: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error || "Request failed");
  }
  return data as T;
}

export function submitPurchase(payload: PurchasePayload) {
  return postJson<PurchaseResponse>("/api/commerce/purchase-intents", payload);
}

export function submitContact(payload: ContactPayload) {
  return postJson<{ ok: boolean; messageId: string; emailSent: boolean }>("/api/commerce/contact", payload);
}
