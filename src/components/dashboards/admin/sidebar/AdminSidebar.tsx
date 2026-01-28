"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  ClipboardList,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    href: "/dashboards/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Students",
    href: "/dashboards/admin/students",
    icon: Users,
  },
  {
    label: "Teachers",
    href: "/dashboards/admin/teachers",
    icon: GraduationCap,
  },
  {
    label: "Courses",
    href: "/dashboards/admin/courses",
    icon: BookOpen,
  },
  {
    label: "Classes",
    href: "/dashboards/admin/classes",
    icon: Layers,
  },
  {
    label: "Assignments",
    href: "/dashboards/admin/assignments",
    icon: ClipboardList,
  },
  {
    label: "Reports",
    href: "/dashboards/admin/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/dashboards/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-[#eef5ea] to-[#e5efe1] border-r border-green-200 px-4 py-6 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold">
          🎓
        </div>
        <span className="text-lg font-semibold text-green-900">
          College LMS
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {menu.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  active
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-green-700"
                }
              `}
            >
              <Icon
                className={`w-5 h-5 ${
                  active ? "text-white" : "text-slate-500"
                }`}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="text-xs text-slate-400 text-center mt-6">
        © 2026 College LMS
      </div>
    </aside>
  );
}