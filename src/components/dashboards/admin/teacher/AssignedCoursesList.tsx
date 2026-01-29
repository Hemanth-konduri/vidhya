"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const assignedCourses = [
  {
    id: "1",
    course: "Data Structures & Algorithms",
    semester: "Fall 2024",
    studentsCount: 45,
    progress: 78,
    status: "Active",
  },
  {
    id: "2",
    course: "Operating Systems",
    semester: "Fall 2024",
    studentsCount: 38,
    progress: 65,
    status: "Active",
  },
  {
    id: "3",
    course: "Database Management Systems",
    semester: "Spring 2024",
    studentsCount: 42,
    progress: 92,
    status: "Completed",
  },
  {
    id: "4",
    course: "Computer Networks",
    semester: "Fall 2024",
    studentsCount: 35,
    progress: 45,
    status: "Active",
  },
];

const ProgressDonut = ({ progress }: { progress: number }) => {
  const data = [
    { name: "completed", value: progress, fill: "#16a34a" },
    { name: "remaining", value: 100 - progress, fill: "#e5e7eb" },
  ];

  return (
    <div className="relative w-12 h-12">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={14}
            outerRadius={20}
            dataKey="value"
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-slate-700">{progress}%</span>
      </div>
    </div>
  );
};

export default function AssignedCoursesList() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      
      <div className="p-6 border-b">
        <h3 className="font-semibold text-lg">Assigned Courses</h3>
        <p className="text-sm text-slate-500">Courses currently teaching</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left px-6 py-3">Course</th>
              <th className="text-left px-6 py-3">Semester</th>
              <th className="text-left px-6 py-3">Students</th>
              <th className="text-left px-6 py-3">Progress</th>
              <th className="text-left px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {assignedCourses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-slate-50">
                
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{course.course}</p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="text-slate-600">{course.semester}</span>
                </td>

                <td className="px-6 py-4">
                  <span className="font-medium">{course.studentsCount}</span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <ProgressDonut progress={course.progress} />
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      course.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : course.status === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}