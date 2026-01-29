"use client";

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
    <div className="bg-white border rounded-xl p-6">

      <div className="h-32 bg-green-100 rounded-lg mb-4 flex items-center justify-center text-3xl">
        📘
      </div>

      <h2 className="font-semibold text-lg">
        {course.title}
      </h2>

      <p className="text-sm text-slate-500">
        {course.category}
      </p>

      <div className="mt-4 space-y-2 text-sm">

        <Info label="Instructor" value={course.instructor} />
        <Info label="Duration" value={course.duration} />
        <Info label="Students" value={`${course.students}`} />

        <div>
          <span className="text-slate-500">Status</span>
          <span
            className={`ml-2 text-xs px-2 py-1 rounded-full ${
              course.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {course.status}
          </span>
        </div>

      </div>

      <button className="w-full mt-6 border rounded-lg py-2 text-sm hover:bg-slate-50">
        Edit Course
      </button>

    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}