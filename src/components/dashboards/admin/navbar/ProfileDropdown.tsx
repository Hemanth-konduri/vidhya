"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { User, Settings, LogOut, Mail, Bell } from "lucide-react";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const profileItems = [
    {
      icon: User,
      label: "My Profile",
      action: () => {
        router.push("/dashboards/admin/profile");
        setIsOpen(false);
      },
    },
    {
      icon: Mail,
      label: "Messages",
      action: () => {
        router.push("/dashboards/admin/messages");
        setIsOpen(false);
      },
    },
    {
      icon: Bell,
      label: "Send Notifications",
      action: () => {
        router.push("/dashboards/admin/notifications");
        setIsOpen(false);
      },
    },
    {
      icon: Settings,
      label: "Settings",
      action: () => {
        router.push("/dashboards/admin/settings");
        setIsOpen(false);
      },
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* PROFILE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-slate-100 rounded-lg px-2 py-1 transition"
      >
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold text-slate-700">John Doe</p>
          <p className="text-xs text-slate-500">Admin</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          JD
        </div>
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 z-50">

          {/* PROFILE INFO */}
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">
                JD
              </div>
              <div>
                <p className="font-semibold text-slate-900">John Doe</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">john.doe@college.edu</p>
          </div>

          {/* MENU ITEMS */}
          <div className="py-2">
            {profileItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full px-4 py-2 flex items-center gap-3 text-slate-700 hover:bg-slate-100 transition text-sm"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* LOGOUT */}
          <div className="border-t border-slate-200 p-2">
            <button
              onClick={logout}
              className="w-full px-4 py-2 flex items-center gap-3 text-red-600 hover:bg-red-50 transition text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
