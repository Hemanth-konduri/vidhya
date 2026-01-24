"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AdminNavbar() {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b bg-white">
      <h1 className="text-lg font-semibold">
        Vidhya LMS <span className="text-slate-500">/ Admin</span>
      </h1>

      <button
        onClick={logout}
        className="text-sm text-red-600 hover:text-red-700"
      >
        Logout
      </button>
    </header>
  );
}