"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Send } from "lucide-react";
import NotificationForm from "@/components/dashboards/admin/notifications/NotificationForm";
import NotificationHistory from "@/components/dashboards/admin/notifications/NotificationHistory";

type View = "send" | "history";

export default function NotificationsPage() {
  const [view, setView] = useState<View>("send");

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500">Dashboard / Notifications</p>
        <h1 className="text-2xl font-semibold">Send Notifications</h1>
      </div>

      {/* TABS */}
      <div className="flex gap-2 bg-white rounded-lg border border-slate-200 p-1 w-fit">
        <button
          onClick={() => setView("send")}
          className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            view === "send"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Send className="w-4 h-4" />
          Send Notification
        </button>
        <button
          onClick={() => setView("history")}
          className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            view === "history"
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Bell className="w-4 h-4" />
          History
        </button>
      </div>

      {/* CONTENT */}
      {view === "send" ? (
        <NotificationForm />
      ) : (
        <NotificationHistory />
      )}

    </div>
  );
}
