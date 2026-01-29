"use client";

import { Megaphone, Eye } from "lucide-react";

const announcementsData = [
  {
    id: "1",
    title: "Mid-term Exam Schedule Released",
    course: "Data Structures",
    date: "2024-01-15",
    priority: "High",
  },
  {
    id: "2",
    title: "Lab Session Rescheduled",
    course: "Operating Systems",
    date: "2024-01-14",
    priority: "Medium",
  },
  {
    id: "3",
    title: "Assignment Deadline Extended",
    course: "Database Systems",
    date: "2024-01-13",
    priority: "Low",
  },
  {
    id: "4",
    title: "Guest Lecture on AI",
    course: "Computer Networks",
    date: "2024-01-12",
    priority: "Medium",
  },
  {
    id: "5",
    title: "Project Submission Guidelines",
    course: "Data Structures",
    date: "2024-01-11",
    priority: "High",
  },
];

export default function RecentAnnouncements() {
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

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100";
      case "Medium":
        return "bg-yellow-100";
      case "Low":
        return "bg-green-100";
      default:
        return "bg-slate-100";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Recent Announcements</h3>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
          5 This Week
        </span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {announcementsData.map((item) => (
          <div
            key={item.id}
            className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50"
          >
            
            <div className="flex items-start gap-3">
              
              <div className={`p-2 rounded-lg ${getPriorityBg(item.priority)}`}>
                <Megaphone size={16} className={getPriorityColor(item.priority)} />
              </div>

              <div className="flex-1">
                
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{item.title}</p>
                  <button className="p-1 rounded hover:bg-slate-200">
                    <Eye size={14} className="text-slate-500" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">{item.course}</p>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>

              </div>

            </div>

          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        View All Announcements →
      </button>

    </div>
  );
}