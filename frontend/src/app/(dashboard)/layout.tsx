  "use client"
  import Sidebar from "../../../components/layout/Sidebar";

  import { useRouter } from "next/navigation";

  import { useAuthStore } from "../../../store/store";

  export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const router=useRouter();

    const user=useAuthStore((state:any)=>state.user)
    if(!user){
      router.push("/signin")
    }
    console.log("rrun code")
    return (
      <div className="min-h-screen bg-slate-50">
        <Sidebar name={user.name} />

        <main className="lg:ml-64 p-6">
          {children}
        </main>
      </div>
    );
  }