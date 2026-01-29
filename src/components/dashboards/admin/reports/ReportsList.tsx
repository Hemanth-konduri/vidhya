"use client";

import { Button } from "@/components/ui/button";
import { Download, Eye, Trash2 } from "lucide-react";

const reports = [
  {
    id: "1",
    name: "Student Performance Report - CSE 1-A",
    type: "Performance",
    createdBy: "Dr. Priya Sharma",
    createdDate: "Jan 25, 2025",
    students: 45,
    status: "Completed",
  },
  {
    id: "2",
    name: "Attendance Summary Q1",
    type: "Attendance",
    createdBy: "Admin",
    createdDate: "Jan 20, 2025",
    students: 120,
    status: "Completed",
  },
  {
    id: "3",
    name: "Assignment Completion Analysis",
    type: "Assignments",
    createdBy: "Prof. Rajesh Kumar",
    createdDate: "Jan 15, 2025",
    students: 85,
    status: "Completed",
  },
  {
    id: "4",
    name: "Semester Course Evaluation",
    type: "Evaluation",
    createdBy: "Dr. Amit Singh",
    createdDate: "Jan 10, 2025",
    students: 200,
    status: "In Progress",
  },
  {
    id: "5",
    name: "Teacher Performance Metrics",
    type: "Performance",
    createdBy: "Admin",
    createdDate: "Jan 5, 2025",
    students: 12,
    status: "Completed",
  },
];

const getStatusBadge = (status: string) => {
  return status === "Completed"
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700";
};

const getTypeBadge = (type: string) => {
  const colors: Record<string, string> = {
    Performance: "bg-blue-100 text-blue-700",
    Attendance: "bg-purple-100 text-purple-700",
    Assignments: "bg-orange-100 text-orange-700",
    Evaluation: "bg-pink-100 text-pink-700",
  };
  return colors[type] || "bg-slate-100 text-slate-700";
};

export default function ReportsList() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Generated Reports</h3>
        <p className="text-sm text-slate-500 mt-1">Manage and view all system reports</p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Report Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Date
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">
                Students
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">{report.name}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeBadge(report.type)}`}>
                    {report.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {report.createdBy}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {report.createdDate}
                </td>
                <td className="px-6 py-4 text-center text-sm font-medium text-slate-900">
                  {report.students}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-green-600 hover:text-green-700"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
