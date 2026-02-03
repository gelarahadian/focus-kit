import { Suspense } from "react";
import DashboardClient from "./DashboardClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardClient />
    </Suspense>
  );
}
