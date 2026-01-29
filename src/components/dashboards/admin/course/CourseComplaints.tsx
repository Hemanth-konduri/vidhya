"use client";

import { AlertCircle } from "lucide-react";

const complaints = [
  { id: 1, student: "Priya Singh", complaint: "Assignment deadline too tight", severity: "High" },
  { id: 2, student: "Vikram Patel", complaint: "Need more clarification on normalization", severity: "Medium" },
  { id: 3, student: "Neha Gupta", complaint: "Course material updates needed", severity: "Low" },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "High":
      return "bg-red-100 text-red-700 border-red-300";
    case "Medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "Low":
      return "bg-blue-100 text-blue-700 border-blue-300";
    default:
      return "bg-slate-100 text-slate-700 border-slate-300";
  }
};

export default function CourseComplaints() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">

      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Course Complaints</h3>
          <p className="text-xs text-slate-500">{complaints.length} complaints pending</p>
        </div>
      </div>

      <div className="space-y-4">
        {complaints.map((c) => (
          <div
            key={c.id}
            className="border border-slate-200 rounded-lg p-4 hover:border-red-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-slate-900">{c.student}</h4>
              <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getSeverityColor(c.severity)}`}>
                {c.severity}
              </span>
            </div>
            <p className="text-sm text-slate-600">{c.complaint}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
