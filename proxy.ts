import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server";

export async function proxy(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedRoutes = ["/ai", "/pricing", "/billing"];

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  if (!user && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
