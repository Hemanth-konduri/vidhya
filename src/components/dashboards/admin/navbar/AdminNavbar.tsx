"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  Search,
  Bell,
  LogOut,
} from "lucide-react";

export default function AdminNavbar() {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <header  className="h-16 px-6 flex items-center justify-between bg-transparent shadow-[0_1px_0_rgba(0,0,0,0.04)]">

      {/* Left - Search */}
      <div className="relative w-70 hidden md:block">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search students, teachers, courses..."
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-100 text-sm outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5 ml-auto">

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center">
            1
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-slate-700">
              John Doe
            </p>
            <p className="text-xs text-slate-500">
              Admin
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
            JD
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-100 transition"
          title="Logout"
        >
          <LogOut className="w-4 h-4 text-slate-600" />
        </button>

      </div>
    </header>
  );
}