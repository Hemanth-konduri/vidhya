"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Reply, Star } from "lucide-react";

interface Message {
  id: number;
  from: string;
  role: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
}

interface MessageListProps {
  onCompose: () => void;
}

export default function MessagesList({ onCompose }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "Dr. Priya Sharma",
      role: "Class Incharge (CSE 1-A)",
      subject: "Mid-term Exam Schedule",
      preview: "The mid-term exams for CSE 1-A are scheduled for next week...",
      timestamp: "Today, 9:30 AM",
      read: false,
      starred: true,
    },
    {
      id: 2,
      from: "Rajesh Kumar",
      role: "Teacher (Data Structures)",
      subject: "Assignment Submission Deadline",
      preview: "Reminder: Assignment 3 submission deadline is tomorrow at 5 PM...",
      timestamp: "Yesterday, 2:15 PM",
      read: false,
      starred: false,
    },
    {
      id: 3,
      from: "Sarah Johnson",
      role: "Department Head",
      subject: "Faculty Meeting - January 30",
      preview: "Please attend the faculty meeting scheduled for tomorrow morning...",
      timestamp: "Jan 27, 10:45 AM",
      read: true,
      starred: false,
    },
    {
      id: 4,
      from: "System Admin",
      role: "System",
      subject: "Database Maintenance Scheduled",
      preview: "The system will undergo maintenance on Friday evening...",
      timestamp: "Jan 25, 4:20 PM",
      read: true,
      starred: false,
    },
    {
      id: 5,
      from: "Student Council",
      role: "Organization",
      subject: "Annual Fest Planning Committee",
      preview: "We are organizing the annual fest and need your support...",
      timestamp: "Jan 24, 11:00 AM",
      read: true,
      starred: false,
    },
  ]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedMessage = messages.find((m) => m.id === selectedId);

  const toggleStar = (id: number) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m))
    );
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id));
    setSelectedId(null);
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* MESSAGES LIST */}
      <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900 mb-3">Inbox</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-96">
          {messages.length === 0 ? (
            <div className="p-4 text-center text-slate-500 text-sm">
              No messages
            </div>
          ) : (
            messages.map((message) => (
              <button
                key={message.id}
                onClick={() => setSelectedId(message.id)}
                className={`w-full p-4 border-b border-slate-100 text-left hover:bg-slate-50 transition ${
                  selectedId === message.id ? "bg-blue-50" : ""
                } ${!message.read ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-900 truncate">
                        {message.from}
                      </p>
                      {!message.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{message.role}</p>
                    <p className="text-sm text-slate-600 truncate mt-2">
                      {message.subject}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                  {message.starred && (
                    <Star className="w-4 h-4 text-yellow-500 shrink-0 fill-current" />
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* MESSAGE DETAIL */}
      <div className="lg:col-span-2">
        {selectedMessage ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            {/* HEADER */}
            <div className="pb-6 border-b border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                      {selectedMessage.from[0]}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        {selectedMessage.from}
                      </p>
                      <p className="text-sm text-slate-500">
                        {selectedMessage.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-3">
                    {selectedMessage.timestamp}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStar(selectedMessage.id)}
                    className={`p-2 rounded-lg transition ${
                      selectedMessage.starred
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="py-6">
              <p className="text-slate-700 leading-relaxed">
                {selectedMessage.preview}
              </p>
              <p className="text-slate-600 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="pt-6 border-t border-slate-200 flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                <Reply className="w-4 h-4" />
                Reply
              </Button>
              <Button variant="outline">Archive</Button>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            <p className="text-slate-500 mb-4">Select a message to read</p>
            <Button onClick={onCompose} className="bg-blue-600 hover:bg-blue-700">
              Start New Conversation
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}
