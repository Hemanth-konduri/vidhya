"use client";

import { Edit } from "lucide-react";

type Props = {
  course: {
    title: string;
    category: string;
    instructor: string;
    duration: string;
    students: number;
    status: "Active" | "Completed";
  };
};

export default function CourseProfileSidebar({ course }: Props) {
  return (
    <div className="bg-white border rounded-xl p-4">

      <div className="h-20 bg-blue-100 rounded-lg mb-3 flex items-center justify-center text-2xl mb-2">
        📘
      </div>

      <h2 className="font-semibold text-sm">
        {course.title}
      </h2>

      <p className="text-xs text-slate-500">
        {course.category}
      </p>

      <div className="mt-3 space-y-1 text-xs">

        <Info label="Instructor" value={course.instructor} />
        <Info label="Duration" value={course.duration} />
        <Info label="Students" value={`${course.students}`} />

        <div className="flex justify-between">
          <span className="text-slate-500">Status</span>
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${
              course.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {course.status}
          </span>
        </div>

      </div>

      <button className="w-full mt-3 flex items-center justify-center gap-1 border rounded-lg py-1 text-xs hover:bg-slate-50">
        <Edit size={12} />
        Edit Course
      </button>

    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}