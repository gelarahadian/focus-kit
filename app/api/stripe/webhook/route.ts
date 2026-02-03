import { stripe } from "@/lib/stripe/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createBrowserClient } from "@supabase/ssr";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // WAJIB SERVICE ROLE
  );

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription as string;

        if (!userId) break;

        // Update profile plan
        await supabase
          .from("profiles")
          .update({
            plan: "pro",
            stripe_customer_id: session.customer,
          })
          .eq("id", userId);

        // Save subscription
        await supabase.from("subscriptions").insert({
          user_id: userId,
          stripe_subscription_id: subscriptionId,
          status: "active",
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await supabase
          .from("subscriptions")
          .update({ status: "canceled" })
          .eq("stripe_subscription_id", subscription.id);

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
