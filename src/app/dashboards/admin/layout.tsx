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
    <div className="h-screen flex bg-[#f6f8f6]">

      {/* SIDEBAR */}
      <AdminSidebar className="sticky top-0 z-20" />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* NAVBAR */}
        <AdminNavbar />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#f6f8f6]">
          {children}
        </main>

      </div>

    </div>
  );
}