"use client";

import { useState } from "react";
import { Eye, Trash2, Copy, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  recipientType: string;
  recipientCount: number;
  sentTime: string;
  status: "sent" | "scheduled" | "failed";
  readCount: number;
}

export default function NotificationHistory() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Mid-term Exam Schedule",
      message: "The mid-term exams for CSE 1-A are scheduled for next week...",
      recipientType: "Class",
      recipientCount: 45,
      sentTime: "Today, 9:30 AM",
      status: "sent",
      readCount: 38,
    },
    {
      id: 2,
      title: "Assignment Submission Deadline",
      message: "Reminder: Assignment 3 submission deadline is tomorrow at 5 PM...",
      recipientType: "Department",
      recipientCount: 280,
      sentTime: "Yesterday, 2:15 PM",
      status: "sent",
      readCount: 156,
    },
    {
      id: 3,
      title: "System Maintenance Notice",
      message: "The system will undergo maintenance on Friday evening from 8 PM to 10 PM...",
      recipientType: "Everyone",
      recipientCount: 450,
      sentTime: "Jan 27, 10:45 AM",
      status: "sent",
      readCount: 312,
    },
    {
      id: 4,
      title: "New Course Available",
      message: "A new course on Advanced Data Structures has been added to the system...",
      recipientType: "Student",
      recipientCount: 120,
      sentTime: "Jan 25, 4:20 PM",
      status: "scheduled",
      readCount: 0,
    },
    {
      id: 5,
      title: "Faculty Meeting Reminder",
      message: "Please attend the faculty meeting scheduled for tomorrow morning at 10 AM...",
      recipientType: "Teacher",
      recipientCount: 32,
      sentTime: "Jan 24, 11:00 AM",
      status: "sent",
      readCount: 28,
    },
  ]);

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Sent
          </span>
        );
      case "scheduled":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
            <Clock className="w-3 h-3" />
            Scheduled
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
            <AlertCircle className="w-3 h-3" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      {/* TABLE HEADER */}
      <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-200 bg-slate-50 font-semibold text-slate-900 text-sm">
        <div className="col-span-3">Title</div>
        <div className="col-span-2">Recipients</div>
        <div className="col-span-2">Sent Time</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-2">Read</div>
        <div className="col-span-2">Actions</div>
      </div>

      {/* TABLE ROWS */}
      <div className="divide-y divide-slate-200">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No notifications sent yet
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-slate-50 transition"
            >

              {/* TITLE */}
              <div className="col-span-3">
                <p className="font-medium text-slate-900 text-sm">
                  {notification.title}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {notification.message}
                </p>
              </div>

              {/* RECIPIENTS */}
              <div className="col-span-2">
                <p className="text-sm text-slate-900 font-medium">
                  {notification.recipientType}
                </p>
                <p className="text-xs text-slate-500">
                  {notification.recipientCount} users
                </p>
              </div>

              {/* SENT TIME */}
              <div className="col-span-2">
                <p className="text-sm text-slate-900">
                  {notification.sentTime}
                </p>
              </div>

              {/* STATUS */}
              <div className="col-span-1">
                {getStatusBadge(notification.status)}
              </div>

              {/* READ COUNT */}
              <div className="col-span-2">
                {notification.status === "sent" ? (
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {notification.readCount} / {notification.recipientCount}
                    </p>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all"
                        style={{
                          width: `${(notification.readCount / notification.recipientCount) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">-</p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="col-span-2 flex gap-2">
                <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition">
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
