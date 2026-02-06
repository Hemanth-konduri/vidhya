"use client";

import { useState } from "react";
import { Eye, Trash2, Copy, CheckCircle2, Clock, AlertCircle, Search } from "lucide-react";

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
      recipientType: "Batch",
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
      recipientType: "Individual",
      recipientCount: 1,
      sentTime: "Jan 25, 4:20 PM",
      status: "scheduled",
      readCount: 0,
    },
    {
      id: 5,
      title: "Faculty Meeting Reminder",
      message: "Please attend the faculty meeting scheduled for tomorrow morning at 10 AM...",
      recipientType: "Group",
      recipientCount: 32,
      sentTime: "Jan 24, 11:00 AM",
      status: "sent",
      readCount: 28,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Sent
          </span>
        );
      case "scheduled":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-200 text-slate-800 text-xs font-medium rounded-full">
            <Clock className="w-3 h-3" />
            Scheduled
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-300 text-slate-900 text-xs font-medium rounded-full">
            <AlertCircle className="w-3 h-3" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.recipientType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notification History</h1>
          <p className="text-slate-600 mt-1">View and manage sent notifications</p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent w-64"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="scheduled">Scheduled</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No notifications found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-slate-900 text-lg">
                        {notification.title}
                      </h3>
                      {getStatusBadge(notification.status)}
                    </div>
                    
                    <p className="text-slate-600 mb-3 line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {notification.sentTime}
                      </span>
                      <span>
                        Recipients: <strong>{notification.recipientType}</strong> ({notification.recipientCount} users)
                      </span>
                      {notification.status === "sent" && (
                        <span>
                          Read: <strong>{notification.readCount}/{notification.recipientCount}</strong>
                        </span>
                      )}
                    </div>
                    
                    {/* Read Progress */}
                    {notification.status === "sent" && (
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-slate-500">Read Progress</span>
                          <span className="text-xs text-slate-500">
                            {Math.round((notification.readCount / notification.recipientCount) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-slate-600 h-2 rounded-full transition-all"
                            style={{
                              width: `${(notification.readCount / notification.recipientCount) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Summary */}
      {filteredNotifications.length > 0 && (
        <div className="text-center text-sm text-slate-500">
          Showing {filteredNotifications.length} of {notifications.length} notifications
        </div>
      )}
    </div>
  );
}