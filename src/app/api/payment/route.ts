import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@lib";
import { ICheckoutBody } from "@types";

export async function POST(req: Request) {
  const body = (await req.json()) as ICheckoutBody;
  const origin = req.headers.get("origin") || "http://localhost:3000";

  const success_url = !body.customerId
    ? `${origin}/signup?session_id={CHECKOUT_SESSION_ID}`
    : `${origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`;

  try {
    const session = await stripe.checkout.sessions.create({
      customer: body.customerId,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "brl",
            unit_amount: body.total,
            product_data: {
              name:  'Produtos',
              description: 'comprar todos os produtos'
            },
          },
          quantity: 1,
        },
      ],
      success_url: success_url,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json(session);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
