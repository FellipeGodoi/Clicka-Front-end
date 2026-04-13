import ShopContent from "@/contents/shop-content/ShopContent";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={null} >
      <ShopContent/>
    </Suspense>
  );
}
