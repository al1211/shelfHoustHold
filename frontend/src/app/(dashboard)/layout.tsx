"use client"
import Sidebar from "../../../components/layout/Sidebar";

import { useRouter } from "next/navigation";

import { useAuthStore } from "../../../store/store";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const user = useAuthStore((state: any) => state.user);
  const token = useAuthStore((state: any) => state.token); const hydrated = useAuthStore.persist.hasHydrated();

  const hydrate = useAuthStore.persist.hasHydrated();
  useEffect(() => {
    if (hydrate && !token) {
      router.replace("/signin")
    }
  }, [hydrate, token, user])
  if (!hydrated) {
    return <div>Loading...</div>;
  }
  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar name={user.name} />

      <main className="lg:ml-64 p-6">
        {children}
      </main>
    </div>
  );
}