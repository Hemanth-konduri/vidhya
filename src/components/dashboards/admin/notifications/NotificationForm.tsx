"use client";

import { useState } from "react";
import { Send, Users, User, Building2, GraduationCap, Globe } from "lucide-react";
import { sendNotification } from "../../../../app/dashboards/admin/actions/sendNotification";

export default function NotificationForm() {
  const [recipientType, setRecipientType] = useState<string>("everyone");
  const [recipientId, setRecipientId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const recipientTypes = [
    {
      id: "everyone",
      label: "Everyone",
      description: "Send to all users in the system",
      icon: Globe,
      color: "bg-slate-100 text-slate-700",
      requiresId: false
    },
    {
      id: "department",
      label: "Department",
      description: "Send to specific department",
      icon: Building2,
      color: "bg-slate-100 text-slate-700",
      requiresId: true,
      placeholder: "Enter department ID"
    },
    {
      id: "batch",
      label: "Batch",
      description: "Send to specific batch/class",
      icon: GraduationCap,
      color: "bg-slate-100 text-slate-700",
      requiresId: true,
      placeholder: "Enter batch ID"
    },
    {
      id: "group",
      label: "Group",
      description: "Send to specific group",
      icon: Users,
      color: "bg-slate-100 text-slate-700",
      requiresId: true,
      placeholder: "Enter group ID"
    },
    {
      id: "individual",
      label: "Individual",
      description: "Send to specific person",
      icon: User,
      color: "bg-slate-100 text-slate-700",
      requiresId: true,
      placeholder: "Enter email or user ID"
    }
  ];

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      await sendNotification(formData);
      alert("Notification sent successfully!");
      // Reset form
      setTitle("");
      setMessage("");
      setRecipientId("");
      setRecipientType("everyone");
      setScheduleType("now");
      setScheduledTime("");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const selectedType = recipientTypes.find(t => t.id === recipientType);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Send Notification</h1>
        <p className="text-slate-600">Compose and send notifications to users</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form action={handleSubmit} className="space-y-8">

          {/* Hidden inputs for form data */}
          <input type="hidden" name="recipientType" value={recipientType} />
          <input type="hidden" name="recipientId" value={recipientId} />
          <input type="hidden" name="scheduleType" value={scheduleType} />
          <input type="hidden" name="scheduledTime" value={scheduledTime} />

          {/* Recipient Type Selection */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Recipients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipientTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setRecipientType(type.id);
                      setRecipientId("");
                    }}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      recipientType === type.id
                        ? "border-slate-400 bg-slate-50"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${type.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">{type.label}</h4>
                        <p className="text-sm text-slate-500 mt-1">{type.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recipient ID Input */}
          {selectedType?.requiresId && (
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                {selectedType.label} Identifier
              </label>
              <input
                type="text"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                placeholder={selectedType.placeholder}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                required
              />
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Notification Title *
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a clear, descriptive title"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your notification message here..."
              rows={6}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent resize-none"
              required
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-slate-500">
                {message.length} characters
              </p>
              <p className="text-xs text-slate-500">
                Keep it clear and concise
              </p>
            </div>
          </div>

          {/* Schedule Options */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h4 className="font-medium text-slate-900 mb-4">Delivery Options</h4>
            <div className="space-y-4">
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={scheduleType === "now"}
                    onChange={() => setScheduleType("now")}
                    className="w-4 h-4 text-slate-600 focus:ring-slate-400"
                  />
                  <div>
                    <span className="font-medium text-slate-900">Send Now</span>
                    <p className="text-sm text-slate-500">Deliver immediately</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={scheduleType === "later"}
                    onChange={() => setScheduleType("later")}
                    className="w-4 h-4 text-slate-600 focus:ring-slate-400"
                  />
                  <div>
                    <span className="font-medium text-slate-900">Schedule Later</span>
                    <p className="text-sm text-slate-500">Choose delivery time</p>
                  </div>
                </label>
              </div>

              {scheduleType === "later" && (
                <div className="mt-4">
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h4 className="font-medium text-slate-900 mb-4">Preview</h4>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-600 text-white flex items-center justify-center text-xs font-bold">
                  A
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-slate-900">
                    {title || "Your notification title will appear here"}
                  </h5>
                  <p className="text-sm text-slate-600 mt-1">
                    {message || "Your message content will be displayed here..."}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">Just now</p>
                </div>
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-600">
              <strong>Recipients:</strong> {selectedType?.label}
              {selectedType?.requiresId && recipientId && ` (${recipientId})`}
            </div>
          </div>

          {/* Send Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setMessage("");
                setRecipientId("");
                setRecipientType("everyone");
              }}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
              disabled={isLoading}
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isLoading ? "Sending..." : (scheduleType === "now" ? "Send Notification" : "Schedule Notification")}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
