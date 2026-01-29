"use client";

import { useParams } from "next/navigation";
import ClassProfileHeader from "@/components/dashboards/admin/classes/ClassProfileHeader";
import ClassProfileSidebar from "@/components/dashboards/admin/classes/ClassProfileSidebar";
import ClassPerformanceCharts from "@/components/dashboards/admin/classes/ClassPerformanceCharts";
import ClassStudentsList from "@/components/dashboards/admin/classes/ClassStudentsList";
import ClassAnnouncements from "@/components/dashboards/admin/classes/ClassAnnouncements";

export default function ClassProfilePage() {
  const { classId } = useParams();

  const classData = {
    id: classId as string,
    name: "CSE 1-A",
    classIncharge: "Dr. Priya Sharma",
    totalStudents: 45,
    branch: "Computer Science",
    group: "Group A",
    specialization: "Software Development",
    semester: "1st Semester",
    academicYear: "2025-2026",
    room: "Block A - Room 101",
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500">
          Dashboard / Classes / {classData.name}
        </p>
        <h1 className="text-2xl font-semibold">
          {classData.name}
        </h1>
      </div>

      {/* CLASS PROFILE HEADER - CLASS INCHARGE & DETAILS */}
      <ClassProfileHeader classData={classData} />

      {/* KEY STATS ROW - MOVED TO TOP */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 font-medium">Attendance Rate</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">87%</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L5.257 19.393A2 2 0 005 18.46V5a2 2 0 012-2h12a2 2 0 012 2z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 font-medium">Avg Performance</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">78%</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 font-medium">Semester</p>
          </div>
          <p className="text-lg font-bold text-slate-900">1st Semester</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 font-medium">Class Room</p>
          </div>
          <p className="text-lg font-bold text-slate-900">Block A - Room 101</p>
        </div>
      </div>

      {/* MAIN GRID - CHARTS + STUDENTS & ANNOUNCEMENTS */}
      <div className="space-y-6">

        {/* PERFORMANCE CHARTS */}
        <ClassPerformanceCharts />

        {/* BOTTOM ROW - STUDENTS & ANNOUNCEMENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClassStudentsList />
          <ClassAnnouncements />
        </div>

        {/* CLASS DETAILS */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="font-semibold text-slate-900 mb-4">Class Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-slate-500 mb-1">Academic Year</p>
              <p className="font-medium text-slate-900">{classData.academicYear}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Branch</p>
              <p className="font-medium text-slate-900">{classData.branch}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Specialization</p>
              <p className="font-medium text-slate-900">{classData.specialization}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
