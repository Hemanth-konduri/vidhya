"use client";

import { Calendar, Clock, Award, TrendingUp } from "lucide-react";

interface ClassData {
  id: string;
  name: string;
  classIncharge: string;
  totalStudents: number;
  branch: string;
  group: string;
  specialization: string;
  semester: string;
  academicYear: string;
  room: string;
}

export default function ClassProfileSidebar({ classData }: { classData: ClassData }) {
  const keyStats = [
    {
      label: "Attendance Rate",
      value: "87%",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Avg Performance",
      value: "78%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Semester",
      value: classData.semester,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Class Room",
      value: classData.room,
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      {keyStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
            </div>
            <p className="text-xl font-bold text-slate-900">{stat.value}</p>
          </div>
        );
      })}

      {/* ADDITIONAL INFO */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-semibold text-slate-900 mb-4">Class Details</h4>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-slate-500 mb-1">Academic Year</p>
            <p className="font-medium text-slate-900">{classData.academicYear}</p>
          </div>
          <div>
            <p className="text-slate-500 mb-1">Branch</p>
            <p className="font-medium text-slate-900">{classData.branch}</p>
          </div>
          <div>
            <p className="text-slate-500 mb-1">Specialization</p>
            <p className="font-medium text-slate-900">{classData.specialization}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
