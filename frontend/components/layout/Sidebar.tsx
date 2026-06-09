
"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  House,
  Package,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../store/store";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Household", href: "/household", icon: House },
  { name: "Items", href: "/items", icon: Package },
  { name: "Add Item", href: "/add-item", icon: PlusCircle },
];

const getAvatarText = (name: string) => {
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.map((word) => word[0].toUpperCase()).join("");
};


function NavLink({
  item,
  onClick,
}: {
  item: (typeof links)[0];
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;


  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-300 overflow-hidden
        ${isActive
          ? "bg-white/20 backdrop-blur-md border border-white/40 text-white shadow-[0_4px_24px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.3)] font-medium"
          : "border border-transparent text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white/80 font-normal"
        }`}
    >
      {/* Active shimmer effect */}
      {isActive && (
        <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent pointer-events-none" />
      )}

      <span
        className={`relative flex items-center justify-center w-8 h-8 rounded-xl shrink-0 transition-all duration-300
          ${isActive
            ? "bg-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.3)] text-white"
            : "text-white/40 group-hover:text-white/70 group-hover:bg-white/10"
          }`}
      >
        <Icon size={15} strokeWidth={isActive ? 2.2 : 1.8} />
      </span>

      <span className="relative">{item.name}</span>

      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-300 shrink-0 shadow-[0_0_6px_rgba(110,231,183,0.8)]" />
      )}
    </Link>
  );
}

function SidebarContent({
  isMobile = false,
  onClose,
  name,
}: {
  isMobile?: boolean;
  onClose?: () => void;
  name: string;
}) {

  const logout = useAuthStore((state: any) => state.logout)
  const handleLogout = () => {
    logout()
  }
  return (
    <div className="flex flex-col h-full">

      {/* Ambient orbs for glass depth */}
      {/* <div className="absolute top-0 left-0 w-48 h-48 bg-slate-400/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-16 right-0 w-40 h-40 bg-slate-300/15 rounded-full blur-3xl pointer-events-none translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-slate-500/10 rounded-full blur-2xl pointer-events-none -translate-x-1/2 -translate-y-1/2" /> */}

      {/* Logo */}
      <div className="relative flex items-center justify-between px-5 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-2xl bg-linear-to-br from-slate-400/80 to-slate-600/80 flex items-center justify-center shadow-[0_4px_16px_rgba(52,211,153,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-sm border border-white/20 shrink-0">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-white tracking-tight leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              ExpiryTracker
            </p>
            <p className="text-[11px] text-white/40 font-normal tracking-wide">
              Kitchen manager
            </p>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="bg-white/10 border border-white/20 rounded-xl p-1.5 flex items-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200 backdrop-blur-sm"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-linear-to-r from-transparent via-white/15 to-transparent mb-4" />

      {/* User chip */}
      <div className="px-4 mb-5">
        <div className="flex items-center gap-3 px-3.5 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.1)]">
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-emerald-300/80 to-teal-400/80 flex items-center justify-center text-[12px] font-bold text-white shrink-0 border border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
            {getAvatarText(name)}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white/30 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-white truncate leading-tight">{name}</p>
            <p className="text-[11px] text-white/40 tracking-wide">Home Household</p>
          </div>
        </div>
      </div>

      {/* Nav label */}
      <div className="px-5 pb-2">
        <p className="text-[9.5px] font-bold text-white/25 uppercase tracking-[0.18em]">
          Navigation
        </p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 flex flex-col gap-1">
        {links.map((item) => (
          <NavLink key={item.href} item={item} onClick={isMobile ? onClose : undefined} />
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 pt-4">
        {/* Divider */}
        <div className="mx-2 h-px bg-linear-to-r from-transparent via-white/15 to-transparent mb-4" />

        {/* Efficiency score */}
        <div className="px-4 py-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] mb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
              <p className="text-[11.5px] font-semibold text-white/70">Efficiency Score</p>
            </div>
            <span className="text-[13px] font-bold text-emerald-300 tabular-nums">84%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full w-[84%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
              style={{ backgroundSize: "200% 100%" }}
            />
          </div>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm text-white/40 border border-transparent hover:bg-red-500/15 hover:border-red-400/25 hover:text-red-300 transition-all duration-200 w-full text-left">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0 group-hover:bg-red-500/20 transition-all duration-200">
            <LogOut size={15} strokeWidth={1.8} />
          </span>
          Logout
        </button>
      </div>
    </div>
  );
}

export default function Sidebar({ name }: any) {
  const [open, setOpen] = useState(false);

  const newLocal = "absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/85 to-slate-950/90 backdrop-blur-2xl";
  return (
    <>
      {/* Mobile top navbar */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3.5 bg-linear-to-r from-emerald-900/95 to-teal-900/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-linear-to-br from-emerald-400/80 to-teal-600/80 flex items-center justify-center shadow-[0_2px_8px_rgba(52,211,153,0.4)] border border-white/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-white tracking-tight">
            ExpiryTracker
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-white/10 border border-white/20 rounded-xl p-2 flex items-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-200 backdrop-blur-sm"
        >
          <Menu size={17} />
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute top-0 left-0 bottom-0 w-72 overflow-hidden"
            style={{ animation: "slideIn 0.25s cubic-bezier(0.16,1,0.3,1)" }}
          >
            {/* Glass bg for mobile */}
            <div className="absolute inset-0 bg-linear-to-br from-emerald-900/90 via-teal-900/85 to-emerald-950/90 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0ibm9pc2UiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjAzIi8+PC9zdmc+')] opacity-40" />
            <div className="relative h-full">
              <SidebarContent isMobile onClose={() => setOpen(false)} name={name} />
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 z-40 overflow-hidden">
        {/* Layered glass background */}
        <div className={newLocal} />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0ibm9pc2UiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjAzIi8+PC9zdmc+')] opacity-40" />
        {/* Right edge glass border */}
        <div className="absolute top-0 right-0 bottom-0 w-px bg-linear-to-b from-white/10 via-white/10 to-white" />
        <div className="relative h-full">
          <SidebarContent name={name} />
        </div>
      </aside>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}


