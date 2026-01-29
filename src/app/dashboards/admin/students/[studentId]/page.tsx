"use client";

import { useParams } from "next/navigation";
import StudentProfileSidebar from "@/components/dashboards/admin/student/StudentProfileSidebar";

import AttendanceChart from "@/components/dashboards/admin/student/AttendenceChart";
import LearningActivityChart from "@/components/dashboards/admin/student/LearningActivityChart";
import PerformanceDonut from "@/components/dashboards/admin/student/PerformanceDonut";
import EnrolledCoursesList from "@/components/dashboards/admin/student/EnrolledCoursesList";
import FeedbackComplaints from "@/components/dashboards/admin/student/FeedbackComplaints";

export default function StudentProfilePage() {
  const { studentId } = useParams();

  const student = {
    id: studentId as string,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    address: "Hyderabad, India",
    status: "Active" as "Active" | "Disabled",
  };

  return (
  <div className="space-y-6">

    {/* PAGE HEADER */}
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <p className="text-sm text-slate-500">
          Dashboard / Students / {student.name}
        </p>

        <h1 className="text-2xl font-semibold">
          {student.name}
        </h1>

        <p className="text-sm text-slate-500">
          Student ID: {student.id}
        </p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50">
          Edit Student
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
    <StudentProfileSidebar
      name={student.name}
      studentId={student.id}
      email={student.email}
      phone={student.phone}
      address={student.address}
      status={student.status}
    />

    {/* MAIN CONTENT */}
    <div className="space-y-6">

      {/* THREE GRAPHS IN ONE ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AttendanceChart />
        <LearningActivityChart />
        <PerformanceDonut />
      </div>

      {/* FEEDBACK/COMPLAINTS AND COURSES IN ONE ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        <FeedbackComplaints />
        <EnrolledCoursesList />
      </div>

    </div>

  </div>
);
}