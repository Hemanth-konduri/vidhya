"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Users,
  BarChart3,
  Layers,
  MessageSquare,
} from "lucide-react";

const menu = [
  { label: "Dashboard", href: "/dashboards/teacher", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboards/teacher/courses", icon: BookOpen },
  { label: "Course Content", href: "/dashboards/teacher/content", icon: Layers },
  { label: "Assignments", href: "/dashboards/teacher/assignments", icon: ClipboardList },
  { label: "Submissions", href: "/dashboards/teacher/submissions", icon: ClipboardList },
  { label: "Students", href: "/dashboards/teacher/student", icon: Users },
  { label: "Reports", href: "/dashboards/teacher/reports", icon: BarChart3 },
  { label: "Messages", href: "/dashboards/teacher/messages", icon: MessageSquare },
];

export default function TeacherSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="w-65 h-screen bg-[#eef2ff] p-4 shrink-0">

      {/* INNER PANEL */}
      <div className="h-full rounded-[28px] bg-[#3730a3] px-4 py-6 
                      flex flex-col overflow-hidden">

        {/* LOGO */}
        <div className="flex items-center gap-2 mb-8 px-2 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-500
                          flex items-center justify-center text-white font-bold">
            👨‍🏫
          </div>
          <span className="text-lg font-semibold text-white">
            Teacher Panel
          </span>
        </div>

        {/* TITLE */}
        <p className="text-xs uppercase tracking-wide text-indigo-200 mb-3 px-2 shrink-0">
          Teaching Menu
        </p>

        {/* SCROLL AREA */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">

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
                        ? "bg-indigo-500 text-white"
                        : "text-indigo-100 hover:bg-indigo-600"
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

        {/* FOOTER */}
        <p className="text-xs text-indigo-200 text-center mt-4 shrink-0">
          © 2026 College LMS
        </p>

      </div>
    </aside>
  );
}
