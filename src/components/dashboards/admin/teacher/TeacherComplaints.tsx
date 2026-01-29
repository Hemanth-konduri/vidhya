"use client";

import { AlertTriangle, Clock, CheckCircle } from "lucide-react";

const complaintsData = [
  {
    id: "1",
    title: "Late Assignment Feedback",
    course: "Data Structures",
    date: "2024-01-15",
    status: "Open",
    priority: "Medium",
  },
  {
    id: "2",
    title: "Unclear Lab Instructions",
    course: "Operating Systems",
    date: "2024-01-12",
    status: "Resolved",
    priority: "Low",
  },
  {
    id: "3",
    title: "Missing Lecture Materials",
    course: "Database Systems",
    date: "2024-01-10",
    status: "Open",
    priority: "High",
  },
  {
    id: "4",
    title: "Grading Discrepancy",
    course: "Computer Networks",
    date: "2024-01-08",
    status: "In Progress",
    priority: "High",
  },
];

export default function TeacherComplaints() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertTriangle size={16} className="text-red-600" />;
      case "In Progress":
        return <Clock size={16} className="text-yellow-600" />;
      case "Resolved":
        return <CheckCircle size={16} className="text-green-600" />;
      default:
        return <AlertTriangle size={16} className="text-red-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Teacher Complaints</h3>
        <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-md">
          2 Open
        </span>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {complaintsData.map((item) => (
          <div
            key={item.id}
            className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50"
          >
            
            <div className="flex items-start gap-3">
              
              <div className="p-2 rounded-lg bg-slate-100">
                {getStatusIcon(item.status)}
              </div>

              <div className="flex-1">
                
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.course}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(item.status)}`}
                  >
                    {item.status}
                  </span>
                  
                  <button className="text-xs text-blue-600 hover:text-blue-700">
                    View Details
                  </button>
                </div>

              </div>

            </div>

          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        View All Complaints →
      </button>

    </div>
  );
}