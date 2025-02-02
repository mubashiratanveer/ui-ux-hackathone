import { Suspense } from "react";
import OrderPage from "./orderPage"; // Client Component

export const dynamic = "force-dynamic"; // Ensure dynamic rendering
export const fetchCache = "force-no-store"; // Disable caching

export default function OrderWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPage />
    </Suspense>
  );
}
