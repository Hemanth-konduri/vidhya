"use client";

import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const announcements = [
  {
    id: "1",
    title: "Midterm Exams Schedule Released",
    date: "Jan 28, 2025",
    priority: "High",
  },
  {
    id: "2",
    title: "Assignment 3 Deadline Extended",
    date: "Jan 25, 2025",
    priority: "Medium",
  },
  {
    id: "3",
    title: "Lab Session Cancelled Tomorrow",
    date: "Jan 24, 2025",
    priority: "High",
  },
  {
    id: "4",
    title: "New Course Material Available",
    date: "Jan 22, 2025",
    priority: "Low",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700 border-red-300";
    case "Medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "Low":
      return "bg-green-100 text-green-700 border-green-300";
    default:
      return "bg-slate-100 text-slate-700 border-slate-300";
  }
};

export default function ClassAnnouncements() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Announcements</h3>
              <p className="text-sm text-slate-500">Latest class updates</p>
            </div>
          </div>
          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            New
          </Button>
        </div>
      </div>

      {/* ANNOUNCEMENTS */}
      <div className="divide-y divide-slate-200">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-slate-900 leading-snug">{announcement.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full font-medium border whitespace-nowrap ml-2 ${getPriorityColor(announcement.priority)}`}>
                {announcement.priority}
              </span>
            </div>
            <p className="text-xs text-slate-500">{announcement.date}</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        <Button variant="outline" className="w-full">
          View All Announcements
        </Button>
      </div>

    </div>
  );
}
