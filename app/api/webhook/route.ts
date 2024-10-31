import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const apiPublishKey: string =
  "rk_test_51QFsenGa59wnwU2e0CueqmrBqiBaRJgtpla8bYw118VZwhLNvG8gJoj0SctQ4HnohbyH7RVB6tFqA1HG7wfKiRIs00oRfmarkG";
const stripe = new Stripe(apiPublishKey);
export async function POST(req: NextRequest) {
  const payload = await req.text();
  // const res = JSON.parse(payload);
  const sig = req.headers.get("stripe-signature");
  // const dateTime = new Date(response.created * 1000).toLocaleDateString();
  // const timeString = new Date(response.created * 1000).toLocaleDateString();

  try {
    const event = stripe.webhooks.constructEvent(payload, sig!, apiPublishKey);
    console.log("Event", event.type);
    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}
