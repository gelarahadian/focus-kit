import { NextResponse } from "next/server";
import { generateAI } from "@/lib/ai";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  // cek usage hari ini
  const today = new Date().toISOString().split("T")[0];

  const { data: usage } = await supabase
    .from("ai_usage")
    .select("*")
    .eq("user_id", user.id)
    .eq("date", today)
    .single();

  if (profile!.plan === "free" && usage?.count >= 5) {
    return NextResponse.json({ error: "Limit reached" }, { status: 403 });
  }

  // generate AI
  const result = await generateAI(prompt);

  // update usage
  if (usage) {
    await supabase
      .from("ai_usage")
      .update({ count: usage.count + 1 })
      .eq("id", usage.id);
  } else {
    await supabase.from("ai_usage").insert({
      user_id: user.id,
      date: today,
      count: 1,
    });
  }

  return NextResponse.json({ result });
}
