"use client";

import { useState } from "react";
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
  Plus,
  ChevronDown,
} from "lucide-react";

const menu = [
  { label: "Dashboard", href: "/dashboards/admin", icon: LayoutDashboard },
  { label: "Students", href: "/dashboards/admin/students", icon: Users },
  { label: "Teachers", href: "/dashboards/admin/teachers", icon: GraduationCap },
  { label: "Courses", href: "/dashboards/admin/courses", icon: BookOpen },
  { label: "Classes", href: "/dashboards/admin/classes", icon: Layers },
  { label: "Assignments", href: "/dashboards/admin/assignments", icon: ClipboardList },
  { label: "Reports", href: "/dashboards/admin/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboards/admin/settings", icon: Settings },
];

const addNewItems = [
  { label: "Student", href: "/dashboards/admin/add/student" },
  { label: "Teacher", href: "/dashboards/admin/add/teacher" },
  { label: "Course", href: "/dashboards/admin/add/course" },
  { label: "Class", href: "/dashboards/admin/add/class" },
  { label: "Batch", href: "/dashboards/admin/add/batch" },
  { label: "Department", href: "/dashboards/admin/add/department" },
  { label: "Program", href: "/dashboards/admin/add/program" },
  { label: "Assign Student to Batch", href: "/dashboards/admin/assign/student-to-batch" },
  { label: "Assign Teacher to Course", href: "/dashboards/admin/assign/teacher-to-course" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  return (
    <aside className="w-65 h-screen bg-[#eaf3e6] p-4 shrink-0">

      {/* INNER PANEL */}
      <div className="h-full rounded-[28px] bg-[#3f5f3a] px-4 py-6 flex flex-col overflow-hidden">

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-8 px-2 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-green-500 
                          flex items-center justify-center text-white font-bold">
            🎓
          </div>
          <span className="text-lg font-semibold text-white">
            College LMS
          </span>
        </div>

        {/* SECTION TITLE */}
        <p className="text-xs uppercase tracking-wide text-green-200 mb-3 px-2 shrink-0">
          Main Menu
        </p>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {/* ADD NEW SECTION */}
          <div className="mb-4">
            <button
              onClick={() => setShowAddDropdown(!showAddDropdown)}
              className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg
                         bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition"
            >
              <div className="flex items-center gap-3">
                <Plus className="w-4 h-4" />
                Add New
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${
                showAddDropdown ? 'rotate-180' : ''
              }`} />
            </button>

            {showAddDropdown && (
              <div className="mt-2 space-y-1">
                {addNewItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      setShowAddDropdown(false);
                    }}
                    className="w-full text-left px-6 py-2 text-sm text-green-100 hover:bg-[#4f7446]
                             rounded-lg transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* MENU */}
          <nav className="flex flex-col gap-1">
            {menu.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 rounded-lg
                    text-sm font-medium transition
                    ${
                      active
                        ? "bg-[#5f8d4e] text-white"
                        : "text-green-100 hover:bg-[#4f7446]"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* FOOTER TEXT */}
        <p className="text-xs text-green-300 text-center mt-4 shrink-0">
          © 2026 College LMS
        </p>

      </div>
    </aside>
  );
}