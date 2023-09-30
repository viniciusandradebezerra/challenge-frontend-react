import { ICheckoutBody } from "@types";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

const apiUrl = "http://localhost:3000/api/payment";

const checkout = async (body: ICheckoutBody) => {
  const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
  const stripe = await loadStripe(STRIPE_PK);

  try {
    const response = await fetch(apiUrl, {
      method: "post",
      body: JSON.stringify(body, null),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to create Stripe Checkout session.");
    }
    const data = (await response.json()) as Stripe.Checkout.Session;
    const sessionId = data.id;

    if (sessionId) {
      stripe?.redirectToCheckout({ sessionId });
    } else {
      throw new Error("Session ID is missing in the API response.");
    }
  } catch (error) {
    console.error("Payment error:", error);
  }
};

export const PaymentApi = {
  checkout,
};
