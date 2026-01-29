"use client";

import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { useState } from "react";

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    instituteName: "College LMS",
    instituteCode: "CLMS-2025",
    timezone: "Asia/Kolkata",
    language: "English",
    academicYear: "2025-2026",
    semester: "1st Semester",
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">

      {/* INSTITUTION INFO CARD */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Institution Information</h2>
              <p className="text-sm text-slate-500">Manage your institution details</p>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* INSTITUTE NAME */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Institute Name
            </label>
            <input
              type="text"
              value={settings.instituteName}
              disabled={!isEditing}
              onChange={(e) => setSettings({ ...settings, instituteName: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50"
            />
          </div>

          {/* INSTITUTE CODE */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Institute Code
            </label>
            <input
              type="text"
              value={settings.instituteCode}
              disabled={!isEditing}
              onChange={(e) => setSettings({ ...settings, instituteCode: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50"
            />
          </div>

          {/* TIMEZONE */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Timezone
            </label>
            <select
              disabled={!isEditing}
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50"
            >
              <option>Asia/Kolkata</option>
              <option>Asia/Bangkok</option>
              <option>Asia/Singapore</option>
              <option>UTC</option>
            </select>
          </div>

          {/* LANGUAGE */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Language
            </label>
            <select
              disabled={!isEditing}
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
          </div>

          {/* ACADEMIC YEAR */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Academic Year
            </label>
            <input
              type="text"
              value={settings.academicYear}
              disabled={!isEditing}
              onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50"
            />
          </div>

          {/* SEMESTER */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Current Semester
            </label>
            <select
              disabled={!isEditing}
              value={settings.semester}
              onChange={(e) => setSettings({ ...settings, semester: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-50"
            >
              <option>1st Semester</option>
              <option>2nd Semester</option>
              <option>3rd Semester</option>
              <option>4th Semester</option>
            </select>
          </div>

        </div>

      </div>

    </div>
  );
}
