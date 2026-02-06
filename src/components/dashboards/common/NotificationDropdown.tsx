"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Clock, AlertCircle, CheckCircle2, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("user_notifications")
        .select(`
          id,
          read_at,
          created_at,
          notifications (
            id,
            title,
            message,
            created_at
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      setNotifications(data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (userNotificationId: string) => {
    try {
      await supabase
        .from("user_notifications")
        .update({ read_at: new Date().toISOString() })
        .eq("id", userNotificationId);
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => 
          n.id === userNotificationId 
            ? { ...n, read_at: new Date().toISOString() }
            : n
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* NOTIFICATION BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
      >
        <Bell className="w-5 h-5 text-slate-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center font-semibold">
            {unreadCount > 9 ? "9+" : unreadCount}
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
            {loading ? (
              <div className="p-8 text-center text-slate-500">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((userNotification) => {
                const notification = userNotification.notifications;
                return (
                  <div
                    key={userNotification.id}
                    onClick={() => {
                      if (!userNotification.read_at) {
                        markAsRead(userNotification.id);
                      }
                    }}
                    className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer ${
                      !userNotification.read_at ? "bg-slate-50" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="p-2 rounded-lg flex-shrink-0 bg-slate-100 text-slate-700">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium text-slate-900 text-sm">
                            {notification.title}
                          </h3>
                          {!userNotification.read_at && (
                            <span className="w-2 h-2 rounded-full bg-slate-600 flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          {formatTime(notification.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* FOOTER */}
          <div className="p-3 border-t border-slate-200 text-center">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-700">
              View All Notifications
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
