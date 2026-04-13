'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserById } from "@/service/user/getUser";

export function useAuthGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validate() {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        router.push("/auth");
        return;
      }

      try {
        await getUserById(userId);
      } catch (error) {
        localStorage.removeItem("userId");
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