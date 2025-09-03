"use client";

import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, initDefaultUser } = useAuthStore();
  
  useEffect(() => {
    // Jika belum login, auto login dengan user default
    if (!isAuthenticated) {
      initDefaultUser();
    }
    
    // Redirect ke dashboard
    router.replace("/dashboard");
  }, [isAuthenticated, initDefaultUser, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-primary">Pake</span>Link
        </h1>
        <p className="text-gray-500">Memuat aplikasi...</p>
      </div>
    </div>
  );
}
