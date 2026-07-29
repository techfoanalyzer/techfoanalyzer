"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function UserGuard({ children }) {
  const router = useRouter();
  const { isLoggedIn, isHydrated } = useUserStore();

  useEffect(() => {
    if (!isHydrated) return;

  
    if (!isLoggedIn) {
      router.replace("/sign-in");
    }
  }, [isHydrated, isLoggedIn, router]);


  if (!isHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Authenticating...
        </p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return children;
}