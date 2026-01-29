"use client";

import { useState } from "react";
import { MessageSquare, AlertTriangle } from "lucide-react";

type Item = {
  id: string;
  message: string;
  date: string;
  status: "Open" | "Resolved";
};

const feedbacks: Item[] = [
  {
    id: "1",
    message: "Great course content and clear explanations.",
    date: "12 Mar 2025",
    status: "Resolved",
  },
  {
    id: "2",
    message: "Would like more practical examples.",
    date: "18 Mar 2025",
    status: "Open",
  },
];

const complaints: Item[] = [
  {
    id: "1",
    message: "Video playback is slow in DBMS course.",
    date: "10 Mar 2025",
    status: "Open",
  },
  {
    id: "2",
    message: "Assignment marks not updated.",
    date: "15 Mar 2025",
    status: "Resolved",
  },
];

export default function FeedbackComplaints() {
  const [tab, setTab] = useState<"feedback" | "complaint">("feedback");

  const data = tab === "feedback" ? feedbacks : complaints;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Feedback & Complaints</h3>

        <div className="flex gap-2">
          <button
            onClick={() => setTab("feedback")}
            className={`px-4 py-1.5 text-sm rounded-lg ${
              tab === "feedback"
                ? "bg-green-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            Feedback
          </button>

          <button
            onClick={() => setTab("complaint")}
            className={`px-4 py-1.5 text-sm rounded-lg ${
              tab === "complaint"
                ? "bg-green-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            Complaints
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-4 max-h-[260px] overflow-y-auto pr-1">

        {data.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 border rounded-xl hover:shadow-sm transition"
          >

            {/* ICON */}
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                tab === "feedback"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {tab === "feedback" ? (
                <MessageSquare size={18} />
              ) : (
                <AlertTriangle size={18} />
              )}
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <p className="text-sm font-medium">
                {item.message}
              </p>

              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                <span>{item.date}</span>

                <span
                  className={`px-2 py-0.5 rounded-full ${
                    item.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

          </div>
        ))}

        {data.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-10">
            No records found
          </p>
        )}

      </div>

    </div>
  );
}