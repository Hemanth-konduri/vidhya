"use client";

import TeacherStatCards from "@/components/dashboards/teacher/TeacherStatCards";

import BatchAttendanceLineChart from "@/components/dashboards/teacher/BatchAttendanceLineChart";
import AssignmentQuizBarChart from "@/components/dashboards/teacher/AssignmentQuizBarChart";
import CourseCompletionPie from "@/components/dashboards/teacher/CourseCompletionPie";
import TeachingActivityChart from "@/components/dashboards/teacher/TeachingActivityChart";

import RecentSubmissionsPanel from "@/components/dashboards/teacher/RecentSubmissionsPanel";
import RecentActivitiesPanel from "@/components/dashboards/teacher/RecentActivitiesPanel";
import ComplaintsPanel from "@/components/dashboards/teacher/ComplaintsPanel";
import UpcomingSchedulePanel from "@/components/dashboards/teacher/UpcomingSchedulePanel";

export default function TeacherOverviewPage() {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Teacher Dashboard
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Teaching insights & class performance
        </p>
      </div>

      {/* KPI CARDS */}
      <TeacherStatCards />

      {/* MAIN CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BatchAttendanceLineChart />
        <CourseCompletionPie />
      </div>

      {/* LOWER CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssignmentQuizBarChart />
        <TeachingActivityChart />
      </div>

      {/* PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentSubmissionsPanel />
        <RecentActivitiesPanel />
        <ComplaintsPanel />
        <UpcomingSchedulePanel />
      </div>

    </div>
  );
}
