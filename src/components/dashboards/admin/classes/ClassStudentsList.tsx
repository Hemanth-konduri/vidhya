"use client";

import { Button } from "@/components/ui/button";
import { Eye, Mail } from "lucide-react";

const students = [
  { id: "1", name: "Rahul Sharma", rollNo: "CSE-2025-001", attendance: 92, performance: 85 },
  { id: "2", name: "Ananya Reddy", rollNo: "CSE-2025-002", attendance: 88, performance: 78 },
  { id: "3", name: "Mohit Verma", rollNo: "CSE-2025-003", attendance: 95, performance: 92 },
  { id: "4", name: "Priya Singh", rollNo: "CSE-2025-004", attendance: 85, performance: 81 },
  { id: "5", name: "Vikram Patel", rollNo: "CSE-2025-005", attendance: 90, performance: 88 },
];

export default function ClassStudentsList() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Class Students</h3>
        <p className="text-sm text-slate-500 mt-1">Showing top 5 students</p>
      </div>

      {/* STUDENTS LIST */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Student</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Roll No</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">Attendance</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">Performance</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{student.name}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{student.rollNo}</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {student.attendance}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {student.performance}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        <Button variant="outline" className="w-full">
          View All Students ({students.length})
        </Button>
      </div>

    </div>
  );
}
