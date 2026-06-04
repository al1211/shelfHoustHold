"use client"
import Sidebar from "../../../components/layout/Sidebar";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "../../../store/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //  const router=useRouter();

  //  const user=useAuthStore((state:any)=>state.user)
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="lg:ml-64 p-6">
        {children}
      </main>
    </div>
  );
}