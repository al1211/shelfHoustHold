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

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Household", href: "/household", icon: House },
  { name: "Items", href: "/items", icon: Package },
  { name: "Add Item", href: "/add-item", icon: PlusCircle },
];

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
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 border
        ${
          isActive
            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800 font-medium"
            : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-100 font-normal"
        }`}
    >
      <span
        className={`flex items-center justify-center w-[30px] h-[30px] rounded-lg flex-shrink-0 transition-all duration-150
          ${isActive
            ? "bg-white shadow-sm text-green-600"
            : "text-gray-400 group-hover:text-gray-600"
          }`}
      >
        <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
      </span>
      {item.name}
      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
      )}
    </Link>
  );
}

function SidebarContent({
  isMobile = false,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full font-sans">

      {/* Logo */}
      <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_2px_8px_rgba(34,197,94,0.35)] flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 tracking-tight leading-tight">
              ExpiryTracker
            </p>
            <p className="text-[11px] text-gray-400 font-normal">
              Kitchen manager
            </p>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="bg-gray-50 border border-gray-100 rounded-lg p-1.5 flex items-center text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* User chip */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-200 to-teal-300 flex items-center justify-center text-xs font-semibold text-emerald-900 flex-shrink-0">
            AK
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-gray-900 truncate">Aryan Kumar</p>
            <p className="text-[11px] text-gray-400">Home Household</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-green-400 flex-shrink-0 shadow-[0_0_0_2px_#dcfce7]" />
        </div>
      </div>

      {/* Nav label */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10.5px] font-semibold text-gray-300 uppercase tracking-widest">
          Navigation
        </p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 flex flex-col gap-0.5">
        {links.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            onClick={isMobile ? onClose : undefined}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 pt-4 border-t border-gray-100 flex flex-col gap-2">
        {/* Efficiency score */}
        <div className="px-3.5 py-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 mb-1">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[11.5px] font-medium text-green-800">Efficiency Score</p>
            <span className="text-[12px] font-bold text-green-600">84%</span>
          </div>
          <div className="h-1 bg-green-100 rounded-full overflow-hidden">
            <div className="w-[84%] h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
          </div>
        </div>

        {/* Logout */}
        <button className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 border border-transparent hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all duration-150 w-full text-left">
          <span className="flex items-center justify-center w-[30px] h-[30px] rounded-lg flex-shrink-0">
            <LogOut size={16} strokeWidth={1.8} />
          </span>
          Logout
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top navbar */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3.5 bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_2px_6px_rgba(34,197,94,0.3)]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-gray-900 tracking-tight">
            ExpiryTracker
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-gray-50 border border-gray-100 rounded-[9px] p-2 flex items-center text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div
            className="absolute top-0 left-0 bottom-0 w-68 bg-white shadow-2xl"
            style={{ animation: "slideIn 0.22s ease" }}
          >
            <SidebarContent isMobile onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-100 shadow-[1px_0_0_#F3F4F6,4px_0_20px_rgba(0,0,0,0.03)] z-40">
        <SidebarContent />
      </aside>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}