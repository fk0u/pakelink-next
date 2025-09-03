"use client";

import { useAuthStore } from "@/lib/store";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AutoLoginRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, initDefaultUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Jika belum login dan bukan di halaman login, auto login dengan user default
    if (!isAuthenticated && !user) {
      console.log("Auto-login with default user");
      initDefaultUser();
      
      // Jika di halaman login, redirect ke dashboard
      if (pathname === "/login") {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, user, initDefaultUser, router, pathname]);

  return <>{children}</>;
}
