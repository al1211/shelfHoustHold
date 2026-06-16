"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../store/store";
import Sidebar from "../../../components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((state: any) => state.user);
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false); // check complete hua ya nahi

  useEffect(() => {
    // localStorage sirf client pe chalega — safe
    const stored = localStorage.getItem("token");
    setToken(stored);
    setChecked(true);

    if (!stored) {
      router.replace("/signin");
    }
  }, []);

  // Check hone tak kuch mat dikhao — flickering nahi hogi
  if (!checked) return null;

  // Token nahi hai toh bhi null (redirect ho raha hai background mein)
  if (!token) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar name={user?.name ?? "User"} /> {/* ?. aur fallback safe hai */}
      <main className="lg:ml-64 p-6">
        {children}
      </main>
    </div>
  );
}