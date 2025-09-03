"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export function LogoutButton({ variant = "ghost" }: { variant?: "ghost" | "outline" | "default" }) {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Button variant={variant} onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Keluar
    </Button>
  );
}
