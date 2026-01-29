"use client";

import { useParams } from "next/navigation";

import CourseProfileSidebar from "@/components/dashboards/admin/course/CourseProfileSidebar";
import EnrollmentChart from "@/components/dashboards/admin/course/EnrollmentChart";
import CompletionDonut from "@/components/dashboards/admin/course/CompletionDonut";
import CourseStatsCard from "@/components/dashboards/admin/course/CourseStatsCard";
import CourseStudentsTable from "@/components/dashboards/admin/course/CourseStudentsTable";
import CourseModules from "@/components/dashboards/admin/course/CourseModules";
import CourseFeedback from "@/components/dashboards/admin/course/CourseFeedback";

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

      {/* MAIN GRID */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-6">

        {/* LEFT */}
        <CourseProfileSidebar course={course} />

        {/* RIGHT */}
        <div className="lg:col-span-3 space-y-6">

          {/* TOP ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EnrollmentChart />
            <CompletionDonut />
            <CourseStatsCard />
          </div>

          {/* MIDDLE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CourseStudentsTable />
            <CourseModules />
          </div>

          {/* BOTTOM */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CourseFeedback />
          </div>

        </div>

      </div>

    </div>
  );
}