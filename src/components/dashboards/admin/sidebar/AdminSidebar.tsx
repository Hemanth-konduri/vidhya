"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  {
    label: "Overview",
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
    label: "Classes & Sections",
    href: "/dashboards/admin/classes",
    icon: Layers,
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
    <aside className="w-64 bg-white border-r p-4 flex-shrink-0">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-500 uppercase">
          Admin Panel
        </h2>
      </div>

      <nav className="space-y-1">
        {menu.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
                ${
                  active
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}