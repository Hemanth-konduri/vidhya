"use client";

import {
  Mail,
  Phone,
  Building,
  Award,
  MessageCircle,
  Edit,
} from "lucide-react";

type TeacherProfileSidebarProps = {
  name: string;
  teacherId: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  experience: number;
  status: "Active" | "Disabled";
};

export default function TeacherProfileSidebar({
  name,
  teacherId,
  email,
  phone,
  department,
  designation,
  experience,
  status,
}: TeacherProfileSidebarProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

      {/* COVER */}
      <div className="h-16 bg-gradient-to-r from-blue-500 to-indigo-400" />

      {/* PROFILE */}
      <div className="-mt-8 px-4 pb-3 text-center">

        {/* Avatar */}
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 border-4 border-white flex items-center justify-center text-xl font-bold text-blue-700">
          {name.charAt(0)}
        </div>

        {/* ID + Status */}
        <div className="mt-2 flex justify-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100">
            {teacherId}
          </span>

          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Name */}
        <h2 className="mt-1 font-semibold text-sm">
          {name}
        </h2>

        <p className="text-xs text-slate-500">
          {designation}
        </p>

        {/* Quick Actions */}
        <div className="flex justify-center gap-2 mt-2">

          <button className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
            <Mail size={14} />
          </button>

          <button className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
            <Phone size={14} />
          </button>

          <button className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center justify-center">
            <MessageCircle size={14} />
          </button>

        </div>

      </div>

      {/* CONTACT INFO */}
      <div className="px-4 pb-3 space-y-2">

        <h3 className="text-xs font-semibold">
          Professional Information
        </h3>

        <div className="space-y-1 text-xs">

          <div className="flex items-center gap-2">
            <Mail size={14} className="text-slate-400" />
            <span className="truncate">{email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={14} className="text-slate-400" />
            <span className="truncate">{phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Building size={14} className="text-slate-400" />
            <span className="truncate">{department}</span>
          </div>

          <div className="flex items-center gap-2">
            <Award size={14} className="text-slate-400" />
            <span className="truncate">{experience}y exp</span>
          </div>

        </div>

        {/* Edit Button */}
        <button className="w-full mt-2 flex items-center justify-center gap-1 border border-slate-200 rounded-lg py-1 text-xs hover:bg-slate-50">
          <Edit size={12} />
          Edit Profile
        </button>

      </div>

    </div>
  );
}