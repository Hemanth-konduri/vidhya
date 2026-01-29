"use client";

import { useParams } from "next/navigation";

import CourseProfileSidebar from "@/components/dashboards/admin/course/CourseProfileSidebar";
import CourseModules from "@/components/dashboards/admin/course/CourseModules";
import CourseFeedback from "@/components/dashboards/admin/course/CourseFeedback";
import CourseComplaints from "@/components/dashboards/admin/course/CourseComplaints";
import CourseAnalyticsCharts from "@/components/dashboards/admin/course/CourseAnalyticsCharts";

export default function CourseProfilePage() {
  const { courseId } = useParams();

  const course = {
    id: courseId as string,
    title: "Database Management Systems",
    category: "Computer Science",
    instructor: "Dr. Priya Sharma",
    duration: "40 Hours",
    students: 120,
    status: "Active" as "Active" | "Completed",
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500">
          Dashboard / Courses / {course.title}
        </p>
        <h1 className="text-2xl font-semibold">
          {course.title}
        </h1>
      </div>

      {/* SIDEBAR - TOP */}
      <CourseProfileSidebar course={course} />

      {/* MAIN CONTENT */}
      <div className="space-y-6">

        {/* TOP ROW - 3 STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Students</h3>
            <p className="text-3xl font-bold text-slate-900">120</p>
            <p className="text-xs text-slate-500 mt-1">Enrolled in this course</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Average Progress</h3>
            <p className="text-3xl font-bold text-green-600">78%</p>
            <p className="text-xs text-slate-500 mt-1">Overall completion rate</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold text-blue-600">45%</p>
            <p className="text-xs text-slate-500 mt-1">Students completed course</p>
          </div>
        </div>

        {/* SECOND ROW - ANALYTICS CHARTS */}
        <CourseAnalyticsCharts />

        {/* THIRD ROW - MODULES */}
        <CourseModules />

        {/* FOURTH ROW - FEEDBACK AND COMPLAINTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CourseFeedback />
          <CourseComplaints />
        </div>

      </div>

    </div>
  );
}