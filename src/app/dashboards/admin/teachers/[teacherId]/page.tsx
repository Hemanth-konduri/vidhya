"use client";

import { useParams } from "next/navigation";
import TeacherProfileSidebar from "@/components/dashboards/admin/teacher/TeacherProfileSidebar";
import ClassesAttendanceChart from "@/components/dashboards/admin/teacher/ClassesAttendanceChart";
import TeachingActivityChart from "@/components/dashboards/admin/teacher/TeachingActivityChart";
import TeachingPerformanceDonut from "@/components/dashboards/admin/teacher/TeachingPerformanceDonut";
import AssignedCoursesList from "@/components/dashboards/admin/teacher/AssignedCoursesList";
import StudentFeedback from "@/components/dashboards/admin/teacher/StudentFeedback";
import TeacherComplaints from "@/components/dashboards/admin/teacher/TeacherComplaints";
import RecentAnnouncements from "@/components/dashboards/admin/teacher/RecentAnnouncements";
import ScheduleTimetable from "@/components/dashboards/admin/teacher/ScheduleTimetable";

export default function TeacherProfilePage() {
  const { teacherId } = useParams();

  const teacher = {
    id: teacherId as string,
    name: "Dr. Priya Sharma",
    email: "priya.sharma@college.edu",
    phone: "+91 9876543210",
    department: "Computer Science",
    designation: "Professor",
    experience: 12,
    status: "Active" as "Active" | "Disabled",
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <p className="text-sm text-slate-500">
            Dashboard / Teachers / {teacher.name}
          </p>

          <h1 className="text-2xl font-semibold">
            {teacher.name}
          </h1>

          <p className="text-sm text-slate-500">
            Employee ID: {teacher.id}
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50">
            Edit Teacher
          </button>

          <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm">
            Disable
          </button>

          <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm">
            Delete
          </button>
        </div>

      </div>

      {/* SIDEBAR - TOP */}
      <TeacherProfileSidebar
        name={teacher.name}
        teacherId={teacher.id}
        email={teacher.email}
        phone={teacher.phone}
        department={teacher.department}
        designation={teacher.designation}
        experience={teacher.experience}
        status={teacher.status}
      />

      {/* MAIN CONTENT */}
      <div className="space-y-6">

        {/* THREE GRAPHS IN ONE ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ClassesAttendanceChart />
          <TeachingActivityChart />
          <TeachingPerformanceDonut />
        </div>

        {/* SECOND ROW - 2 CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AssignedCoursesList />
          <StudentFeedback />
        </div>

        {/* THIRD ROW - 2 CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentAnnouncements />
          <TeacherComplaints />
        </div>

        {/* FOURTH ROW - 1 CARD */}
        <ScheduleTimetable />

      </div>

    </div>
  );
}