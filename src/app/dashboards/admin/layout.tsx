"use client";

import type { ReactNode } from "react";
import AdminNavbar from "@/components/dashboards/admin/navbar/AdminNavbar";
import AdminSidebar from "@/components/dashboards/admin/sidebar/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      {/* NAVBAR (fixed height) */}
      <AdminNavbar />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR (fixed, no scroll) */}
        <AdminSidebar />

        {/* MAIN CONTENT (scrolls) */}
        <main className="flex-1 bg-slate-100 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}