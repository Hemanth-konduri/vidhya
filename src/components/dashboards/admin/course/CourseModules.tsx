"use client";

import { Button } from "@/components/ui/button";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const modules = [
  { id: 1, name: "Introduction", duration: "2 hours", status: "Completed" },
  { id: 2, name: "Relational Model", duration: "3 hours", status: "Completed" },
  { id: 3, name: "SQL Basics", duration: "4 hours", status: "In Progress" },
  { id: 4, name: "Normalization", duration: "3 hours", status: "Pending" },
  { id: 5, name: "Transactions", duration: "2 hours", status: "Pending" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "In Progress":
      return "bg-yellow-100 text-yellow-700";
    case "Pending":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export default function CourseModules() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      
      {/* HEADER WITH EDIT BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Course Modules
          </h3>
          <p className="text-sm text-slate-500 mt-1">Total 5 modules - Manage course content</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
          className="gap-2"
        >
          <Edit2 className="w-4 h-4" />
          {isEditing ? "Done" : "Edit"}
        </Button>
      </div>

      {/* MODULES LIST */}
      <div className="space-y-3">
        {modules.map((m) => (
          <div
            key={m.id}
            className="px-4 py-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex justify-between items-center group"
          >
            <div className="flex-1">
              <h4 className="font-medium text-slate-900">{m.name}</h4>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-slate-500">{m.duration}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(m.status)}`}>
                  {m.status}
                </span>
              </div>
            </div>
            {isEditing && (
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ADD MODULE BUTTON */}
      {isEditing && (
        <Button
          variant="outline"
          className="w-full mt-4 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Module
        </Button>
      )}

    </div>
  );
}