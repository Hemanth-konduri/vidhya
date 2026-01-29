"use client";

import { Search } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

export default function AdminNavbar() {
  return (
    <header className="h-16 px-6 flex items-center justify-between bg-transparent shadow-[0_1px_0_rgba(0,0,0,0.04)]">

      {/* Left - Search */}
      <div className="relative w-70 hidden md:block">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search students, teachers, courses..."
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-100 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5 ml-auto">

        {/* Notifications Dropdown */}
        <NotificationDropdown />

        {/* Profile Dropdown */}
        <ProfileDropdown />

      </div>
    </header>
  );
}