"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useState } from "react";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    assignmentReminders: true,
    attendanceAlerts: true,
    gradeUpdates: true,
    systemUpdates: true,
    classAnnouncements: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const notificationOptions = [
    { key: "emailNotifications" as const, label: "Email Notifications", description: "Receive email alerts for important events" },
    { key: "assignmentReminders" as const, label: "Assignment Reminders", description: "Get notified about upcoming assignment deadlines" },
    { key: "attendanceAlerts" as const, label: "Attendance Alerts", description: "Notifications for low attendance" },
    { key: "gradeUpdates" as const, label: "Grade Updates", description: "Get notified when grades are posted" },
    { key: "systemUpdates" as const, label: "System Updates", description: "Information about system maintenance" },
    { key: "classAnnouncements" as const, label: "Class Announcements", description: "Important class announcements" },
  ];

  return (
    <div className="space-y-6">

      {/* NOTIFICATION PREFERENCES */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Notification Preferences</h2>
            <p className="text-sm text-slate-500">Control how you receive notifications</p>
          </div>
        </div>

        <div className="space-y-4">
          {notificationOptions.map((option) => (
            <div
              key={option.key}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div>
                <h3 className="font-medium text-slate-900">{option.label}</h3>
                <p className="text-sm text-slate-500">{option.description}</p>
              </div>
              <button
                onClick={() => toggleNotification(option.key)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  notifications[option.key] ? "bg-green-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    notifications[option.key] ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Save Preferences
          </Button>
        </div>

      </div>

    </div>
  );
}
