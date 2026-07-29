"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const { user, isLoggedIn, isHydrated } = useUserStore();

  // Nested object handle kar diya: user.role YA user.user.role
  const userRole = user?.role || user?.user?.role;
  const isAdmin = isLoggedIn && userRole === "admin";

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAdmin) {
      router.replace("/");
    }
  }, [isHydrated, isAdmin, router]);

  // Loading state jab tak Zustand LocalStorage sync na ho
  if (!isHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Checking Admin Authorization...
        </p>
      </div>
    );
  }

  // Redirecting state
  if (!isAdmin) {
    return null;
  }

  return children;
}