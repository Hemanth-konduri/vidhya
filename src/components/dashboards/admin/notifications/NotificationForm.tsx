"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Clock } from "lucide-react";

type RecipientType = "student" | "teacher" | "class" | "group" | "section" | "department" | "everyone";

interface Recipient {
  value: RecipientType;
  label: string;
}

export default function NotificationForm() {
  const [recipientType, setRecipientType] = useState<RecipientType>("student");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [scheduledTime, setScheduledTime] = useState("");

  const recipients: Recipient[] = [
    { value: "student", label: "Specific Student" },
    { value: "teacher", label: "Specific Teacher" },
    { value: "class", label: "Specific Class" },
    { value: "group", label: "Specific Group" },
    { value: "section", label: "Specific Section" },
    { value: "department", label: "Specific Department" },
    { value: "everyone", label: "Everyone" },
  ];

  const getOptions = () => {
    const options: Record<RecipientType, string[]> = {
      student: ["Arjun Singh", "Neha Gupta", "Vikram Patel", "Priya Desai", "Rohan Kumar"],
      teacher: ["Dr. Priya Sharma", "Rajesh Kumar", "Sarah Johnson", "Amit Patel"],
      class: ["CSE 1-A", "CSE 1-B", "CSE 2-A", "ECE 1-A", "MECH 1-A"],
      group: ["Group A", "Group B", "Group C", "Group D"],
      section: ["Section 1", "Section 2", "Section 3"],
      department: ["Computer Science", "Electronics", "Mechanical", "Civil"],
      everyone: [],
    };
    return options[recipientType] || [];
  };

  const toggleRecipient = (recipient: string) => {
    setSelectedRecipients(
      selectedRecipients.includes(recipient)
        ? selectedRecipients.filter((r) => r !== recipient)
        : [...selectedRecipients, recipient]
    );
  };

  const handleSend = () => {
    if (!title || !message) {
      alert("Please fill in title and message");
      return;
    }
    if (recipientType !== "everyone" && selectedRecipients.length === 0) {
      alert("Please select at least one recipient");
      return;
    }
    alert("Notification sent successfully!");
    // Reset form
    setTitle("");
    setMessage("");
    setSelectedRecipients([]);
  };

  const options = getOptions();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT - FORM */}
        <div className="lg:col-span-2 space-y-6">

          {/* RECIPIENT TYPE */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-3">
              Send To
            </label>
            <div className="grid grid-cols-2 gap-2">
              {recipients.map((recipient) => (
                <button
                  key={recipient.value}
                  onClick={() => {
                    setRecipientType(recipient.value);
                    setSelectedRecipients([]);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    recipientType === recipient.value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {recipient.label}
                </button>
              ))}
            </div>
          </div>

          {/* SPECIFIC RECIPIENTS SELECTION */}
          {recipientType !== "everyone" && (
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-3">
                Select {recipients.find((r) => r.value === recipientType)?.label.split(" ")[1]}s
              </label>
              <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto p-3 border border-slate-200 rounded-lg">
                {options.map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRecipients.includes(option)}
                      onChange={() => toggleRecipient(option)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                    />
                    <span className="text-sm text-slate-700">{option}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Selected: {selectedRecipients.length}
              </p>
            </div>
          )}

          {recipientType === "everyone" && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900 font-medium">
                ✓ This notification will be sent to all students, teachers, and admins
              </p>
            </div>
          )}

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Notification Title
            </label>
            <input
              type="text"
              placeholder="Enter notification title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Message
            </label>
            <textarea
              placeholder="Write your notification message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            />
            <p className="text-xs text-slate-500 mt-2">
              {message.length} characters
            </p>
          </div>

          {/* SCHEDULE */}
          <div className="p-4 bg-slate-50 rounded-lg space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={scheduleType === "now"}
                  onChange={() => setScheduleType("now")}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-700">Send Now</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={scheduleType === "later"}
                  onChange={() => setScheduleType("later")}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-700">Schedule Later</span>
              </label>
            </div>

            {scheduleType === "later" && (
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            )}
          </div>

          {/* SEND BUTTON */}
          <Button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 w-full py-2 gap-2"
          >
            <Send className="w-4 h-4" />
            Send Notification
          </Button>

        </div>

        {/* RIGHT - PREVIEW */}
        <div>
          <div className="bg-slate-50 rounded-lg p-6 sticky top-24">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Preview</h3>

            <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">
                    {title || "Notification Title"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {message || "Your notification message will appear here..."}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    Just now
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-900 space-y-1">
              <p>
                <strong>Recipients:</strong>{" "}
                {recipientType === "everyone"
                  ? "All users"
                  : selectedRecipients.length > 0
                  ? `${selectedRecipients.length} selected`
                  : "None selected"}
              </p>
              {scheduleType === "later" && scheduledTime && (
                <p>
                  <strong>Scheduled:</strong> {new Date(scheduledTime).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
