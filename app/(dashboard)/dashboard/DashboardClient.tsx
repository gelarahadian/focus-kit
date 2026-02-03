"use client";

import { useSearchParams } from "next/navigation";

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  return (
    <div>
      {success && <p>Payment Success 🎉</p>}
      page
    </div>
  );
}
