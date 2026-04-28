'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyData } from "@/service/user/getUser";

export function useAuthGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validate() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth");
        return;
      }

      try {
        await getMyData();
      } catch (error) {
        localStorage.removeItem("token");
        router.push("/auth");
        return;
      } finally {
        setLoading(false);
      }
    }

    validate();
  }, [router]);

  return { loading };
}