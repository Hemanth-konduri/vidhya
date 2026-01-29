"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Clock, AlertCircle, CheckCircle2, X } from "lucide-react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: 1,
      type: "assignment",
      title: "New Assignment Created",
      message: "Data Structures assignment deadline is tomorrow",
      time: "5 minutes ago",
      read: false,
      icon: AlertCircle,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "attendance",
      title: "Attendance Alert",
      message: "CSE 1-A has 85% attendance this week",
      time: "2 hours ago",
      read: false,
      icon: CheckCircle2,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 3,
      type: "grade",
      title: "Grades Posted",
      message: "Mid-term exam grades for CSE 1-A are now available",
      time: "1 day ago",
      read: true,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      type: "system",
      title: "System Maintenance",
      message: "System maintenance scheduled for tomorrow at 2:00 PM",
      time: "2 days ago",
      read: true,
      icon: AlertCircle,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 5,
      type: "announcement",
      title: "Class Announcement",
      message: "Class CSE 2-A will have practical session rescheduled",
      time: "3 days ago",
      read: true,
      icon: CheckCircle2,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* NOTIFICATION BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
      >
        <Bell className="w-5 h-5 text-slate-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-semibold">
            {unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-slate-200 z-50 max-h-96 overflow-hidden flex flex-col">

          {/* HEADER */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Notifications</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* NOTIFICATIONS LIST */}
          <div className="flex-1 overflow-y-auto">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${notification.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-slate-900 text-sm">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="p-3 border-t border-slate-200 text-center">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View All Notifications
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
