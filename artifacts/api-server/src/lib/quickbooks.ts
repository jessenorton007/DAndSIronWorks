export interface QuickBooksPaymentRequest {
  orderId: string;
  productTitle: string;
  priceLabel: string;
  quantity: number;
  customerEmail: string;
}

export interface QuickBooksPaymentResult {
  status: "payment_link_ready" | "needs_quickbooks_setup";
  paymentUrl?: string;
  message: string;
}

export async function createQuickBooksPaymentRequest(
  request: QuickBooksPaymentRequest,
): Promise<QuickBooksPaymentResult> {
  const paymentUrl = process.env["QUICKBOOKS_PAYMENT_URL"];
  if (paymentUrl) {
    const url = new URL(paymentUrl);
    url.searchParams.set("order", request.orderId);
    url.searchParams.set("item", request.productTitle);
    url.searchParams.set("email", request.customerEmail);
    return {
      status: "payment_link_ready",
      paymentUrl: url.toString(),
      message: "QuickBooks payment link is ready.",
    };
  }

  return {
    status: "needs_quickbooks_setup",
    message:
      "Order was received. QuickBooks payment is not configured yet, so D&S will send the payment request manually.",
  };
}
