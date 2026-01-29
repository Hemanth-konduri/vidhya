"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

type Course = {
  id: string;
  title: string;
  category: string;
  lessons: number;
  hours: number;
  progress: number;
  status: "Ongoing" | "Completed";
  score: number;
  certificate: string | null;
};

const courses: Course[] = [
  {
    id: "1",
    title: "French for Beginners",
    category: "Language · Beginner",
    lessons: 15,
    hours: 25,
    progress: 60,
    status: "Ongoing",
    score: 78,
    certificate: null,
  },
  {
    id: "2",
    title: "Business Communication",
    category: "Business · Intermediate",
    lessons: 20,
    hours: 40,
    progress: 50,
    status: "Ongoing",
    score: 72,
    certificate: null,
  },
  {
    id: "3",
    title: "Spanish for Beginners",
    category: "Language · Beginner",
    lessons: 18,
    hours: 30,
    progress: 100,
    status: "Completed",
    score: 90,
    certificate: "Spanish_Beginner.pdf",
  },
  {
    id: "4",
    title: "Content Marketing",
    category: "Marketing · Beginner",
    lessons: 19,
    hours: 29,
    progress: 35,
    status: "Ongoing",
    score: 64,
    certificate: null,
  },
];

export default function EnrolledCoursesList() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Enrolled Courses</h3>

        <div className="flex gap-2">
          <input
            placeholder="Search course..."
            className="border rounded-lg px-3 py-2 text-sm"
          />
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>All Status</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>
          <button className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm">
            View All
          </button>
        </div>
      </div>

      {/* COLUMN HEADERS */}
      <div className="hidden md:grid grid-cols-[2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-3 px-6 py-2 text-xs font-semibold text-slate-500 border-b">
        <div>Course</div>
        <div>Lessons</div>
        <div>Hours</div>
        <div>Progress</div>
        <div>Status</div>
        <div>Score</div>
        <div>Certificate</div>
      </div>

      {/* LIST */}
      <div className="space-y-3 mt-3">

        {courses.map((course) => (
          <div
            key={course.id}
            className="grid grid-cols-[2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-3 items-center px-6 py-4 rounded-xl border hover:shadow-sm transition"
          >

            {/* COURSE */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                📘
              </div>
              <div>
                <p className="font-medium">{course.title}</p>
                <p className="text-xs text-slate-500">
                  {course.category}
                </p>
              </div>
            </div>

            {/* LESSONS */}
            <div className="text-sm text-slate-600">
              {course.lessons}
            </div>

            {/* HOURS */}
            <div className="text-sm text-slate-600">
              {course.hours}h
            </div>

            {/* PROGRESS */}
            <div className="w-12 h-12 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { value: course.progress },
                      { value: 100 - course.progress },
                    ]}
                    innerRadius={14}
                    outerRadius={20}
                    dataKey="value"
                  >
                    <Cell fill="#ec4899" />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">
                {course.progress}%
              </div>
            </div>

            {/* STATUS */}
            <span
              className={`text-xs px-3 py-1 rounded-full w-fit ${
                course.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {course.status}
            </span>

            {/* SCORE */}
            <div className="text-sm font-medium">
              {course.score}
              <span className="text-slate-400">/100</span>
            </div>

            {/* CERTIFICATE */}
            <div className="text-xs text-slate-500">
              {course.certificate ? "Available" : "None"}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}